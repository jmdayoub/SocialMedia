USE [C120_jdayoub_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_Pagination]    Script Date: 10/30/2022 10:04:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[Friends_Pagination]     
			@PageIndex int 
			,@PageSize int

AS

/*

	Declare @PageIndex int = 0
			,@PageSize int = 2

	Execute dbo.Friends_Pagination 
								@PageIndex
								,@PageSize

	Select *
	From dbo.Friends

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
            , [TotalCount] = COUNT(1) OVER() -- this the quick way of doing the count. (see below)
        FROM    dbo.Friends
        ORDER BY Id

	OFFSET @offSet Rows
	Fetch Next @PageSize Rows ONLY

END
GO
