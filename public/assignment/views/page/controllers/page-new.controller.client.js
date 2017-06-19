(function () {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);
    
    function pageNewController($routeParams,
                                   $location,
                               currentUser,
                                   pageService,userService) {
        var model = this;
        model.userId = currentUser._id;
        //model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.pageId=$routeParams.pageId;
        model.createPage = createPage;
        model.logout=logout;

        function init() {
            pageService
                .findPageByWebsiteId(model.websiteId)
                .then(renderPages);
            //model.pages = pageService.findPageByWebsiteId(model.websiteId);
            //console.log("LENGTH : " + model.pages.length);
        }
        init();

        function renderPages(pages) {
            model.pages = pages;
        }
        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }
        function createPage(page) {
            if(typeof page === 'undefined')
            {
                model.error = 'Page name is required';
                return;
            }
            if(page.name === null || page.name === '' || typeof page.name === 'undefined') {
                model.error = 'Page name is required';
                return;
            }
            pageService
                .findPageByPagename(page)
                .then(
                    function () {
                        model.error = "sorry, that page name is taken";
                    },
                    function () {
                        return pageService
                            .createPage(model.websiteId,page);
                    }
                )
                .then(function (user) {
                    $location.url('/website/'+model.websiteId+'/page');
                });
           // page.websiteId = model.websiteId;
            //pageService.createPage(model.websiteId,page);
            //$location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }
    }
})();