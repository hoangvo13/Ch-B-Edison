patient.controller('PatientHealthController', ['$scope', '$stateParams', 'PatientHealthService', function ($scope, $stateParams, PatientHealthService) {
    var ct = this;

    PatientHealthService.getAllPatientHealthRecord($stateParams.id).then(function (result) {
        ct.records = result.data;        
    }); 
}]);