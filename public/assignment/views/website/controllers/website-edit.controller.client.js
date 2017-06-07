(function () {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);
    
    function websiteEditController($routeParams,
                                   $location,
                                   websiteService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;
        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(renderWebsites);
            model.website = angular.copy(websiteService
                .findWebsiteById(model.websiteId)
                .then(renderWebsite, WebsiteError));
        }
        init();

        function renderWebsites(websites) {
            model.websites = websites;
        }

        function deleteWebsite(websiteId) {
           /* websiteService.deleteWebsite(websiteId);
            $location.url('/user/'+model.userId+'/website');*/
            websiteService
                .deleteWebsite(websiteId)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website');
                }, function () {
                    model.error = "Unable to add website";
                });
        }

        /*function updateWebsite() {
            websiteService.updateWebsite(model.websiteId,model.website);
            $location.url('/user/'+model.userId+'/website');
        }*/
        function updateWebsite(website) {
            websiteService
                .updateWebsite(website._id, website)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website');
                })
        }

        function renderWebsite (website) {
            model.website = website;
        }

        function WebsiteError(website) {
            model.error = "Website not found";
        }
    }
})();