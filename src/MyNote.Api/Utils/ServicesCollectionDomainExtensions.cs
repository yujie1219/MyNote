using Microsoft.Extensions.DependencyInjection;
using MyNote.Api.Repositories;
using MyNote.Api.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyNote.Api.Utils
{
    /// <summary>
    /// domain services extensions
    /// </summary>
    public static class ServicesCollectionDomainExtensions
    {
        /// <summary>
        /// register domain services
        /// </summary>
        /// <param name="services">services collection</param>
        /// <returns>services collection</returns>
        public static IServiceCollection AddDomainServices(this IServiceCollection services)
        {
            // Services
            services.AddSingleton<IVocabularyCacheService, VocabularyCacheService>();

            // Repositories
            services.AddSingleton<IVocabularyRepository, VocabularyRepository>();

            return services;
        }
    }
}
