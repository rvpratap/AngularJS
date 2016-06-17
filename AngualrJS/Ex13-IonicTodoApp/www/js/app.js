// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.search', {
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/search.html'
            }
        }
    })

    .state('app.todos', {
            url: '/todos',
            views: {
                'menuContent': {
                    templateUrl: 'templates/todos.html',
                    controller: 'todosCtrl'
                }
            }
        })
        .state('app.playlists', {
            url: '/playlists',
            views: {
                'menuContent': {
                    templateUrl: 'templates/playlists.html',
                    controller: 'PlaylistsCtrl'
                }
            }
        })

    .state('app.single', {
        url: '/playlists/:playlistId',
        views: {
            'menuContent': {
                templateUrl: 'templates/playlist.html',
                controller: 'PlaylistCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/playlists');
})


.controller('todosCtrl', function($scope, todoRESTFactory, $ionicModal) {
    $scope.data = {};
    $scope.listCanSwipe = true;
    todoRESTFactory
        .get()
        .then(function(response) {
            $scope.todos = response.data;
            console.log($scope.todos);
        })

    $ionicModal.fromTemplateUrl('templates/newtodo-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.toggleNewTodoModal = function() {
        $scope.data.todoText = '';
        $scope.modal.show();
    }

    $scope.closeModal = function() {
        $scope.modal.hide();
    };

    $scope.createTodo = function() {
        var todo = {
            id: (Math.floor(Math.random() * 100)),
            text: $scope.data.todoText
        };
        todoRESTFactory
            .post(todo)
            .then(function(response) {
                if(response.status === 201) {
                    $scope.todos.push(response.data);
                    $scope.closeModal();
                }
            })
    }

    $scope.editTodo=function(todo){
      $scope.editingTodoId=todo.id;
      $scope.data.todoText=todo.text;
      $scope.modal.show();
    }

    $scope.updateTodo=function(){
      var updatedtodo={
        id: $scope.editingTodoId,
        text:$scope.data.todoText 
      };
      todoRESTFactory
            .put(updatedtodo.id, updatedtodo)
            .then(function(response) {
                if(response.status === 200) {
                    for (var i = 0; i < $scope.todos.length; i++) {
                      if($scope.todos[i].id === updatedtodo.id){
                          $scope.todos[i].text=updatedtodo.id;
                      }
                    }
                }
            })
    }

    $scope.toggleRemove=function(){
      $scope.shouldShowDelete=true;

    }
    $scope.removeTodo=function(todo, $index){
       todoRESTFactory
            .delete(todo.id)
            .then(function(response) {
                if(response.status === 200) {
                   $scope.todos.splice($index, 1);
                   $scope.shouldShowDelete=false;
                }
            })
    }

})


.value('RESTURL', 'http://localhost:3000/todos')

.factory('todoRESTFactory', function($http, RESTURL) {
    return {
        get: function() {
            return $http.get(RESTURL);
        },
        getOne: function(id) {
            return $http.get(RESTURL + '/' + id);
        },
        post: function(todo) {
            return $http.post(RESTURL, todo);
        },
        put: function(id, todo) {
            return $http.put(RESTURL + '/' + id, todo);
        },
        delete: function(id) {
            return $http.delete(RESTURL + '/' + id);
        }
    }

})
