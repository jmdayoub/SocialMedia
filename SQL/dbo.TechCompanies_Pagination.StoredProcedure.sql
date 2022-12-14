USE [C120_jdayoub_gmail]
GO
/****** Object:  StoredProcedure [dbo].[TechCompanies_Pagination]    Script Date: 10/30/2022 10:04:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[TechCompanies_Pagination]
		@PageIndex int
		,@PageSize int

as

/*
	
	Declare @PageIndex int = 0
			,@PageSize int = 3

	Execute dbo.TechCompanies_Pagination
										@PageIndex
										,@PageSize

	Select *
	FROM dbo.TechCompanies

*/

BEGIN

	Declare @offset int = @PageIndex * @PageSize

	SELECT tc.[Id] as TechCompanyId
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
		  ,[TotalCount] = COUNT(1) OVER()

    FROM    dbo.TechCompanies as tc
	ORDER BY tc.Id

	OFFSET @offSet Rows
	Fetch Next @PageSize Rows ONLY

END
GO
