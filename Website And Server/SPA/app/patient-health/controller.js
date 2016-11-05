patient.controller('PatientHealthController', ['$scope', '$stateParams', 'PatientHealthService', function ($scope, $stateParams, PatientHealthService) {
    var ct = this;

    ct.userId;

    PatientHealthService.getAllPatientHealthRecord($stateParams.id).then(function (result) {
        ct.records = result.data;    
        ct.userId = result.data[0].patientId;    
    });

    ct.refreshRecords = function(id) {
        PatientHealthService.getAllPatientHealthRecord(id).then(function (result) {
            ct.records = result.data;        
        });
    };
}]);