USE [C120_jdayoub_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_Insert]    Script Date: 10/30/2022 10:04:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[Friends_Insert]

		@Title nvarchar(120)
		,@Bio nvarchar(700)
		,@Summary nvarchar(255)
		,@Headline nvarchar(80)
		,@Slug nvarchar(100)
		,@StatusId int
		,@PrimaryImageUrl nvarchar(128)
		,@UserId int
		,@Id int OUTPUT
		

/*

	Declare @Id int = 0;

	Declare @Title nvarchar(120) = 'Jared'
		,@Bio nvarchar(700) = 'This is a friend bio'
		,@Summary nvarchar(255) = 'This is a friend summary'
		,@Headline nvarchar(80) = 'Headline'
		,@Slug nvarchar(100) = 'www.sluggeruski.com'
		,@StatusId int = 1
		,@PrimaryImageUrl nvarchar(128) = 'http://google.com'
		,@UserId int = 1
		

	Execute dbo.Friends_Insert
							@Title
							,@Bio
							,@Summary
							,@Headline
							,@Slug
							,@StatusId
							,@PrimaryImageUrl
							,@UserId
							,@Id OUTPUT

	Select @Id

	Select *
	From dbo.Friends
	Where Id = @Id

*/
as

BEGIN


	INSERT INTO [dbo].[Friends]
           ([Title]
           ,[Bio]
           ,[Summary]
           ,[Headline]
           ,[Slug]
           ,[StatusId]
           ,[PrimaryImageUrl]
		   ,[UserId])
           
     VALUES
           (@Title
           ,@Bio
           ,@Summary
           ,@Headline
           ,@Slug
           ,@StatusId
           ,@PrimaryImageUrl
		   ,@UserId)
           

	SET @Id = SCOPE_IDENTITY()

END
GO
