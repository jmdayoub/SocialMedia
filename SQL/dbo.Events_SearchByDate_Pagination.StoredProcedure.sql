USE [C120_jdayoub_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Events_SearchByDate_Pagination]    Script Date: 10/30/2022 10:04:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[Events_SearchByDate_Pagination]
		@PageIndex int
		,@PageSize int
		,@DateStart datetime2(7)
		,@DateEnd datetime2(7)

as

/*

	Declare @PageIndex int = 0
			,@PageSize int = 3
			,@DateStart datetime2(7) = '2022-09-30'
			,@DateEnd datetime2(7) = '2023-12-03'

	Execute dbo.Events_SearchByDate_Pagination
								@PageIndex
								,@PageSize
								,@DateStart
								,@DateEnd

	Select *
	FROM dbo.Events

*/

BEGIN

	Declare @offset int = @PageIndex * @PageSize

	SELECT e.[Id] as EventId
      ,[DateStart]
      ,[DateEnd]
      ,[Latitude]
      ,[Longitude]
      ,[ZipCode]
      ,[Address]
      ,[Name]
      ,[Headline]
      ,[Description]
      ,[Summary]
      ,[Slug]
      ,[StatusId]
	  ,[UserId]
	  ,[DateCreated]
      ,[DateModified]
	  ,[TotalCount] = COUNT(1) OVER()

    FROM    [dbo].[Events] as e
	WHERE e.DateStart between @DateStart and @DateEnd and e.DateEnd between @DateStart and @DateEnd
	ORDER BY e.Id

	OFFSET @offSet Rows
	Fetch Next @PageSize Rows ONLY
END
GO
