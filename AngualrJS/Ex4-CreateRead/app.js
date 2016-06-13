angular.module('todoApp',[])
.controller('todoCtrl', function($scope) {
	    var uid=0;
		$scope.todos=[];
		$scope.addToDo=function($event){
			if($event.charCode === 13) {
				var todo={
					id: uid++,
					text: $scope.todoText,
					isCompleted: false
				}
				$scope.todos.push(todo);
			}
            
		}

});