using Bl.API;
using Bl.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")] // הבסיס הוא /api/Client
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IBLClient _clientService;

        public ClientController(IBl bl)
        {
            _clientService = bl.Clients;
        }

        [HttpPost("create")] 
        public ActionResult<BLClient> CreateClient([FromBody] BLClient c) // שינוי ל-[FromBody]
        {
            try
            {
                _clientService.Create(c);
                return Ok(c); 
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
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

        [HttpGet("getAll")]
        public IActionResult GetClients()
        {
            return Ok(_clientService.Read());
        }

        [HttpGet("get")]
        public IActionResult GetClientById([FromQuery] int id)
        {
            var client = _clientService.ReadByID(id);
            if (client != null)
            {
                return Ok(client);
            }
            else
            {
                return BadRequest("Client not found");
            }
        }

        [HttpPost("update")] // הערה: בדרך כלל משתמשים ב-HttpPut עבור עדכון
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