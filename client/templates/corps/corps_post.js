Template.corps_post.helpers({
    post: function() {
        var postId = this.postId;
        return Corps.find({
            _id: postId
        }).fetch()[0];
    }
});

Template.corps_post.events({
    'click .nv-share': function() {
        window.open('https://band.us/plugin/share?body='+encodeURIComponent($('#content').val())+'&route='+encodeURIComponent(document.URL), 'bandsharedialog', 'menubar=no,toolbar=no,resizable=no,scrollbars=yes,height=540,width=410');
    },
    'click .kk-share': function() {
        window.open('https://story.kakao.com/share?url='+encodeURIComponent(document.URL), 'kakaostorysharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=540,width=410');
    },
    'click .fb-share': function() {
        window.open('https://www.facebook.com/dialog/share?app_id=150240602048486&display=popup&href='+encodeURIComponent(document.URL)+'&redirect_uri=http://pig-portal.herokuapp.com', 'facebooksharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=540,width=410');
    }
})
