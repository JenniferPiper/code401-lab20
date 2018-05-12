'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pRemoveMediaMock = exports.pCreateMediaMock = undefined;

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _accountMock = require('./account-mock');

var _media = require('../../model/media');

var _media2 = _interopRequireDefault(_media);

var _account = require('../../model/account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pCreateMediaMock = function pCreateMediaMock() {
  var resultMock = {};
  return (0, _accountMock.pCreateAccountMock)().then(function (mockAcctResponse) {
    resultMock.accountMock = mockAcctResponse;
    return new _media2.default({
      title: _faker2.default.lorem.words(5),
      mediaType: _faker2.default.lorem.words(2),
      url: _faker2.default.random.image(),
      account: resultMock.accountMock.account._id
    }).save();
  }).then(function (media) {
    resultMock.media = media;
    return resultMock;
  });
};

var pRemoveMediaMock = function pRemoveMediaMock() {
  return Promise.all([_account2.default.remove({}), _media2.default.remove({})]);
};

exports.pCreateMediaMock = pCreateMediaMock;
exports.pRemoveMediaMock = pRemoveMediaMock;