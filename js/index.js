(function () {
  'use strict';
  angular
      .module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'md.data.table', 'ngMaterialDatePicker'])
      .config(['$mdThemingProvider', function ($mdThemingProvider) {
    'use strict';
    
    $mdThemingProvider.theme('default')
      .primaryPalette('blue');
}])
      .controller('DemoCtrl', DemoCtrl);

  function DemoCtrl ($mdEditDialog, $timeout, $q, $log, $scope, $http) {
  //   $http.get("fetch_attendance.php")
  //   .then(function (response) {$scope.names = response.data
  //     $scope.names.count = response.data.length
  //     // console.log($scope.names.count);
  //     console.log("in success of fetch_attendance");
  //     console.log($scope.names);  
  // });

    $scope.no = 10;
// DATA-TABLE
  $scope.selected = [];
  $scope.limitOptions = [5, 10, 15];
  
  $scope.options = {
    rowSelection: true,
    multiSelect: true,
    autoSelect: true,
    decapitate: false,
    largeEditDialog: false,
    boundaryLinks: false,
    limitSelect: true,
    pageSelect: true
  };
  
  $scope.query = {
    order: 'name',
    limit: 5,
    page: 1
  };
  
  $scope.desserts = {
    "count": 9,
    "data": [
      {
        "name": "Frozen yogurt",
        "type": "Ice cream",
        "calories": { "value": "Present" },
        "fat": { "value": 6.0 },
        "carbs": { "value": 24.0 },
        "protein": { "value": 4.0 },
        "sodium": { "value": 87.0 },
        "calcium": { "value": 14.0 },
        "iron": { "value": 1.0 }
      }, {
        "name": "Ice cream sandwich",
        "type": "Ice cream",
        "calories": { "value": "Present" },
        "fat": { "value": 9.0 },
        "carbs": { "value": 37.0 },
        "protein": { "value": 4.3 },
        "sodium": { "value": 129.0 },
        "calcium": { "value": 8.0 },
        "iron": { "value": 1.0 }
      }, {
        "name": "Eclair",
        "type": "Pastry",
        "calories": { "value":  "Present" },
        "fat": { "value": 16.0 },
        "carbs": { "value": 24.0 },
        "protein": { "value":  6.0 },
        "sodium": { "value": 337.0 },
        "calcium": { "value":  6.0 },
        "iron": { "value": 7.0 }
      }, {
        "name": "Cupcake",
        "type": "Pastry",
        "calories": { "value":  "Absent" },
        "fat": { "value": 3.7 },
        "carbs": { "value": 67.0 },
        "protein": { "value": 4.3 },
        "sodium": { "value": 413.0 },
        "calcium": { "value": 3.0 },
        "iron": { "value": 8.0 }
      }, {
        "name": "Jelly bean",
        "type": "Candy",
        "calories": { "value":  "Present" },
        "fat": { "value": 0.0 },
        "carbs": { "value": 94.0 },
        "protein": { "value": 0.0 },
        "sodium": { "value": 50.0 },
        "calcium": { "value": 0.0 },
        "iron": { "value": 0.0 }
      }, {
        "name": "Lollipop",
        "type": "Candy",
        "calories": { "value": "Present" },
        "fat": { "value": 0.2 },
        "carbs": { "value": 98.0 },
        "protein": { "value": 0.0 },
        "sodium": { "value": 38.0 },
        "calcium": { "value": 0.0 },
        "iron": { "value": 2.0 }
      }, {
        "name": "Honeycomb",
        "type": "Other",
        "calories": { "value": "Present" },
        "fat": { "value": 3.2 },
        "carbs": { "value": 87.0 },
        "protein": { "value": 6.5 },
        "sodium": { "value": 562.0 },
        "calcium": { "value": 0.0 },
        "iron": { "value": 45.0 }
      }, {
        "name": "Donut",
        "type": "Pastry",
        "calories": { "value": "Present" },
        "fat": { "value": 25.0 },
        "carbs": { "value": 51.0 },
        "protein": { "value": 4.9 },
        "sodium": { "value": 326.0 },
        "calcium": { "value": 2.0 },
        "iron": { "value": 22.0 }
      }, {
        "name": "KitKat",
        "type": "Candy",
        "calories": { "value": "Absent" },
        "fat": { "value": 26.0 },
        "carbs": { "value": 65.0 },
        "protein": { "value": 7.0 },
        "sodium": { "value": 54.0 },
        "calcium": { "value": 12.0 },
        "iron": { "value": 6.0 }
      }
    ]
  };
  
  $scope.editComment = function (event, dessert) {
    event.stopPropagation(); // in case autoselect is enabled
    
    var editDialog = {
      modelValue: dessert.comment,
      placeholder: 'Add a comment',
      save: function (input) {
        if(input.$modelValue === 'Donald Trump') {
          input.$invalid = true;
          return $q.reject();
        }
        if(input.$modelValue === 'Bernie Sanders') {
          return dessert.comment = 'FEEL THE BERN!'
        }
        dessert.comment = input.$modelValue;
      },
      targetEvent: event,
      title: 'Add a comment',
      validators: {
        'md-maxlength': 30
      }
    };
    
    var promise;
    
    if($scope.options.largeEditDialog) {
      promise = $mdEditDialog.large(editDialog);
    } else {
      promise = $mdEditDialog.small(editDialog);
    }
    
    promise.then(function (ctrl) {
      var input = ctrl.getInput();
      
      input.$viewChangeListeners.push(function () {
        input.$setValidity('test', input.$modelValue !== 'test');
      });
    });
  };
  
  $scope.toggleLimitOptions = function () {
    $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
  };
  
  $scope.getTypes = function () {
    return ['Candy', 'Ice cream', 'Other', 'Pastry'];
  };
  
  $scope.loadStuff = function () {
    $scope.promise = $timeout(function () {
      // loading
    }, 2000);
    $http.get("fetch_attendance.php")
    .then(function (response) {$scope.names = response.data
      $scope.names.count = response.data.length
      // console.log($scope.names.count);
      console.log("in success of fetch_attendance");
      console.log($scope.names);  
  });
  }
  
  $scope.logItem = function (item) {
    console.log(item.name, 'was selected');
  };
  
  $scope.logOrder = function (order) {
    console.log('order: ', order);
  };
  
  $scope.logPagination = function (page, limit) {
    console.log('page: ', page);
    console.log('limit: ', limit);
  }
// END OF DATA-TABLE


// AUTOCOMPLETE
    var self = this;

    self.simulateQuery = false;
    self.isDisabled    = false;

    // list of `state` value/display objects
    self.states        = loadAll();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;

    self.newState = newState;

    function newState(state) {
      alert("Sorry! You'll need to create a Constitution for " + state + " first!");
    }

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    }

    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    }

    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
      var allStates ='OS, Data Science, Artificial Intelligence, DBMS, Data structures, Discrete Mathematics, Computer Organisation, Data communication, Computer Networks, Computer Organisation, Theory of Computation';
      // var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
      //         Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
      //         Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
      //         Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
      //         North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
      //         South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
      //         Wisconsin, Wyoming';

      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };

    }
    // END OF AUTOCOMPLETE
  }
})();


/**
Copyright 2016 Google Inc. All Rights Reserved. 
Use of this source code is governed by an MIT-style license that can be foundin the LICENSE file at http://material.angularjs.org/HEAD/license.
**/