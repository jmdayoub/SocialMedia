using Sabio.Models;
using Sabio.Models.Domain.Friends;
using Sabio.Models.Domain.Users;
using Sabio.Models.Requests.Friends;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface IFriendService
    {
        Friend Get(int id);

        List<Friend> GetAll();

        int Add(FriendAddRequest model, int currentUserId);

        void Update(FriendUpdateRequest model, int currentUserId);
        void Delete(int id);

        Paged<Friend> Pagination(int pageIndex, int pageSize);

        Paged<Friend> Search(int pageIndex, int pageSize, string query);

        FriendV3 GetV3(int id);

        List<FriendV3> GetAllV3();

        Paged<FriendV3> PaginationV3(int pageIndex, int pageSize);

        Paged<FriendV3> SearchV3(int pageIndex, int pageSize, string query);

        int AddV3(FriendAddRequestV3 model, int currntUserId);

        void UpdateV3(FriendUpdateRequestV3 model, int currentUserId);

        void DeleteV3(int id);
    }
}