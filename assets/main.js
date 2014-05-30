angular.module('main', [])

.config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
})

.controller('userInput', function($scope, $http){
  $scope.active = false;
  $scope.shopping = false;
  $scope.outs = [];
  $scope.microphoneUrl = 'microphone';
  $scope.openStore = function(){
    $scope.shopping = !$scope.shopping;
  };
  //Microphone handler
  var mic = new Wit.Microphone($scope.microphone);
  $scope.micRunning = false;
  mic.onready = function(){
//    console.log("ready")
  };

  mic.onerror = function(err){
    console.log("error" + err)
  };
  mic.onaudiostart = function () {
    console.log("mic started");
    $scope.micRunning = true;
    $scope.microphoneUrl = "none";
  };
  mic.onaudioend = function () {
//    console.log("mic stopped");
    $scope.micRunning = false;
    $scope.microphoneUrl = "microphone";
  };
  mic.onresult = function (intent, entities, res) {
//    console.log(intent);
    if(intent != "errorWit did not recognize intent" && res.outcome.confidence > .5){
      $scope.active = true;
      $scope.input = res.msg_body;
      console.log(res);
      switch(intent){
        case "twitter":
          getTweets();
          break;
        case "images":
          if(entities.search_query !== null)
            getImages(entities.search_query);
          else
            getImages("");
          break;
        case "greeting":
          var rand = parseInt((Math.random() * 100) % 3, 10);
          if(rand == 0)
            $scope.outs.unshift({'type':'greeting', 'data': 'Hello ... Jerk'});
          else if(rand == 1)
            $scope.outs.unshift({'type':'greeting', 'data': 'Oh ... You again'});
          else
            $scope.outs.unshift({'type':'greeting', 'data': 'Oh, I didn\'t see you there ... you know with the whole not having eyes and what not'});
          break;
      }
      $scope.$apply();
    }
  };
  mic.connect("O5OAGEKON63WTIBJTHRD3SXOOTJEZWSV");
  $scope.typeAction = function(event){
    if(event.keyCode != 13) return;
    executeCommand($scope.input);
  };
  var getTweets = function(){
    $http.get("/twittertest.json").success(function(data){
      console.log(data);
      var tweets = data.statuses;
      $scope.outs.unshift({'type': 'twitter', 'data': tweets});
    }).error(function(data){
      console.log("error = " + data);
    });
  };
  var getImages = function(filter){
    $http.get("/getty.php?filter=" + filter.value).success(function(data){
      console.log(data.SearchForImagesResult);
      var images = data.SearchForImagesResult.Images;
      console.log(filter.value);
      $scope.outs.unshift({'type': 'images', 'data': images});
    }).error(function(data){
      console.log("error = " + data);
    });
  };
  var executeCommand = function(input){
    $scope.active = true;
    $http.jsonp("http://api.wit.ai/message?q="+encodeURIComponent(input)+"&access_token=4ZC7OUMQCOEXHNK6GCE7VNTTI52XPDDF&callback=JSON_CALLBACK")
    .success(function(data){
      var intent = data.outcome.intent;
      var entities = data.outcome.entities;
      var res = data.outcome;

      if(intent != "errorWit did not recognize intent" && data.outcome.confidence > .5){
      $scope.active = true;
      $scope.input = data.msg_body;
      console.log(intent);
      switch(intent){
        case "twitter":
          getTweets();
          break;
        case "images":
          if(entities.search_query !== null)
            getImages(entities.search_query);
          else
            getImages("");
          break;
        case "greeting":
          var rand = parseInt((Math.random() * 100) % 3, 10);

          if(rand == 0)
            $scope.outs.unshift({'type':'greeting', 'data': 'Hello ... Jerk'});
          else if(rand == 1)
            $scope.outs.unshift({'type':'greeting', 'data': 'Oh ... You again'});
          else
            $scope.outs.unshift({'type':'greeting', 'data': 'Oh, I didn\'t see you there ... you know with the whole not having eyes and what not'});
          break;
      }
      $scope.$apply();
    }
    }).error(function(data){
    });
  };

  $scope.micAction = function(){
    console.log("test");
    if(!$scope.micRunning)
      mic.start();
    else
      mic.stop();
  };

})
