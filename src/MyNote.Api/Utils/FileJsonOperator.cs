using Microsoft.Extensions.Configuration;
using MyNote.Api.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace MyNote.Api.Utils
{
    public static class FileJsonOperator
    {
        public static bool OverwriteFile(string filePath, Object obj)
        {
            FileInfo fileInfo = CreateIfNotExists(filePath);

            if (obj != null)
            {
                string content = JsonConvert.SerializeObject(obj);

                lock (fileInfo)
                {
                    File.WriteAllText(fileInfo.FullName, content);
                }

                return true;
            }

            return false;
        }

        public static bool AppendToFile(string filePath, Object obj)
        {
            FileInfo fileInfo = CreateIfNotExists(filePath);

            if (obj != null)
            {
                string content = JsonConvert.SerializeObject(obj);

                lock (fileInfo)
                {
                    File.AppendAllText(fileInfo.FullName, content);
                }

                return true;
            }

            return false;
        }

        public static T ReadFromFile<T>(string filePath)
        {
            FileInfo fileInfo = CreateIfNotExists(filePath);

            lock (fileInfo)
            {
                string content = File.ReadAllText(fileInfo.FullName);
                if (content != null)
                {
                    return JsonConvert.DeserializeObject<T>(content);
                }
            }
            return default(T);
        }

        private static FileInfo CreateIfNotExists(string filePath)
        {
            if (filePath == null)
            {
                throw new Exception("The file path of the learning DB should not be null!");
            }
            else
            {
                FileInfo fileInfo = new FileInfo(filePath);
                if (!fileInfo.Exists)
                {
                    fileInfo.Create();
                }

                return fileInfo;
            }
        }
    }
}
