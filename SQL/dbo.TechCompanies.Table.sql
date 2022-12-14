USE [C120_jdayoub_gmail]
GO
/****** Object:  Table [dbo].[TechCompanies]    Script Date: 10/30/2022 10:14:01 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TechCompanies](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](120) NOT NULL,
	[Profile] [nvarchar](4000) NOT NULL,
	[Summary] [nvarchar](255) NOT NULL,
	[Headline] [nvarchar](120) NOT NULL,
	[ContactInformation] [nvarchar](100) NOT NULL,
	[Slug] [nvarchar](100) NOT NULL,
	[StatusId] [int] NOT NULL,
	[ImageTypeId] [int] NOT NULL,
	[ImageUrl] [nvarchar](500) NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
	[UserId] [int] NOT NULL,
 CONSTRAINT [PK_TechCompanies] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[TechCompanies] ADD  CONSTRAINT [DF_TechCompanies_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[TechCompanies] ADD  CONSTRAINT [DF_TechCompanies_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'getutcdate()' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TechCompanies', @level2type=N'COLUMN',@level2name=N'DateCreated'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'getutcdate()' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TechCompanies', @level2type=N'COLUMN',@level2name=N'DateModified'
GO
