using Bl.API;
using Bl.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendentController : ControllerBase
    {
        private readonly IBLAttendent  _attendentService;
        public AttendentController(IBl bl)
        {
            _attendentService = bl.Attendents;
        }

        [HttpPut("to")]
        public ActionResult<BLAttendent> AddAttendent([FromBody] BLAttendent attendent)
        {
            _attendentService.Create(attendent);
            return attendent;
        }
        [HttpDelete("delete/{id}")]
        public IActionResult DeleteAttendent(int id)
        {
            try
            {
                _attendentService.Delete(id);
                return Ok("Client deleted successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get")]
        public IActionResult GetAttendents()
        {
            return Ok(_attendentService.Read());
        }
        [HttpGet("get/{id}")]
        //public IActionResult GetAttendentById(int id)
        //{
        //    return base.Ok(_attendentService.ReadByID(id));
        //}

        [HttpPost("update")]
        public IActionResult UpdateAttendent([FromBody] BLAttendent attendent)
        {
            try
            {
                _attendentService.Update(attendent);
                return Ok("Attendent updated successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
