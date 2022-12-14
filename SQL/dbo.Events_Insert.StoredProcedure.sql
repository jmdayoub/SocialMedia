USE [C120_jdayoub_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Events_Insert]    Script Date: 10/30/2022 10:04:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[Events_Insert]
		@DateStart datetime2(7)
		,@DateEnd datetime2(7)
		,@Latitude float
		,@Longitude float
		,@ZipCode nvarchar(10)
		,@Address nvarchar(120)
		,@Name nvarchar(25)
		,@Headline nvarchar(50)
		,@Description nvarchar(4000)
		,@Summary nvarchar(255)
		,@Slug nvarchar(100)
		,@StatusId int
		,@UserId int
		,@Id int OUTPUT


as

/*

	Declare @Id int;

	Declare	@DateStart datetime2(7) = '2022-12-01'
			,@DateEnd datetime2(7) = '2022-12-01'
			,@Latitude float = 34.11
			,@Longitude float = -118.29
			,@ZipCode nvarchar(10) = '90027'
			,@Address nvarchar(120) = '2700 N Vermont Ave'
			,@Name nvarchar(25) = 'The Greek Theatre'
			,@Headline nvarchar(50) = 'Concert at the Greek'
			,@Description nvarchar(4000) = 'Greek Theatre Description'
			,@Summary nvarchar(255) = 'Concert Summary'
			,@Slug nvarchar(100) = 'www.greektheatre.com'
			,@StatusId int = 1
			,@UserId int = 1

	Execute dbo.Events_Insert
								@DateStart 
								,@DateEnd
								,@Latitude
								,@Longitude
								,@ZipCode
								,@Address
								,@Name
								,@Headline
								,@Description
								,@Summary
								,@Slug
								,@StatusId
								,@UserId
								,@Id OUTPUT

	Select @Id

	Select *
	From dbo.Events
	Where Id = @Id

*/

BEGIN

	INSERT INTO [dbo].[Events]
           ([DateStart]
           ,[DateEnd]
           ,[Latitude]
           ,[Longitude]
           ,[ZipCode]
           ,[Address]
           ,[Name]
           ,[Headline]
           ,[Description]
           ,[Summary]
           ,[Slug]
           ,[StatusId]
           ,[UserId])

     VALUES
           (@DateStart
           ,@DateEnd
           ,@Latitude
           ,@Longitude
           ,@ZipCode
           ,@Address
           ,@Name
           ,@Headline
           ,@Description
           ,@Summary
           ,@Slug
           ,@StatusId
           ,@UserId)

	SET @Id = SCOPE_IDENTITY()

END
GO
