DECLARE @StartDate DATE = '2025-05-15'; -- ����� �����
DECLARE @EndDate DATE = '2025-05-20';   -- ����� ����
DECLARE @CurrentDate DATE = @StartDate;

-- ����� �� �� ����� �����
WHILE @CurrentDate <= @EndDate
BEGIN
    -- ����� ������ �� 15 ���� ��� 08:00 �-16:00, �� ������
    INSERT INTO ClinicAppointments (Id, Date, Hour, AttendentId, ClinetId, IsReserved)
    SELECT 
        ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) + (SELECT ISNULL(MAX(Id), 0) FROM ClinicAppointments),
        @CurrentDate AS Date,
        TimeSlots.TimeSlot,
        1 AS AttendentId, -- ������, ���� �� ����, ���� ����� ��� �����
        0 AS ClinetId,    -- ���� ����, ���� ����� ��� �����
        0 AS IsReserved   -- ����� �� �� ����
    FROM 
    (
        -- ���� ����� ��� ������� (�� 15 ����)
        SELECT CAST('08:00:00' AS TIME) AS TimeSlot UNION ALL
        SELECT CAST('08:15:00' AS TIME) UNION ALL
        SELECT CAST('08:30:00' AS TIME) UNION ALL
        SELECT CAST('08:45:00' AS TIME) UNION ALL
        SELECT CAST('09:00:00' AS TIME) UNION ALL
        SELECT CAST('09:15:00' AS TIME) UNION ALL
        SELECT CAST('09:30:00' AS TIME) UNION ALL
        SELECT CAST('09:45:00' AS TIME) UNION ALL
        SELECT CAST('10:15:00' AS TIME) UNION ALL -- ���� ����� 10:00
        SELECT CAST('10:30:00' AS TIME) UNION ALL
        SELECT CAST('10:45:00' AS TIME) UNION ALL
        SELECT CAST('11:00:00' AS TIME) UNION ALL
        SELECT CAST('11:15:00' AS TIME) UNION ALL
        SELECT CAST('11:30:00' AS TIME) UNION ALL
        SELECT CAST('11:45:00' AS TIME) UNION ALL
        SELECT CAST('12:15:00' AS TIME) UNION ALL -- ���� ����� 12:00
        SELECT CAST('12:30:00' AS TIME) UNION ALL
        SELECT CAST('12:45:00' AS TIME) UNION ALL
        SELECT CAST('13:00:00' AS TIME) UNION ALL
        SELECT CAST('13:15:00' AS TIME) UNION ALL
        SELECT CAST('13:30:00' AS TIME) UNION ALL
        SELECT CAST('13:45:00' AS TIME) UNION ALL
        SELECT CAST('14:15:00' AS TIME) UNION ALL -- ���� ����� 14:00
        SELECT CAST('14:30:00' AS TIME) UNION ALL
        SELECT CAST('14:45:00' AS TIME) UNION ALL
        SELECT CAST('15:00:00' AS TIME) UNION ALL
        SELECT CAST('15:15:00' AS TIME) UNION ALL
        SELECT CAST('15:45:00' AS TIME) -- ���� ����� 15:30
    ) AS TimeSlots;

    -- ����� ������ ������ ���� ���
    SET @CurrentDate = DATEADD(DAY, 1, @CurrentDate);
END;