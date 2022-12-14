USE [C120_jdayoub_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Jobs_Insert]    Script Date: 10/30/2022 10:04:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROC [dbo].[Jobs_Insert] @Title nvarchar(120)
	,@Description nvarchar(4000)
	,@Summary nvarchar(255)
	,@Pay nvarchar(120)
	,@Slug nvarchar(100)
	,@StatusId int
	,@TechCompanyId int
	,@UserId int
	,@Id int OUTPUT

AS

/*

	Declare @Id int;

	Declare @Title nvarchar(120) = 'Software Engineer'
			,@Description nvarchar(4000) = 'This is a description'
			,@Summary nvarchar(255) = 'This is a summary of the job'
			,@Pay nvarchar(120) = '$95,000'
			,@Slug nvarchar(100) = 'www.jobslug.com'
			,@StatusId int = 1
			,@TechCompanyId int = 51473
			,@UserId int = 1

	Execute dbo.Jobs_Insert
						@Title
						,@Description
						,@Summary
						,@Pay
						,@Slug
						,@StatusId
						,@TechCompanyId
						,@UserId
						,@Id OUTPUT

	Select @Id

	Select *
	From dbo.Jobs
	Where Id = @Id

*/
BEGIN

	INSERT INTO [dbo].[Jobs] (
		[Title]
		,[Description]
		,[Summary]
		,[Pay]
		,[Slug]
		,[StatusId]
		,[TechCompanyId]
		,[UserId]
		)

	VALUES (
		@Title
		,@Description
		,@Summary
		,@Pay
		,@Slug
		,@StatusId
		,@TechCompanyId
		,@UserId
		)

	SET @Id = SCOPE_IDENTITY()

END
GO
