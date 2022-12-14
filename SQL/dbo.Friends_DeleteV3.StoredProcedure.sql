USE [C120_jdayoub_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_DeleteV3]    Script Date: 10/30/2022 10:04:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE proc [dbo].[Friends_DeleteV3]
		@Id int

as
/*
	
	Declare @Id int = 7;

	Select *
	From dbo.FriendsV2
	WHERE Id = @Id;

	Execute dbo.Friends_DeleteV3 @Id

	Select *
	From dbo.Friends
	WHERE Id = @Id;

*/

BEGIN
	
	DELETE FROM [dbo].[FriendSkills]
	WHERE FriendId = @Id;

	DELETE FROM [dbo].[FriendsV2]
    WHERE Id = @Id;

END

	
GO
