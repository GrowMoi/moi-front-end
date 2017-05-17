(function () {
  'use strict';

  describe('AnimationService', function () {
    var service;

    beforeEach(module('moi.services'));

    beforeEach(inject(
      function ( _AnimationService_) {
        service = _AnimationService_;
      })
    );

    describe('#service', function(){
      it('should get search button', function(){
        var options = {
          key: 'search'
        };
        var btn = service.getButton(options);
        chai.expect(btn).to.include.keys('src');
      });
    });

  });
})();
