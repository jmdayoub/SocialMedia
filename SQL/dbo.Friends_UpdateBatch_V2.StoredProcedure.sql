USE [C120_jdayoub_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_UpdateBatch_V2]    Script Date: 10/30/2022 10:04:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE proc [dbo].[Friends_UpdateBatch_V2]
	@batchSkills dbo.SkillsTable READONLY
		,@Title nvarchar(120)
		,@Bio nvarchar(700)
		,@Summary nvarchar(255)
		,@Headline nvarchar(80)
		,@Slug nvarchar(100)
		,@StatusId int
		,@ImageTypeId int
		,@ImageUrl nvarchar(300)
		,@UserId int
		,@Id int

as

/*

	Declare @Id int = 5;

	Declare @batchSkills dbo.SkillsTable;

	Declare @Title nvarchar(120) = 'Barry Sanders'
		,@Bio nvarchar(700) = 'SQL is not fun'
		,@Summary nvarchar(255) = 'This is the summary'
		,@Headline nvarchar(80) = 'Do not forget to put where'
		,@Slug nvarchar(100) = 'www.sluginsta.com'
		,@StatusId int = 1
		,@ImageTypeId int = 1
		,@ImageUrl nvarchar(300) ='https://images.unsplash.com/photo-1625801821669-d11f0ede90cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTgwOTN8MHwxfHNlYXJjaHwxM3x8ZHJ1bXN8ZW58MHx8fHwxNjYyNjc0MjI4&ixlib=rb-1.2.1&q=80&w=1080'
		,@UserId int = 3

	INSERT INTO @batchSkills (Name)
	VALUES ('PHP')
	INSERT INTO @batchSkills (Name)
	VALUES ('MongoDB')
	INSERT INTO @batchSkills (Name)
	VALUES ('Python')


	Select *
	From dbo.FriendsV2 as f
	Where f.Id = @Id


	Select *
	From dbo.Images

	Select *
	From dbo.Skills

	Select *
	From dbo.FriendSkills

	Execute dbo.Friends_UpdateBatch_V2 @batchSkills
							,@Title
							,@Bio
							,@Summary
							,@Headline
							,@Slug
							,@StatusId
							,@ImageTypeId
							,@ImageUrl
							,@UserId
							,@Id

	Select *
	From dbo.FriendsV2 as f
	Where f.Id = @Id


	Select *
	From dbo.Images

	Select *
	From dbo.Skills

	Select *
	From dbo.FriendSkills

*/

BEGIN

	UPDATE dbo.Images
		SET [TypeId] = @ImageTypeId
			,[Url] = @ImageUrl
		FROM dbo.FriendsV2 as f inner join dbo.Images as i
				on i.Id = f.PrimaryImageId
		WHERE f.Id = @Id
	
	UPDATE [dbo].[FriendsV2]
		SET [Title] = @Title
			,[Bio] = @Bio
			,[Summary] = @Summary
			,[Headline] = @Headline
			,[Slug] = @Slug
			,[StatusId] = @StatusId
			,[UserId] = @UserId
			,[DateModified] = getutcdate()
		WHERE Id = @Id

	DELETE FROM dbo.FriendSkills
		WHERE FriendId = @Id

	INSERT INTO dbo.Skills ([Name])

	SELECT bs.Name
	FROM @batchSkills as bs
	Where Not Exists (Select 1
					  FROM dbo.Skills as s
					  WHERE bs.Name = s.Name)


	INSERT INTO dbo.FriendSkills
					([FriendId]
					,[SkillId])
	SELECT @Id
			,s.Id

	FROM dbo.Skills as s
	WHERE EXISTS (Select 1
				  FROM @batchSkills as bs
				  WHERE s.Name = bs.Name)

END
GO
