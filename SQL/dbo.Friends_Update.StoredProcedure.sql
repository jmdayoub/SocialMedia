USE [C120_jdayoub_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_Update]    Script Date: 10/30/2022 10:04:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[Friends_Update]

	@Title nvarchar(120)
		,@Bio nvarchar(700)
		,@Summary nvarchar(255)
		,@Headline nvarchar(80)
		,@Slug nvarchar(100)
		,@StatusId int
		,@PrimaryImageUrl nvarchar(128)
		,@UserId int
		,@Id int

as

/*

	Declare @Id int = 29;

	Declare @Title nvarchar(120) = 'Johnny'
		,@Bio nvarchar(700) = 'Led Zeppelins drummer'
		,@Summary nvarchar(255) = 'John Bonham was Led Zeppelins drummer from 1962 to 1980'
		,@Headline nvarchar(80) = 'One of the best drummers ever'
		,@Slug nvarchar(100) = 'www.drums.com'
		,@StatusId int = 1
		,@PrimaryImageUrl nvarchar(128) = 'https://google.com'
		,@UserId int = 3

	Select *
	From dbo.Friends
	Where Id = @Id

	Execute dbo.Friends_Update
							@Title
							,@Bio
							,@Summary
							,@Headline
							,@Slug
							,@StatusId
							,@PrimaryImageUrl
							,@UserId
							,@Id

	Select *
	From dbo.Friends
	Where Id = @Id

*/

BEGIN

	UPDATE [dbo].[Friends]
		SET [Title] = @Title
			,[Bio] = @Bio
			,[Summary] = @Summary
			,[Headline] = @Headline
			,[Slug] = @Slug
			,[StatusId] = @StatusId
			,[PrimaryImageUrl] = @PrimaryImageUrl
			,[UserId] = @UserId
			,[DateModified] = getutcdate()
			
	 WHERE Id = @Id

END
GO
