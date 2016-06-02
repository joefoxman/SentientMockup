using System;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace POC.Hubs
{
    [HubName("Chat")]
    public class ChatHub : Hub
    {
        public void SendToRoom(Guid roomId, string name, string message)
        {
            //Thursday, June 2, 2016
            var messageDateTime = DateTime.Now.ToString("dddd MMMM d, yyyy @ hh:mm tt");
            Clients.Group(roomId.ToString()).addMessageToRoom(name, message, roomId, messageDateTime);
        }

        public void StartChat(string users, string roomId)
        {
            // broadcast all users in this room
            Clients.All.isUserInRoom(users, roomId, Helper.Extensions.GetLoggedInUserName());
        }

        public void JoinRoom(string name, string room)
        {
            Groups.Add(Context.ConnectionId, room);
        }

        //public void SendToAll(string name, string message)
        //{
        //    // Call the addNewMessageToPage method to update clients.
        //    var msg = String.Format("{0} : {1}", Context.ConnectionId, message);
        //    Clients.All.addMessageToAll(name, message);
        //}

        //public override Task OnConnected()
        //{
        //    return base.OnConnected();
        //}
    }
}