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
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        var classes = 'animated swing';
        $neuronToAnimate.addClass(classes).one(animationEnd, function() {
          // Do somthing after animation
          $neuronToAnimate.removeClass(classes);
          $timeout(function() {
            if(!service.stopCallToAction){
              callToAction();
            }
          }, 6000);
        });
      }

      function specialCallToAction(){
        var $neuronToAnimate = service.neuronElementUnavailable;
        var classes = 'animated tada infinite';
        $neuronToAnimate.addClass(classes);
        $timeout(function(){
          $neuronToAnimate.removeClass(classes);
          setNeuronElement($neuronToAnimate);
          service.callToAction();
        }, 12000);
      }

    }
  })();
