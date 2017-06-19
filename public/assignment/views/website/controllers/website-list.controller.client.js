(function () {
    angular
        .module('WAM')
        .controller('websiteListController', websiteListController);
    
    function websiteListController($routeParams,
                                   currentUser,
                                   $location,
                                   websiteService,userService) {
        var model = this;
        model.logout=logout;
        model.userId = currentUser._id; //model.userId = $routeParams['userId'];

        function init() {
            // model.websites = websiteService.findAllWebsitesForUser(model.userId);
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(renderWebsites);
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
    }
})();