USE [C120_jdayoub_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_Search_Pagination]    Script Date: 10/30/2022 10:04:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[Friends_Search_Pagination]     
			@PageIndex int 
			,@PageSize int
			,@Query nvarchar(50)

AS

/*

	Declare @PageIndex int = 0
			,@PageSize int = 2
			,@Query nvarchar(50) = 'Jared'

	Execute dbo.Friends_Search_Pagination 
								@PageIndex
								,@PageSize
								,@Query

*/


BEGIN

		Declare @offset int = @PageIndex * @PageSize

        SELECT  [Id]
			,[Title]
			,[Bio]
			,[Summary]
			,[Headline]
			,[Slug]
			,[StatusId]
			,[PrimaryImageUrl]
			,[DateCreated]
			,[DateModified]
			,[UserId]

			
            ,[TotalCount] = COUNT(1) OVER() -- this the quick way of doing the count. (see below)
        FROM    dbo.Friends
		WHERE (Title LIKE '%' + @Query + '%')
		OR (Bio LIKE '%' + @Query + '%')
		OR (Slug LIKE '%' + @Query + '%')
        ORDER BY Id

	OFFSET @offSet Rows
	Fetch Next @PageSize Rows ONLY

END
GO
