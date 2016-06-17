angular.module("starter.controller",[])

.controller('AuthCtrl',function($scope, $state){
    $scope.user={
        name:'',
        password:''
    }
    $scope.authUser=function(){
           var user=$scope.user;
           if(user.name==='pratap@gmail.com' && user.password ==='ptp') {
            $scope.invalidLogin=false;
            $state.go('rating');
           }
           else {
            $scope.invalidLogin=true;
           }
    }

})

.controller('RatingCtrl', function($scope) {
                $scope.ratingAtr = [{
                    value: 1,
                    icon: 'ion-ios-star-outline'
                }, {
                    value: 2,
                    icon: 'ion-ios-star-outline'
                }, {
                    value: 3,
                    icon: 'ion-ios-star-outline'
                }, {
                    value: 4,
                    icon: 'ion-ios-star-outline'
                }, {
                    value: 5,
                    icon: 'ion-ios-star-outline'
                }];

                $scope.setRating = function(val) {
                    var rtgs = $scope.ratingAtr;
                    for (var i = 0; i<rtgs.length;i++) {
                        if (i < val) {
                            rtgs[i].icon = 'ion-ios-star';
                        } else {
                            rtgs[i].icon = 'ion-ios-star-outline';
                        }
                    }
                }
            });


