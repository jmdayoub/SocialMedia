using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain.Jobs;
using Sabio.Models.Domain.TechCompanies;
using Sabio.Models.Requests.Jobs;
using Sabio.Models.Requests.TechCompanies;
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
    public class TechCompanyService : ITechCompanyService
    {
        IDataProvider _data = null;

        public TechCompanyService(IDataProvider data)
        {
            _data = data;
        }

        #region GET BY ID
        public TechCompany Get(int id)
        {
            TechCompany company = null;
            string procName = "dbo.TechCompanies_SelectById";

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            }, delegate (IDataReader reader, short set)
            {
                int index = 0;

                company = MapSingleCompany(reader, ref index);
            });
            return company;

        }
        #endregion

        #region PAGINATION
        public Paged<TechCompany> Pagination(int pageIndex, int pageSize)
        {
            string procName = "[dbo].[TechCompanies_Pagination]";
            Paged<TechCompany> pagedList = null;
            List<TechCompany> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName, (param) =>
            {
                param.AddWithValue("@PageIndex", pageIndex);
                param.AddWithValue("@PageSize", pageSize);
            }, (reader, recordSetIndex) =>
            {
                int index = 0;

                TechCompany company = MapSingleCompany(reader, ref index);

                totalCount = reader.GetSafeInt32(index);

                if (list == null)
                {
                    list = new List<TechCompany>();
                }
                list.Add(company);
            });
            if(list != null)
            {
                pagedList = new Paged<TechCompany>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        #endregion

        #region ADD / UPDATE

        public int Add(TechCompanyAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[TechCompanies_Insert]";

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

        public void Update(TechCompanyUpdateRequest model, int userId)
        {
            string procName = "dbo.TechCompanies_Update";

            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@Id", model.Id);
                col.AddWithValue("@UserId", userId);
            }, returnParameters: null);
        }
        #endregion

        private static TechCompany MapSingleCompany(IDataReader reader, ref int index)
        {
            TechCompany company = new TechCompany();

            company.Id = reader.GetSafeInt32(index++);
            company.Name = reader.GetSafeString(index++);
            company.Profile = reader.GetSafeString(index++);
            company.Summary = reader.GetSafeString(index++);
            company.Headline = reader.GetSafeString(index++);
            company.ContactInformation = reader.GetSafeString(index++);
            company.Slug = reader.GetSafeString(index++);
            company.StatusId = reader.GetSafeInt32(index++);
            company.ImageTypeId = reader.GetSafeInt32(index++);
            company.ImageUrl = reader.GetSafeString(index++);
            company.UserId = reader.GetSafeInt32(index++);
            company.DateCreated = reader.GetSafeDateTime(index++);
            company.DateModified = reader.GetSafeDateTime(index++);            

            return company;
        }

        private static void AddCommonParams(TechCompanyAddRequest model, SqlParameterCollection col) // ONLY PUT THE USER-ENTERED PARAMs IN HERE
        {
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Profile", model.Profile);
            col.AddWithValue("@Summary", model.Summary);
            col.AddWithValue("@Headline", model.Headline);
            col.AddWithValue("@ContactInformation", model.ContactInformation);
            col.AddWithValue("@Slug", model.Slug);
            col.AddWithValue("@StatusId", model.StatusId);
            col.AddWithValue("@ImageTypeId", model.ImageTypeId);
            col.AddWithValue("@ImageUrl", model.ImageUrl);
        }
    }
}
