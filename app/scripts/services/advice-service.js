(function () {
  'use strict';

    angular
      .module('moi.services')
      .factory('AdviceService', AdviceService);

    function AdviceService(StorageService) {
      var staticAdvices = {
        tree: [
          {
            position:'top-left',
            description: 'Da clic en la neurona gris para conocer sus contenidos'
          },
          {
            position:'top-right',
            description: 'Elije un nuevo fruto y el camino en el que quieres aprender'
          }
        ],
        neuron: [
          {
            position:'top-right',
            description: 'Elije el contenido que más te guste y dale doble clic para desplegarlo'
          },
          {
            position:'top-right',
            description: 'Cuando envies al test 4 contenidos, podrás comprobar tus conocimientos y hacer crecer tu árbol'
          }
        ],
        content: [
          {
            position:'bottom-right',
            description: 'Cuando termines de leer la explicación presiona el botón celeste para enviar esta pregunta al test'
          }
        ],
        test: [
          {
            position:'bottom-left',
            description: 'Elije la respuesta correcta y presiona la flecha para continuar'
          }
        ]
      };

      var randomAdvices = {
        tree: [
          {
            position:'top-left',
            description: 'Recuerda comprobar tus nuevos aprendizajes, poniéndolos en práctica día a día',
            show: true
          },
          {
            position:'top-right',
            description: 'Usa las palabras que aprendes en tus conversaciones. El desarrollo de tu lenguaje trae nuevas ideas',
            show: true
          },
          {
            position:'top-left',
            description: 'Mientras más sabes, más herramientas tienes para resolver problemas',
            show: true
          },
          {
            position:'top-right',
            description: 'Tu curiosidad apunta directamente a lo que te interesa. ¿Qué quieres aprender a continuación?',
            show: true
          }
        ]
      };

      var service = {
        getRandom: getRandom,
        getStatic: getStatic
      };

      return service;

      function getStatic(page, position, storage){
        try {
          var savedAdvice = (storage[page] && storage[page].advices) ? storage[page].advices[position] : undefined;
          var adviceSelected;
          if(!savedAdvice){
            adviceSelected = staticAdvices[page][position];
            adviceSelected.show = true;
            if(page !== 'content'){
              if(storage[page]){
                if(storage[page].advices){
                  storage[page].advices.push('advice' + position);
                }else{
                  storage[page].advices = ['advice' + position];
                }
                StorageService.update(storage);
              }else {
                storage[page] = {'advices': ['advice' + position]};
                StorageService.update(storage);
              }
            }
            adviceSelected.showCloseBtn = true;
            return [adviceSelected];
          }else {
            return [];
          }
        } catch (error) {
          return [];
        }
      }

      function getRandom(page){
        var min = 0;
        var max = randomAdvices[page].length -1;
        var randomPosition = Math.floor(Math.random()*(max-min+1)+min);
        var keyToPersist = page + '_' + 'advice_random';
        var lastIndexAdvice = localStorage.getItem(keyToPersist);
        var adviceSelected;
        if(parseInt(lastIndexAdvice) !== randomPosition){
          adviceSelected = randomAdvices[page][randomPosition];
          localStorage.setItem(keyToPersist, randomPosition);
          return [adviceSelected];
        }else {
          return getRandom(page);
        }
      }
    }
  })();
