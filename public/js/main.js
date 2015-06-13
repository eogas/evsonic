/// <reference path="../../typings/angularjs/angular.d.ts"/>

var app = angular.module('evsonic', ['ngRoute', 'ngResource']).
	controller('EvsonicCtrl').
	config(MainConfig);

function MainConfig($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	
	// TODO create 'home' partial and controller
	$routeProvider.when('/music', {
		templateUrl: 'partials/music.html',
		controller: 'MusicCtrl'
	}).when('/video', {
		templateUrl: 'partials/video.html',
		controller: 'VideoCtrl'
	}).when('/settings', {
		templateUrl: 'partials/settings.html',
		controller: 'SettingsCtrl'
	});
};

app.controller('EvsonicCtrl', function ($scope, $http) {
	$scope.state = {
		activeTab: ''
	};
	
	$scope.state.activeTab = '';
	
	$scope.logout = function() {
		$http.delete('/session').success(function() {
			window.location.href = '/';
		});
	};
});

// TODO can we move these controllers into their own files?
app.controller('MusicCtrl', function ($scope, $controller) {
	$scope.state.activeTab = 'music';
});

app.controller('VideoCtrl', function ($scope, $controller) {
	$scope.state.activeTab = 'video';
});

app.controller('SettingsCtrl', function ($scope, $controller, $resource) {
	$scope.state.activeTab = 'settings';
	
	var MediaDir = $resource('/mediadir/:id', {
		id: '@id'
	});
	
	// fetch all media dirs
	$scope.mediadirs = MediaDir.query();
	
	// blank model instance for the create dir form
	$scope.newdir = new MediaDir();
	
	// use to display error messages
	$scope.lastError = '';
	
	// use to display success messages
	$scope.lastSuccess = '';
	
	$scope.add = function(mediadir) {
		mediadir.$save(function(savedDir) {
			$scope.mediadirs = MediaDir.query();
			$scope.newdir = new MediaDir();
			
			$scope.lastError = '';
			$scope.lastSuccess = 'New media directory added successfully.';
		}, function(err) {
			$scope.lastError = err.data;
			$scope.lastSuccess = '';
		});
	};
	
	$scope.delete = function(mediadir) {
		mediadir.$delete(function() {
			$scope.mediadirs = MediaDir.query();
			
			$scope.lastError = '';
			$scope.lastSuccess = 'Media directory deleted successfully.';
		}, function(err) {
			$scope.lastError = err.data;
			$scope.lastSuccess = '';
		});
	};
	
	$scope.dismissError = function() {
		$scope.lastError = '';
	};
	
	$scope.dismissSuccess = function() {
		$scope.lastSuccess = '';
	};
});
