angular.module('todoApp',[])
.controller('todoCtrl', function($scope, $rootScope, todoFactory,todoLSFactory) {
	    //var uid=todoLSFactory.genUID();
		//$scope.todos=todoFactory.get();

        //$scope.todos=todoLSFactory.read();

        $scope.$on('loadTodos',function(){
        	$scope.todos=todoLSFactory.read();
        	$rootScope.$broadcast('uploadotherScopetodos');
        });

        $scope.$broadcast('loadTodos');

		$scope.addToDo=function($event){
			if($event.charCode === 13) {
				var todo={
					//id: uid++,
					id: todoLSFactory.genUID(),
					text: $scope.todoText,
					isCompleted: false
				}
				//$scope.todos.push(todo);
				todoLSFactory.create(todo);
				$scope.$broadcast('loadTodos');
				$scope.todoText=''; 				
			}	
			           
		}

		$scope.TodoEdit=function(todo){
			todo.tmpvar=todo.text;
			todo.todoShowHide=true;
		}
		$scope.TodoSave=function(todo){
			//todo.todoShowHide=false;
			delete todo.todoShowHide;
			delete todo.$$hashKey;
			delete todo.tmpvar;
			todoLSFactory.update(todo);
		}
		$scope.TodoDelete=function($index,todo){
			//$scope.todos.splice($index, 1);
			todoLSFactory.delete(todo);
			$scope.$broadcast('loadTodos');			
		}
		$scope.TodoCancel=function(todo){
			todo.text=todo.tmpvar;
			todo.todoShowHide=false;			
		}
})

.controller('headerCtrl',function($scope, $rootScope, todoFactory, todoLSFactory) {
	//$scope.todos=todoFactory.get();

	//$scope.todos=todoLSFactory.read();
	$scope.$on('uploadotherScopetodos',function(){
          $scope.todos=todoLSFactory.read();
	});

})

.factory('todoFactory', function() {
	var todos=[];
	return {
		get: function() {
			return todos;
		}
	};

})

.factory('todoLSFactory', function(LSFactory) {
	return {
		read: function(){
			var todos=[];
			var lsObj=LSFactory.getAll();
			var keys=Object.keys(lsObj);
			for(var i=0;i<keys.length;i++) {
				if(keys[i].indexOf('todo-') === 0){
					todos.push(JSON.parse(lsObj[keys[i]]));
				}
			}
			return todos;
		},
		create: function(todo){
			return LSFactory.create("todo-" + todo.id,todo);
		},
		update: function(todo){
			return LSFactory.update("todo-" + todo.id,todo);
		},
		delete: function(todo){
			return LSFactory.delete("todo-" + todo.id);
		},
		genUID: function(){
			return Math.floor(Math.random() * 1000);
		}
	};

})

.factory('LSFactory', function($window){
	return {
		getAll: function(){
			return $window.localStorage;
		},
		get: function(key){
			return JSON.parse($window.localStorage.getItem(key));
		},
		create: function(key, value){
			return  $window.localStorage.setItem(key, JSON.stringify(value));
		},
		update: function(key, value){
			return  $window.localStorage.setItem(key, JSON.stringify(value));
		},
		delete: function(key){
			return  $window.localStorage.removeItem(key);
		}		
	};

})