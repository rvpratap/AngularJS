angular.module("customApp", ['customApp.Filters','customApp.directives'])

.controller('customCtrl',['$scope',function($scope){
	$scope.name='Aravind';
}])


angular.module('customApp.Filters',[])

.filter('xFilter', function(){
	return function(val){
        if(typeof val==='number') {
        	return parseInt(val)+20;
        }
        else {
        	return val + 20;
        }
	}
})

.filter('checkmark', function(){
	var filterFunction=function(input) {
		return input ? '\u2713' : '\u2718'
	};
	return filterFunction;
})


angular.module('customApp.directives',[])

.directive('printThis',[function(){
	return {
		restrict: 'AEC',
		scope: {
			text: '@text'
		},
		template: '<input type="text" ng-model="text">{{text}}',
		link: function(s,e,a){}
	}
}])

