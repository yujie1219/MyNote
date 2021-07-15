using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MyNote.Api.Models;
using MyNote.Api.Repositories.Interfaces;
using MyNote.Api.Services;
using MyNote.Api.Utils;
using System.Collections.Generic;

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

            List<Vocabulary> vocabularies = FileJsonOperator.ReadFromFile<Vocabulary>(this.FilePath, this.logger);
            vocabularies.Add(vocabulary);

            return FileJsonOperator.OverwriteFile(this.FilePath, vocabularies, this.logger);
        }

        public bool RemoveVocabulary(string word)
        {
            List<Vocabulary> vocabularies = FileJsonOperator.ReadFromFile<Vocabulary>(this.FilePath, this.logger);
            int count = vocabularies.RemoveAll(x => x.Word == word);

            if (count != 0)
            {
                return FileJsonOperator.OverwriteFile(this.FilePath, vocabularies, this.logger);
            }

            return false;
        }

        public List<string> GetAllVocabularies()
        {
            return this.cacheService.GetVocabulary();
        }
    }
}
