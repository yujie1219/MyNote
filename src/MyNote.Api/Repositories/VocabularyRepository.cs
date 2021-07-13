using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MyNote.Api.Models;
using MyNote.Api.Services;
using MyNote.Api.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyNote.Api.Repositories
{
    public class VocabularyRepository : ConfigurationReader, IVocabularyRepository
    {
        private readonly IVocabularyCacheService cacheService;
        private readonly ILogger logger;

        public VocabularyRepository(IConfiguration configuration, IVocabularyCacheService cacheService, ILogger<VocabularyRepository> logger) : base(configuration)
        {
            this.cacheService = cacheService;
            this.logger = logger;
        }

        public bool AddVocabulary(string word)
        {
            Vocabulary vocabulary = new Vocabulary
            {
                Word = word,
                vocabularyTypes = new List<VocabularyType>()
            };

            return FileJsonOperator.AppendToFile(this.FilePath, vocabulary);
        }

        public bool RemoveVocabulary(string word)
        {
            List<Vocabulary> vocabularies = FileJsonOperator.ReadFromFile<List<Vocabulary>>(this.FilePath);
            int count = vocabularies.RemoveAll(x => x.Word == word);

            if (count != 0)
            {
                return FileJsonOperator.OverwriteFile(this.FilePath, vocabularies);
            }

            return false;
        }

        public List<string> GetAllVocabularies()
        {
            return this.cacheService.GetVocabulary();
        }
    }
}
