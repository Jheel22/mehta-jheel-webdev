(function () {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);
    
    function websiteEditController($routeParams,
                                   $location,
                                   currentUser,
                                   websiteService,
    userService) {
        var model = this;

        model.userId = currentUser._id; //model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;
        model.logout=logout;
        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(renderWebsites);
            model.website = angular.copy(websiteService
                .findWebsiteById(model.websiteId)
                .then(renderWebsite, WebsiteError));
        }
        init();

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        function renderWebsites(websites) {
            model.websites = websites;
        }

        function deleteWebsite(websiteId) {
           /* websiteService.deleteWebsite(websiteId);
            $location.url('/user/'+model.userId+'/website');*/
            websiteService
                .deleteWebsite(model.userId,websiteId)
                .then(function () {
                    $location.url('/website');
                }, function () {
                    model.error = "Unable to add website";
                });
        }

        /*function updateWebsite() {
            websiteService.updateWebsite(model.websiteId,model.website);
            $location.url('/user/'+model.userId+'/website');
        }*/
        function updateWebsite(website) {
            if(website.name === null || website.name === '' || typeof website.name === 'undefined') {
                model.error = 'Website name is required';
                return;
            }
            websiteService
                .updateWebsite(website._id, website)
                .then(function () {
                    $location.url('/website');
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