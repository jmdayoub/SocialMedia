USE [C120_jdayoub_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Jobs_InsertBatch]    Script Date: 10/30/2022 10:04:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE proc [dbo].[Jobs_InsertBatch]
		@batchSkills dbo.SkillsTable READONLY
		,@Title nvarchar(120)
		,@Description nvarchar(4000)
		,@Summary nvarchar(255)
		,@Pay nvarchar(120)
		,@Slug nvarchar(100)
		,@StatusId int
		,@TechCompanyId int
		,@UserId int
		,@Id int OUTPUT
as

/*

	Declare @batchSkills dbo.SkillsTable

	Declare @Title nvarchar(120) = 'Quality Assurance Software Engineer'
		,@Description nvarchar(4000) = 'Ensuring quality of software production'
		,@Summary nvarchar(255) = 'Summary of QA Software Engineering position'
		,@Pay nvarchar(120) = '$250,000'
		,@Slug nvarchar(100) = 'www.qa.com'
		,@StatusId int = 1
		,@TechCompanyId int = 50170
		,@UserId int = 1
		,@Id int
		
	INSERT INTO @batchSkills (Name)
	VALUES ('Front-End Development')
	INSERT INTO @batchSkills (Name)
	VALUES ('Angular')
	INSERT INTO @batchSkills (Name)
	VALUES ('Vue')
		

	Execute dbo.Jobs_InsertBatch @batchSkills
								,@Title
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
	
	Select *
	From dbo.Skills

	Select *
	From dbo.JobSkills

*/

BEGIN


	Declare @JobId int

	INSERT INTO [dbo].[Jobs]
           ([Title]
           ,[Description]
           ,[Summary]
           ,[Pay]
           ,[Slug]
           ,[StatusId]
		   ,[TechCompanyId]
           ,[UserId])
	
     VALUES
           (@Title
           ,@Description
           ,@Summary
           ,@Pay
           ,@Slug
           ,@StatusId
		   ,@TechCompanyId
           ,@UserId)

	Set @Id = SCOPE_IDENTITY()

	
	Declare @SkillId int

	INSERT INTO dbo.Skills ([Name])

	SELECT bs.Name
	FROM @batchSkills as bs
	Where Not Exists (Select 1
					  FROM dbo.Skills as s
					  WHERE bs.Name = s.Name)

	Set @SkillId = SCOPE_IDENTITY()


	INSERT INTO dbo.JobSkills
					([JobId]
					,[SkillId])

	SELECT @Id
			,s.Id

	FROM dbo.Skills as s
	WHERE EXISTS (Select 1
				  FROM @batchSkills as bs
				  WHERE s.Name = bs.Name)

END
GO
