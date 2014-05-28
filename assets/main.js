angular.module('app', ['ngRoutes'])

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller:'mainCtrl',
      templateUrl:'partials/index.html'
    })
    .otherwise({
      redirectTo:'/'
    });
})



.controller('mainCtrl', function($scope, $http){

})
