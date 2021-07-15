namespace MyNote.Api.Utils
{
    /// <summary>
    /// helper class to generate response
    /// </summary>
    public static class ApiResponse
    {
        /// <summary>
        /// generate a response object with status 200
        /// </summary>
        /// <typeparam name="T">response data type</typeparam>
        /// <param name="data">response data</param>
        /// <returns></returns>
        public static CommonResponse Ok<T>(T data)
        {
            return new CommonResponse<T> { Status = 200, Data = data };
        }

        /// <summary>
        /// generate a response object with status 204
        /// </summary>
        /// <returns></returns>
        public static CommonResponse NoContent()
        {
            return new CommonResponse { Status = 204 };
        }

        /// <summary>
        /// generate a response object with special error message and status code. 
        /// </summary>
        /// <param name="message">error message</param>
        /// <param name="status">status code. default is 400.</param>
        /// <returns></returns>
        public static CommonResponse Error(string message, int status = 400)
        {
            return new CommonResponse { Status = status, Message = message };
        }

    }

    /// <summary>
    /// common response.
    /// </summary>
    public class CommonResponse
    {
        /// <summary>
        /// status code
        /// </summary>
        public int Status { get; set; }

        /// <summary>
        /// message.
        /// </summary>
        public string Message { get; set; }
    }

    /// <summary>
    /// common response with data
    /// </summary>
    /// <typeparam name="T">data type</typeparam>
    public class CommonResponse<T> : CommonResponse
    {
        /// <summary>
        /// response data
        /// </summary>
        public T Data { get; set; }
    }
}
