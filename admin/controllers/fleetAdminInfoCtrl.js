angular.module('adminModule')
    .controller('fleetAdminInfoCtrl', function($scope,$location,$timeout,$routeParams,FleetCarResources) {
        /* config object */
        checkUserType($location.absUrl().split("/")[4]);
        $scope.valueID = $routeParams.valueID;
        console.log(carSelectedID);
        /*$scope.getCarPicture = MediaResource.getImg(carSelectedID,2,function (res) {
            $scope.carPicture=res;
            setTimeout(function(){
                var PictureCanvas = document.getElementById('img');
                PictureCanvas.src = $scope.carPicture;
            }, 7000);

        });*/

        var PictureCanvas = document.getElementById('img');
        PictureCanvas.src = IMG_ROOT_F+carSelectedID+".jpg";

        $scope.iconLock = "";
        $scope.isLockedSTR = "";
        $scope.isLockedSTRAction = "";
        $scope.isLockedStatusAction = false;
        $scope.getCarInfo = FleetCarResources.getCarInfo(carSelectedID, function (res) {
            $scope.carInfo=res;
            console.log("La resInfo ", $scope.carInfo);
            if($scope.carInfo.Traction == 1){
                $scope.carInfo.Traction = "Manual";
            }
            if($scope.carInfo.isLocked == true){
                $scope.isLockedStatusAction = false;
                $scope.isLockedSTR = "Bloqueado";
                $scope.isLockedSTRAction = "Disponible";
                $scope.iconLock = "lock_open";
                document.getElementById("lockedBtn").className = 'btn bg-green btn-circle-lg waves-effect waves-circle waves-float';
            }
            else {
                $scope.isLockedStatusAction = true;
                $scope.isLockedSTR = "Disponible";
                $scope.isLockedSTRAction = "Bloqueado";
                $scope.iconLock = "lock_outline";
                document.getElementById("lockedBtn").className = 'btn btn-danger btn-circle-lg waves-effect waves-circle waves-float';
            }
        });

        $scope.deleteMessage =function() {
            swal({
                title: "¿Esta seguro que desea eliminar este vehículo?",
                text: "Esta acción no podrá revertirse",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Si",
                cancelButtonText: "Cancelar",
                closeOnConfirm: false
            }, function () {
                swal({
                    title: "Eliminado",
                    text: "El vehículo ha sido eliminado exitosamente",
                    type: "success",
                    confirmButtonColor: "#140e39",
                    timer: 1000,
                    showConfirmButton: false
                });

                $scope.deleteCar = FleetCarResources.deleteCar(carSelectedID);
                window.location.href = '#/admin/fleetAdmin/';

            });
        };

        $scope.editCar =function() {
            var x = document.getElementsByClassName("ShowInfo");
            var i;
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "block";
            }
            var x2 = document.getElementsByClassName("hideInfo");
            var i2;
            for (i2 = 0; i2 < x2.length; i2++) {
                x2[i2].style.display = "none";
            }

            var x3 = document.getElementById("ShowBtnEditSave").style.display = 'block';
            var x4 = document.getElementById("ShowBtnEditCancel").style.display = 'block';

        };
        $scope.lockCar = function () {
            FleetCarResources.lockCar($routeParams.valueID,$scope.isLockedStatusAction);
            swal({
                title: "Vehiculo " + $scope.isLockedSTRAction,
                type: "success",
                confirmButtonColor: "#140e39",
                timer: 2000,
                showConfirmButton: false
            });
            $timeout( function(){
                window.location.href = '#/admin/fleetAdmin';
            }, 2000 );
        };

        $scope.cancelEditCar =function() {
            var x = document.getElementsByClassName("ShowInfo");
            var i;
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
            var x2 = document.getElementsByClassName("hideInfo");
            var i2;
            for (i2 = 0; i2 < x2.length; i2++) {
                x2[i2].style.display = "block";
            }

            var  x3 = document.getElementById("ShowBtnEditSave").style.display = 'none';
            var x4 = document.getElementById("ShowBtnEditCancel").style.display = 'none';
            document.getElementById("brand").value = "";
            document.getElementById("model").value = "";
            document.getElementById("traction").value = "";
            document.getElementById("capacity").value = "";
            document.getElementById("mileage").value = "";
            document.getElementById("dependence").value = "";
        };

        $scope.newFleet={

        };
        $scope.postFleet=function() {
            console.log("envio",$scope.newFleet);
            FleetCarResources.editCar($routeParams.valueID,$scope.newFleet);
            swal({
                title: "Vehiculo editado",
                type: "success",
                confirmButtonColor: "#140e39",
                timer: 2000,
                showConfirmButton: false
            });
            $timeout( function(){
                window.location.href = '#/admin/fleetAdmin';
            }, 2000 );
            //window.location.href = '#/admin/fleetAdmin';
        };

    });