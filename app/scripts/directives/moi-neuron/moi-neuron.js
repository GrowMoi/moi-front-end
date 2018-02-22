(function () {
'use strict';

  angular
    .module('moi.directives')
    .directive('moiNeuron', moiNeuron);

  function moiNeuron() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'templates/directives/moi-neuron/moi-neuron.html',
      scope: {
        options: '=',
        id: '@',
        level: '='
      },
      controller: MoiNeuronController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

  function MoiNeuronController($element, NeuronsOptions, NeuronAnimateService, HoverAnimationService){

    var vm = this;

    var NEURON_COLOR = {
      yellow: 'images/tree/nodos/nodo-amarillo.png',
      blue: 'images/tree/nodos/nodo-azul.png',
      red: 'images/tree/nodos/nodo-fuccia.png',
      green: 'images/tree/nodos/nodo-verde.png'
    };

    var NEURON_SIZE = {
      1: 80,
      2: 80,
      3: 60,
      4: 50,
      5: 30,
      6: 30,
      7: 30,
      8: 30,
      9: 30
    };

    function init() {
      var options = vm.options || {};
      options = angular.merge(NeuronsOptions[vm.id], options);

      var size = options.size || {},
          position = options.position || {},
          states = {
            descubierta: 'images/tree/nodos/nodo-gris.png',
            florecida: NEURON_COLOR[options.color] || 'images/tree/nodos/nodo-azul.png'
          };

      vm.neuron = {
        id: options.id || 0,
        name: options.title || 'neuron',
        source: options.source || 'images/tree/nodos/nodo-gris.png',
        state: options.state || 'descubierta',
        in_desired_neuron_path: options.in_desired_neuron_path || false, //jshint ignore:line
        size: {
          max: size.max || NEURON_SIZE[vm.level],
          min: size.min ||  NEURON_SIZE[vm.level] / 2,
          steps: options.total_approved_contents || 1, //jshint ignore:line
          progress: options.learnt_contents || 1, //jshint ignore:line
        }
      };

      vm.img = states[vm.neuron.state];
      // init methods
      var conditional = vm.neuron.state === 'florecida';
      changeSizeNeuron(conditional);
      calculateStyles(position);
      vm.percentage = percentageIncrease();
      vm.increaseSize = HoverAnimationService.increaseSize;
      vm.cssOptions = {
        scale: 1 + '.' + vm.percentage,
        styles: []
      };

      //add neuron element to NeuronAnimateService for later animate it.
      if(vm.neuron.state === 'descubierta'){
        var $neuroImg = $element.find('img');
        if(vm.neuron.in_desired_neuron_path){ //jshint ignore:line
          NeuronAnimateService.neuronElementUnavailable = $neuroImg;
        }else {
          NeuronAnimateService.setNeuronElement($neuroImg);
        }
      }
    }

    function calculateSize(progress, steps) {
      var max = vm.neuron.size.max,
          min = vm.neuron.size.min,
          percentage = (max - min) / steps,
          value = (progress * percentage) + min;
      return value;
    }

    function percentageIncrease() {
      var percentage = vm.currentWidth * 100 /vm.neuron.size.max;
      percentage = 100 - Math.round(percentage);
      return percentage || 1;
    }

    function calculateStyles(position) {
      vm.neuron.styles = {
        'bottom': (position.bottom || 0) + 'px',
        'left': (position.left || 0) + 'px',
        'width': vm.neuron.size.max + 'px',
        'height': vm.neuron.size.max + 'px'
      };
    }

    function changeSizeNeuron(conditional) {
      if (conditional) {
        vm.currentWidth = calculateSize(vm.neuron.size.progress, vm.neuron.size.steps);
      }else{
        vm.currentWidth = vm.neuron.size.max;
      }
    }

    init();

  }
})();
