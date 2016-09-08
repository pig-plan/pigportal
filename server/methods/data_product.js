Meteor.methods({

    "TWO_YEARS.get": function(pastY, curY) {
        var response = HTTP.get('http://localhost:4100/pig-portal/two-years/' + pastY + '/' + curY);
        return JSON.parse(response.content);
    },

    "CURRENT_WEEK.get": function() {
        var response = HTTP.get('http://localhost:4100/pig-portal/currentweek');
        return JSON.parse(response.content)[0]['WEEK'];
    }

});
