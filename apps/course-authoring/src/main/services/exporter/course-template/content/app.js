/*
  SCORM API REF
  https://scorm.com/scorm-explained/technical-scorm/run-time/run-time-reference/
*/
const hasProp = (obj, prop) => {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};

const scormService = {
  API: {},
  init: false,
  finished: false,
  _time: {
    start: '',
    end: '',
    convert: total => {
      function ZeroPad(val, pad) {
        let res = new String(val);
        const len = res.length;

        if (len > pad) {
          return res.substr(0, pad);
        }

        for (let i = len; i < pad; i++) {
          res = '0' + res;
        }

        return res;
      }

      let totalMs = total % 1000;
      let totalS = ((total - totalMs) / 1000) % 60;
      let totalM = ((total - totalMs - totalS * 1000) / 60000) % 60;
      let totalH = (total - totalMs - totalS * 1000 - totalM * 60000) / 3600000;

      if (totalH == 10000) {
        totalH = 9999;
        totalM = (total - totalH * 3600000) / 60000;

        if (totalM == 100) {
          totalM = 99;
        }

        totalM = Math.floor(totalM);
        totalS = (total - totalH * 3600000 - totalM * 60000) / 1000;

        if (totalS == 100) {
          totalS = 99;
        }

        totalS = Math.floor(totalS);
        totalMs = total - totalH * 3600000 - totalM * 60000 - totalS * 1000;
      }

      let timespan =
        ZeroPad(totalH, 4) +
        ':' +
        ZeroPad(totalM, 2) +
        ':' +
        ZeroPad(totalS, 2);

      if (totalH > 9999) {
        timespan = '9999:99:99';
      }

      return timespan;
    },
  },
  STATUSES: {
    update: {
      true: 'true',
      false: 'false',
    },
    lesson: {
      success: 'passed',
      failed: 'failed',
      done: 'completed',
      active: 'incomplete',
      viewed: 'browsed',
      unseen: 'not attempted',
    },
    exit: {
      timeout: 'time-out',
      save: 'suspend',
      logout: 'logout',
    },
  },
  isAvailable: () => {
    return scormService.init && !scormService.finished;
  },
  getError: printError => {
    printError =
      printError === undefined || printError === null ? true : printError;
    const errorId = scormService.API.LMSGetLastError();
    const errorMsg = scormService.API.LMSGetErrorString(errorId);
    const errorStack = scormService.API.LMSGetDiagnostic(errorId);
    const apiError = {
      id: errorId,
      message: errorMsg,
      stack: errorStack,
    };

    if (printError) {
      console.error(`Error:\n${JSON.stringify(apiError, null, 2)}`);
    }

    return apiError;
  },
  _findAPI: source => {
    const retryLimit = 7;
    let retryCnt = 0;

    while (
      source.API == null &&
      source.parent != null &&
      source.parent != source &&
      retryCnt < retryLimit
    ) {
      retryCnt++;
      source = source.parent;
    }

    if (retryCnt > retryLimit) {
      alert('Error: unable to find API - nesting');
      return;
    }

    return source.API;
  },
  start: () => {
    scormService.API = scormService._findAPI(window);

    if (!scormService.API) {
      return;
    }

    scormService._time.start = new Date();
    scormService.init = true;

    const res = scormService.API.LMSInitialize();

    if (res === scormService.STATUSES.update.false) {
      scormService.getError();
    } else {
      console.info('Course Started');
    }
  },
  save: () => {
    if (!scormService.isAvailable()) {
      return;
    }

    const res = scormService.API.LMSCommit();

    if (res === scormService.STATUSES.update.false) {
      scormService.getError();
    } else {
      console.info('Course Saved');
    }

    return res;
  },
  stop: () => {
    if (!scormService.isAvailable()) {
      return;
    }

    const saveRes = scormService.save();

    if (saveRes === scormService.STATUSES.update.false) {
      return;
    }

    const res = scormService.API.LMSFinish();

    scormService.finished = true;

    if (res === scormService.STATUSES.update.false) {
      scormService.getError();
    } else {
      console.info('Course Stopped');
    }

    return res;
  },
  setValue: (elem, val) => {
    if (!scormService.isAvailable()) {
      return;
    }

    const res = scormService.API.LMSSetValue(elem, val);

    if (res === scormService.STATUSES.update.false) {
      const err = scormService.getError(false);

      console.error(
        `Error: could not set data (${elem}: ${val})\n${JSON.stringify(
          err,
          null,
          2
        )}`
      );
    }

    return res;
  },
  getValue: elem => {
    if (!scormService.isAvailable()) {
      return;
    }

    const res = scormService.API.LMSGetValue(elem);

    if (res == '') {
      const err = scormService.getError(false);

      console.error(
        `Error: could not get data (${elem})\n${JSON.stringify(err, null, 2)}`
      );

      return;
    }

    return res;
  },
  updateStatus: status => {
    if (!scormService.isAvailable()) {
      return;
    }

    if (!hasProp(scormService.STATUSES.lesson, status)) {
      console.error(
        'invalid lesson status',
        status,
        scormService.STATUSES.lesson
      );
      return;
    }

    const lessonStatus = scormService.STATUSES.lesson[status];
    const res = scormService.setValue('cmi.core.lesson_status', lessonStatus);

    if (res !== scormService.STATUSES.update.false) {
      console.info(`Course Status Updated: ${lessonStatus}`);
    }

    return res;
  },
  exit: () => {
    if (!scormService.isAvailable()) {
      return;
    }

    scormService._time.end = new Date();
    const totalTime =
      scormService._time.end.getTime() - scormService._time.start.getTime();

    scormService.setValue(
      'cmi.core.session_time',
      scormService._time.convert(totalTime)
    );
    scormService.setValue('cmi.core.exit', scormService.STATUSES.exit.save);
    scormService.stop();
  },
};

const bootstrap = () => {
  const btnComplete = document.getElementById('btn-complete');
  const btnState = document.getElementById('btn-state');

  scormService.start();

  btnComplete.onclick = () => {
    scormService.updateStatus('done');
    scormService.exit();
  };

  btnState.onclick = () => {
    const res = scormService.getValue('cmi.core.lesson_status');

    if (res) {
      alert(`Lesson is ${res}`);
    }

    console.info(`Lesson is ${res}`);
  };
};

window.addEventListener('DOMContentLoaded', bootstrap);
