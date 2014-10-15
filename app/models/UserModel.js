var $ = require('jquery'),
    B = require('backbone');
B.$ = $;
var sio = require('../lib/sio');
var vent = require('../lib/vent');

/*
  UserModel
  attributes: {id, name, email, rooms, room, socket}
  socket.events: {recv_msg, send_msg}
  actions: {join_room, quit_room}
*/
var ChatModel = B.Model.extend({
  rooms: [], 
  initialize: function(data){     // {name, email}
    this.socket = sio.connect();
    this.socket.on('connect', function(){

    });

    this.socket.on('ready', function(data){
      this.set('name', data.name).set('email',data.email);
      this.socket.on('send:message', function(message){ //{content, sender, receiver, time_stamp}
        this.sendMessage(message);
      }.bind(this));
      this.socket.on('receive:message', function(message){ //{content, sender, receiver, time_stamp}
        this.receiveMessage(message);
      }.bind(this));
      this.socket.on('join:room', function(room){
        this.romms.push(room);
      }.bind(this));
      this.socket.on('quit:room', function(room){
        var index = this.rooms.indexOf(room);
        if (index > -1) {
          this.rooms.splice(index, 1);
        }
      }.bind(this));
      this.socket.on('change:room', function(room){
        this.set('room', room);
      }.bind(this));
      this.set('ready', true);
    }.bind(this));

    this.socket.on('disconnect', function(){
      vent.trigger('logout');
    })
  },

  receiveMessage: function(message){
    
  },

  sendMessage: function(message){
    
  }
});

module.exports = UserModel;
