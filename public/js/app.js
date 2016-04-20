var indigoApp = angular.module('indigoApp', ['ngRoute', 'xeditable']);

indigoApp.run(function(editableOptions, editableThemes) {
  editableOptions.theme = 'bs3';
  editableThemes.bs3.inputClass = 'input-sm';
  editableThemes.bs3.buttonsClass = 'btn-sm';
});

indigoApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/logs', {
        templateUrl: 'views/logs.html'
      }).
      when('/home', {
        templateUrl: 'views/records.html',
      }).
      otherwise({
        redirectTo: 'home'
      });
}]);

indigoApp.factory('recordsBackend', function ($http) {
	var backend = {
		get: function () {
			return $http.get("/api/records");
		},
		create: function(data) {
			return $http.post("/api/records", data);
		},
		delete: function(id) {
			return $http.delete("/api/records/" + id)
		},
		update: function(id, data) {
			return $http.post("/api/records/" + id, data);
		}
	};
	return backend;
});

indigoApp.factory('logsBackend', function ($http) {
	var backend = {
		get: function () {
			return $http.get("/api/logs");
		}
	};
	return backend;
});

indigoApp.controller("recordsController", function($scope, recordsBackend) {
	$scope.records = [];

	$scope.newRecord = {"type": "A"};
	$scope.valueLabels = {
		"A": "IP Address",
		"AAAA": "IP Address",
		"CNAME": "DNS Record",
		"MX": "Mail Server",
		"TXT": "Value",
		"SRV": "Service",
		"SOA": "Nameserver"
	}

	$scope.refresh = function() {
		recordsBackend.get().then(function(results) {
			$scope.records = results.data;
		})
	}
	$scope.refresh();

	$scope.delete = function(id) {
		recordsBackend.delete(id).then(function() {
			$scope.refresh();
		});
	}

	$scope.create = function() {
		recordsBackend.create($scope.newRecord).then(function() {
			$scope.refresh();
		});
	}

	$scope.update = function(record) {
		recordsBackend.update(record._id, record).then(function() {
			$scope.refresh();
		});
	}
});

indigoApp.controller("logsController", function($scope, logsBackend) {
	$scope.logs = [];

	$scope.refresh = function() {
		logsBackend.get().then(function(results) {
			$scope.logs = results.data;
		});
	}
	$scope.refresh();
});
