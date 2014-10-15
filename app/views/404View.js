var $ = require('jquery'),
    B = require('backbone');
B.$ = $;
var template = require('../templates/404.html');

var 404View = B.View.extend({
    id : 'page_not_found',

    initialize : function() {
        this.render();
    },

    render: function() {
        this.$el.html(template());
    },

    tearDown: function() {
        this.off();
        this.remove();
    }
});

module.exports = 404View;