(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);
    
    function websiteNewController($routeParams,
                                   $location,
                                   websiteService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.createWebsite = createWebsite;

        function init() {
           /* model.websites = websiteService.findAllWebsitesForUser(model.userId);*/
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(renderWebsites);
        }
        init();

        function renderWebsites(websites) {
            model.websites = websites;
        }

        function createWebsite(website) {
           /* website.developerId = model.userId;
            websiteService.createWebsite(website);
            $location.url('/user/'+model.userId+'/website');*/

            websiteService
                .findWebsiteByWebsitename(website)
                .then(
                    function () {
                        model.error = "sorry, that website name is taken";
                    },
                    function () {
                        return websiteService
                            .createWebsite(website,model.userId);
                    }
                )
                .then(function (user) {
                    $location.url('/user/'+model.userId+'/website');
                });
        }
    }
})();