using System;
using System.Linq;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System.Threading.Tasks;
using POC.Helper;

namespace POC.Hubs
{
    [HubName("Chat")]
    public class ChatHub : Hub
    {
        public void SendToRoom(Guid roomId, string name, string message)
        {
            //Thursday, June 2, 2016
            var messageDateTime = DateTime.Now.ToString("dddd MMMM d, yyyy @ hh:mm tt");
            Clients.Group(roomId.ToString()).addMessageToRoom(name, message, roomId.ToString(), messageDateTime);
        }

        public void StartChat(string users, string roomId, string userWhoStartedChat, string userWhoRejoinedChat) {
            var splitUser = users.Split(';');
            foreach (var user in splitUser) {
                var staticUser = Extensions.Users.FirstOrDefault(a => a.Description == user);
                if (staticUser == null) continue;
                if (staticUser.Description != userWhoRejoinedChat) {
                    var connectionId = staticUser.ConnectionId;
                    Clients.Client(connectionId).rejoinRoom(users, roomId, Extensions.GetLoggedInUserName());
                }
            }
            if (!string.IsNullOrWhiteSpace(userWhoRejoinedChat))
            {
                // send to the user who started the chat because they are not listed in the user variable sent it
                var staticUser = Extensions.Users.FirstOrDefault(a => a.Description == userWhoStartedChat);
                if (staticUser != null) {
                    var connectionId = staticUser.ConnectionId;
                    Clients.Client(connectionId).rejoinRoom(users, roomId, Extensions.GetLoggedInUserName());
                }
            }
            // broadcast all users in this room
            //Clients.All.isUserInRoom(users, roomId, Helper.Extensions.GetLoggedInUserName());
        }

        public void JoinRoom(string name, string room)
        {
            var staticUser = Extensions.Users.FirstOrDefault(a => a.Description == name);
            if (staticUser != null) {
                var connectionId = staticUser.ConnectionId;
                Groups.Add(connectionId, room);
            }
            // Will have access to the status variable of ChatHistory
            //Helper.Extensions.ChatHistory
        }

        public void LeavingRoom(string name)
        {
            Clients.All.updateUserStatus(name, false);
        }

        public override Task OnConnected()
        {
            var loggedInUser = Extensions.GetLoggedInUserName();
            var user = Extensions.Users.Find(a => a.Description == loggedInUser);
            if (user != null) {
                user.Online = true;
                user.ConnectionId = Context.ConnectionId;
            }
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
                foundUser.ConnectionId = string.Empty;
            }
            Clients.All.updateUserStatus(loggedInUser, false);
            return base.OnDisconnected(stopCalled);
        }
    }
}