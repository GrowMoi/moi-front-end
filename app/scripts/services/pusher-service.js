(function () {
  'use strict';

  angular
    .module('moi.services')
    .factory('PusherService', PusherService);

  function PusherService($q, ENV){
    var serviceLoaded = false,
        loadDeferred,
        pusherClient;

    var service = {
      load: load,
      listen: listen,
      unlisten: unlisten
    };
    return service;

    function listen(channelName, eventName, callback){
      var channel = pusherClient.subscribe(channelName);
      channel.bind(eventName, callback);
    }

    function unlisten(channelName) {
      pusherClient.unsubscribe(channelName);
    }

    function load(){
      loadDeferred = $q.defer();
      if (serviceLoaded) {
        loadDeferred.resolve();
      } else {
        appendPusherScript();
      }
      return loadDeferred.promise;
    }

    function appendPusherScript(){
      var pusherURI = 'https://js.pusher.com/4.0/pusher.min.js',
          script = document.createElement('script');
      script.src = pusherURI;
      script.type = 'text/javascript';
      script.onload = pusherLoaded;
      document.getElementsByTagName('head')[0].appendChild(script);
    }

    function pusherLoaded(){
      serviceLoaded = true;
      newPusherClient();
    }

    function newPusherClient(){
      pusherClient = new Pusher(ENV.pusherKey, {
        encrypted: true,
        cluster: 'us2'
      });
      loadDeferred.resolve();
    }
  }
})();
