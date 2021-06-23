using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Interfaces.Hubs;
using Application.Common.Security;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Application.AppTokens.Commands.UpdateAppTokenActions
{
  [Authorize]
  public class UpdateAppTokenStateCommand : IRequest
  {
    [JsonIgnore]
    public int Id { get; set; }
    public TokenStates NewState { get; set; }

    public class UpdateAppTokenStateCommandHandler : IRequestHandler<UpdateAppTokenStateCommand>
    {
      private readonly IApplicationDbContext _context;
      private readonly ICurrentUserService _currentUserService;
      private readonly IPendingTokenHub _pendingTokenHub;

      public UpdateAppTokenStateCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService, IPendingTokenHub pendingTokenHub)
      {
        _context = context;
        _currentUserService = currentUserService;
        _pendingTokenHub = pendingTokenHub;
      }

      public async Task<Unit> Handle(UpdateAppTokenStateCommand request, CancellationToken cancellationToken)
      {
        var appToken = _context.AppTokens.Find(request.Id);
        if (appToken == null) throw new NotFoundException(nameof(Domain.Entities.AppToken), request.Id);
        if (!_context.AppOwners.Any(e => e.ApplicationId == appToken.ApplicationId && e.Email == _currentUserService.UserEmail))
        {
          throw new ForbiddenAccessException(nameof(ApplicationEntity), request.Id);
        }
        appToken.State = request.NewState;
        _context.AppTokens.Update(appToken);
        await _context.SaveChangesAsync(cancellationToken);

        await _pendingTokenHub.SendMessage(_currentUserService.UserEmail, "Token Requested for Review");

        return Unit.Value;
      }
    }
  }
}
