USE [C120_jdayoub_gmail]
GO
/****** Object:  StoredProcedure [dbo].[TechCompanies_Insert]    Script Date: 10/30/2022 10:04:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[TechCompanies_Insert] @Name nvarchar(120)
									 ,@Profile nvarchar(4000)
									 ,@Summary nvarchar(255)
									 ,@Headline nvarchar(120)
									 ,@ContactInformation nvarchar(100)
									 ,@Slug nvarchar(100)
									 ,@StatusId int
									 ,@ImageTypeId int
									 ,@ImageUrl nvarchar(500)
									 ,@UserId int
									 ,@Id int OUTPUT

as

/*
	
	Declare @Id int;

	Declare @Name nvarchar(120) = 'Meta'
			,@Profile nvarchar(4000) = 'Meta profile'
			,@Summary nvarchar(255) = 'This is the Meta profile'
			,@Headline nvarchar(120) = 'This is the headline'
			,@ContactInformation nvarchar(100) = 'jd@facebook.com'
			,@Slug nvarchar(100) = 'www.meta.com'
			,@StatusId int = 1
			,@ImageTypeId int = 3
			,@ImageUrl nvarchar(500) = 'https://images.unsplash.com/photo-1648384140606-800633cc45f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTgwOTN8MHwxfHNlYXJjaHw4fHxtZXRhJTIwZmFjZWJvb2t8ZW58MHx8fHwxNjYxODk1MDAw&ixlib=rb-1.2.1&q=80&w=1080'
			,@UserId int = 1

	Execute dbo.TechCompanies_Insert
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
									,@Id OUTPUT

	Select @Id

	Select *
	From dbo.TechCompanies
	Where Id = @Id

*/

BEGIN

	INSERT INTO [dbo].[TechCompanies]
           ([Name]
           ,[Profile]
           ,[Summary]
           ,[Headline]
           ,[ContactInformation]
           ,[Slug]
           ,[StatusId]
           ,[ImageTypeId]
           ,[ImageUrl]
		   ,[UserId])

     VALUES
           (@Name
           ,@Profile
           ,@Summary
           ,@Headline
           ,@ContactInformation
           ,@Slug
           ,@StatusId
           ,@ImageTypeId
           ,@ImageUrl
           ,@UserId)

	SET @Id = SCOPE_IDENTITY()

END
GO
