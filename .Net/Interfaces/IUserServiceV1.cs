using Sabio.Models.Domain.Users;
using Sabio.Models.Requests.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface IUserServiceV1
    {
        int Add(UserAddRequest model, int currentUserId);
        void Delete(int id);
        User Get(int id);
        List<User> GetAll();
        void Update(UserUpdateRequest model);
    }
}
