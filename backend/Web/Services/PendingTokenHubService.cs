using System;
using System.Threading.Tasks;
using Application.Common.Interfaces.Hubs;
using Microsoft.AspNetCore.SignalR;
using Web.Hubs;

namespace Web.Services
{
  public class PendingTokenHubService : IPendingTokenHub
  {
    private readonly IHubContext<PendingTokenHub> _hubContext;

    public PendingTokenHubService(IHubContext<PendingTokenHub> hubContext)
    {
      _hubContext = hubContext;
    }
    public async Task SendMessage(string userName, string message)
    {
      await _hubContext.Clients.All.SendAsync("TokensUpdated", userName, message, DateTimeOffset.UtcNow.ToUnixTimeMilliseconds());
    }
  }
}
