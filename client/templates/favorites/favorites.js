Template.favorites.helpers({
    postsCategory: function() {
        return this.categoryName;
    },
    postsList: function() {
        return Favorites.find({category: this.categoryName}, {sort: {name: 1}});
    }
});
