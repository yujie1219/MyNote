using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyNote.Api.Models
{
    /// <summary>
    /// Example
    /// </summary>
    public class Example
    {
        /// <summary>
        /// Id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Source sentence
        /// </summary>
        public string Src { get; set; }

        /// <summary>
        /// Translation
        /// </summary>
        public string Dst { get; set; }
    }
}
