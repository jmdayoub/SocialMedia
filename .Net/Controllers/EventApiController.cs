using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Build.Framework;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.Events;
using Sabio.Models.Domain.Jobs;
using Sabio.Models.Requests.Events;
using Sabio.Models.Requests.TechCompanies;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/events")]
    [ApiController]
    public class EventApiController : BaseApiController
    {
        private IEventService _eventService = null;
        private IAuthenticationService<int> _authService = null;

        public EventApiController(IEventService eventService, ILogger<EventApiController> logger, IAuthenticationService<int> authService) : base(logger)
        {
            _eventService = eventService;
            _authService = authService;
        }

        #region PAGINATE
        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<Event>>> Pagination(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Event> paged = _eventService.Pagination(pageIndex, pageSize);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records not found");
                }
                else
                {
                    ItemResponse<Paged<Event>> result = new ItemResponse<Paged<Event>>();
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

        #region SEARCH BY DATE
        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<Event>>> SearchByDate(int pageIndex, int pageSize, DateTime dateStart, DateTime dateEnd)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Event> paged = _eventService.SearchByDate(pageIndex, pageSize, dateStart, dateEnd);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records not found");
                }
                else
                {
                    ItemResponse<Paged<Event>> result = new ItemResponse<Paged<Event>>();
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

        [HttpGet("search/geo")]
        public ActionResult<ItemResponse<Event>> SearchByGeo(double lat, double lng, int distance)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<Event> list = _eventService.SearchByGeo(lat, lng, distance);

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App resource not found.");
                }
                else
                {
                    response = new ItemsResponse<Event> { Items = list };
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

        #region ADD / UPDATE

        [HttpPost]
        public ActionResult<ItemResponse<int>> Add(EventAddRequest model)
        {
            int code = 201;
            BaseResponse response = null;
            int userId = _authService.GetCurrentUserId();

            try
            {
                int id = _eventService.Add(model, userId);

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
        public ActionResult<ItemResponse<int>> Update(EventUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            int userId = _authService.GetCurrentUserId();

            try
            {
                _eventService.Update(model, userId);

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

    }
}
