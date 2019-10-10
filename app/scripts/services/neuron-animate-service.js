(function () {
  'use strict';

    angular
      .module('moi.services')
      .factory('NeuronAnimateService', NeuronAnimateService);

    function NeuronAnimateService($timeout, MoiAnimationService) {
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
        var limitGroup = 4;
        var totalNeuronsToAnimate = Math.floor(Math.random() * limitGroup);
        //animate a gropup neurons
        for (var i = 0; i <= totalNeuronsToAnimate; i ++) {
          var randomPosition = Math.floor(Math.random() * discoveredNeurons.length);
          var isTheLastItem = i === totalNeuronsToAnimate;
          addAnimateClass(randomPosition, isTheLastItem);
        }
      }

      function addAnimateClass(randomPosition, isTheLastItem) {
        var $neuronElement = discoveredNeurons[randomPosition];
        if($neuronElement) {
          var $neuronToAnimate = $neuronElement.find('img');
          MoiAnimationService.animateWidget($neuronToAnimate, 'swing').then(function(){
            if(isTheLastItem){
              $timeout(function() {
                if(!service.stopCallToAction){
                  callToAction();
                }
              }, 1500);
            }
          });
        }
      }

      function specialCallToAction(){
        var $neuronElement = service.neuronElementUnavailable;
        var $neuronToAnimate = $neuronElement.find('img');
        var $neuronTooltip = $neuronElement.find('tooltip');
        var cssClass = 'animated tada';
        $neuronTooltip.addClass('active');
        $neuronToAnimate.addClass(cssClass).one(animationEnd, function() {
          $neuronToAnimate.removeClass(cssClass);
          $neuronTooltip.removeClass('active');
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
