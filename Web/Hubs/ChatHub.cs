using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace POC.Hubs
{
    [HubName("Chat")]
    public class ChatHub : Hub
    {
        public static ConcurrentDictionary<string, UserData> UserList = new ConcurrentDictionary<string, UserData>();

        public void SendToRoom(Guid RoomId, string name, string message)
        {
            // Call the addNewMessageToPage method to update clients.
            var msg = String.Format("{0} : {1}", Context.ConnectionId, message);
            Clients.Group(RoomId.ToString()).addMessageToRoom(name, message, RoomId);
        }

        public void SendToAll(string name, string message)
        {
            // Call the addNewMessageToPage method to update clients.
            var msg = String.Format("{0} : {1}", Context.ConnectionId, message);
            Clients.All.addMessageToAll(name, message);
        }

        public void JoinRoom(string name, string room)
        {
            Groups.Add(Context.ConnectionId, room);
            var key = name + room;
            UserList.TryAdd(key, new UserData { RoomId = room, Connected = true, ConnectionId = Context.ConnectionId, UserName = name });
        }

        public void JoinRoom(string name, string userToChatWith, string room) {
            Groups.Add(Context.ConnectionId, room);
            var key = name + room;

            // if already keyed in this list just update the ConnectionId because it could be an empty string
            var userInList = UserList.FirstOrDefault(a => a.Key.Equals(key));
            if (userInList.Value != null && string.IsNullOrWhiteSpace(userInList.Value.ConnectionId)) {
                userInList.Value.ConnectionId = Context.ConnectionId;
            }
            // user who initiated room
            UserList.TryAdd(key, new UserData {RoomId = room, Connected = true, ConnectionId = Context.ConnectionId, UserName = name});

            // other users to be in the chat room
            var users = userToChatWith.Split(';');
            foreach (var user in users) {
                key = user + room;
                UserList.TryAdd(key, new UserData { RoomId = room, Connected = true, ConnectionId = "", UserName = user });
            }
        }

        public void StartChat(string users, string roomId)
        {
            // broadcast all users in this room
            Clients.All.isUserInRoom(users, roomId);
            
        }

        public override Task OnConnected()
        {
            //string name = Context.User.Identity.Name;
            //Groups.Add(Context.ConnectionId, name);

            return base.OnConnected();
        }


    }

    public class UserData
    {
        public string ConnectionId { get; set; }
        public bool Connected { get; set; }
        public string Ip { get; set; }
        public string UserName { get; set; }
        public string RoomId { get; set; }
    }
}