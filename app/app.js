var $ = require("jquery"),
    B = require("backbone");
B.$ = $;
var LoginView = require("./views/LoginView");
var ChatView = require("./views/ChatView");
var vent = require("./lib/vent");

var AppView = B.View.extend({
    el : $("#wrapper"),     // Specify the main body, an child node of index.jade
    initialize : function(){
        this.render();  // Render $("#wrapper")
        this.listenTo(vent, "login", this.renderChat);
        this.listenTo(vent, "logout", this.renderLogin);
    },
    render : function() {
        this.renderLogin();     // By default, the app shows login view
    },
    renderLogin : function(){
        if(this.chatView) this.chatView.tearDown(); // Destroy chat view
        this.loginView = new LoginView();
        this.$el.html(this.loginView.$el);
        this.loginView.$("#input-name").focus();
    },
    renderChat : function(data) {
        if(this.loginView) this.loginView.tearDown();   // Destroy login view
        this.chatView = new ChatView(data);
        this.$el.html(this.chatView.$el);
    }
});

$(function(){
    var app = new AppView();    // Start app
});
