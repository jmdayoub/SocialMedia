using Sabio.Models;
using Sabio.Models.Domain.Jobs;
using Sabio.Models.Requests.Jobs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface IJobService
    {
        Job Get(int id);
        List<Job> GetAll();

        Paged<Job> Pagination(int pageIndex, int pageSize);

        Paged<Job> Search(int pageIndex, int pageSize, string query);

        int Add(JobAddRequest model, int currentUserId);

        void Update(JobUpdateRequest model, int currentUserId);

        void Delete(int id);

    }
}
