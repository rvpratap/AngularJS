angular.module('todoApp',[])
.controller('todoCtrl', function($scope, todoFactory) {
	    var uid=0;
		$scope.todos=todoFactory.get();

		$scope.addToDo=function($event){
			if($event.charCode === 13) {
				var todo={
					id: uid++,
					text: $scope.todoText,
					isCompleted: false
				}
				$scope.todos.push(todo);				
			}	
			//$scope.todoText='';            
		}

		$scope.TodoEdit=function(todo){
			todo.tmpvar=todo.text;
			todo.todoShowHide=true;
		}
		$scope.TodoSave=function(todo){
			todo.todoShowHide=false;			
		}
		$scope.TodoDelete=function($index){
			$scope.todos.splice($index, 1);			
		}
		$scope.TodoCancel=function(todo){
			todo.text=todo.tmpvar;
			todo.todoShowHide=false;			
		}
})

.controller('headerCtrl',function($scope, todoFactory) {
	$scope.todos=todoFactory.get();

})

.factory('todoFactory', function() {
	var todos=[];
	return {
		get: function() {
			return todos;
		}
	};

})