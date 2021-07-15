using Microsoft.Extensions.Configuration;

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
