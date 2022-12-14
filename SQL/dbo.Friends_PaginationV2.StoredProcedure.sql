USE [C120_jdayoub_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_PaginationV2]    Script Date: 10/30/2022 10:04:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[Friends_PaginationV2]
		@PageIndex int
		,@PageSize int

as 

/*

	Declare @PageIndex int = 0
			,@PageSize int = 2

	Execute dbo.Friends_PaginationV2
								@PageIndex
								,@PageSize

	Select * from dbo.FriendsV2

*/

BEGIN

	Declare @offset int = @PageIndex * @PageSize

	SELECT  f.[Id] as FriendId
			,[Title]
			,[Bio]
			,[Summary]
			,[Headline]
			,[Slug]
			,[StatusId]
			,i.Id as ImageId
			,i.TypeId
			,i.Url as ImageUrl
			,[UserId]
			,[DateCreated]
			,[DateModified]
			, [TotalCount] = COUNT(1) OVER()

    FROM    dbo.FriendsV2 as f inner join dbo.Images as i
	on f.PrimaryImageId = i.Id
	ORDER BY f.Id

	OFFSET @offSet Rows
	Fetch Next @PageSize Rows ONLY

END
GO
