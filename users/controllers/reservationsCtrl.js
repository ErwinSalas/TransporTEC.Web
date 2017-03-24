/**
 * Created by Erwin on 29/10/2016.
 */
angular.module('userModule')
    .controller('reservationsCreateCtrl', function($scope,GetAvailableFleetResource,ReserveResource) {
        $scope.setDates=function(arrival,departure){
            $scope.reservation={
                Arrival :arrival,
                Departure:departure
            };
        };
        $scope.postReservation=function() {
            var user = JSON.parse( localStorage.getItem('session.user') );
            $scope.reservation.RequestingUser= user.username;
            console.log("envio",$scope.reservation)
            ReserveResource.setReserve($scope.reservation);

        };

        document.getElementById("btnCheck").addEventListener("click", function(){
            var arrivalDate= document.getElementById("arrivalDate").value;
            var arrivalHour= document.getElementById("arrivalHour").value;
            var departureDate= document.getElementById("departureDate").value;
            var departureHour= document.getElementById("departureHour").value;
            var urlParams = {
                start: datetimeToUrlParameter(departureDate,departureHour),
                end : datetimeToUrlParameter(arrivalDate,arrivalHour)

            };
           if(new Date(departureDate)>= new Date()) {
                if (arrivalDate != null && arrivalHour != null && departureDate != null && departureHour != null){
                    $scope.getFleet = GetAvailableFleetResource.response(urlParams, function (res) {
                        console.log("res ", res);
                        $scope.fleets = res

                    });
                    $scope.setDates(datetimeToISO8601(arrivalDate,arrivalHour),datetimeToISO8601(departureDate,departureHour)) ;
                }
                swal({
                    title: "Comprobación Exitosa",
                    type: "success",
                    confirmButtonColor: "#140e39",
                    timer: 1000,
                    showConfirmButton: false



                });
            }
            else{

                sweetAlert("Error...", "No existen autos dispoonibles en la fecha solicitada", "error");
            }


        }

    );



});