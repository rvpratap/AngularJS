angular.module('NGBSApp',['ngRoute'])

.config(function($routeProvider){
    $routeProvider
    .when('/home',{
    	templateUrl: 'Templates/home.html'
    })
    .when('/about',{
    	templateUrl: 'Templates/about.html'
    })
    .when('/contact',{
    	templateUrl: 'Templates/contactus.html'
    })
    .otherwise({
    	redirectTo: '/home'
    });
})

.run(function($rootScope){
	console.log('run');
	//$rootScope.headerUrl='Templates/header.html';
})

.controller('headerCtrl',function($scope, $location){
	$scope.isActive=function(url) {
		return $location.path() === url;
	}

})
