USE [C120_jdayoub_gmail]
GO
/****** Object:  StoredProcedure [dbo].[TechCompanies_Search_Pagination]    Script Date: 10/30/2022 10:04:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[TechCompanies_Search_Pagination]
		@PageIndex int
		,@PageSize int
		,@q nvarchar(50)

as

/*
	
	Declare @PageIndex int = 0
			,@PageSize int = 2
			,@q nvarchar(50) = 'Microsoft'

	Execute dbo.TechCompanies_Search_Pagination
										@PageIndex
										,@PageSize
										,@q

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
	WHERE (Name LIKE '%' + @q + '%')
	ORDER BY tc.Id

	OFFSET @offSet Rows
	Fetch Next @PageSize Rows ONLY

END
GO
