(function () {
  'use strict';

    angular
      .module('moi.services')
      .factory('NeuronAnimateService', NeuronAnimateService);

    function NeuronAnimateService($timeout, MoiAnimationService) {
      var discoveredNeurons = [];
      var floweredNeurons = [];
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      var counterAnimation = 4;

      var service = {
        setNeuronElement: setNeuronElement,
        setNeuronFlowered: setNeuronFlowered,
        callToAction: callToAction,
        neuronElementUnavailable: null,
        specialCallToAction: specialCallToAction,
        animateColorNeurons: animateColorNeurons
      };

      return service;

      function setNeuronElement(element){
        //add elements jquery of neurons with state DESCUBIERTA
        discoveredNeurons.push(element);
      }

      function setNeuronFlowered(element) {
        //add elements jquery of neurons with state FLORECIDA
        floweredNeurons.push(element);
      }

      function animateColorNeurons() {
        var limitNeuronGroup = 4;
        var totalNeuronsToAnimate = Math.floor(Math.random() * limitNeuronGroup);
        for (var i = 0; i <= totalNeuronsToAnimate; i ++) {
          var randomPosition = Math.floor(Math.random() * floweredNeurons.length);
          var isTheLastItem = i === totalNeuronsToAnimate;
          var $neuronElement = floweredNeurons[randomPosition];
          if($neuronElement) {
            var $neuronToAnimate = $neuronElement.find('img');
            MoiAnimationService.animateWidget($neuronToAnimate, 'swing');
          }
          if(isTheLastItem) {
            $timeout(service.animateColorNeurons, 1500);
          }
        }
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
                callToAction();
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
