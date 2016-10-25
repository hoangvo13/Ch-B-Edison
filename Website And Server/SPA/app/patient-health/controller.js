patient.controller('PatientHealthController', ['$scope', '$stateParams', 'PatientHealthService', function ($scope, $stateParams, PatientHealthService) {
    var ct = this;

    ct.userId = 0;

    PatientHealthService.getAllPatientHealthRecord($stateParams.id).then(function (result) {
        ct.records = result.data;    
        ct.userId = result.data[0].id;    
    });

    ct.refreshRecords = function(id) {
        PatientHealthService.getAllPatientHealthRecord(id).then(function (result) {
            ct.records = result.data;        
        });
    };
}]);