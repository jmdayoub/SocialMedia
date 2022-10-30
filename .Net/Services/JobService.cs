using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain.Jobs;
using Sabio.Models.Domain.Skills;
using Sabio.Models.Domain.TechCompanies;
using Sabio.Models.Requests.Friends;
using Sabio.Models.Requests.Jobs;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class JobService : IJobService
    {
        IDataProvider _data = null;

        public JobService(IDataProvider data)
        {
            _data = data;
        }

        #region GETS/SELECTS
        public Job Get(int id)
        {
            Job job = null;
            string procName = "dbo.Jobs_SelectById";

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            }, delegate (IDataReader reader, short set)
            {
                int index = 0;

                job = MapSingleJob(reader, ref index);
            });
            return job;

        }

        public List<Job> GetAll()
        {
            List<Job> list = null;

            string procName = "dbo.Jobs_SelectAll";

            _data.ExecuteCmd(procName, inputParamMapper: null
            , singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int index = 0;

                Job job = MapSingleJob(reader, ref index);

                if (list == null)
                {
                    list = new List<Job>();
                }

                list.Add(job);
            });
            return list;
        }
        #endregion

        #region PAGINATION / SEARCH
        public Paged<Job> Pagination(int pageIndex, int pageSize)
        {
            string procName = "dbo.Jobs_Pagination";
            Paged<Job> pagedList = null;
            List<Job> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName, (param) =>
            {
                param.AddWithValue("@PageIndex", pageIndex);
                param.AddWithValue("@PageSize", pageSize);
            },
            (reader, recordSetIndex) =>
            {
                int index = 0;

                Job job = MapSingleJob(reader, ref index);

                totalCount = reader.GetSafeInt32(index);

                if (list == null)
                {
                    list = new List<Job>();
                }
                list.Add(job);
            });
            if (list != null)
            {
                pagedList = new Paged<Job>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<Job> Search(int pageIndex, int pageSize, string query)
        {
            string procName = "dbo.Jobs_Search_Pagination";
            Paged<Job> pagedList = null;
            List<Job> list = null;
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

                Job job = MapSingleJob(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex);
                }

                if (list == null)
                {
                    list = new List<Job>();
                }
                list.Add(job);
            });
            if (list != null)
            {
                pagedList = new Paged<Job>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        #endregion

        #region ADD / UPDATE
        public int Add(JobAddRequest model, int userId)
        {
            int id = 0;
            DataTable dataTable = new DataTable();
            string procName = "[dbo].[Jobs_InsertBatch]";
            ForSkills(model, dataTable);

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@batchSkills", dataTable);
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

        public void Update(JobUpdateRequest model, int userId)
        {
            string procName = "dbo.Jobs_UpdateBatch";
            DataTable dataTable = new DataTable();
            ForSkills(model, dataTable);

            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@batchSkills", dataTable);
                col.AddWithValue("@Id", model.Id);
                col.AddWithValue("@UserId", userId);
            }, returnParameters: null);
        }
        #endregion

        #region DELETE JOB
        public void Delete(int id)
        {
            string procName = "dbo.Jobs_Delete";

            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            }, returnParameters: null);
        }
        #endregion

        private static void ForSkills(JobAddRequest model, DataTable dataTable)
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
        private static Job MapSingleJob(IDataReader reader, ref int index)
        {
            Job job = new Job();

            job.Id = reader.GetSafeInt32(index++);
            job.Title = reader.GetSafeString(index++);
            job.Description = reader.GetSafeString(index++);
            job.Summary = reader.GetSafeString(index++);
            job.Pay = reader.GetSafeString(index++);
            job.Slug = reader.GetSafeString(index++);
            job.StatusId = reader.GetSafeInt32(index++);
            job.Skills = reader.DeserializeObject<List<Skill>>(index++);
            job.TechCompany = reader.DeserializeObject<List<TechCompany>>(index++);
            job.UserId = reader.GetSafeInt32(index++);
            job.DateCreated = reader.GetSafeDateTime(index++);
            job.DateModified = reader.GetSafeDateTime(index++);
            return job;
        }

        private static void AddCommonParams(JobAddRequest model, SqlParameterCollection col) // ONLY PUT THE USER-ENTERED PARAMs IN HERE
        {
            col.AddWithValue("@Title", model.Title);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@Summary", model.Summary);
            col.AddWithValue("@Pay", model.Pay);
            col.AddWithValue("@Slug", model.Slug);
            col.AddWithValue("@StatusId", model.StatusId);
            col.AddWithValue("@TechCompanyId", model.TechCompanyId);
        }

    }
}
