using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.AppTokenActions;
using Application.AppTokenActions.Commands.UpdateAppTokenActions;
using Application.AppTokens;
using Application.Common.Exceptions;
using Domain.Enums;
using FluentAssertions;
using Xunit;

namespace Application.UnitTests.AppTokenActions.Commands.Update
{
  public class UpdateAppTokenActionsCommandTest : CommandTestBase
  {
    [Fact]
    public async Task Handle_GivenValidTokenId_and_ValidTokenActions_ShouldUpdateStateAndRejectionReason()
    {
      var command = new UpdateAppTokenActionsCommand
      {
        TokenId = 1,
        AppToken = new AppTokenUpdateDto
        {
          AppTokenActions = new List<AppTokenActionUpdateDto>
          {
            new AppTokenActionUpdateDto
            {
              Id = 2,
              State = ServiceStates.Rejected,
              RejectionReason = "Test rejected"
            }
          }
        }
      };
      var handler = new UpdateAppTokenActionsCommand.UpdateAppTokenActionsCommandHandler(Context, CurrentUserServiceMock.Object, PendingTokensHubMock.Object);
      var result = await handler.Handle(command, CancellationToken.None);

      var entity = Context.AppTokens.Find(1);
      var actions = entity.AppTokenActions.ToList();

      var action2 = actions.Find(e => e.Id == 2);
      action2.Should().NotBe(null);
      action2.State.Should().Be(ServiceStates.Rejected);
      action2.RejectionReason.Should().Be("Test rejected");

      var dbAction = Context.AppTokenActions.Find(2);
      dbAction.State.Should().Be(ServiceStates.Rejected);
      dbAction.RejectionReason.Should().Be("Test rejected");
    }
    [Fact]
    public void WithInvalidTokenId_ThrowsException()
    {
      var command = new UpdateAppTokenActionsCommand
      {
        TokenId = 99,
        AppToken = new AppTokenUpdateDto
        {
          AppTokenActions = new List<AppTokenActionUpdateDto>
          {
            new AppTokenActionUpdateDto
            {
              Id = 1,
              State = ServiceStates.Approved,
              RejectionReason = "",
            },
            new AppTokenActionUpdateDto
            {
              Id = 2,
              State = ServiceStates.Rejected,
              RejectionReason = "Test rejected"
            }
          }
        }
      };
      var handler = new UpdateAppTokenActionsCommand.UpdateAppTokenActionsCommandHandler(Context, CurrentUserServiceMock.Object, PendingTokensHubMock.Object);
      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);
      action.Should().Throw<NotFoundException>();
    }
    [Fact]
    public void WithInvalidTokenActions_ThrowsException()
    {
      var command = new UpdateAppTokenActionsCommand
      {
        TokenId = 1,
        AppToken = new AppTokenUpdateDto
        {
          AppTokenActions = new List<AppTokenActionUpdateDto>
          {
            new AppTokenActionUpdateDto
            {
              Id = 99,
              State = ServiceStates.Approved,
              RejectionReason = "",
            },
            new AppTokenActionUpdateDto
            {
              Id = 98,
              State = ServiceStates.Rejected,
              RejectionReason = "Test rejected"
            }
          }
        }
      };
      var handler = new UpdateAppTokenActionsCommand.UpdateAppTokenActionsCommandHandler(Context, CurrentUserServiceMock.Object, PendingTokensHubMock.Object);
      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);
      action.Should().Throw<NotFoundException>();
    }
    [Fact]
    public void ReviewingActionsYouCanNotApprove_ThrowsException()
    {
      var command = new UpdateAppTokenActionsCommand
      {
        TokenId = 1,
        AppToken = new AppTokenUpdateDto
        {
          AppTokenActions = new List<AppTokenActionUpdateDto>
          {
            new AppTokenActionUpdateDto
            {
              Id = 3,
              State = ServiceStates.Approved,
              RejectionReason = "",
            }
          }
        }
      };
      var handler = new UpdateAppTokenActionsCommand.UpdateAppTokenActionsCommandHandler(Context, CurrentUserServiceMock.Object, PendingTokensHubMock.Object);
      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);
      action.Should().Throw<NotFoundException>();
    }
    [Fact]
    public async Task Handle_AllActionsReviewed_Should_UpdateTokenState()
    {
      var entityBefore = Context.AppTokens.Find(1);
      var command = new UpdateAppTokenActionsCommand
      {
        TokenId = 1,
        AppToken = new AppTokenUpdateDto
        {
          AppTokenActions = new List<AppTokenActionUpdateDto>
          {
            new AppTokenActionUpdateDto
            {
              Id = 1,
              State = ServiceStates.Approved,
              RejectionReason = "",
            },
            new AppTokenActionUpdateDto
            {
              Id = 2,
              State = ServiceStates.Rejected,
              RejectionReason = "Test rejected"
            }
          }
        }
      };
      var handler = new UpdateAppTokenActionsCommand.UpdateAppTokenActionsCommandHandler(Context, CurrentUserServiceMock.Object, PendingTokensHubMock.Object);
      var result = await handler.Handle(command, CancellationToken.None);

      var entity = Context.AppTokens.Find(1);
      var actions = entity.AppTokenActions.ToList();

      var action1 = actions.Find(e => e.Id == 1);
      action1.Should().NotBe(null);
      action1.State.Should().Be(ServiceStates.Approved);
      action1.RejectionReason.Should().BeNullOrEmpty();
      var action2 = actions.Find(e => e.Id == 2);
      action2.Should().NotBe(null);
      action2.State.Should().Be(ServiceStates.Rejected);
      action2.RejectionReason.Should().Be("Test rejected");
      entity.State.Should().Be(TokenStates.Reviewed);
    }
  }
}
