using System;

namespace POC.Models {
    public class ChatHistory {
        public int CaseId { get; set; }
        public string UserNameWhoStarted { get; set; }
        public string UserName { get; set; }
        public DateTime ChatStart { get; set; }
        public string Participants { get; set; }
    }
}