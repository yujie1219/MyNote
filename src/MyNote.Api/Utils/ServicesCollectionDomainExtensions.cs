using Microsoft.Extensions.DependencyInjection;
using MyNote.Api.Repositories;
using MyNote.Api.Repositories.Interfaces;
using MyNote.Api.Services;

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
            services.AddSingleton<IVocabularyTypeRepository, VocabularyTypeRepository>();

            return services;
        }
    }
}
