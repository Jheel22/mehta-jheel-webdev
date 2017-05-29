angular
    .module('WAM')
    .controller('themeController', themeController)
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('customTheme')
            .primaryPalette('blue')
            .accentPalette('pink')
            .warnPalette('red');
    });

function themeController ($scope) {
    $scope.sizes = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6"
    ];
    $scope.widths = [
        "10%",
        "20%",
        "30%",
        "40%",
        "50%",
        "60%",
        "70%",
        "80%",
        "90%",
        "100%"
    ];
    $scope.profile={
        name:'Jheel93',
      email:'jheel@gmail.com',
        first:'Jheel',
        last:'Mehta'
    };
    $scope.editwebsite={
        name:'Website 1',
        disc:'Website Description'
    }
    $scope.editpage={
        name:'Page 1',
        title:'Page Description'
    }
}
