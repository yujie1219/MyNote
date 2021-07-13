using System.Collections.Generic;

namespace MyNote.Api.Models
{
    /// <summary>
    /// Vocabulary Type
    /// </summary>
    public class VocabularyType
    {
        /// <summary>
        /// Translation
        /// </summary>
        public string Translation { get; set; }

        /// <summary>
        /// Category
        /// </summary>
        public string Category { get; set; }

        /// <summary>
        /// Examples
        /// </summary>
        public List<Example> examples { get; set; }
    }
}
