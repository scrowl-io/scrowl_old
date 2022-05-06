const scormConfig = {
  autocommit: true,
  autoProgress: false,
  autocommitSeconds: 30,
  dataCommitFormat: 'json',
  commitRequestDataType: 'application/json;charset=UTF-8',
  logLevel: 1,
};
const API = new window.Scorm12API(scormConfig);

window.API = API;
console.log('api', API);

API.on('LMSInitialize', function () {
  console.log('LMS INIT', arguments);
});

API.on('LMSSetValue.cmi.core.student_id', function () {
  console.log('Student ID', arguments);
});

API.on('LMSSetValue.cmi.*', function () {
  console.log('cmi event', arguments);
});

window.addEventListener('DOMContentLoaded', () => {
  API.LMSInitialize();
});
