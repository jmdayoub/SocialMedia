USE [C120_jdayoub_gmail]
GO
/****** Object:  StoredProcedure [dbo].[TechCompanies_Delete]    Script Date: 10/30/2022 10:04:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[TechCompanies_Delete]
		@Id int

as
/*
	
	Declare @Id int = 1000;

	Select *
	From dbo.TechCompanies
	WHERE Id = @Id;

	Execute dbo.TechCompanies_Delete @Id

	Select *
	From dbo.TechCompanies
	WHERE Id = @Id;

*/

BEGIN
	
	DELETE FROM [dbo].[TechCompanies]
    WHERE Id = @Id;

END

	
GO
