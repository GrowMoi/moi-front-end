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
        var totalNeuronsToAnimate = 4;
        //animate a gropup neurons
        for (var i = 0; i <= totalNeuronsToAnimate; i ++) {
          var randomPosition = Math.floor(Math.random() * discoveredNeurons.length);
          var isTheLastItem = i === totalNeuronsToAnimate;
          addAnimateClass(randomPosition, isTheLastItem);
        }
      }

      function addAnimateClass(randomPosition, isTheLastItem) {
        var $neuronElement = discoveredNeurons[randomPosition];
        var $neuronToAnimate = $neuronElement.find('img');
        var $neuronTooltip = $neuronElement.find('tooltip');
        var cssClass = 'animated swing';
        $neuronTooltip.addClass('active');
        $neuronElement.css('z-index', '99999'); // fix olverlap tooltip
        $neuronToAnimate.addClass(cssClass).one(animationEnd, function() {
          // Do somthing after animation
          $neuronToAnimate.removeClass(cssClass);
          $neuronTooltip.removeClass('active');
          $neuronElement.css('z-index', '');
          if(isTheLastItem){
            $timeout(function() {
              if(!service.stopCallToAction){
                callToAction();
              }
            }, 4500);
          }
        });
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
