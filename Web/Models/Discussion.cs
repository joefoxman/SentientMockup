using System;
using System.Collections.Generic;

namespace POC.Models
{
    public class Discussion
    {
        public List<User> Users { get; set; }
        public List<Chatlog> Chatlog { get; set; }
        public string LoggedInUser { get; set; }
        public Guid RoomId { get; set; }
        public string UserWhoStartedChat { get; set; }
    }
}
