(function () {
  'use strict';

    angular
      .module('moi.services')
      .factory('NeuronAnimateService', NeuronAnimateService);

    function NeuronAnimateService($timeout) {
      var discoveredNeurons = [];
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      var counterAnimation = 4;

      var service = {
        setNeuronElement: setNeuronElement,
        callToAction: callToAction,
        stopCallToAction: false,
        neuronElementUnavailable: null,
        specialCallToAction: specialCallToAction
      };

      return service;

      function setNeuronElement(element){
        //add elements jquery of neurons with state DESCUBIERTA
        discoveredNeurons.push(element);
      }

      function callToAction(){
        var $neuronToAnimate = discoveredNeurons[Math.floor(Math.random() * discoveredNeurons.length)];
        var cssClass = 'animated swing';
        $neuronToAnimate.addClass(cssClass).one(animationEnd, function() {
          // Do somthing after animation
          $neuronToAnimate.removeClass(cssClass);
          $timeout(function() {
            if(!service.stopCallToAction){
              callToAction();
            }
          }, 6000);
        });
      }

      function specialCallToAction(){
        var $neuronToAnimate = service.neuronElementUnavailable;
        var cssClass = 'animated tada';

        $neuronToAnimate.addClass(cssClass).one(animationEnd, function() {
          $neuronToAnimate.removeClass(cssClass);
          $timeout(function() {
            if(counterAnimation > 0){
              specialCallToAction();
            }
          }, 1000);
          counterAnimation --;
        });

        if(counterAnimation === 1){
          setNeuronElement($neuronToAnimate);
          service.callToAction();
        }
      }

    }
  })();
