using Microsoft.Owin.Security.DataHandler.Encoder;

namespace POC.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public bool Online { get; set; }
        public string ParentConnectionId { get; set; }
        public string DiscussionConnectionId { get; set; }
    }
}
