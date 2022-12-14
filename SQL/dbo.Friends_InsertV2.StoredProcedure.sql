USE [C120_jdayoub_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_InsertV2]    Script Date: 10/30/2022 10:04:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[Friends_InsertV2]

		@Title nvarchar(120)
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

	Declare @Id int = 0;

	Declare @Title nvarchar(120) = 'Joker'
		,@Bio nvarchar(700) = 'This is a friend V2 bio'
		,@Summary nvarchar(255) = 'This is a friend V2 summary'
		,@Headline nvarchar(80) = 'Headline V2'
		,@Slug nvarchar(100) = 'www.sluggerama.com'
		,@StatusId int = 1
		,@ImageTypeId int = 1
		,@ImageUrl nvarchar(300) ='https://tinyurl.com/3ud4fetj'
		,@UserId int = 1
		
		

	Execute dbo.Friends_InsertV2
							@Title
							,@Bio
							,@Summary
							,@Headline
							,@Slug
							,@StatusId
							,@ImageTypeId
							,@ImageUrl
							,@UserId
							,@Id OUTPUT
							

	Select @Id

	Select *
	From dbo.FriendsV2
	Where Id = @Id

	Select *
	From dbo.Images

*/

BEGIN

	Declare @PrimaryImageId int

	INSERT INTO [dbo].[Images]
           ([TypeId]
		   ,[Url])

	VALUES (@ImageTypeId
			,@ImageUrl)

	SET @PrimaryImageId = SCOPE_IDENTITY()

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

           

	SET @Id = SCOPE_IDENTITY()

END
GO
