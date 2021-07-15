using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MyNote.Api.Models;
using MyNote.Api.Repositories.Interfaces;
using MyNote.Api.Services;
using MyNote.Api.Utils;
using System;
using System.Collections.Generic;

namespace MyNote.Api.Repositories
{
    public class VocabularyTypeRepository : ConfigurationReader, IVocabularyTypeRepository
    {
        private readonly IVocabularyCacheService cacheService;
        private readonly ILogger logger;

        public VocabularyTypeRepository(IConfiguration configuration, IVocabularyCacheService cacheService, ILogger<VocabularyTypeRepository> logger) : base(configuration)
        {
            this.cacheService = cacheService;
            this.logger = logger;
        }

        public bool AddExample(string word, string translation, Example example)
        {
            List<Vocabulary> vocabularies = FileJsonOperator.ReadFromFile<Vocabulary>(this.FilePath, this.logger);
            List<Example> examples = vocabularies.Find(item => item.Word.Equals(word))?.vocabularyTypes.Find(item => item.Translation.Equals(translation))?.examples;

            if (examples != null)
            {
                examples.Add(example);
                return FileJsonOperator.OverwriteFile(this.FilePath, vocabularies, this.logger);
            }

            return false;
        }

        public bool AddVocabularyType(string word, VocabularyType vocabularyType)
        {
            List<Vocabulary> vocabularies = FileJsonOperator.ReadFromFile<Vocabulary>(this.FilePath, this.logger);
            List<VocabularyType> vocabularyTypes = vocabularies.Find(item => item.Word.Equals(word))?.vocabularyTypes;

            if (vocabularyTypes != null)
            {
                vocabularyTypes.Add(vocabularyType);
                return FileJsonOperator.OverwriteFile(this.FilePath, vocabularies, this.logger);
            }

            return false;
        }

        public List<VocabularyType> GetVocabularyTypes(string word)
        {
            return this.cacheService.GetVocabularyType(word);
        }

        public bool RemoveExample(string word, string translation, int exampleID)
        {
            List<Vocabulary> vocabularies = FileJsonOperator.ReadFromFile<Vocabulary>(this.FilePath, this.logger);
            int? count = vocabularies.Find(item => item.Word.Equals(word))?.
                vocabularyTypes.Find(item => item.Translation.Equals(translation))?.examples.RemoveAll(item => item.Id == exampleID);

            if (count.HasValue && count != 0)
            {
                return FileJsonOperator.OverwriteFile(this.FilePath, vocabularies, this.logger);
            }

            return false;
        }

        public bool RemoveVocabularyType(string word, string translation)
        {
            List<Vocabulary> vocabularies = FileJsonOperator.ReadFromFile<Vocabulary>(this.FilePath, this.logger);
            int? count = vocabularies.Find(item => item.Word.Equals(word))?.vocabularyTypes.RemoveAll(item => item.Translation.Equals(translation));

            if (count.HasValue && count != 0)
            {
                return FileJsonOperator.OverwriteFile(this.FilePath, vocabularies, this.logger);
            }

            return false;
        }
    }
}
