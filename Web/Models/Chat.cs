using System.Collections.Generic;

namespace POC.Models
{
    public class Chat
    {
        public IEnumerable<User> Users { get; set; }
        public IEnumerable<string> SelectedUserIds { get; set; }
        public string LoggedInUser { get; set; }  
    }

}