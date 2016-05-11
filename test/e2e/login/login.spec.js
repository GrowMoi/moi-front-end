(function () {
  'use strict';

  var server,
      chai     = require('chai'),
      promised = require('chai-as-promised');

  chai.use(promised);

  var HttpBackend = require('http-backend-proxy'),
      proxy = new HttpBackend(browser);

  var expect   = chai.expect;

  describe('Visiting root path ', function () {
    var inputs = {},
        name;

    beforeEach(function() {
      // https://github.com/ariya/phantomjs/issues/11637#issuecomment-28078551
      browser.driver.manage().window().setSize(1280, 720);
      browser.ignoreSynchronization = true;
      browser.get('/');
      inputs = {
        username: element(by.model('vm.loginForm.email')),
        password: element(by.model('vm.loginForm.password')),
        loginBtn: element(by.css('form input[type=submit]'))
      };
    });

    afterEach(function() {
      return browser.executeScript('window.localStorage.clear();');
    });

    it('should require authentication', function () {
      return expect(
        browser.getLocationAbsUrl()
      ).to.eventually.match(/login/);
    });

    it('should authenticate and display the dashboard view', function() {
      inputs.username.sendKeys('protractor@test.com');
      inputs.password.sendKeys('protractortest');

      return inputs.loginBtn.click().then(function () {
        return browser.driver.wait(function() {
          return browser.driver.getCurrentUrl().then(function(url) {
            return /tree/.test(url);
          });
        }, 3000);
      });
    });

    it('should display a popup for an unsuccessful login', function() {
      inputs.username.sendKeys('error@bad.com');
      inputs.password.sendKeys('fakepassword');

      return inputs.loginBtn.click().then(function () {
        var popup = element(
          by.css('.popup-container.popup-showing.active')
        );

        return Promise.all([
          expect(popup.isDisplayed()).to.eventually.be.true,
          expect(browser.getLocationAbsUrl()).to.eventually.match(/login/)
        ]);
      });
    });
  });
})();
