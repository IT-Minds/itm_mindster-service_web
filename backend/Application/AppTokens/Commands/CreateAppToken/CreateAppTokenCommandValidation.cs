using FluentValidation;

namespace Application.AppTokens.Commands.CreateAppToken
{
  public class CreateAppTokenCommandValidation : AbstractValidator<CreateAppTokenCommand>
  {
    public CreateAppTokenCommandValidation()
    {
      RuleFor(e => e.Id)
        .NotNull();
      RuleFor(e => e.AppToken)
        .NotEmpty();
      RuleFor(e => e.AppToken.Description)
        .MaximumLength(2000)
        .NotEmpty();
      RuleFor(e => e.AppToken.TokenIdentifier)
        .MaximumLength(200)
        .Matches("^[a-z_]*$");
    }
  }
}
