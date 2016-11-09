patient.controller('PatientController', ['$scope', 'PatientService', function ($scope, PatientService) {
    var ct = this;
    ct.jDatepicker = false;

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

            // Reset form
            $scope.addPatientForm.$setPristine();
            $scope.patient.name = '';
            $scope.patient.jdate = '';            

            // Add new item to list
            ct.patients.push(result.data);
        });
    };

    ct.refreshPatientList();
}]);