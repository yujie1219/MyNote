using System.Collections.Generic;

namespace MyNote.Api.Models
{
    /// <summary>
    /// Vocabulary Model
    /// </summary>
    public class Vocabulary
    {
        /// <summary>
        /// Spell
        /// </summary>
        public string Word { get; set; }

        /// <summary>
        /// Vocabulary Types
        /// </summary>
        public List<VocabularyType> vocabularyTypes { get; set; }

    }
}
