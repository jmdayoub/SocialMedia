using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain.Jobs;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System.Data.SqlClient;
using System;
using Sabio.Models.Domain.TechCompanies;
using Sabio.Models;
using Sabio.Models.Requests.Jobs;
using Sabio.Models.Requests.TechCompanies;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/techcompanies")]
    [ApiController]
    public class TechCompanyApiController : BaseApiController
    {
        private ITechCompanyService _companyService = null;
        private IAuthenticationService<int> _authService = null;

        public TechCompanyApiController(ITechCompanyService companyService
            , ILogger<TechCompanyApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _companyService = companyService;
            _authService = authService;
        }

        #region GET BY ID / PAGINATION
        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<TechCompany>> Get(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                TechCompany company = _companyService.Get(id);

                if (company == null)
                {
                    code = 404;
                    response = new ErrorResponse("App resource not found.");
                }
                else
                {
                    response = new ItemResponse<TechCompany> { Item = company };
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

        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<TechCompany>>> Pagination(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<TechCompany> paged = _companyService.Pagination(pageIndex, pageSize);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records not found");
                }
                else
                {
                    ItemResponse<Paged<TechCompany>> result = new ItemResponse<Paged<TechCompany>>();
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
        public ActionResult<ItemResponse<int>> Add(TechCompanyAddRequest model)
        {
            int code = 201;
            BaseResponse response = null;
            int userId = _authService.GetCurrentUserId();

            try
            {
                int id = _companyService.Add(model, userId);

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
        public ActionResult<ItemResponse<int>> Update(TechCompanyUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            int userId = _authService.GetCurrentUserId();

            try
            {
                _companyService.Update(model, userId);

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
