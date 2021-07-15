using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;

namespace MyNote.Api.Utils
{
    public static class FileJsonOperator
    {
        public static bool OverwriteFile(string filePath, Object obj, ILogger logger)
        {
            FileInfo fileInfo = CreateIfNotExists(filePath, logger);

            if (obj != null)
            {
                string content = JsonConvert.SerializeObject(obj);

                lock (fileInfo)
                {
                    logger.LogInformation("Overwrite content {0} to file {1}", content, filePath);
                    File.WriteAllText(fileInfo.FullName, content);
                }

                return true;
            }

            return false;
        }

        public static bool AppendToFile(string filePath, Object obj, ILogger logger)
        {
            FileInfo fileInfo = CreateIfNotExists(filePath, logger);

            if (obj != null)
            {
                string content = JsonConvert.SerializeObject(obj);

                lock (fileInfo)
                {
                    logger.LogInformation("Append content {0} to file {1}", content, filePath);
                    File.AppendAllText(fileInfo.FullName, content);
                }

                return true;
            }

            return false;
        }

        public static List<T> ReadFromFile<T>(string filePath, ILogger logger)
        {
            FileInfo fileInfo = CreateIfNotExists(filePath, logger);

            lock (fileInfo)
            {
                string content = File.ReadAllText(fileInfo.FullName);
                if (content != null && content.Length != 0)
                {
                    logger.LogInformation("Read content {0} from file {1}", content, filePath);
                    return JsonConvert.DeserializeObject<List<T>>(content);
                }
            }
            return new List<T>();
        }

        private static FileInfo CreateIfNotExists(string filePath, ILogger logger)
        {
            if (filePath == null)
            {
                string errorMessge = "The file path of the learning DB should not be null!";
                logger.LogError(errorMessge);
                throw new Exception(errorMessge);
            }
            else
            {
                FileInfo fileInfo = new FileInfo(filePath);
                if (!fileInfo.Exists)
                {
                    if (!Directory.Exists(fileInfo.DirectoryName))
                    {
                        DirectoryInfo directoryInfo = Directory.CreateDirectory(fileInfo.DirectoryName);
                        logger.LogInformation("The driectory {0} was created successfully at {1}", directoryInfo.FullName, directoryInfo.CreationTimeUtc);
                    }

                    fileInfo.Create().Close();
                    logger.LogInformation("The file {0} was created successfully at {1}", fileInfo.FullName, fileInfo.CreationTimeUtc);
                }

                return fileInfo;
            }
        }
    }
}
