using Bl.API;
using Bl.Models;
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

        [HttpPost("AddClinicAppointment")]
        public ActionResult<BLClinicAppointment> AddClinicAppointment([FromBody] BLClinicAppointment ClinicAppointment)
        {
            try
            {
                _ClinicAppointmentsService.Create(ClinicAppointment);
                return Ok(ClinicAppointment);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // נקודת קצה חדשה לקביעת תור עבור לקוח - מקבלת נתונים מה-body
        [HttpPut("BookAppointment")]
        public IActionResult BookAppointment([FromBody] BookAppointmentRequest request)
        {
            try
            {
                _ClinicAppointmentsService.BookAppointmentForClient(request.AppointmentId, request.ClientId);
                return Ok($"Appointment {request.AppointmentId} booked successfully for client {request.ClientId}.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to book appointment: {ex.Message}");
            }
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

        //[HttpGet("available")]
        //public IActionResult GetAvailableAppointments([FromQuery] DateTime date, [FromQuery] int attendentId)
        //{
        //    Console.WriteLine("hello!!!!!!!!");
        //    var appointments = _ClinicAppointmentsService.Read()
        //        .Where(a => a.Date == DateOnly.FromDateTime(date) && a.AttendentId == attendentId && a.IsReserved == 0)
        //        .Select(a => a.Hour.ToString(@"hh\:mm"))
        //        .ToList();
        //    Console.WriteLine($"Available appointments for {date.ToShortDateString()} and Attendent ID {attendentId}: {string.Join(", ", appointments)}");
        //    return Ok(appointments);
        //}
        [HttpGet("available")]
        public IActionResult GetAvailableAppointments([FromQuery] DateTime date, [FromQuery] int attendentId)
        {
            var appointments = _ClinicAppointmentsService.Read()
                .Where(a => a.Date == DateOnly.FromDateTime(date) && a.AttendentId == attendentId && a.IsReserved == 0)
                .Select(a => new { Id = a.Id, Hour = a.Hour.ToString(@"hh\:mm") }) // שינוי כאן: החזר את ה-ID והשעה
                .ToList();
            return Ok(appointments);
        }

        [HttpGet("getByClientId")]
        public IActionResult GetClientByClientId([FromQuery] int id)
        {
            return Ok(_ClinicAppointmentsService.FindByClientId(id));
        }

        [HttpGet("getByAttendentId")]
        public IActionResult GetAttedentByAttedentId([FromQuery] int id)
        {
            return Ok(_ClinicAppointmentsService.FindByAttedentId(id));
        }

        [HttpGet("getByKind")]
        public IActionResult FindByKindAttendent([FromQuery] int kind)
        {
            return Ok(_ClinicAppointmentsService.FindByKindAttendent(kind));
        }
    }
}