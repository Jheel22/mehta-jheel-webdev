(function () {
    angular
        .module('WAM')
        .controller('pageListController', pageListController);
    
    function pageListController($routeParams,
                                currentUser,
                                $location,
                                   pageService,userService) {
        var model = this;
        model.userId = currentUser._id;
        //model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.logout=logout;
        //console.log(model.userId, model.websiteId);
        function init() {
            pageService.findPageByWebsiteId(model.websiteId)
                .then(renderPages);
            /*model.pages = pageService.findPageByWebsiteId(model.websiteId);*/
            //console.log("LENGTH : " + model.pages.length);
        }
        init();
        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }
        function renderPages(pages) {
            model.pages = pages;
        }
    }
})();