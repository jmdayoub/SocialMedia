using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.Friends;
using Sabio.Models.Requests.Friends;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/v3/friends")]
    [ApiController]
    public class FriendApiControllerV3 : BaseApiController
    {
        private IFriendService _friendService = null;
        private IAuthenticationService<int> _authService = null;

        public FriendApiControllerV3(IFriendService service
            , ILogger<FriendApiControllerV3> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _friendService = service;
            _authService = authService;
        }

        #region GETS V3
        [HttpGet]
        public ActionResult<ItemsResponse<FriendV3>> GetAllV3()
        {
            int code = 200;

            BaseResponse response = null;

            try
            {
                List<FriendV3> listV3 = _friendService.GetAllV3();

                if (listV3 == null)
                {
                    code = 404;
                    response = new ErrorResponse("App resource not found");
                }
                else
                {
                    response = new ItemsResponse<FriendV3> { Items = listV3 };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<FriendV3>> GetV3(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                FriendV3 friendV3 = _friendService.GetV3(id);

                if (friendV3 == null)
                {
                    code = 404;
                    response = new ErrorResponse("App resource not found.");
                }
                else
                {
                    response = new ItemResponse<FriendV3> { Item = friendV3 };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"Generic Error: {ex.Message}");
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        } 
        #endregion

        #region SEARCH / PAGINATE V3
        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<FriendV3>>> PaginationV3(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<FriendV3> paged = _friendService.PaginationV3(pageIndex, pageSize);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records not found");
                }
                else
                {
                    ItemResponse<Paged<FriendV3>> result = new ItemResponse<Paged<FriendV3>>();
                    result.Item = paged;
                    return StatusCode(code, result);
                }
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<FriendV3>>> SearchV3(int pageIndex, int pageSize, string query)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<FriendV3> paged = _friendService.SearchV3(pageIndex, pageSize, query);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records not found");
                }
                else
                {
                    ItemResponse<Paged<FriendV3>> result = new ItemResponse<Paged<FriendV3>>();
                    result.Item = paged;
                    return StatusCode(code, result);
                }
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message.ToString());
            }
            return StatusCode(code, response);
        } 
        #endregion


        #region POST/PUT V3
        [HttpPost]
        public ActionResult<ItemResponse<int>> AddV3(FriendAddRequestV3 model)
        {
            int code = 201;
            BaseResponse response = null;
            IUserAuthData user = _authService.GetCurrentUser();

            try
            {
                int id = _friendService.AddV3(model, user.Id);

                if (id == 0)
                {
                    code = 400;
                    response = new ErrorResponse("user invalid");
                }
                else
                {
                    response = new ItemResponse<int> { Item = id };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }

        [HttpPut("{id:int}")]
        public ActionResult<ItemResponse<int>> UpdateV3(FriendUpdateRequestV3 model)
        {
            int code = 200;
            BaseResponse response = null;
            IUserAuthData user = _authService.GetCurrentUser();

            try
            {
                _friendService.UpdateV3(model, user.Id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }
        #endregion

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> DeleteV3(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _friendService.DeleteV3(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

    }
}
