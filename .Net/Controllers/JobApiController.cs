using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.Friends;
using Sabio.Models.Domain.Jobs;
using Sabio.Models.Requests.Jobs;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/jobs")]
    [ApiController]
    public class JobApiController : BaseApiController
    {
        private IJobService _jobService = null;
        private IAuthenticationService<int> _authService = null;

        public JobApiController(IJobService service 
            , ILogger<JobApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _jobService = service;
            _authService = authService;
        }

        #region JOB GETS/SELECTS
        [HttpGet]
        public ActionResult<ItemsResponse<Job>> GetAll()
        {
            int code = 200;

            BaseResponse response = null;

            try
            {
                List<Job> list = _jobService.GetAll();

                if(list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App resource not found");
                }
                else
                {
                    response = new ItemsResponse<Job> { Items = list };
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
        public ActionResult<ItemResponse<Job>> Get(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Job job = _jobService.Get(id);

                if (job == null)
                {
                    code = 404;
                    response = new ErrorResponse("App resource not found.");
                }
                else
                {
                    response = new ItemResponse<Job> { Item = job };
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

        #region PAGINATION / SEARCH
        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<Job>>> Pagination(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Job> paged = _jobService.Pagination(pageIndex, pageSize);
                if(paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records not found");
                }
                else
                {
                    ItemResponse<Paged<Job>> result = new ItemResponse<Paged<Job>>();
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
        public ActionResult<ItemResponse<Paged<Job>>> Search(int pageIndex, int pageSize, string query)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Job> paged = _jobService.Search(pageIndex, pageSize, query);
                if(paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records not found");
                }
                else
                {
                    ItemResponse<Paged<Job>> result = new ItemResponse<Paged<Job>>();
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

        #region ADD / UPDATE

        [HttpPost]
        public ActionResult<ItemResponse<int>> Add(JobAddRequest model)
        {
            int code = 201;
            BaseResponse response = null;           
            int userId = _authService.GetCurrentUserId();

            try
            {
                int id = _jobService.Add(model, userId);

                if(id == 0)
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
        public ActionResult<ItemResponse<int>> Update(JobUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            int userId = _authService.GetCurrentUserId();

            try
            {
                _jobService.Update(model, userId);

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

        #region DELETE
        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _jobService.Delete(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
        #endregion
    }
}
