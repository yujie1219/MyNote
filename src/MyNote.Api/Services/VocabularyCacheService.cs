using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MyNote.Api.Models;
using MyNote.Api.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyNote.Api.Services
{
    public class VocabularyCacheService : ConfigurationReader, IVocabularyCacheService
    {
        private List<Vocabulary> vocabularyCache;
        private readonly ILogger logger;

        public VocabularyCacheService(IConfiguration configuration, ILogger<VocabularyCacheService> logger) : base(configuration)
        {
            this.logger = logger;
            this.RefreshCache();
        }

        public List<string> GetVocabulary()
        {
            return this.vocabularyCache.Select(item => item.Word).ToList();
        }

        public List<VocabularyType> GetVocabularyType(string word)
        {
            return this.vocabularyCache.Where(item => item.Word.Equals(word)).Select(item => item.vocabularyTypes).SelectMany(item => item).ToList();
        }

        public void RefreshCache()
        {
            this.vocabularyCache = FileJsonOperator.ReadFromFile<List<Vocabulary>>(this.FilePath);
        }
    }
}
