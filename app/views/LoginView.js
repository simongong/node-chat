var $ = require('jquery'),
    B = require('backbone');
B.$ = $;
var template = require('../templates/login.html');
var vent = require('../lib/vent');

var LoginView = B.View.extend({
    id : 'login',
    events: {
        'keypress #input-name': 'onKeyPress',
        'click #button-login': 'login',
    },
    initialize : function() {
        this.render();
    },

    render: function() {
        var username = window.localStorage.getItem('username');
        if(!username) username = '';
        this.$el.html(template({username: username}));
        $.get('/user_count', function(data){
            this.$('#user_count').text(data.count);
        }.bind(this));
    },

    onKeyPress: function(e) {
        if(e.which == 13) {
            this.login();
        }
    },

    login: function(){
        var $input = this.$('#input-name');
        var username = $.trim($input.val());
        if (username) {
            vent.trigger('login', {username: username});
            window.localStorage.setItem('username', username);
        }
        $input.val('');
        return false;
    },
    tearDown: function() {
        this.off();
        this.remove();
    }
});

module.exports = LoginView;
