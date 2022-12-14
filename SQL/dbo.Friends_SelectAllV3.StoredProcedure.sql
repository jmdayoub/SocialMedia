USE [C120_jdayoub_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_SelectAllV3]    Script Date: 10/30/2022 10:04:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[Friends_SelectAllV3]

as
/*

	Execute dbo.Friends_SelectAllV3

*/

BEGIN

	SELECT f.[Id]
      ,[Title]
      ,[Bio]
      ,[Summary]
      ,[Headline]
      ,[Slug]
      ,[StatusId]
	  ,i.Id
	  ,i.TypeId
      ,i.[Url]
	  ,Skills = (
			SELECT s.Id
				   ,s.Name
					
			FROM dbo.Skills as s inner join dbo.FriendSkills as fs
					on s.Id = fs.SkillId -- on always comes right after a join
			WHERE fs.FriendId = f.Id
			FOR JSON AUTO
		)
	  ,[UserId]
      ,[DateCreated]
      ,[DateModified]

	FROM dbo.FriendsV2 as f inner join dbo.Images as i
	on f.PrimaryImageId = i.Id

END

GO
