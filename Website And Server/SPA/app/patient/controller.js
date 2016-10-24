patient.controller('PatientController', ['$scope', 'PatientService', function ($scope, PatientService) {
    var ct = this;

    PatientService.getAllPatients().then(function (result) {
        ct.patients = result.data;
    });

    ct.getAllPatients = function () {
        PatientService.getAllPatients().then(function (result) {
            ct.patients = result.data;
        });
    };
}]);