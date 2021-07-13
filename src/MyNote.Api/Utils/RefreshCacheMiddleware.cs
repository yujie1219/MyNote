using Microsoft.AspNetCore.Http;
using MyNote.Api.Services;
using System;
using System.Threading.Tasks;

namespace MyNote.Api.Utils
{
    public class RefreshCacheMiddleware
    {
        private readonly RequestDelegate next;

        private readonly IVocabularyCacheService cacheService;

        /// <summary>
        /// RefreshCacheMiddleware
        /// </summary>
        /// <param name="next">RequestDelegate</param>
        /// <param name="cacheService">IVocabularyCacheService</param>
        public RefreshCacheMiddleware(RequestDelegate next, IVocabularyCacheService cacheService)
        {
            this.next = next;
            this.cacheService = cacheService;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            bool shouldRefresh = this.CheckRequestMethod(context);

            await next(context);

            shouldRefresh &= this.CheckResponseStatusCode(context);
            if (shouldRefresh)
            {
                cacheService.RefreshCache();
            }
        }

        private bool CheckResponseStatusCode(HttpContext context)
        {
            int statusCode = context.Response.StatusCode;
            if (statusCode == 200 || statusCode == 204)
            {
                return true;
            }

            return false;
        }

        private bool CheckRequestMethod(HttpContext context)
        {
            var requestMethod = context.Request.Method;
            if (requestMethod == "POST" || requestMethod == "DELETE" || requestMethod == "PUT")
            {
                return true;
            }
            return false;
        }
    }
}
