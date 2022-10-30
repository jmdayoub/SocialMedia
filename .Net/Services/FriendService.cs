using Newtonsoft.Json;
using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain.Friends;
using Sabio.Models.Domain.Images;
using Sabio.Models.Domain.Skills;
using Sabio.Models.Domain.Users;
using Sabio.Models.Requests.Friends;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class FriendService : IFriendService
    {
        IDataProvider _data = null;
        /// This is used when we want to execute a SQL SELECT Statement. This is intended to bring
        /// back a dateset/grid/table, even though it may be a 1 row results

        public FriendService(IDataProvider data)
        {
            _data = data;
        }

        public Friend Get(int id)
        {
            Friend friend = null;

            string procName = "[dbo].[Friends_SelectById]";

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);

            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0; // THIS STARTING INDEX NEEDS TO BE DECLARED WITHIN EXECUTE CMD OR ELSE THE STARTING INDEX WILL NOT RESET TO ZERO WHICH NEEDS TO HAPPEN OR IT WILL BE LARGER THAN NUMBER OF FIELDS IN MAPPING FUNCTION

                friend = MapSingleFriend(reader, ref startingIndex);
            });
            return friend;
        }

        public List<Friend> GetAll()
        {
            List<Friend> list = null;

            string procName = "[dbo].[Friends_SelectAll]";

            _data.ExecuteCmd(procName, inputParamMapper: null
            , singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0; // THIS STARTING INDEX NEEDS TO BE DECLARED WITHIN EXECUTE CMD OR ELSE THE STARTING INDEX WILL NOT RESET TO ZERO WHICH NEEDS TO HAPPEN OR IT WILL BE LARGER THAN NUMBER OF FIELDS IN MAPPING FUNCTION

                Friend aFriend = MapSingleFriend(reader, ref startingIndex);

                if (list == null)
                {
                    list = new List<Friend>();
                }

                list.Add(aFriend);
            });
            return list;
        }

        public List<FriendV3> GetAllV3()
        {
            List<FriendV3> listV3 = null;

            string procName = "[dbo].[Friends_SelectAllV3]";

            _data.ExecuteCmd(procName, inputParamMapper: null
            , singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int index = 0;

                FriendV3 friendV3 = MapSingleFriendV3(reader, ref index);

                if (listV3 == null)
                {
                    listV3 = new List<FriendV3>();
                }

                listV3.Add(friendV3);
            });
            return listV3;
        }

        public void Delete(int id)
        {
            string procName = "[dbo].[Friends_Delete]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            },
            returnParameters: null);
        }

        public int Add(FriendAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[Friends_Insert]";

            _data.ExecuteNonQuery(procName
            , inputParamMapper: delegate (SqlParameterCollection col)
            {

                AddCommonParams(model, col);
                col.AddWithValue("@UserId", userId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);
            },
            returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;

                int.TryParse(oId.ToString(), out id);

                Console.WriteLine("");
            });
            return id;
        }

        public void Update(FriendUpdateRequest model, int userId)
        {
            string procName = "[dbo].[Friends_Update]";

            _data.ExecuteNonQuery(procName
            , inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@Id", model.Id);
                col.AddWithValue("@UserId", userId);
            },
            returnParameters: null);
        }        

        public Paged<Friend> Pagination(int pageIndex, int pageSize)
        {
            string procName = "dbo.Friends_Pagination";
            Paged<Friend> pagedList = null; // this is the item response in Postman?
            List<Friend> list = null; // this is the pagedItems in Postman
            int totalCount = 0;

            _data.ExecuteCmd(procName, (param) =>
            {
                param.AddWithValue("@PageIndex", pageIndex);
                param.AddWithValue("@PageSize", pageSize);
            },
            (reader, recordSetIndex) =>
            {
                int startingIndex = 0;

                Friend friend = MapSingleFriend(reader, ref startingIndex);

                totalCount = reader.GetSafeInt32(startingIndex); // don't need to increment, because it's the last property? in the mapper

                if (list == null)
                {
                    list = new List<Friend>();
                }

                list.Add(friend); // add each item in the response to the list(pagedItems)
            });
            if (list != null)
            {
                pagedList = new Paged<Friend>(list, pageIndex, pageSize, totalCount); //this is the item response in Postman
            }
            return pagedList;
        }

        public Paged<FriendV3> PaginationV3(int pageIndex, int pageSize)
        {
            string procName = "[dbo].[Friends_PaginationV3]";
            Paged<FriendV3> pagedList = null;
            List<FriendV3> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName, (param) =>
            {
                param.AddWithValue("@PageIndex", pageIndex);
                param.AddWithValue("@PageSize", pageSize);
            },
            (reader, recordSetIndex) =>
            {
                int startingIndex = 0;

                FriendV3 friendV3 = MapSingleFriendV3(reader, ref startingIndex);

                totalCount = reader.GetSafeInt32(startingIndex);

                if (list == null)
                {
                    list = new List<FriendV3>();
                }
                list.Add(friendV3);
            });
            if (list != null)
            {
                pagedList = new Paged<FriendV3>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<Friend> Search(int pageIndex, int pageSize, string query)
        {
            string procName = "[dbo].[Friends_Search_Pagination]";
            Paged<Friend> pagedList = null;
            List<Friend> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName, (param) =>
            {
                param.AddWithValue("@PageIndex", pageIndex);
                param.AddWithValue("@PageSize", pageSize);
                param.AddWithValue("@Query", query);
            },
            (reader, recordSetIndex) =>
            {
                int startingIndex = 0;

                Friend friend = MapSingleFriend(reader, ref startingIndex);

                totalCount = reader.GetSafeInt32(startingIndex);

                if (list == null)
                {
                    list = new List<Friend>();
                }

                list.Add(friend);
            });
            if (list != null)
            {
                pagedList = new Paged<Friend>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<FriendV3> SearchV3(int pageIndex, int pageSize, string query)
        {
            string procName = "[dbo].[Friends_Search_PaginationV3]";
            Paged<FriendV3> pagedList = null;
            List<FriendV3> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName, (param) =>
            {
                param.AddWithValue("@PageIndex", pageIndex);
                param.AddWithValue("@PageSize", pageSize);
                param.AddWithValue("@Query", query);
            },
            (reader, recordSetIndex) => // set represents number of selects we have; reader is reading back to us the data it receives from the DB and is checking for/expecting whatever type of data we dictate for each property
            {
                int startingIndex = 0;

                FriendV3 friend = MapSingleFriendV3(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex);
                }


                if (list == null)
                {
                    list = new List<FriendV3>();
                }

                list.Add(friend);
            });
            if (list != null)
            {
                pagedList = new Paged<FriendV3>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public FriendV3 GetV3(int id)
        {
            FriendV3 friendV3 = null;

            string procName = "[dbo].[Friends_SelectByIdV3]";

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);
            }, delegate (IDataReader reader, short set)
            {
                int index = 0;

                friendV3 = MapSingleFriendV3(reader, ref index);
            });
            return friendV3;
        }

        public int AddV3(FriendAddRequestV3 model, int userId)
        {
            int id = 0;
            DataTable dataTable = new DataTable();
            string procName = "[dbo].[Friends_InsertBatch_V2]";
            ForSkills(model, dataTable);

            _data.ExecuteNonQuery(procName
            , inputParamMapper: delegate (SqlParameterCollection col)
            {
                
                AddCommonParamsV3(model, col);
                col.AddWithValue("@batchSkills", dataTable);
                col.AddWithValue("@UserId", userId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                col.Add(idOut);
            },
            returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;

                int.TryParse(oId.ToString(), out id);

                Console.WriteLine("");
            });
            return id;
        }

        public void UpdateV3(FriendUpdateRequestV3 model, int userId)
        {
            string procName = "[dbo].[Friends_UpdateBatch_V2]";
            DataTable dataTable = new DataTable();
            ForSkills(model, dataTable);

            _data.ExecuteNonQuery(procName
            , inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParamsV3(model, col);
                col.AddWithValue("@batchSkills", dataTable);
                col.AddWithValue("@Id", model.Id);
                col.AddWithValue("@UserId", userId);
            },
            returnParameters: null);
        }

        public void DeleteV3(int id)
        {
            string procName = "[dbo].[Friends_DeleteV3]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            },
            returnParameters: null);
        }

        private static void ForSkills(FriendAddRequestV3 model, DataTable dataTable)
        {
            dataTable.Columns.Add("Name", typeof(string));

            if (model.Skills != null)
            {
                foreach (string skill in model.Skills)
                {
                    DataRow dataRow = dataTable.NewRow();
                    dataRow.SetField(0, skill);
                    dataTable.Rows.Add(dataRow);
                }
            }
        }

        private static FriendV3 MapSingleFriendV3(IDataReader reader, ref int index)
        {
            FriendV3 friendV3 = new FriendV3();

            friendV3.PrimaryImage = new Image();

            friendV3.Id = reader.GetSafeInt32(index++);
            friendV3.Title = reader.GetSafeString(index++);
            friendV3.Bio = reader.GetSafeString(index++);
            friendV3.Summary = reader.GetSafeString(index++);
            friendV3.Headline = reader.GetSafeString(index++);
            friendV3.Slug = reader.GetSafeString(index++);
            friendV3.StatusId = reader.GetSafeInt32(index++);
            friendV3.PrimaryImage.Id = reader.GetSafeInt32(index++);
            friendV3.PrimaryImage.ImageTypeId = reader.GetSafeInt32(index++);
            friendV3.PrimaryImage.ImageUrl = reader.GetSafeString(index++);
            friendV3.Skills = reader.DeserializeObject<List<Skill>>(index++);
            friendV3.UserId = reader.GetSafeInt32(index++);
            friendV3.DateCreated = reader.GetSafeDateTime(index++);
            friendV3.DateModified = reader.GetSafeDateTime(index++);
            return friendV3;

        }

        private static Friend MapSingleFriend(IDataReader reader, ref int startingIndex)
        {
            Friend aFriend = new Friend();

            aFriend.Id = reader.GetSafeInt32(startingIndex++);
            aFriend.Title = reader.GetSafeString(startingIndex++);
            aFriend.Bio = reader.GetSafeString(startingIndex++);
            aFriend.Summary = reader.GetSafeString(startingIndex++);
            aFriend.Headline = reader.GetSafeString(startingIndex++);
            aFriend.Slug = reader.GetSafeString(startingIndex++);
            aFriend.StatusId = reader.GetSafeInt32(startingIndex++);
            aFriend.PrimaryImageUrl = reader.GetSafeString(startingIndex++);
            aFriend.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aFriend.DateModified = reader.GetSafeDateTime(startingIndex++);
            aFriend.UserId = reader.GetSafeInt32(startingIndex++);
            return aFriend;
        }

        private static void AddCommonParams(FriendAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@Title", model.Title);
            col.AddWithValue("@Bio", model.Bio);
            col.AddWithValue("@Summary", model.Summary);
            col.AddWithValue("@Headline", model.Headline);
            col.AddWithValue("@Slug", model.Slug);
            col.AddWithValue("@StatusId", model.StatusId);
            col.AddWithValue("@PrimaryImageUrl", model.PrimaryImageUrl);
        }

        private static void AddCommonParamsV3(FriendAddRequestV3 model, SqlParameterCollection col)
        {

            col.AddWithValue("@Title", model.Title);
            col.AddWithValue("@Bio", model.Bio);
            col.AddWithValue("@Summary", model.Summary);
            col.AddWithValue("@Headline", model.Headline);
            col.AddWithValue("@Slug", model.Slug);
            col.AddWithValue("@StatusId", model.StatusId);
            col.AddWithValue("@ImageTypeId", model.ImageTypeId);
            col.AddWithValue("@ImageUrl", model.ImageUrl);            
        }
    }

}
