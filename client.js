'use strict';

const net      = require('net'),
      constant = require('./constant');

var socketClient = new net.Socket(),
    listeners    = [],
    connected    = false,
    connecting   = false;

// Client
var Client = exports;

Client.token = null;

Client.isConnected = function () {
    return connected;
};

Client.connect = function (ip, port) {
    return new Promise(function (resolve, reject) {
        if (connected) {
            reject('Already connected');
            return;
        }

        if (connecting) {
            reject('Already trying connecting');
            return;
        }

        connecting = true;

        var onError = function (err) {
            connecting = false;
            reject(err);
        };

        socketClient.once('error', onError);

        socketClient.connect(port, ip, function () {
            connected = true;
            connecting = false;
            socketClient.removeListener('error', onError);
            resolve();
        });
    });
};

Client.disconnect = function () {
    return new Promise(function (resolve) {
        socketClient.on('end', function () {
            resolve();
        });

        connected = false;
        Client.token = null;

        socketClient.end();
    });
};

Client.sendAction = function (action, testFunc, param, type) {
    return new Promise(function (resolve) {
        var message = {
            msg_id: action,
            token:  action == constant.action.REQUEST_TOKEN ? 0 : Client.token
        };

        if (param) {
            message.param = param;
        }

        if (type) {
            message.type = type;
        }

        sendMessage(message, testFunc, resolve);
    });
};

// On client receive data
socketClient.on('data', function (data) {
    data = JSON.parse(data);

    listeners.filter(function (listener) {
        return !listener(data);
    });
});

// On client close
socketClient.on('close', function (had_error) {
    if (connected) {
        connected = false;
        Client.token = null;

        socketClient.destroy();

        if (had_error) {
            console.error('Transmission error');
        }
    }
});

// Send message on the socket and register a test function to get result
// Test function should return true on a valid response
function sendMessage(message, testFunc, resolve) {
    if (testFunc) {
        listeners.push(function (data) {
            var result = !!testFunc(data);

            if (result) {
                resolve(data.hasOwnProperty('param') ? data.param : null);
            }

            return result;
        });
    }

    socketClient.write(JSON.stringify(message));
}