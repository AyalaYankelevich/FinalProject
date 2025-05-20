using Bl.API;
using Bl.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ClinictAppointmentController: ControllerBase
    {
            private readonly IBLClinicAppointment _clinicService;
            public ClinictAppointmentController(IBl bl)
            {
            _clinicService = bl.ClinicAppointments;
            }

            [HttpPut]
            public ActionResult<BLClinicAppointment> AddClient([FromBody] BLClinicAppointment ClinicAppointment)
            {
            _clinicService.Create(ClinicAppointment);
                return ClinicAppointment;
            }

            [HttpDelete("delete/{id}")]
            public IActionResult DeleteClient(int id)
            {
                try
                {
                _clinicService.Delete(id);
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
                return Ok(_clinicService.Read());
            }

            [HttpPost("update")]
            public IActionResult UpdateClient([FromBody] BLClinicAppointment ClinicAppointment)
            {
                try
                {
                _clinicService.Update(ClinicAppointment);
                    return Ok("Client updated successfully");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }
    }

