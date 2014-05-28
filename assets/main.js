angular.module('app', ['ngRoutes'])

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller:'postCtrl',
      templateUrl:'partials/post.html'
    })
    .when('/post/:id', {
      controller:'postCtrl',
      templateUrl:'partials/post.html'
    })
    .when('/edit/:projectId', {
      controller:'EditCtrl',
      templateUrl:'partials/details.html'
    })
    .when('/new', {
      controller:'createCtrl',
      templateUrl:'partials/details.html'
    })
    .otherwise({
      redirectTo:'/'
    });
})



.controller('mainCtrl', function($scope, $http){
   $http.get('/').success(function(data){


   });
})
