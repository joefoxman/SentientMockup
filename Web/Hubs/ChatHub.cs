using System;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using POC.Models;
using System.Threading.Tasks;
using System.Collections.Generic;

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
            // Will have access to the status variable of ChatHistory
            //Helper.Extensions.ChatHistory
        }

        public void LeavingRoom(string name)
        {
            Clients.All.updateUserStatus(name, false);
        }

        public override Task OnConnected()
        {
            var loggedInUser = Helper.Extensions.GetLoggedInUserName();
            Helper.Extensions.Users.Find(a => a.Description == loggedInUser).Online = true;
            Clients.All.updateUserStatus(loggedInUser, true);
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            // TODO: need to have error handler to see if cookie exists first
            var loggedInUser = Helper.Extensions.GetLoggedInUserName();
            var foundUser = Helper.Extensions.Users.Find(a => a.Description == loggedInUser);
            if (foundUser != null) { 
                foundUser.Online = false;
            }
            Clients.All.updateUserStatus(loggedInUser, false);
            return base.OnDisconnected(stopCalled);
        }
    }
}