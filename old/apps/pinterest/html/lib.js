/* global  */
'use strict';

const lib = (function () {
  function fetchDataFromServer (urlData, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) { // 4 = "DONE"
        if (xhr.status === 200) { // 200 ="OK"
          try {
            callback(JSON.parse(xhr.responseText));
          } catch (e) {
            console.log('Error parsing Json => ', e);
            callback({});
          }
        } else {
          console.log('Error: ' + xhr.status);
        }
      }
    };
    xhr.open('GET', urlData); // add false to synchronous request
    xhr.send();
  }

  function makeAjaxRequest (url, action, params, sendCookie , callback) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) { // 4 = "DONE"
        if (xhr.status === 200) { // 200 ="OK"
          if (action === 'GET' || action === 'POST') {
            try {
              callback(JSON.parse(xhr.responseText));
            } catch (e) {
              // console.log('PARSING =>', xhr.responseText)
              console.log('Error parsing Json => ', e);
              callback({});
            }
          } else {
            callback(xhr.status);
          }
        } else {
          console.log('Error: ' + xhr.status);
        }
      }
    };
    xhr.open(action, url);
    if (sendCookie) {
      xhr.withCredentials = true; // allow send cookies
    }
    if (action === 'GET') {
      xhr.send();
    } else if (action !== 'GET') {
      xhr.setRequestHeader('Content-Type',
        'application/x-www-form-urlencoded; charset=UTF-8');
      if (params) {
        xhr.send(params);
      } else {
        xhr.send();
      }
    // console.log('Request Sent')
    }
  }

  return {
    fetchDataFromServer: fetchDataFromServer,
    makeAjaxRequest: makeAjaxRequest
  };
})();
