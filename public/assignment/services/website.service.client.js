(function () {
    angular
        .module('WAM')
        .service('websiteService', websiteService);

    function websiteService($http) {
        var api = {
            findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        deleteWebsite: deleteWebsite,
        createWebsite: createWebsite,
        updateWebsite: updateWebsite,
        findWebsiteByWebsitename: findWebsiteByWebsitename
    }
    return api;

        function createWebsite(website,userId) {
            /*website._id = (new Date()).getTime() + "";
            websites.push(website);*/
            var url = "/api/assignment/user/"+userId+"/website";
            return $http.post(url, website)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWebsite(userId,websiteId) {
            /*var website = findWebsiteById(websiteId);
            var index = websites.indexOf(website);
            websites.splice(index, 1);*/
            var url = "/api/assignment/user/"+userId+"/website/" + websiteId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWebsiteById(websiteId) {
            /*return websites.find(function (website) {
                return website._id === websiteId;
            });*/
            var url = "/api/assignment/website/"+websiteId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        function updateWebsite(websiteId, website) {
            /*var wid = findWebsiteById(websiteId);
            var index = websites.indexOf(wid);
            websites[index] = website;*/
            var url = "/api/assignment/website/"+websiteId;
            return $http.put(url, website)
                .then(function (response) {
                    return response.data;
                });
        }
        function findWebsiteByWebsitename(website) {
            var url = "/api/assignment/user/:userId/website?websitename="+website.name;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            // var user = users.find(function (user) {
            //     return user.username === username;
            // });
            // if(typeof user === 'undefined') {
            //     return null;
            // }
            // return user;
        }
        function findAllWebsitesForUser(userId) {
            var url = "/api/assignment/user/"+userId+"/website";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            /*var results = [];

            for(var v in websites) {
                if(websites[v].developerId === userId) {
                    websites[v].created = new Date();
                    websites[v].accessed = new Date();
                    results.push(websites[v]);
                }
            }

            return results;*/
        }
    }
})();