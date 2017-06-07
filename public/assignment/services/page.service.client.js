(function () {
    angular
        .module('WAM')
        .service('pageService', pageService);

    function pageService($http) {
        var api = {
            findPageById: findPageById,
            findPageByWebsiteId: findPageByWebsiteId,
            deletePage: deletePage,
            createPage: createPage,
            updatePage: updatePage,
            findPageByPagename:findPageByPagename
        }
        return api;
        function createPage(websiteId, page) {
            /*page._id = (new Date()).getTime() + "";
             page.websiteId=websiteId;
             pages.push(page);*/
            var url = "/api/assignment/website/"+websiteId+"/page";
            return $http.post(url, page)
                .then(function (response) {
                    return response.data;
                });
        }

        function deletePage(pageId) {
            /*var page = findPageById(pageId);
             var index = pages.indexOf(page);
             pages.splice(index, 1);*/
            var url = "/api/assignment/page/"+pageId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPageByWebsiteId(websiteId) {

            /*var results = [];

             for(var v in pages) {
             if(pages[v].websiteId === websiteId) {
             pages[v].created = new Date();
             pages[v].accessed = new Date();

             results.push(pages[v]);
             }
             }

             return results;*/
            var url = "/api/assignment/website/"+websiteId+"/page";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        function updatePage(pageId, page) {
            /*var pid = findPageById(pageId);
             var index = pages.indexOf(pid);
             pages[index] = page;*/
            var url = "/api/assignment/page/"+pageId;
            return $http.put(url, page)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPageByPagename(page) {
            var url = "/api/assignment/website/websiteId/page?pagename="+page.name;
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

        function findPageById(pageId) {
            var url = "/api/assignment/page/"+pageId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            /*return pages.find(function (page) {
             return page._id === pageId;
             });*/
        }
    }
})();