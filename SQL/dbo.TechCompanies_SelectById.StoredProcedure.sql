USE [C120_jdayoub_gmail]
GO
/****** Object:  StoredProcedure [dbo].[TechCompanies_SelectById]    Script Date: 10/30/2022 10:04:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[TechCompanies_SelectById]
		@Id int

as

/*

	Declare @Id int = 5;

	Execute dbo.TechCompanies_SelectById @Id

	Select *
	FROM dbo.TechCompanies

*/

BEGIN

	SELECT [Id]
      ,[Name]
      ,[Profile]
      ,[Summary]
      ,[Headline]
      ,[ContactInformation]
      ,[Slug]
      ,[StatusId]
      ,[ImageTypeId]
      ,[ImageUrl]
	  ,[UserId]
      ,[DateCreated]
      ,[DateModified]
      

	FROM [dbo].[TechCompanies] as tc
	WHERE @Id = tc.Id

END
GO
