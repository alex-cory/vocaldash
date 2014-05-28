angular.module('app', [])


.controller('mainCtrl', function($scope, $http){
   $http.get('/').success(function(data){


   });
})
