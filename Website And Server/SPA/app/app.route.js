app.config(['$stateProvider','$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('index', {
            url: '/',
            views: {
                '': {
                    template: '<patient-list></patient-list>'
                }                
            }
        })
        .state('patientHealth', {
            url: '/patient/:id',
            views: {
                '': {
                    template: '<patient-health-list></patient-health-list>'
                }                
            }
        });        
}]);