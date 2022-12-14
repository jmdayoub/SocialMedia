USE [C120_jdayoub_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_InsertBatch_V2]    Script Date: 10/30/2022 10:04:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[Friends_InsertBatch_V2]
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
		,@Id int OUTPUT

as

/*

	Declare @batchSkills dbo.SkillsTable

	Declare @Title nvarchar(120) = 'Joker'
		,@Bio nvarchar(700) = 'This is a friend V2 bio'
		,@Summary nvarchar(255) = 'This is a friend V2 summary'
		,@Headline nvarchar(80) = 'Headline V2'
		,@Slug nvarchar(100) = 'www.sluggerama.com'
		,@StatusId int = 1
		,@ImageTypeId int = 1
		,@ImageUrl nvarchar(300) ='https://tinyurl.com/3ud4fetj'
		,@UserId int = 1
		,@Id int = 0
		
	INSERT INTO @batchSkills (Name)
	VALUES ('PHP')
	INSERT INTO @batchSkills (Name)
	VALUES ('MongoDB')
	INSERT INTO @batchSkills (Name)
	VALUES ('Python')
		

	Execute dbo.Friends_InsertBatch_V2 @batchSkills
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
	From dbo.FriendsV2
	
	Select *
	From dbo.Images
	
	Select *
	From dbo.Skills

	Select *
	From dbo.FriendSkills

*/

BEGIN
	
	Declare @PrimaryImageId int

	INSERT INTO [dbo].[Images]
           ([TypeId]
		   ,[Url])

	VALUES (@ImageTypeId
			,@ImageUrl)

	Set @PrimaryImageId = SCOPE_IDENTITY()


	Declare @FriendId int

	INSERT INTO [dbo].[FriendsV2]
           ([Title]
           ,[Bio]
           ,[Summary]
           ,[Headline]
           ,[Slug]
           ,[StatusId]
		   ,[PrimaryImageId]
           ,[UserId])
	
     VALUES
           (@Title
           ,@Bio
           ,@Summary
           ,@Headline
           ,@Slug
           ,@StatusId
           ,@PrimaryImageId
           ,@UserId)

	Set @Id = SCOPE_IDENTITY() --FriendId of Friend we just inserted into FriendsV2


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
