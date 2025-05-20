-- Declare variables for date range
DECLARE @StartDate DATE = '2025-05-15'; -- Change to your desired start date
DECLARE @EndDate DATE = '2025-05-20';   -- Change to your desired end date

-- Create a table to hold all time slots
DECLARE @TimeSlots TABLE (
    SlotId INT IDENTITY(1, 1),
    TimeSlot TIME(7)
);

-- Insert time slots for every 15 minutes between 8:00 AM and 4:00 PM excluding breaks
INSERT INTO @TimeSlots (TimeSlot)
SELECT CAST('08:00:00' AS TIME)
UNION ALL SELECT CAST('08:15:00' AS TIME)
UNION ALL SELECT CAST('08:30:00' AS TIME)
UNION ALL SELECT CAST('08:45:00' AS TIME)
UNION ALL SELECT CAST('09:00:00' AS TIME)
UNION ALL SELECT CAST('09:15:00' AS TIME)
UNION ALL SELECT CAST('09:30:00' AS TIME)
UNION ALL SELECT CAST('09:45:00' AS TIME)
UNION ALL SELECT CAST('10:15:00' AS TIME) -- After 10:00 AM break
UNION ALL SELECT CAST('10:30:00' AS TIME)
UNION ALL SELECT CAST('10:45:00' AS TIME)
UNION ALL SELECT CAST('11:00:00' AS TIME)
UNION ALL SELECT CAST('11:15:00' AS TIME)
UNION ALL SELECT CAST('11:30:00' AS TIME)
UNION ALL SELECT CAST('11:45:00' AS TIME)
UNION ALL SELECT CAST('12:15:00' AS TIME) -- After 12:00 PM break
UNION ALL SELECT CAST('12:30:00' AS TIME)
UNION ALL SELECT CAST('12:45:00' AS TIME)
UNION ALL SELECT CAST('01:00:00' AS TIME)
UNION ALL SELECT CAST('01:15:00' AS TIME)
UNION ALL SELECT CAST('01:30:00' AS TIME)
UNION ALL SELECT CAST('01:45:00' AS TIME)
UNION ALL SELECT CAST('02:15:00' AS TIME) -- After 2:00 PM break
UNION ALL SELECT CAST('02:30:00' AS TIME)
UNION ALL SELECT CAST('02:45:00' AS TIME)
UNION ALL SELECT CAST('03:00:00' AS TIME)
UNION ALL SELECT CAST('03:15:00' AS TIME)
UNION ALL SELECT CAST('03:45:00' AS TIME) -- After 3:30 PM break;

-- Insert into ClinicAppointments
DECLARE @CurrentDate DATE = @StartDate;

WHILE @CurrentDate <= @EndDate
BEGIN
    INSERT INTO ClinicAppointments (Id, Date, Hour, AttendentId, ClinetId, IsReserved)
    SELECT 
        ROW_NUMBER() OVER (ORDER BY t.TimeSlot) + (SELECT ISNULL(MAX(Id), 0) FROM ClinicAppointments),
        @CurrentDate AS Date,
        t.TimeSlot,
        1 AS AttendentId, -- Example AttendentId, replace with actual IDs
        0 AS ClinetId,    -- Placeholder ClinetId
        0 AS IsReserved   -- Initially not reserved
    FROM 
        @TimeSlots t;

    SET @CurrentDate = DATEADD(DAY, 1, @CurrentDate); -- Move to the next day
END