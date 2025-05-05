using Bl.API;
using Bl.Models;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ClientController:ControllerBase
    {
        private readonly IBLClient _clientService;
        public ClientController(IBl bl)
        {
            _clientService = bl.Clients;
        }

        [HttpPut]
        public ActionResult<BLClient> AddClient([FromBody] BLClient c)
        {
            _clientService.Create(c);
        return c;
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteClient(int id)
        {
            try
            {
                _clientService.Delete(id);
                return Ok("Client deleted successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get")]
        public IActionResult GetClients()
        {
            return Ok(_clientService.Read());
        }

        [HttpPut("update")]
        public IActionResult UpdateClient([FromBody] BLClient client)
        {
            try
            {
                _clientService.Update(client);
                return Ok("Client updated successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }


}
