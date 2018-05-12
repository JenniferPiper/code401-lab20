'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _express = require('express');

var _httpErrors = require('http-errors');

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _bearerAuthMiddleware = require('../lib/bearer-auth-middleware');

var _bearerAuthMiddleware2 = _interopRequireDefault(_bearerAuthMiddleware);

var _media = require('../model/media');

var _media2 = _interopRequireDefault(_media);

var _s = require('../lib/s3');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var multerUpload = (0, _multer2.default)({ dest: __dirname + '/../temp' });

var mediaRouter = new _express.Router();

mediaRouter.post('/media', _bearerAuthMiddleware2.default, multerUpload.any(), function (request, response, next) {
  if (!request.account) {
    return next(new _httpErrors2.default(404, 'MEDIA ROUTER ERROR, not found'));
  }

  if (!request.body.title || request.files.length > 1 || request.files[0].fieldname !== 'media') {
    return next(new _httpErrors2.default(400, 'MEDIA ROUTER ERROR, invalid request'));
  }

  var file = request.files[0];
  var key = file.filename + '.' + file.originalname;

  return (0, _s.s3Upload)(file.path, key).then(function (awsUrl) {
    return new _media2.default({
      title: request.body.title,
      account: request.account._id,
      mediaType: request.body.mediaType,
      url: awsUrl
    }).save();
  }).then(function (media) {
    return response.json(media);
  });
});

exports.default = mediaRouter;