DECLARE @StartDate DATE = '2025-05-15'; -- תאריך התחלה
DECLARE @EndDate DATE = '2025-05-20';   -- תאריך סיום
DECLARE @CurrentDate DATE = @StartDate;

-- לולאה על כל הימים בטווח
WHILE @CurrentDate <= @EndDate
BEGIN
    -- הכנסת משמרות כל 15 דקות בין 08:00 ל-16:00, עם הפסקות
    INSERT INTO ClinicAppointments (Id, Date, Hour, AttendentId, ClinetId, IsReserved)
    SELECT 
        ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) + (SELECT ISNULL(MAX(Id), 0) FROM ClinicAppointments),
        @CurrentDate AS Date,
        TimeSlots.TimeSlot,
        1 AS AttendentId, -- לדוגמה, מזהה של נוכח, ניתן לשנות לפי הצורך
        0 AS ClinetId,    -- מזהה לקוח, ניתן לשנות לפי הצורך
        0 AS IsReserved   -- סטטוס של לא תפוס
    FROM 
    (
        -- טווח השעות ללא ההפסקות (כל 15 דקות)
        SELECT CAST('08:00:00' AS TIME) AS TimeSlot UNION ALL
        SELECT CAST('08:15:00' AS TIME) UNION ALL
        SELECT CAST('08:30:00' AS TIME) UNION ALL
        SELECT CAST('08:45:00' AS TIME) UNION ALL
        SELECT CAST('09:00:00' AS TIME) UNION ALL
        SELECT CAST('09:15:00' AS TIME) UNION ALL
        SELECT CAST('09:30:00' AS TIME) UNION ALL
        SELECT CAST('09:45:00' AS TIME) UNION ALL
        SELECT CAST('10:15:00' AS TIME) UNION ALL -- אחרי הפסקה 10:00
        SELECT CAST('10:30:00' AS TIME) UNION ALL
        SELECT CAST('10:45:00' AS TIME) UNION ALL
        SELECT CAST('11:00:00' AS TIME) UNION ALL
        SELECT CAST('11:15:00' AS TIME) UNION ALL
        SELECT CAST('11:30:00' AS TIME) UNION ALL
        SELECT CAST('11:45:00' AS TIME) UNION ALL
        SELECT CAST('12:15:00' AS TIME) UNION ALL -- אחרי הפסקה 12:00
        SELECT CAST('12:30:00' AS TIME) UNION ALL
        SELECT CAST('12:45:00' AS TIME) UNION ALL
        SELECT CAST('13:00:00' AS TIME) UNION ALL
        SELECT CAST('13:15:00' AS TIME) UNION ALL
        SELECT CAST('13:30:00' AS TIME) UNION ALL
        SELECT CAST('13:45:00' AS TIME) UNION ALL
        SELECT CAST('14:15:00' AS TIME) UNION ALL -- אחרי הפסקה 14:00
        SELECT CAST('14:30:00' AS TIME) UNION ALL
        SELECT CAST('14:45:00' AS TIME) UNION ALL
        SELECT CAST('15:00:00' AS TIME) UNION ALL
        SELECT CAST('15:15:00' AS TIME) UNION ALL
        SELECT CAST('15:45:00' AS TIME) -- אחרי הפסקה 15:30
    ) AS TimeSlots;

    -- עדכון התאריך הנוכחי ליום הבא
    SET @CurrentDate = DATEADD(DAY, 1, @CurrentDate);
END;