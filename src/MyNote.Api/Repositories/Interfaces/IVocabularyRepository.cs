using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyNote.Api.Repositories
{
    public interface IVocabularyRepository
    {
        List<string> GetAllVocabularies();

        bool AddVocabulary(string word);

        bool RemoveVocabulary(string word);
    }
}
