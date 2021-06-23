using AuthService.Client;
using Infrastructure.Persistence;
using System;
using Application.Common.Interfaces;
using Application.Common.Interfaces.Hubs;
using Moq;

namespace Application.UnitTests
{
  public class CommandTestBase : IDisposable
  {
    public Mock<ICurrentUserService> CurrentUserServiceMock;
    public Mock<ICurrentUserService> InvalidUserServiceMock;
    public Mock<IPendingTokenHub> PendingTokensHubMock;

    public CommandTestBase()
    {
      Context = ApplicationDbContextFactory.Create();
      AuthCient = new AuthTestService();
      CurrentUserServiceMock = new Mock<ICurrentUserService>();
      CurrentUserServiceMock.Setup(u => u.UserEmail)
        .Returns("test@mail.dk");
      InvalidUserServiceMock = new Mock<ICurrentUserService>();
      InvalidUserServiceMock.Setup(u => u.UserEmail)
        .Returns("invalid@mail.dk");
      PendingTokensHubMock = new Mock<IPendingTokenHub>();
    }

    public ApplicationDbContext Context { get; }
    public IAuthClient AuthCient { get; }

    public void Dispose()
    {
      ApplicationDbContextFactory.Destroy(Context);
    }
  }
}
