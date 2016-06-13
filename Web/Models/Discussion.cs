using System;
using System.Collections.Generic;

namespace POC.Models
{
    public class Discussion
    {
        public int CaseId { get; set; }
        public DateTime StartChatDateTime { get; set; }
        public string UserList { get; set; }
        public List<User> Users { get; set; }
        public List<Chatlog> Chatlog { get; set; }
        public string LoggedInUser { get; set; }
        public Guid RoomId { get; set; }
        public string UserWhoStartedChat { get; set; }
        public string UserWhoRejoinedChat { get; set; }
    }
}
