using Bl.API;
using Bl.Models;
using Dal.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ClinicAppointmentController : ControllerBase
    {
        private readonly IBLClinicAppointment _ClinicAppointmentsService;
        public ClinicAppointmentController(IBl bl)
        {
            _ClinicAppointmentsService = bl.ClinicAppointments;
        }

        [HttpPut]
        public ActionResult<BLClinicAppointment> AddClinicAppointment([FromBody] BLClinicAppointment ClinicAppointment)
        {
            _ClinicAppointmentsService.Create(ClinicAppointment);
            return ClinicAppointment;
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteClinicAppointment(int id)
        {
            try
            {
                _ClinicAppointmentsService.Delete(id);
                return Ok("Client deleted successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get")]
        public IActionResult GetClinicAppointment()
        {
            return Ok(_ClinicAppointmentsService.Read());
        }

        [HttpGet("available")]
        public IActionResult GetAvailableAppointments([FromQuery] DateTime date, [FromQuery] int attendentId)
        {
            var appointments = _ClinicAppointmentsService.Read()
                .Where(a => a.Date == DateOnly.FromDateTime(date) && a.AttendentId == attendentId && a.IsReserved == 0)
                .Select(a => a.Hour.ToString(@"hh\:mm"))
                .ToList();

            return Ok(appointments);
        }

        [HttpGet("getByClientId")]
        public IActionResult GetClientByClientId([FromQuery] int id)
        {
            return Ok(_ClinicAppointmentsService.FindByClientId(id));
        }


        [HttpGet("getByKind")]
        public IActionResult FindByKindAttendent([FromQuery] int kind)
        {
            return Ok(_ClinicAppointmentsService.FindByKindAttendent(kind));
            Console.WriteLine("Kind parameter: " + kind);

        }

        [HttpPost("update")]
        public IActionResult UpdateClinicAppointment([FromBody] BLClinicAppointment ClinicAppointment)
        {
            try
            {
                _ClinicAppointmentsService.Update(ClinicAppointment);
                return Ok("Client updated successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        //[HttpPost("updatef")]
        //public IActionResult UpdateClinicAppointmentf([FromQuery] int attendentId, [FromQuery] int clientId, [FromQuery] Date_Hour date_Hour)
        //{
        //    try
        //    {
        //        _ClinicAppointmentsService.fUpdate(attendentId, clientId, date_Hour);
        //        return Ok("Client updated successfully");
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
    }
}


