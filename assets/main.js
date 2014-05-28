

angular.module('main', [])

.controller('userInput', function($scope, $http){
  $scope.active = false;
  //Microphone handler
  var mic = new Wit.Microphone($scope.microphone);
  $scope.micRunning = false;
  mic.onready = function(){
    console.log("ready")
  };

  mic.onerror = function(err){
    console.log("error" + err)
  };
  mic.onaudiostart = function () {
    console.log("mic started");
    $scope.micRunning = true;
  };
  mic.onaudioend = function () {
    console.log("mic stopped");
    $scope.micRunning = false;
  };
  mic.onresult = function (intent, entities) {
    console.log(entities);
  };
  mic.connect("O5OAGEKON63WTIBJTHRD3SXOOTJEZWSV");
  //input field handler
  $scope.typeAction = function(event){
    if(event.keyCode != 13) return;
    executeCommand($scope.input);

  };
  var getTrendingTweets = function(){
    $http.jsonp("https://api.twitter.com/1.1/trends/place.json?id=1").error(function(data, status, headers, config) {
      console.log("data = " + data);
    });
  };
  var executeCommand = function(input){
    $scope.active = true;
    getTrendingTweets();
  };

  $scope.micAction = function(){
    if(!$scope.micRunning)
      mic.start();
    else
      mic.stop();
  };

})
