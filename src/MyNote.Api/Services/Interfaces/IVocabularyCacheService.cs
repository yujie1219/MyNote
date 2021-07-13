using MyNote.Api.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyNote.Api.Services
{
    /// <summary>
    /// Cache service for vocabulary
    /// </summary>
    public interface IVocabularyCacheService
    {
        /// <summary>
        /// Get all vocabulary words from cache
        /// </summary>
        /// <returns>All the vocabularies</returns>
        List<string> GetVocabulary();

        /// <summary>
        /// Get Vocabulary Types for specific word
        /// </summary>
        /// <param name="word">The word to get VocabularyTypes</param>
        /// <returns>Vocabulary Types for specific word</returns>
        List<VocabularyType> GetVocabularyType(string word);

        /// <summary>
        /// Refresh the cache
        /// </summary>
        /// <returns>If refresh successful</returns>
        void RefreshCache();
    }
}
