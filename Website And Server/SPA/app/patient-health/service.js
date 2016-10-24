patient.factory('PatientHealthService', ['$http', function ($http) {
    var service = [];

    service.getAllPatientHealthRecord = function (id) {
        return $http.get('/api/patient-health/patient/' + id);
    };
    
    return service;
}]);