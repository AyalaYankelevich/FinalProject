//using System;
//using System.Collections.Generic;

//namespace Bl.Models;

//public partial class BLClinicAppointment
//{
//    public int Id { get; set; }

//    public DateOnly Date { get; set; }

//    public TimeOnly Hour { get; set; }

//    public int AttendentId { get; set; }

//    public int? ClinetId { get; set; }

//    public int IsReserved { get; set; }

//    public virtual BLAttendent Attendent { get; set; } = null!;

//    public virtual BLClient Clinet { get; set; } = null!;
//}
// Bl.Models/BLClinicAppointment.cs
using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization; // *** ודא שורה זו קיימת! ***

namespace Bl.Models;
public class BLClinicAppointment
{
    public int Id { get; set; }

    [Required] // תאריך הוא שדה חובה
    public DateOnly Date { get; set; }

    [Required] // שעה היא שדה חובה
    public TimeOnly Hour { get; set; }

    [Required] // מזהה המטפל הוא שדה חובה
    public int AttendentId { get; set; }

    public int? ClinetId { get; set; } // מזהה הלקוח הוא אופציונלי (יכול להיות NULL)

    public int IsReserved { get; set; } // 0 לפנוי, 1 לשמור

    // *** השינוי המרכזי: הוספת [JsonIgnore] ***
    // זה מורה ל-JSON deserializer להתעלם משדות אלה בעת קבלת נתונים מה-Frontend.
    // הם עדיין קיימים במודל לצורך שימוש פנימי ב-Backend (לדוגמה, עם Entity Framework),
    // אך השרת לא יצפה לקבל אותם ב-JSON הנכנס.
    [JsonIgnore]
    public virtual BLAttendent Attendent { get; set; } = null!;

    [JsonIgnore]
    public virtual BLClient Clinet { get; set; } = null!;
}