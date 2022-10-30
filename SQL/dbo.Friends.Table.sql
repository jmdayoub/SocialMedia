USE [C120_jdayoub_gmail]
GO
/****** Object:  Table [dbo].[Friends]    Script Date: 10/30/2022 10:14:01 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Friends](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](120) NOT NULL,
	[Bio] [nvarchar](700) NOT NULL,
	[Summary] [nvarchar](255) NOT NULL,
	[Headline] [nvarchar](80) NOT NULL,
	[Slug] [nvarchar](100) NOT NULL,
	[StatusId] [int] NOT NULL,
	[PrimaryImageUrl] [nvarchar](128) NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
	[UserId] [int] NOT NULL,
 CONSTRAINT [PK_Friends] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Friends] ADD  CONSTRAINT [DF_Friends_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[Friends] ADD  CONSTRAINT [DF_Friends_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
