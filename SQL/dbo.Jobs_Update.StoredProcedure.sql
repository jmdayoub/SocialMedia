USE [C120_jdayoub_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Jobs_Update]    Script Date: 10/30/2022 10:04:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[Jobs_Update]
		@Title nvarchar(120)
		,@Description nvarchar(4000)
		,@Summary nvarchar(255)
		,@Pay nvarchar(120)
		,@Slug nvarchar(100)
		,@StatusId int
		,@TechCompanyId int
		,@UserId int
		,@Id int

as

/*

	Declare @Id int = 2;

	Declare @Title nvarchar(120) = 'Software Developer'
			,@Description nvarchar(4000) = 'Software Developer Description'
			,@Summary nvarchar(255) = 'This is a summary of the job'
			,@Pay nvarchar(120) = '$90,000'
			,@Slug nvarchar(100) = 'www.job2slug.com'
			,@StatusId int = 1
			,@TechCompanyId int = 51473
			,@UserId int = 1

	Select *
	From dbo.Jobs
	Where Id = @Id

	Execute dbo.Jobs_Update
						@Title
						,@Description
						,@Summary
						,@Pay
						,@Slug
						,@StatusId
						,@TechCompanyId
						,@UserId
						,@Id

	Select *
	From dbo.Jobs
	Where Id = @Id

*/


BEGIN

	UPDATE [dbo].[Jobs]
		SET [Title] = @Title
			,[Description] = @Description
			,[Summary] = @Summary
			,[Pay] = @Pay
			,[Slug] = @Slug
			,[StatusId] = @StatusId
			,[TechCompanyId] = @TechCompanyId
			,[UserId] = @UserId
			,[DateModified] = GETUTCDATE()

	 WHERE Id = @Id

END
GO
