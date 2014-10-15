var $ = require('jquery'),
    B = require('backbone');
B.$ = $;
var sio = require('../lib/sio');
var vent = require('../lib/vent');

var ChatModel = B.Model.extend({
    initialize: function(data){
        this.socket = sio.connect();
        this.socket.on('connect', function(){
            this.socket.emit('login', this.get('username'));
        }.bind(this));

        this.socket.on('ready', function(username){
            this.set('username', username);
            this.socket.on('message', function(data){
                this.set('new_msg', data);
            }.bind(this));
            this.socket.on('room', function(room){
                this.set('room', room);
            }.bind(this));
            this.socket.on('updateMember', function(data){
                this.set('members', data);
            }.bind(this));
            this.socket.on('loadMessage', function(data){
                this.set('messages', data);
            }.bind(this));
            this.set('ready', true);
            this.switchRoom('hall');
        }.bind(this));

        this.socket.on('disconnect', function(){
            vent.trigger('logout');
        });
    },
    sendMessage: function(message) {
        this.socket.emit('message', message);
    },
    switchRoom: function(room) {
        this.socket.emit('room', room); // Entering a room, notify server to do something
    },
    tearDown: function() {
        this.socket.emit('room', '_leave');
        this.socket.disconnect();
        this.socket.removeAllListeners('connect');
        this.socket.removeAllListeners('ready');
        this.socket.removeAllListeners('room');
        this.socket.removeAllListeners('message');
        this.socket.removeAllListeners('disconnect');
        this.socket.removeAllListeners('updateMember');
        this.socket.removeAllListeners('loadMessage');
    }
});

module.exports = ChatModel;
