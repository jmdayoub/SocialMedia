USE [C120_jdayoub_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_SelectByIdV3]    Script Date: 10/30/2022 10:04:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE proc [dbo].[Friends_SelectByIdV3]
		@Id int

as

/*

	Declare @Id int = 3;

	Execute dbo.Friends_SelectByIdV3 @Id
	Select * from dbo.FriendsV2

*/

BEGIN

	SELECT f.[Id]
      ,[Title]
      ,[Bio]
      ,[Summary]
      ,[Headline]
      ,[Slug]
      ,[StatusId]
	  ,i.Id as ImageId
	  ,i.TypeId as ImageTypeId
      ,i.[Url] as ImageUrl
	  ,Skills = (
			SELECT s.Id as Id
				   ,s.Name as Name
					
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
	WHERE @Id = f.Id

END
GO
