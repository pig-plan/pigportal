Template.case_post.helpers({
    post: function() {
        var postId = this.postId;
        return Case.find({_id: postId}).fetch()[0];
    }
});

Template.case_post.events({
    'click .nv-share': function() {
        window.open('https://band.us/plugin/share?body='+encodeURIComponent($('#content').val())+'&route='+encodeURIComponent(document.URL), 'bandsharedialog', 'menubar=no,toolbar=no,resizable=no,scrollbars=yes,height=540,width=410');return false;
    },
    'click .kk-share': function() {
        window.open('https://story.kakao.com/share?url='+encodeURIComponent(document.URL), 'kakaostorysharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=540,width=410');return false;
    },
    'click .fb-share': function() {
        window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(document.URL)+'&t='+encodeURIComponent($('h1').value()), 'facebooksharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=540,width=410');return false;
    }
})
