Meteor.methods({

    "TWO_YEARS.get": function(pastY, curY) {
        var result = HTTP.get('http://210.92.91.212:4100/pig-portal/two-years/' + pastY + '/' + curY);
        return result;
    },

    "CURRENT_WEEK.get": function() {
        var result = HTTP.get('http://210.92.91.212:4100/pig-portal/currentweek');
        return result;
    },

});
