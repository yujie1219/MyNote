using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyNote.Api.Utils
{
    public class ConfigurationReader
    {
        public string FilePath { get; private set; }

        public ConfigurationReader(IConfiguration configuration)
        {
            this.FilePath = configuration[Constants.FilePath];
        }
    }
}
