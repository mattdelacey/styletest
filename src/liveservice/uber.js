var Kinvey = require('kinvey-node-sdk');
var Promise = require('bluebird');

Kinvey.init({
    appKey: 'kid_ZJk02vOUFg',
    appSecret: 'c1a32d5b3c474d0fa20a6f33fef396d5'
});

/*var geoData = [{
    "geopoint": [38.280556, -85.70111]
}, {
    "geopoint": [38.0525, -84.493889]
}, {
    "geopoint": [37.787778, -84.598056]
}, {
    "geopoint": [32.171389, -85.130278]
}, {
    "geopoint": [29.210833, -81.032222]
}, {
    "geopoint": [41.499722, -81.690833]
}, {
    "geopoint": [43.052222, -81.690833]
}];*/


var geoData = [
    {"geopoint": [37.981377,-84.5742207]},
    {"geopoint": [37.981411, -84.572665]},
    {"geopoint": [37.981445, -84.573094]},
    {"geopoint": [37.981851, -84.573158]},
    {"geopoint": [37.982401, -84.573104]},
    {"geopoint": [37.982908, -84.573050]},
    {"geopoint": [37.983195, -84.572674]},
    {"geopoint": [37.983153, -84.572030]},
    {"geopoint": [37.983102, -84.571118]},
    {"geopoint": [37.982781, -84.570356]},
    {"geopoint": [37.982333, -84.570399]},
    {"geopoint": [37.982155, -84.570710]},
    {"geopoint": [37.982256, -84.572255]},
    {"geopoint": [37.982298, -84.573027]},
    {"geopoint": [37.982036, -84.573156]},
    {"geopoint": [37.981664, -84.573199]},
    {"geopoint": [37.981436, -84.573038]},
    {"geopoint": [37.981419, -84.572512]}
];

function fireGeoChange(geoloc, i) {
  var dataStore = Kinvey.DataStore.collection('live', Kinvey.DataStoreType.Network);
  var promise = dataStore.save({
    _id: '59de4c5f2ab51639e2f1073e',
    _geoloc: geoloc,
    accountname: "Account #" + i,
    accountcompany: "Company #" + i,
    autogen: true
  })
    .then(function onSuccess(entity) {
      console.log(entity);
    })
    .catch(function onError(error) {
      console.log(error);
    });
    return promise;
}

Kinvey.User.login('demo', 'xxx')
  .then(function(user) {
    console.log('logged in...');
    return geoData.reduce(function(promise, value, index) {
      return promise
        .then(function() {
          return fireGeoChange(value.geopoint, index);
        })
        .then(function() {
          return Promise.delay(1000); // 3 seconds
        })
    }, Promise.resolve());
  })
  .catch(function(error) {
    console.log(error);
  });