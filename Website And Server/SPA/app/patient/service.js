patient.factory('PatientService', ['$http', function ($http) {
    var service = [];

    service.getAllPatients = function () {
        return $http.get('/api/patients');
    };

    service.addNewPatient = function (data) {
        return $http.post('/api/patients', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    return service;
}]);