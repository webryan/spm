var should = require('should');
var log = require('../lib/utils/log');
var colorful = require('colorful');
var sinon = require('sinon');

describe('log', function() {

  afterEach(function() {
    log.level = 'info';
  });

  it('config level', function() {
    log.level.should.eql('info');
    log.config({ verbose: true });
    log.level.should.eql('debug');
    log.config({ quiet: true });
    log.level.should.eql('warn');
  });

  it('config color', function() {
    colorful.disabled.should.eql(false);
    log.config({ color: false });
    colorful.disabled.should.eql(true);
  });

  it('default level', function() {
    var console_log = sinon.spy(console, 'log');
    var console_info = sinon.spy(console, 'info');
    var console_warn = sinon.spy(console, 'warn');
    var console_error = sinon.spy(console, 'error');
    log.debug('debug', 'debug');
    console_log.callCount.should.eql(0);
    log.info('info', 'info');
    console_info.callCount.should.eql(1);
    console_info.calledWith('           info: info').should.eql(true);
    log.warn('', '');
    console_warn.callCount.should.eql(1);
    log.error('', '');
    console_error.callCount.should.eql(1);
  });

});
