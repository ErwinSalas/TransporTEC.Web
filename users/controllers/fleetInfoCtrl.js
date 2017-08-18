angular.module('userModule')
    .controller('fleetInfoCtrl', function($scope,$routeParams,FleetCarResource) {
        /* config object */

        $scope.valueID = $routeParams.valueID;
        var PictureCanvas = document.getElementById('img');
        PictureCanvas.src = IMG_ROOT_F+carSelectedID+".jpg";
        
        console.log(carSelectedID);
        $scope.getCarInfo = FleetCarResource.getCarInfo(carSelectedID, function (res) {
            $scope.carInfo=res;
            console.log("La resInfo ", $scope.carInfo);
        });

    }); 