var adminRoutes = FlowRouter.group({
    prefix: '/admin',
    name: 'admin'
});

FlowRouter.route(['/', '/home'], {
    subscriptions: function() {
        this.register('categorieslist', Meteor.subscribe('category'));
        this.register('productsList', Meteor.subscribe('products'));
        this.register('usercart', Meteor.subscribe('usercart', Meteor.userId()));
    },
    action: function() {
        console.log("Running Action to render templates into layouts");
        BlazeLayout.render('layout', {sidebar_left:'sidebar', main:'home', sidebar_right:''});
    }
});

// News

FlowRouter.route('/news', {
    subscriptions: function(params, queryParams) {
        var limit, offset, page;
        page = parseInt(queryParams.page) || 0;
        limit = 10;
        offset = page * limit;
        return this.register('newsList', Meteor.subscribe('newsList', offset, limit));
    },
    action: function() {
        BlazeLayout.render('layout', {sidebar_left:'news_category', main:'news', sidebar_right:'widget_1'});
    }
});

FlowRouter.route('/news/:newsCategory', {
    subscriptions: function(params, queryParams) {
        var limit, offset, page;
        page = parseInt(queryParams.page) || 0;
        limit = 10;
        offset = page * limit;
        return this.register('categoryNewsList', Meteor.subscribe('categoryNewsList', params.newsCategory, offset, limit));
    },
    action: function(params) {
        BlazeLayout.render('layout', {sidebar_left:'news_category', main:'news', sidebar_right:'widget_1'});
    }
});

adminRoutes.route('/news', {
    subscriptions: function() {
        this.register('newsListAdmin', Meteor.subscribe('newsListAdmin'));
    },
    action: function() {
        BlazeLayout.render('layout_admin', {main:'news_admin'});
    }
});

// Focus

adminRoutes.route('/focus', {
    subscriptions: function() {
        this.register('focusListAdmin', Meteor.subscribe('focusListAdmin'));
    },
    action: function() {
        BlazeLayout.render('layout_admin', {main:'focus_admin'});
    }
});

FlowRouter.route('/admin', {
    subscriptions: function() {
        this.register('categorieslist', Meteor.subscribe('category'));
        this.register('productsList', Meteor.subscribe('products'));
    },
    action: function() {
        if(Roles.userIsInRole(Meteor.userId(), 'admin')) {
            BlazeLayout.render('layout', {sidebar_left:'', main:'admin', sidebar_right:''});
        } else {
            BlazeLayout.render('layout', {sidebar_left:'', main:'unauthorized', sidebar_right:''});
        }
    }
});
FlowRouter.route('/register', {
    action: function() {
        BlazeLayout.render('layout', {sidebar_left:'', main:'register', sidebar_right:''});
    }
});
FlowRouter.route('/profile', {
    action: function() {
        BlazeLayout.render('layout', {sidebar_left:'', main:'profile', sidebar_right:''});
    }
});
FlowRouter.route('/signin', {
    action: function() {
        BlazeLayout.render('layout', {sidebar_left:'', main:'signin', sidebar_right:''});
    }
});
FlowRouter.route('/signout', {
    action: function() {
        Meteor.logout(function(err) {
            if(!err) {
                FlowRouter.go('/signin');
            }
        })
    }
});
FlowRouter.route('/checkout', {
    action: function() {
        BlazeLayout.render('layout', {sidebar_left:'', main:'checkout', sidebar_right:''});
    }
});
FlowRouter.route('/category/:categoryName', {
    subscriptions: function(params) {
        this.register('catlist', Meteor.subscribe("category"));
        this.register('catproducts',Meteor.subscribe('products'));
        this.register('usercart', Meteor.subscribe('usercart', Meteor.userId()));
    },
    triggersEnter: function(params) {
        console.log("ENTER", params);
    },
    triggersExit: function(params) {
        console.log("EXIT", params);
    },
    action: function() {
        console.log("Running Action to render templates into layouts")
        BlazeLayout.render('layout', {sidebar_left:'sidebar', main:'category', sidebar_right:''});
    }
});