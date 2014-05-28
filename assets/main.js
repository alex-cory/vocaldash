

angular.module('app', ['ngRoute', 'ngCookies', 'ngSanitize'])

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl:'partials/index.html'
    })
    .otherwise({
      redirectTo:'/'
    });
})

.controller('headerCtrl', function($scope, Posts, $cookies, $location){
})
