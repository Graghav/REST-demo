var helloApp = angular.module('helloApp',[]);

var username = "";


helloApp.controller('statusCtrl', function ($scope, $http) {

	$scope.stat = {};

	$scope.feed = [];

	$scope.user = {};

	$scope.user.username = "";

	$scope.loggedIn = false;

	$scope.userOwnFeed = [];

	$scope.getFeed = function() {
		$http.get('/v1/status/retrieve')

		.success(function(res){
			$scope.feed = res.reverse();
			if(username) {
					$scope.userOwnFeed = _.where($scope.feed, { username: username })
			}
		
		})
	}

	setInterval($scope.getFeed, 500);

	$scope.share = function() {

		var d = new Date();

		var time = d.getHours() + ":" + d.getMinutes() + ( (d.getHours() >= 12) ? " PM" : " AM");

		$scope.stat.time = time;
		$scope.stat.username = username;

		$http.post('v1/status/create', $scope.stat )
		
		.success(function(res){
			$scope.feed = res.data.reverse();
			$scope.stat.status = "";
		});

	}

	$scope.create = function() {

		$http.post('v1/user/create', $scope.user)
		
		.success(function(res){
			username = $scope.user.username;
			$scope.loggedIn = true;
		});
	}
})	