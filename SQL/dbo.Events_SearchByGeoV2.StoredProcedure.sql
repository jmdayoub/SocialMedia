USE [C120_jdayoub_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Events_SearchByGeoV2]    Script Date: 10/30/2022 10:04:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[Events_SearchByGeoV2]
		@Latitude float 
		,@Longitude float
		,@distance int
as

/*
	
	
	declare @Latitude float = 34.10805, @Longitude float = -118.30007;
	declare @distance int = 16000;

	Execute [dbo].[Events_SearchByGeoV2] 
									@Latitude
									,@Longitude								
									,@distance

	Select *
	FROM dbo.Events

*/

BEGIN
	Declare @point geography = geography::Point(@Latitude, @Longitude, 4326);

	WITH distance as (SELECT distance = @point.STDistance(geography::Point(e.Latitude, e.Longitude, 4326))
					  FROM [dbo].[Events] as e)
						
	--SELECT *
	--FROM [dbo].[Events]

	Select *
	From distance

END
GO
