using System.Collections;

namespace webapi
{
    public static class FilterNullHandler
    {
         public static string NullHandler<T>(T data)
        {
            if (data == null)
                return null;

            string datastring = null;

            if (data is IEnumerable enumerable && !(data is string))
            {
                var stringList = new List<string>();

                foreach (var item in enumerable)
                {
                    if (item != null)
                        stringList.Add(item.ToString());
                }

                if (stringList[0] == "")
                    return null;

                if (stringList.Count > 0)
                    datastring = string.Join(",", stringList);
            }
            else
            {
                datastring = data.ToString();
            }
            return datastring;
        }

        public static string ReturnEmptyString<T>(T data)
        {
            if (data == null)
            {
                return ""; // Return an empty string when data is null
            }
            return data.ToString();
        }

        public static Dictionary<int, int> paginationHandler(int? pageNumber, int? pageSize)
        {
         
            if (!pageNumber.HasValue || pageNumber <= 0)
            {
                pageNumber = 1;
            }

            if (!pageSize.HasValue || pageSize <= 0)
            {
                pageSize = 10;
            }         
            var result = new Dictionary<int, int>
             {
        { pageNumber.Value, pageSize.Value }
               };

            return result;
        }
    }
}
