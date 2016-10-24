patient.factory('PatientService', ['$http', function ($http) {
    var service = [];

    service.getAllPatients = function () {
        return $http.get('/api/patients');
    };
    
    return service;
}]);