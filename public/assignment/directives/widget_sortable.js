(function () {

    angular
        .module('WAM')
        .directive('wdDraggable', draggable);

    function draggable () {

        function linkFunction(scope, element) {
            element.sortable({
                tolerance: 'touch',
                start: function(e, ele) {
                    this.startIndex = ele.item.index();
                },
                stop: function(e, ele) {
                    scope.callback({arg1: this.startIndex, arg2: ele.item.index()});
                }
            });
        }

        return {
            scope: { callback: '&' },
            link: linkFunction
        };
    }
})();
