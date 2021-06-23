using System.Threading.Tasks;

namespace Application.Common.Interfaces.Hubs
{
  public interface IPendingTokenHub
  {
    Task SendMessage(string userName, string message);
  }
}
