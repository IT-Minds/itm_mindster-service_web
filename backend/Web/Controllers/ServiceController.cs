using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services;
using Application.Services.Commands.CreateService;
using Application.Services.Queries;
using Application.Actions.Commands.CreateAction;
using Application.Services.Queries.GetServices;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
  public class ServiceController : ApiControllerBase
  {
    [HttpPost]
    public async Task<ActionResult<int>> CreateService(CreateServiceCommand command)
    {
      return await Mediator.Send(command);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ServiceIdDto>> GetServiceById([FromRoute] int id)
    {
      return await Mediator.Send(new GetServiceByIdQuery {Id = id});
    }
    [HttpPost("{id}/ServiceOwners")]
    public async Task<ActionResult<int>> AddServiceOwners([FromRoute] int id, CreateServiceCommand command)
    {
      command.Id = id;
      return await Mediator.Send(command);
    }

    [HttpPost("{id}/Actions")]
    public async Task<ActionResult<int>> CreateAction([FromRoute] int id, CreateActionCommand command)
    {
      command.Id = id;
      return await Mediator.Send(command);
    }
    [HttpGet("All")]
    public async Task<ActionResult<List<ServiceIdDto>>> GetAllServices()
    {
      return await Mediator.Send(new GetServicesQuery());
    }
    [HttpGet("MyServices")]
    public async Task<ActionResult<List<ServiceIdDto>>> GetMyServices()
    {
      return await Mediator.Send(new GetMyServicesQuery());
    }
  }
}
