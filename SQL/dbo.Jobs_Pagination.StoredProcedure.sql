USE [C120_jdayoub_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Jobs_Pagination]    Script Date: 10/30/2022 10:04:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[Jobs_Pagination]
		@PageIndex int
		,@PageSize int

as

/*

	Declare @PageIndex int = 1
			,@PageSize int = 2

	Execute dbo.Jobs_Pagination
							@PageIndex
							,@PageSize

	Select *
	FROM dbo.Jobs

*/

BEGIN

	Declare @offset int = @PageIndex * @PageSize

	SELECT  j.[Id] as JobId
			,[Title]
			,[Description]
			,[Summary]
			,[Pay]
			,[Slug]
			,[StatusId]
			,[Skills] = (
						SELECT s.Id as Id
								,s.Name as Name
					
						FROM dbo.Skills as s inner join dbo.JobSkills as js
								on s.Id = js.SkillId
						WHERE js.JobId = j.Id
						FOR JSON AUTO
					)
			,[TechCompany] = (Select *
							  FROM dbo.TechCompanies as tc
							  WHERE tc.Id = j.TechCompanyId
							  FOR JSON AUTO)
			,[UserId]
			,[DateCreated]
			,[DateModified]
			,[TotalCount] = COUNT(1) OVER()

    FROM    dbo.Jobs as j 
	ORDER BY j.Id

	OFFSET @offSet Rows
	Fetch Next @PageSize Rows ONLY

END
GO
