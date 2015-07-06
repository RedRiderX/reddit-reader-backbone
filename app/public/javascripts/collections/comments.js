/**
 * Created by ManasB on 7/6/2015.
 */

define([
    "underscore",
    "jquery",
    "backbone",
    "models/comment"
], function (_, $, Backbone, CommentModel) {
    var CommentsCollection = Backbone.Collection.extend({
        model: CommentModel,
        url: "/api/comments",
        fetch: function (subreddit, postId, sort) {
            var self = this;
            $.ajax({
                url: self.url,
                method: "GET",
                dataType: "json",
                data: {subreddit: subreddit, id: postId, sort: sort},
                timeout: 3000,
                success: function (response) {
                    self.reset(response);
                },
                error: function (jqXHR, textStatus, error) {
                    if (textStatus == "timeout") {
                        console.log("timed out");
                        setTimeout(function () {
                            self.fetch(subreddit, postId, sort);
                        }, 1000);

                    } else {
                        self.trigger("error", error);
                    }
                }
            });
        },

    });

    return new CommentsCollection();
});