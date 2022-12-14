USE [C120_jdayoub_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Events_Pagination]    Script Date: 10/30/2022 10:04:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[Events_Pagination]
		@PageIndex int
		,@PageSize int

as

/*

	Declare @PageIndex int = 0
			,@PageSize int = 2

	Execute dbo.Events_Pagination
								@PageIndex
								,@PageSize

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
	ORDER BY DateCreated

	OFFSET @offSet Rows
	Fetch Next @PageSize Rows ONLY
END
GO
