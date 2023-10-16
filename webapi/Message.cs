using Model;

namespace webapi
{
    public static class Message
    {
        public static Response<T> SucessWithData<T>(string message ,T data) 
        {
            var response = new Response<T>
            {
                Message = message,
                Status = "Sucess",
                Data  = data
            };

            return response;
        }
        public static Response<T> Error<T>(string message,T data)
        {
            
            return new Response<T>
            {
                Message = message,
                Status = "Error"
            };
        }

      
        public static Response<T> Sucess<T>(string message,T data)
        {
            var response = new Response<T>
            {
                Message = message,
                Status = "Sucess",
            };

            return response;
        }
    }
    

}
