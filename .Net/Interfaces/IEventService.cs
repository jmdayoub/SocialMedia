using Sabio.Models;
using Sabio.Models.Domain.Events;
using Sabio.Models.Domain.Jobs;
using Sabio.Models.Requests.Events;
using Sabio.Models.Requests.Jobs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface IEventService
    {
        Paged<Event> Pagination(int pageIndex, int pageSize);

        Paged<Event> SearchByDate(int pageIndex, int pageSize, DateTime dateStart, DateTime dateEnd);

        List<Event> SearchByGeo(double lat, double lng, int distance);

        int Add(EventAddRequest model, int currentUserId);

        void Update(EventUpdateRequest model, int currentUserId);
    }
}
