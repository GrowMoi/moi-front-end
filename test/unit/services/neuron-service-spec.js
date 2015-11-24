(function () {
  'use strict';

  describe('NeuronService', function () {
    var service, $httpBackend, ENV;

    beforeEach(module('moi.services'));
    beforeEach(function(){
      module('config', function ($provide) {
        $provide.constant('ENV', {
          name:'development',
          apiHost:'http://localhost:5000'
        });
      });
    });

    beforeEach(inject(
      function (_$httpBackend_, _NeuronService_, _ENV_) {
        $httpBackend = _$httpBackend_;
        service = _NeuronService_;
        ENV = _ENV_;
      })
    );

    afterEach(function () {
      $httpBackend.verifyNoOutstandingRequest();
      $httpBackend.verifyNoOutstandingExpectation();
    });

    describe('#service', function(){
      it('should get the same neuron you request', function(){
        var id = 1;
        var expectedUrl = ENV.apiHost + '/api/neurons/' + id;
        var objectToRespond = {'neuron':{'id':id,'title':'root','contents':[]}};

        $httpBackend.expectGET(expectedUrl)
          .respond(objectToRespond);

        service.getNeuron(id).then(function(response){
          chai.expect(response).to.deep.equals(objectToRespond);
        });

        $httpBackend.flush();
      });
    });

  });
})();
