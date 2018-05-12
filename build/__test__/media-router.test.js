'use strict';

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _server = require('../lib/server');

var _mediaMock = require('./lib/media-mock');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiURL = 'http://localhost:' + process.env.PORT;

describe('TESTING ROUTES AT /media', function () {
  beforeAll(_server.startServer);
  afterAll(_server.stopServer);
  afterEach(_mediaMock.pRemoveMediaMock);

  describe('POST 200 for successful post to /media', function () {
    test('should return 200 for successful media post', function () {
      // only do this if you have a slow computer AND you want to make a real API call to S3
      jest.setTimeout(10000);
      return (0, _mediaMock.pCreateMediaMock)().then(function (mockResponse) {
        var token = mockResponse.accountMock.token;

        return _superagent2.default.post(apiURL + '/media').set('Authorization', 'Bearer ' + token).field('title', 'Marbles Bitmap').attach('media', __dirname + '/assets/marbles.bmp').then(function (response) {
          expect(response.status).toEqual(200);
          expect(response.body.title).toEqual('Marbles Bitmap');
          expect(response.body._id).toBeTruthy();
          expect(response.body.url).toBeTruthy();
        });
      }).catch(function (err) {
        console.log(err.message, 'ERR IN TEST');
        console.log(err.status, 'CODE ERR IN TEST');
        expect(err.status).toEqual(200);
      });
    });
  });
});