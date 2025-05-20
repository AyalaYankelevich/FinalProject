CREATE TABLE [dbo].[Clients] (
    [Id]            INT            NOT NULL,
    [First_name]    NVARCHAR (10)  NOT NULL,
    [Last_name]     NVARCHAR (10)  NOT NULL,
    [Date_of_birth] DATE           NOT NULL,
    [Number_phone]  NVARCHAR (10)  NOT NULL,
    [Address]       NVARCHAR (10)  NOT NULL,
    [Email]         NVARCHAR (100) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

