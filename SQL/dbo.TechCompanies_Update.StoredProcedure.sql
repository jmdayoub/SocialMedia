USE [C120_jdayoub_gmail]
GO
/****** Object:  StoredProcedure [dbo].[TechCompanies_Update]    Script Date: 10/30/2022 10:04:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[TechCompanies_Update]
			@Name nvarchar(120)
			,@Profile nvarchar(4000)
			,@Summary nvarchar(255)
			,@Headline nvarchar(120)
			,@ContactInformation nvarchar(100)
			,@Slug nvarchar(100)
			,@StatusId int
			,@ImageTypeId int
			,@ImageUrl nvarchar(500)
			,@UserId int
			,@Id int

as

/*
	
	Declare @Id int = 8;

	Declare @Name nvarchar(120) = 'Meta'
			,@Profile nvarchar(4000) = 'Meta profile'
			,@Summary nvarchar(255) = 'Meta Summary'
			,@Headline nvarchar(120) = 'Meta headline'
			,@ContactInformation nvarchar(100) = 'mz@facebook.com'
			,@Slug nvarchar(100) = 'www.meta.com'
			,@StatusId int = 1
			,@ImageTypeId int = 3
			,@ImageUrl nvarchar(500) = 'https://images.unsplash.com/photo-1648384140606-800633cc45f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTgwOTN8MHwxfHNlYXJjaHw4fHxtZXRhJTIwZmFjZWJvb2t8ZW58MHx8fHwxNjYxODk1MDAw&ixlib=rb-1.2.1&q=80&w=1080'
			,@UserId int = 1

	Execute dbo.TechCompanies_Update
									@Name 
									,@Profile
									,@Summary
									,@Headline
									,@ContactInformation 
									,@Slug
									,@StatusId 
									,@ImageTypeId 
									,@ImageUrl
									,@UserId 
									,@Id

	Select *
	FROM dbo.TechCompanies
	WHERE Id = @Id
								

*/

BEGIN

	UPDATE [dbo].[TechCompanies]

	SET [Name] = @Name
		,[Profile] = @Profile
		,[Summary] = @Summary
		,[Headline] = @Headline
		,[ContactInformation] = @ContactInformation
		,[Slug] = @Slug
		,[StatusId] = @StatusId
		,[ImageTypeId] = @ImageTypeId
		,[ImageUrl] = @ImageUrl
		,[UserId] = @UserId
		,[DateModified] = GETUTCDATE()

	 WHERE Id = @Id

END
GO
