# yi-action-camera
> Yi Action Camera module for node

Tested on Xiaomi Yi Action Camera (Not Yi 4K)

## Work in progress
> Keep in mind that isn't a release or stable version. Next versions can have broken changes.

## Install

```shell
npm install --save yi-action-camera
```

## Usage

First of all connect Xiaomi Yi Action Camera via WiFi.

Default password is `1234567890`

```js
const yi = require('yi-action-camera');

yi.connect()
    .then(function () {
        console.log('connected');

        return yi.takePhoto();
    })
    .then(function (filePath) {
        console.log('photo', filePath);

        return yi.downloadFile(filePath);
    })
    .then(function (filePath) {
        console.log('photo downloaded', filePath);
        
        return yi.disconnect();
    })
    .then(function () {
        console.log('disconnected');
    })
    .catch(function (err) {
        console.error(err);
    });
```

## Settings

### autoConnect
Default: `true`

### ip
Default: `192.168.42.1`

### port
Default: `7878`

## API

### connect()
Connect to camera

Returns `Promise`

### disconnect()
Close connection to camera

Returns `Promise`

### takePhoto()
Take a photo

Returns `Promise`

### startRecord()
Start video recording

Returns `Promise`

### stopRecord()
Stop video recording

Returns `Promise`

### getConfig()
Get camera config

Returns `Object`

### setConfig(type, value)
Set camera config

#### type
Required

Type: `string`

#### value
Required

Type: `string`

Returns `Promise`

### downloadFile(filePath, outputPath)
Download a file from camera

#### filePath
Required

Type: `string`

Absolute camera file path

#### outputPath
Optional

Type: `string`

Default: `./`

Output host file path

### deleteFile(filePath)
Delete a file from camera

#### filePath
Required

Type: `string`

Absolute camera file path

## Config values
You can check all config types and values in constant.js and access through YiActionCamera.config

## License

MIT © [Mario Juárez](https://github.com/mariomka)

## It couldn't be possible without:

- https://dashcamtalk.com/forum/threads/xiaomi-yi-camera-gui-control-configure-from-pc-win-lin-mac.11206/
- https://copter.sovgvd.info/a/Xiaomi-Yi-protocol-remote-control
- http://pastebin.com/yKvXyyp8