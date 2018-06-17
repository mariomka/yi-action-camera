'use strict';

const client   = require('./client'),
      constant = require('./constant'),
      path     = require('path'),
      fs       = require('fs'),
      http     = require('http');

// YiActionCamera
var YiActionCamera = exports;

// Expose version
YiActionCamera.version = require('./package').version;

// Expose config constants
YiActionCamera.config = constant.config;

// Settings
YiActionCamera.autoConnect = true;
YiActionCamera.ip = '192.168.42.1';
YiActionCamera.port = 7878;

// Connect
YiActionCamera.connect = function () {
    return client.connect(YiActionCamera.ip, YiActionCamera.port)
        .then(function () {
            return requestToken();
        })
        .then(function (token) {
            client.token = token;
        });
};

// Disconnect
YiActionCamera.disconnect = function () {
    client.disconnect();
};

// Take photo
YiActionCamera.takePhoto = function () {
    return sendAction(constant.action.TAKE_PHOTO, function (data) {
        return (data.hasOwnProperty('type') && data.type == 'photo_taken');
    });
};

// Start record
YiActionCamera.startRecord = function () {
    return sendAction(constant.action.START_RECORD, function (data) {
        return (data.hasOwnProperty('type') && data.type == 'start_video_record');
    });
};

// Stop record
YiActionCamera.stopRecord = function () {
    return sendAction(constant.action.STOP_RECORD, function (data) {
        return (data.hasOwnProperty('type') && data.type == 'video_record_complete');
    });
};

// Delete file
YiActionCamera.deleteFile = function (filePath) {
    return sendAction(constant.action.DELETE_FILE, function (data) {
        return (data.hasOwnProperty('rval') && data.hasOwnProperty('msg_id') && data.msg_id == constant.action.DELETE_FILE);
    }, filePath);
};

// Get camera config
YiActionCamera.getConfig = function () {
    return sendAction(constant.action.GET_CONFIG, function (data) {
        return (data.hasOwnProperty('rval') && data.hasOwnProperty('msg_id') && data.msg_id == constant.action.GET_CONFIG);
    })
        .then(function (config) {
            var configObject = {};

            for (var index in config) {
                for (var propertyName in config[index]) {
                    configObject[propertyName] = config[index][propertyName];
                }
            }

            return configObject;
        });
};

// Set camera config
YiActionCamera.setConfig = function (type, value) {
    return sendAction(constant.action.SET_CONFIG, function (data) {
        return (data.hasOwnProperty('rval') && data.hasOwnProperty('msg_id') && data.msg_id == constant.action.SET_CONFIG && data.hasOwnProperty('type') && data.type == type);
    }, value, type);
};

// Download file
YiActionCamera.downloadFile = function (filePath, outputPath) {
    outputPath = outputPath || './';

    var fileHttpPath     = filePath.replace(/\/tmp\/fuse_d/, 'http://' + YiActionCamera.ip),
        outputFilePath   = path.join(outputPath, path.basename(filePath)),
        outputFileStream = fs.createWriteStream(outputFilePath);

    return new Promise(function (resolve, reject) {
        http.get(fileHttpPath, function (response) {
            response.pipe(outputFileStream, './');
            outputFileStream.on('close', function () {
                resolve(outputFilePath)
            })
        })
            .on('error', function (err) {
                reject(err);
            });
    });
};

// Send action
function sendAction(action, testFunc, param, type) {
    if (YiActionCamera.autoConnect && !client.isConnected()) {
        return YiActionCamera.connect()
            .then(function () {
                return client.sendAction(action, testFunc, param, type);
            });
    } else {
        return client.sendAction(action, testFunc, param, type);
    }
}

// Request token
function requestToken() {
    return client.sendAction(constant.action.REQUEST_TOKEN, function (data) {
        return (data.msg_id == constant.action.REQUEST_TOKEN && data.hasOwnProperty('rval') && data.hasOwnProperty('param'));
    });
}
