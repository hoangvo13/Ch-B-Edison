patient.controller('PatientController', ['$scope', 'PatientService', function ($scope, PatientService) {
    var ct = this;
    ct.jDatepicker = false;

    PatientService.getAllPatients().then(function (result) {
        ct.patients = result.data;
    });

    ct.refreshPatientList = function () {
        PatientService.getAllPatients().then(function (result) {
            ct.patients = result.data;
        });
    };

    ct.openDatePicker = function() {
        ct.jDatepicker = true;
    };

    ct.addNewPatient = function(isValid) {
        if (!isValid) {
            $scope.submitted = true;
            return ;
        }
        
        var data = JSON.stringify({
            name: $scope.patient.name,
            date: $scope.patient.jdate
        });
        
        PatientService.addNewPatient(data).then(function (result) {
            $("#newPatient").modal('hide');

            $scope.addPatientForm.$setPristine();
            $scope.patient.name = '';
            $scope.patient.jdate = '';            

            // Refresh list
            ct.refreshPatientList();
        });
    };
}]);