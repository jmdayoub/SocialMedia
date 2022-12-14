USE [C120_jdayoub_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Events_SearchByGeo]    Script Date: 10/30/2022 10:04:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[Events_SearchByGeo]
		@lat float
		,@lng float
		,@distance int
as


/*

	Declare @lat float = 34.10
			,@lng float = -118.30
			,@distance int = 10

	Execute [dbo].[Events_SearchByGeo] 
									@lat
									,@lng
									,@distance

	Select *
	FROM dbo.Events
*/

BEGIN

    ;with AllRecords as (
        SELECT *
              ,( 3959 * acos( cos( radians(@lat) ) * cos( radians( e.Latitude ) ) * cos( radians( e.Longitude ) - radians(@lng) ) + sin( radians(@lat) ) * sin( radians(e.Latitude) ) ) ) AS distance
        FROM [dbo].[Events] as e

    )
    , filteredRecords as (
        Select  *
        From    AllRecords
        Where   distance < @distance
    )
    SELECT
			  [filteredRecords].Id
			  ,[filteredRecords].[DateStart]
              ,[filteredRecords].[DateEnd]
			  ,filteredRecords.Latitude
			  ,filteredRecords.Longitude
			  ,[filteredRecords].[ZipCode]
			  ,[filteredRecords].[Address]
              ,[filteredRecords].[Name]
              ,[filteredRecords].[Headline]
			  ,[filteredRecords].[Description]
              ,[filteredRecords].Summary
			  ,[filteredRecords].Slug
			  ,[filteredRecords].StatusId
			  ,[filteredRecords].UserId
			  ,[filteredRecords].DateCreated
			  ,[filteredRecords].DateModified         
			  
              ,[distance]
    FROM filteredRecords
    ORDER BY distance;

END
GO
