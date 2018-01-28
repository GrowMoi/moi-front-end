(function () {
  'use strict';

    angular
      .module('moi.services')
      .factory('NeuronAnimateService', NeuronAnimateService);

    function NeuronAnimateService($timeout) {
      var discoveredNeurons = [];

      var service = {
        setNeuronElement: setNeuronElement,
        callToAction: callToAction,
        stopCallToAction: false
      };

      return service;

      function setNeuronElement(element){
        //add elements jquery of neurons with state DESCUBIERTA
        discoveredNeurons.push(element);
      }

      function callToAction(){
        var $neuronToAnimate = discoveredNeurons[Math.floor(Math.random() * discoveredNeurons.length)];
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $neuronToAnimate.addClass('animated swing').one(animationEnd, function() {
          // Do somthing after animation
          $neuronToAnimate.removeClass('animated swing');
          $timeout(function() {
            if(!service.stopCallToAction){
              callToAction();
            }
          }, 6000);
        });
      }

    }
  })();
