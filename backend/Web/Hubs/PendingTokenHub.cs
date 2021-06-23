using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Web.Hubs
{
  public class PendingTokenHub : Hub
  {
    public async Task SendMessage(string userName, string message)
    {
      await Clients.All.SendAsync("ReceiveMessage", userName, message, DateTimeOffset.UtcNow.ToUnixTimeMilliseconds());
    }
  }
}
