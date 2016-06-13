angular.module('myApp',[])
.controller('myCtrl', function($scope) {
	
		$scope.myName="Angular";
		$scope.edit=function(){
			$scope.isEditMode=true;
		}
		$scope.save=function(){
			$scope.isEditMode=false;
		}

});