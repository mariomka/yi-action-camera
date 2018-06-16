'use strict';

// Constants
var Constants = exports;

Constants.action = {
    REQUEST_TOKEN: 257,
    TAKE_PHOTO:    769,
    START_RECORD:  513,
    STOP_RECORD:   514,
    DELETE_FILE:   1281,
    GET_CONFIG:    3,
    SET_CONFIG:    2,
    START_STREAM:  259
};

Constants.config = {
    video: {
        standard:   {
            TYPE_NAME: 'video_standard',
            NTSC:      'NTSC',
            PAL:       'PAL'
        },
        resolution: {
            TYPE_NAME:          'video_resolution',
            NTSC_1920_1080_60P: '1920x1080 60P 16:9',
            NTSC_1920_1080_30P: '1920x1080 30P 16:9',
            NTSC_1280_960_60P:  '1280x960 60P 4:3',
            NTSC_1280_720_60P:  '1280x720 60P 16:9',
            NTSC_1280_720_120P: '1280x720 120P 16:9',
            NTSC_848_480_240P:  '848x480 240P 16:9',
            PAL_1920_1080_48P:  '1920x1080 48P 16:9',
            PAL_1920_1080_24P:  '1920x1080 24P 16:9',
            PAL_1920_960_48P:   '1280x960 48P 4:3',
            PAL_1920_720_48P:   '1280x720 48P 16:9'
        },
        quality:    {
            TYPE_NAME:  'video_quality',
            SUPER_FINE: 'S.Fine',
            FINE:       'Fine',
            NORMAL:     'Normal'
        },
        stamp:      {
            TYPE_NAME: 'video_stamp',
            OFF:       'off',
            DATE:      'date',
            TIME:      'time',
            DATE_TIME: 'date/time'
        }
    },
    photo: {
        resolution: {
            TYPE_NAME: 'photo_size',
            R16MP:     '16M (4608x3456 4:3)',
            R13MP:     '13M (4128x3096 4:3)',
            R8MP:      '8M (3264x2448 4:3)',
            R5MP:      '5M (2560x1920 4:3)'
        },
        quality:    {
            TYPE_NAME:  'photo_quality',
            SUPER_FINE: 'S.Fine',
            FINE:       'Fine',
            NORMAL:     'Normal'
        },
        stamp:      {
            TYPE_NAME: 'photo_stamp',
            OFF:       'off',
            DATE:      'date',
            TIME:      'time',
            DATE_TIME: 'date/time'
        }
    }
};
