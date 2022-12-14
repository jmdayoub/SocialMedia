USE [C120_jdayoub_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Events_Update]    Script Date: 10/30/2022 10:04:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[Events_Update]
		@DateStart datetime2(7)
		,@DateEnd datetime2(7)
		,@Latitude float
		,@Longitude float
		,@ZipCode nvarchar(10)
		,@Address nvarchar(120)
		,@Name nvarchar(25)
		,@Headline nvarchar(250)
		,@Description nvarchar(4000)
		,@Summary nvarchar(255)
		,@Slug nvarchar(100)
		,@StatusId int
		,@UserId int
		,@Id int

as

/*

	Declare @Id int = 3;

	Declare @DateStart datetime2(7) = '2022-12-02'
			,@DateEnd datetime2(7) = '2022-12-02'
			,@Latitude float = 34.11
			,@Longitude float = -118.29
			,@ZipCode nvarchar(10) = '90027'
			,@Address nvarchar(120) = '2700 N Vermont Ave'
			,@Name nvarchar(25) = 'The Greek Theatre'
			,@Headline nvarchar(250) = 'Concert at the Greek'
			,@Description nvarchar(4000) = 'Greek Theatre Description'
			,@Summary nvarchar(255) = 'Concert Summary'
			,@Slug nvarchar(100) = 'www.greektheatre.com'
			,@StatusId int = 1
			,@UserId int = 1

	Execute dbo.Events_Update
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
								,@Id

	Select *
	FROM dbo.Events
	Where Id = @Id

*/

BEGIN

	UPDATE [dbo].[Events]

	SET [DateStart] = @DateStart
		,[DateEnd] = @DateEnd
		,[Latitude] = @Latitude
		,[Longitude] = @Longitude
		,[ZipCode] = @ZipCode
		,[Address] = @Address
		,[Name] = @Name
		,[Headline] = @Headline
		,[Description] = @Description
		,[Summary] = @Summary
		,[Slug] = @Slug
		,[StatusId] = @StatusId
		,[UserId] = @UserId
		,[DateModified] = GETUTCDATE()

	WHERE Id = @Id

END
GO
