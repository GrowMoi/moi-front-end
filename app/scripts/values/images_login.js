(function() {
'use strict';

  angular.module('moi')
    .value('ImagesLogin', {
      paths: [
        {
          name: 'Animal',
          key:'animals',
          path:'images/animal-interest.png'
        },
        {
          name: 'Globo',
          key:'places',
          path:'images/places-interest.png'
        },
        {
          name: 'Pelota',
          key:'sports',
          path:'images/sports-interest.png'
        },
        {
          name: 'Mensaje',
          key:'comunication',
          path:'images/comunication-interest.png'
        },
        {
          name: 'Libro',
          key:'stories',
          path:'images/stories-interest.png'
        },
        {
          name: 'Pintura',
          key:'art',
          path:'images/art-interest.png'
        },
        {
          name: 'Mascara',
          key:'emotions',
          path:'images/emotions-interest.png'
        },
        {
          name: 'Planeta',
          key:'space',
          path:'images/space-interest.png'
        },
        {
          name: 'Numero',
          key:'numbers',
          path:'images/numbers-interest.png'
        },
        {
          name: 'Planta',
          key:'plants',
          path:'images/plants-interest.png'
        }
      ]
  });
})();
