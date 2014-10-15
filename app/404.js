var $ = require("jquery"),
    B = require("backbone");
B.$ = $;
var 404View = require("./views/404View");

var 404 = B.View.extend({
    el : $("#wrapper"),     // Specify the main body, an child node of 404.jade
    initialize : function(){
        this.render();  // Render $("#wrapper")
    },
    render : function() {
        this.404View = new 404View();
        this.$el.html(this.404View.$el);
    }
});

$(function(){
    var 404Page = new 404();    // Start app
});