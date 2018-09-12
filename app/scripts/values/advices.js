(function () {
  'use strict';

  angular.module('moi')
    .value('Advices', {
      tree: {
        message: 'El mundo del conocimiento espera por ti. Da clic en un fruto gris para conocer sus contenidos'
      },
      neuron: {
        messages: [
          'Elige el contenido que más te interese y da doble clic sobre él',
          'Envía 4 contenidos al test para activar la prueba y hacer crecer tu árbol',
          'Da clic en la flecha en el borde izquierdo para desplegar el menú. Si quieres ' +
          'desactivar estas notificaciones, puedes hacerlo editando tus preferencias.'
        ]
      },
      content: {
        message: 'Cuando termines de leer la aplicación, presiona el botón celeste para enviar la pregunta al test'
      },
      quiz: {
        message: 'Elige una alternativa y presiona la flecha para continuar'
      },
      searches: {
        message: 'Escribe lo que quieres conocerr y presiona el botón buscar o la tecla enter'
      },
      tasks: {
        message: 'Revisa y completa tus tareas para recibir distintas recompensas'
      },
      profile: {
        message: 'Este es tu perfil personal. Edita tu información, revisa tus logros y la tabla de ' +
                  'posiciones y busca a tus amigos haciendo clic en el botón correspondiente'
      },
      friends: {
        message: 'Busca a tus amigos por su nombre. Podrás conocer su árbol y su progreso en Moi.'
      },
      sidebar: {
        message: 'Edita tus preferencias, revisa tu perfil y tu inventario o si prefieres, vuelve a tu árbol Moi'
      },
      inventory: {
        message: 'Selecciona uno de los objetos que ganaste para activarlo. Cada uno tiene un efecto diferente'
      }
    });
})();