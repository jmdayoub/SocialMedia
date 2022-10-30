using Sabio.Models;
using Sabio.Models.Domain.TechCompanies;
using Sabio.Models.Requests.Jobs;
using Sabio.Models.Requests.TechCompanies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface ITechCompanyService
    {
        TechCompany Get(int id);

        Paged<TechCompany> Pagination(int pageIndex, int pageSize);

        int Add(TechCompanyAddRequest model, int currentUserId);

        void Update(TechCompanyUpdateRequest model, int currentUserId);
    }
}
