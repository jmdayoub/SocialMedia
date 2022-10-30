USE [C120_jdayoub_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_SelectAllV2]    Script Date: 10/30/2022 10:04:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[Friends_SelectAllV2]

as
/*

	Execute dbo.Friends_SelectAllV2

*/

BEGIN

	SELECT [Id]
      ,[Title]
      ,[Bio]
      ,[Summary]
      ,[Headline]
      ,[Slug]
      ,[StatusId]
      ,[DateCreated]
      ,[DateModified]
      ,[UserId]
	FROM [dbo].[FriendsV2]

END

GO
