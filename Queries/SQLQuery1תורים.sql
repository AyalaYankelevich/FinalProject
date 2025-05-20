-- Declare scalar variables
DECLARE @CurrentDate DATE = '2025-05-14'; -- Starting date
DECLARE @EndDate DATE = '2025-05-20'; -- Ending date
DECLARE @StartTime TIME = '08:00:00'; -- Start time for each day
DECLARE @EndTime TIME = '18:00:00'; -- End time for each day
DECLARE @AppointmentId INT = 1; -- Initial appointment ID
DECLARE @IntervalMinutes INT = 20; -- Interval between appointments in minutes

-- Declare and populate the @Dentists table variable
DECLARE @Dentists TABLE (
    Id INT,
    StartTime TIME,
    EndTime TIME
);

INSERT INTO @Dentists (Id, StartTime, EndTime)
VALUES (1, '08:00:00', '12:00:00'), (2, '13:00:00', '18:00:00');

-- Declare and populate the @Hygienists table variable
DECLARE @Hygienists TABLE (
    Id INT,
    StartTime TIME,
    EndTime TIME
);

INSERT INTO @Hygienists (Id, StartTime, EndTime)
VALUES (1, '08:00:00', '12:00:00'), (2, '13:00:00', '18:00:00');

-- Loop through each day in the date range
WHILE @CurrentDate <= @EndDate
BEGIN
    -- Check if the day is not Saturday (clinic is closed on Saturdays)
    IF DATEPART(WEEKDAY, @CurrentDate) <> 7 -- 7 = Saturday
    BEGIN
        -- Variable to track the current time of the day
        DECLARE @CurrentTime TIME = @StartTime;
        DECLARE @BreakCounter INT = 0; -- Counter for tracking breaks

        -- Loop through all available times in the day
        WHILE @CurrentTime < @EndTime
        BEGIN
            -- Check if it is time for a break (every 2 hours)
            IF @BreakCounter = 6 -- 6 slots of 20 minutes = 120 minutes = 2 hours
            BEGIN
                -- Skip 30 minutes for the break
                SET @CurrentTime = DATEADD(MINUTE, 30, @CurrentTime);
                SET @BreakCounter = 0; -- Reset the break counter
            END
            ELSE
            BEGIN
                -- Find the available dentist and hygienist for the current time
                DECLARE @DentistId INT;
                DECLARE @HygienistId INT;

                SELECT TOP 1 @DentistId = Id
                FROM @Dentists
                WHERE @CurrentTime >= StartTime AND @CurrentTime < EndTime;

                SELECT TOP 1 @HygienistId = Id
                FROM @Hygienists
                WHERE @CurrentTime >= StartTime AND @CurrentTime < EndTime;

                -- Check if both a dentist and a hygienist are available
                IF @DentistId IS NOT NULL AND @HygienistId IS NOT NULL
                BEGIN
                    -- Insert a new record in the ClinicAppointments table
                    INSERT INTO [dbo].[ClinicAppointments] ([Id], [Date], [Hour], [AttendentId], [ClinetId], [IsReserved])
                    VALUES 
                    (@AppointmentId, @CurrentDate, @CurrentTime, 
                     CASE WHEN @BreakCounter % 2 = 0 THEN @DentistId ELSE @HygienistId END, 
                     NULL, -- No client assigned yet
                     0);  -- Appointment is not reserved

                    -- Update the appointment ID, current time, and break counter
                    SET @AppointmentId = @AppointmentId + 1;
                    SET @CurrentTime = DATEADD(MINUTE, @IntervalMinutes, @CurrentTime);
                    SET @BreakCounter = @BreakCounter + 1;
                END;
            END
        END
    END

    -- Move to the next day
    SET @CurrentDate = DATEADD(DAY, 1, @CurrentDate);
END;