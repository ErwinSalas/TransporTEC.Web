/**
 * Modulo usuario, controlador de la información de la flotilla.
 */
angular.module('userModule')
    .controller('fleetInfoCtrl', function($scope,$location,$routeParams,FleetCarResource) {
        /* config object */
        checkUserType($location.absUrl());
        $scope.valueID = $routeParams.valueID;
        var PictureCanvas = document.getElementById('img');
        PictureCanvas.src = API_ROOT+'/fleet/picture/get?vehicleId='+carSelectedID;

        $scope.getCarInfo = FleetCarResource.getCarInfo(carSelectedID, function (res) {
            $scope.carInfo=res;
            console.log("La resInfo ", $scope.carInfo);
        });

    }); 