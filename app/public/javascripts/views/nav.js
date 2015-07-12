/**
 * Created by ManasB on 6/28/2015.
 */

define([
    "underscore",
    "jquery",
    "backbone",
    "collections/subreddits",
    "views/login_modal",
    "swig",
    "text!../../templates/sidebar.html",
    "text!../../templates/sidebar_menu.html",
    "bootstrap"
], function (_, $, Backbone, SubredditsCollection, loginModalView, swig, sidebarTemplate, sidebarMenu) {
    "use strict";

    var NavView = Backbone.View.extend({
        el: "#sidebar",
        initialize: function () {
            this.defaultSubreddits = new SubredditsCollection({type: "defaults"});
            this.userSubreddits = new SubredditsCollection({type: "user"});
            this.popularSubreddits = new SubredditsCollection({type: "popular"});

            loginModalView.on("login.success", this.render, this);
            this.defaultSubreddits.on("reset", this.refreshSidebarMenu, this);
            this.userSubreddits.on("reset", this.refreshSidebarMenu, this);
            this.popularSubreddits.on("reset", this.refreshSidebarMenu, this);
        },
        render: function () {
            this.$el.html(sidebarTemplate);

            this.$subredditInput = $("#subreddit-input");
            this.$menu = $("#menu-accordion");

            this.refreshSidebarMenu();

            this.defaultSubreddits.fetch();
            this.userSubreddits.fetch();
            this.popularSubreddits.fetch();
        },
        events: {
            "keypress #subreddit-input": "jumpToSubreddit",
            "click #subreddit-go-button": "jumpToSubreddit",
            "click #logout-button": "logout",
            "click #light-theme-button": function () {this.switchTheme("light")},
            "click #dark-theme-button": function () {this.switchTheme("dark")}
        },
        refreshSidebarMenu: function () {
            var compiledTemplate = swig.render(sidebarMenu, {
                locals: {
                    username: localStorage.getItem("username"),
                    defaults: this.defaultSubreddits.toJSON(),
                    popular: this.popularSubreddits.toJSON(),
                    subs: this.userSubreddits.toJSON()
                }
            });
            this.$menu.html(compiledTemplate);
        },
        jumpToSubreddit: function (event) {
            if (event.which == 1 || event.which == 13) {
                event.preventDefault();
                Backbone.history.navigate("/r/" + this.$subredditInput.val(), {trigger: true});
            }
        },
        logout: function () {
            // clear cache
            localStorage.clear();

            this.render();

            Backbone.history.loadUrl();
        },
        switchTheme: function (type) {
            var $darkAppStyle = $("#dark-app-style");

            switch(type) {
                case "light":
                    $darkAppStyle.removeAttr("href");
                    break;
                case "dark":
                    $darkAppStyle.attr("href", "stylesheets/index.dark.css");
                    break;
                default:
                    throw new Error("Theme type can only be 'light' or 'dark'");
                    break;
            }
        }
    });

    return new NavView();
});