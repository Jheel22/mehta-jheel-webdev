(function () {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);
    
    function pageEditController($routeParams,
                                   $location,
                                currentUser,
                                   pageService,userService) {
        var model = this;
        model.userId = currentUser._id;
        //model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.pageId=$routeParams.pageId;
        model.deletePage = deletePage;
        model.updatePage = updatePage;
        model.logout=logout;
        function init() {
            pageService
                .findPageByWebsiteId(model.websiteId)
                .then(renderPages);
            model.page = angular.copy(pageService
                .findPageById(model.pageId)
                .then(renderPage, PageError));
            //model.pages = pageService.findPageByWebsiteId(model.websiteId);
         //   model.page =angular.copy(pageService.findPageById(model.pageId));
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
        function deletePage(pageId) {
            pageService
                .deletePage(model.websiteId,pageId)
                .then(function () {
                    $location.url('/website/'+model.websiteId+'/page');
                }, function () {
                    model.error = "Unable to add page";
                });
            /*pageService.deletePage(pageId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');*/
        }
        function updatePage(page) {
            if(page.name === null || page.name === '' || typeof page.name === 'undefined') {
                model.error = 'Page name is required';
                return;
            }
            pageService
                .updatePage(page._id, page)
                .then(function () {
                    $location.url('/website/'+model.websiteId+'/page');
                })
            /*pageService.updatePage(model.pageId,model.page);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');*/
        }
        function renderPage (page) {
            model.page = page;
        }

        function PageError(page) {
            model.error = "page not found";
        }

    }
})();