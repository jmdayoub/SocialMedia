using Sabio.Data.Providers;
using Sabio.Data;
using Sabio.Models;
using Sabio.Models.Domain.Events;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Domain.Jobs;
using Sabio.Models.Requests.Events;
using Sabio.Models.Requests.TechCompanies;

namespace Sabio.Services
{
    public class EventService : IEventService
    {
        IDataProvider _data = null;

        public EventService(IDataProvider data)
        {
            _data = data;
        }

        #region PAGINATION
        public Paged<Event> Pagination(int pageIndex, int pageSize)
        {
            string procName = "[dbo].[Events_Pagination]";
            Paged<Event> pagedList = null;
            List<Event> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName, (param) =>
            {
                param.AddWithValue("@PageIndex", pageIndex);
                param.AddWithValue("@PageSize", pageSize);
            }, (reader, recordSetIndex) =>
            {
                int index = 0;

                Event _event = MapSingleEvent(reader, ref index);

                totalCount = reader.GetSafeInt32(index);

                if (list == null)
                {
                    list = new List<Event>();
                }
                list.Add(_event);
            });
            if (list != null)
            {
                pagedList = new Paged<Event>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        #endregion

        #region SEARCH BY DATE
        public Paged<Event> SearchByDate(int pageIndex, int pageSize, DateTime dateStart, DateTime dateEnd)
        {
            string procName = "dbo.Events_SearchByDate_Pagination";
            Paged<Event> pagedList = null;
            List<Event> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName, (param) =>
            {
                param.AddWithValue("@PageIndex", pageIndex);
                param.AddWithValue("@PageSize", pageSize);
                param.AddWithValue("@DateStart", dateStart);
                param.AddWithValue("@DateEnd", dateEnd);
            },
            (reader, recordSetIndex) =>
            {
                int startingIndex = 0;

                Event _event = MapSingleEvent(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex);
                }

                if (list == null)
                {
                    list = new List<Event>();
                }
                list.Add(_event);
            });
            if (list != null)
            {
                pagedList = new Paged<Event>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        #endregion

        #region SEARCH BY GEO
        public List<Event> SearchByGeo(double lat, double lng, int distance)
        {
            List<Event> list = null;
            string procName = "dbo.Events_SearchByGeo";

            _data.ExecuteCmd(procName, (param) =>
            {
                param.AddWithValue("@lat", lat);
                param.AddWithValue("@lng", lng);
                param.AddWithValue("@distance", distance);
            }, delegate (IDataReader reader, short set)
            {
                int index = 0;

                Event _event = MapSingleEvent(reader, ref index);

                if(list == null)
                {
                    list = new List<Event>();
                }
                list.Add(_event);

            });
            return list;
        }
        #endregion

        

        #region ADD / UPDATE EVENT
        public int Add(EventAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[Events_Insert]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@UserId", userId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                col.Add(idOut);
            }, returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;

                int.TryParse(oId.ToString(), out id);

                Console.WriteLine("");
            });
            return id;
        }

        public void Update(EventUpdateRequest model, int userId)
        {
            string procName = "dbo.Events_Update";

            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@Id", model.Id);
                col.AddWithValue("@UserId", userId);
            }, returnParameters: null);
        }
        #endregion


        //private static Event MapForGeo(IDataReader reader, ref int index)
        //{
        //    Event _event = new Event();

        //    _event.Id = reader.GetSafeInt32
        //}
        private static Event MapSingleEvent(IDataReader reader, ref int index) // USED FOR SELECTS/GETS
        {
            Event _event = new Event();

            _event.Id = reader.GetSafeInt32(index++);
            _event.DateStart = reader.GetSafeDateTime(index++);
            _event.DateEnd = reader.GetSafeDateTime(index++);
            _event.Latitude = reader.GetSafeDouble(index++);
            _event.Longitude = reader.GetSafeDouble(index++);
            _event.ZipCode = reader.GetSafeString(index++);
            _event.Address = reader.GetSafeString(index++);
            _event.Name = reader.GetSafeString(index++);
            _event.Headline = reader.GetSafeString(index++);
            _event.Description = reader.GetSafeString(index++);
            _event.Summary = reader.GetSafeString(index++);
            _event.Slug = reader.GetSafeString(index++);
            _event.StatusId = reader.GetSafeInt32(index++);
            _event.UserId = reader.GetSafeInt32(index++);
            _event.DateCreated = reader.GetSafeDateTime(index++);
            _event.DateModified = reader.GetSafeDateTime(index++);

            return _event;
        }

        private static void AddCommonParams(EventAddRequest model, SqlParameterCollection col) // USED FOR REQUESTS/POSTs/PUTs
        {
            col.AddWithValue("@DateStart", model.DateStart);
            col.AddWithValue("@DateEnd", model.DateEnd);
            col.AddWithValue("@Latitude", model.Latitude);
            col.AddWithValue("@Longitude", model.Longitude);
            col.AddWithValue("@ZipCode", model.ZipCode);
            col.AddWithValue("@Address", model.Address);
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Headline", model.Headline);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@Summary", model.Summary);
            col.AddWithValue("@Slug", model.Slug);
            col.AddWithValue("@StatusId", model.StatusId);
        }
    }
}
