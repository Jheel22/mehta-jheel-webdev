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
            model.websites = websiteService.findAllWebsitesForUser(model.userId);
            model.website = angular.copy(websiteService.findWebsiteById(model.websiteId));
        }
        init();

        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(websiteId);
            $location.url('/user/'+model.userId+'/website');
        }

        function updateWebsite() {
            websiteService.updateWebsite(model.websiteId,model.website);
            $location.url('/user/'+model.userId+'/website');
        }
    }
})();