﻿using System;
using System.Linq;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System.Threading.Tasks;
using POC.Helper;
using POC.Models;

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
                if (staticUser.Description != userWhoStartedChat) {
                    var connectionId = staticUser.ParentConnectionId;
                    Clients.Client(connectionId).rejoinRoom(users, roomId, Extensions.GetLoggedInUserName());
                }
            }
        }

        public void JoinChat(string usersToAdd, string roomId, string userWhoStartedChat)
        {
            var room = Extensions.Discussions.FirstOrDefault(a => a.RoomId.Equals(new Guid(roomId)));
            if (room == null) {
                return;
            }
            var usersInChat = room.UserList + ";" + usersToAdd;
            var splitUsers = usersToAdd.Split(';');
            foreach (var user in splitUsers) {
                var staticUser = Extensions.Users.FirstOrDefault(a => a.Description == user);
                if (staticUser == null) continue;
                var connectionId = staticUser.ParentConnectionId;
                Clients.Client(connectionId).rejoinRoom(usersInChat, roomId, userWhoStartedChat);
            }
            // now send a notification to all of the other users (not newly added) so they will
            // get an update with the new user list

        }

        public void AddUserToRoom(string usersToAdd, string roomId) {
            var splitUsers = usersToAdd.Split(';');
            var room = Extensions.Discussions.FirstOrDefault(a => a.RoomId.Equals(new Guid(roomId)));
            if (room == null) {
                return;
            }
            var usersInRoom = room.UserList + ";" + usersToAdd;
            var userWhoStartedChat = room.UserWhoStartedChat;
            foreach (var user in splitUsers) {
                var staticUser = Extensions.Users.FirstOrDefault(a => a.Description == user);
                if (staticUser == null) continue;
                var connectionId = staticUser.ParentConnectionId;
                Clients.Client(connectionId).addUserToRoom(usersInRoom, roomId, userWhoStartedChat);
            }
        }

        public void JoinRoom(string name, string room)
        {
            var splitUser = name.Split(';');
            var discussion = Extensions.Discussions.FirstOrDefault(a => a.RoomId.Equals(new Guid(room)));
            if (discussion == null) return;
            foreach (var user in splitUser) {
                discussion.Users.Add(new User { Id = 1, Description = name });
                var discussionUser = discussion?.Users.FirstOrDefault(a => a.Description == user);
                if (discussionUser == null) continue;
                var connectionId = discussionUser.DiscussionConnectionId;
                Groups.Add(connectionId, room);
            }
            // Will have access to the status variable of ChatHistory
            //Helper.Extensions.ChatHistory
        }

        public void LeavingRoom(string name)
        {
            Clients.All.updateUserStatus(name, false);
        }

        public void UpdateUserStatus(string userName, bool online) {
            Clients.All.updateUserStatus(userName, online);
        }

        public override Task OnConnected()
        {
            var roomId = Context.QueryString["roomId"];
            var loggedInUser = Extensions.GetLoggedInUserName();
            if (string.IsNullOrWhiteSpace(roomId)) {
                var user = Extensions.Users.Find(a => a.Description == loggedInUser);
                if (user != null) {
                    user.Online = true;
                    user.ParentConnectionId = Context.ConnectionId;
                }
            }
            else {
                // update the user's roomConnetionId in the static list of Discussions
                var discussion = Extensions.Discussions.FirstOrDefault(a => a.RoomId.Equals(new Guid(roomId)));
                var user = discussion?.Users.FirstOrDefault(a => a.Description == loggedInUser);
                if (user != null) {
                    user.DiscussionConnectionId = Context.ConnectionId;
                }
            }
            Clients.All.updateUserStatus(loggedInUser, true);
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            var loggedInUser = Extensions.GetLoggedInUserName();
            var foundUser = Extensions.Users.Find(a => a.Description == loggedInUser);
            if (foundUser != null) { 
                foundUser.Online = false;
                foundUser.ParentConnectionId = string.Empty;
            }
            Clients.All.updateUserStatus(loggedInUser, false);
            return base.OnDisconnected(stopCalled);
        }
    }
}