using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.AppTokens;
using Application.AppTokens.Commands.UpdateAppTokenActions;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Interfaces.Hubs;
using Application.Common.Security;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Application.AppTokenActions.Commands.UpdateAppTokenActions
{
  [Authorize]
  public class UpdateAppTokenActionsCommand : IRequest
  {
    [JsonIgnore]
    public int TokenId { get; set; }
    public AppTokenUpdateDto AppToken { get; set; }

    public class UpdateAppTokenActionsCommandHandler : IRequestHandler<UpdateAppTokenActionsCommand>
    {
      private readonly IApplicationDbContext _context;
      private readonly ICurrentUserService _currentUserService;
      private readonly IPendingTokenHub _pendingTokenHub;

      public UpdateAppTokenActionsCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService, IPendingTokenHub pendingTokenHub)
      {
        _context = context;
        _currentUserService = currentUserService;
        _pendingTokenHub = pendingTokenHub;
      }

      public async Task<Unit> Handle(UpdateAppTokenActionsCommand request, CancellationToken cancellationToken)
      {
        var appToken = _context.AppTokens.Where(e => e.Id == request.TokenId).Include(e => e.AppTokenActions).FirstOrDefault();
        if (appToken == null) throw new NotFoundException(nameof(Domain.Entities.AppToken), request.TokenId);

        var appTokenActions =  appToken.AppTokenActions.ToList();
        var actionsICanApprove = _context.ActionApprovers
          .Where(e => e.Email == _currentUserService.UserEmail);

        foreach (var updatedAction in request.AppToken.AppTokenActions)
        {
          Console.WriteLine(_currentUserService.UserEmail);
          var action = appTokenActions.Find(e => e.Id == updatedAction.Id);
          if (action == null)
            throw new NotFoundException(
              nameof(Domain.Entities.AppTokenAction) + "Actions isn't included in the current AppToken", request.TokenId);
          if (!actionsICanApprove.Any(e => e.ActionId == action.ActionId))
          {
            throw new NotFoundException("You aren't a approver of action " + action.ActionId);
          }

          action.State = updatedAction.State;
          action.RejectionReason = updatedAction.RejectionReason;
        }

        if (appToken.AppTokenActions.Any(e => e.State != ServiceStates.Pending)) appToken.State = TokenStates.Reviewed;
        _context.AppTokens.Update(appToken);
        await _context.SaveChangesAsync(cancellationToken);

        await _pendingTokenHub.SendMessage(_currentUserService.UserEmail, "tokenReviewed");

        return Unit.Value;
      }
    }
  }
}
