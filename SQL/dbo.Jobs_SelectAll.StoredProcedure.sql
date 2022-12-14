USE [C120_jdayoub_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Jobs_SelectAll]    Script Date: 10/30/2022 10:04:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROC [dbo].[Jobs_SelectAll] 

AS

/*

	Execute dbo.Jobs_SelectAll

*/
BEGIN

	SELECT j.[Id]
      ,[Title]
      ,[Description]
      ,[Summary]
      ,[Pay]
      ,[Slug]
      ,[StatusId]
	  ,Skills = (
			SELECT s.Id as Id
				   ,s.Name as Name
					
			FROM dbo.Skills as s inner join dbo.JobSkills as js
					on s.Id = js.SkillId -- on always comes right after a join
			WHERE js.JobId = j.Id
			FOR JSON AUTO
		)
	  ,[TechCompany] = (SELECT *
						FROM dbo.TechCompanies as tc
						WHERE tc.Id = j.TechCompanyId
						FOR JSON AUTO)
	  ,[UserId]
      ,[DateCreated]
      ,[DateModified]

	  FROM dbo.Jobs as j

END
GO
