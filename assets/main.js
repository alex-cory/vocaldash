

angular.module('main', ['ngRoutes'])

.controller('mainCtrl', function($scope, $http){
   $http.get('/someUrl').success(function(data){

   });
})
