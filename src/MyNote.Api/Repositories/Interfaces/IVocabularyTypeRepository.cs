using MyNote.Api.Models;
using System.Collections.Generic;

namespace MyNote.Api.Repositories.Interfaces
{
    public interface IVocabularyTypeRepository
    {
        List<VocabularyType> GetVocabularyTypes(string word);

        bool AddVocabularyType(string word, VocabularyType vocabularyType);

        bool RemoveVocabularyType(string word, string translation);

        bool AddExample(string word, string translation, Example example);

        bool RemoveExample(string word, string translation, string exampleID);
    }
}
