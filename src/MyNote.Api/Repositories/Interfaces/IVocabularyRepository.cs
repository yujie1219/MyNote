using System.Collections.Generic;

namespace MyNote.Api.Repositories.Interfaces
{
    public interface IVocabularyRepository
    {
        List<string> GetAllVocabularies();

        bool AddVocabulary(string word);

        bool RemoveVocabulary(string word);
    }
}
