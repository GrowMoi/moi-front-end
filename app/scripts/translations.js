(function(){
  'use strict';
  angular.module('moi')
  .config(function ($translateProvider) {
    $translateProvider.useSanitizeValueStrategy('escapeParameters');

    $translateProvider.translations('en', {
      menu: {
        menu: 'Menu',
        neurons: 'Neurons',
        account: 'Account'
      },
      dashboard: {
        welcome: 'Welcome'
      },
      login: {
        'login': 'Login',
        'email': 'Email',
        'username': 'Username',
        'password': 'Password',
        'next': 'Next',
        'new_login': 'New login',
        'old_login': 'Old login'
      },
      setting: {
        'settings': 'Settings',
        'interests': 'Interest',
        'level': 'Level',
        'choose-interest': 'Choose as many as you want'
      },
      content: {
        kind: {
          'que-es': 'What?',
          'por-que-es': 'Why?',
          'como-funciona': 'How?',
          'quien-cuando-donde': 'Who/When/Where?'
        },
        max: {
          'coments': 'Coments',
          'media': 'Media',
          'recommended': 'Recommended',
          'links': 'Links',
          'update': 'Last Update'
        }
      },
      searches: {
        'search': 'Search',
        'friends': 'Friends'
      },
      titles: {
        'personal-descripcion': 'Personal Description',
        'current-photo': 'Current Photo',
        'items': 'items',
        'title': 'Title',
        'description': 'Description'
      },
      social: {
        'title': 'Show and tell your friends!',
        'description': 'Show your progress on your Facebook timeline or any '+
                        'social media you like, although you can share via '+
                        'mail. Spread the good news!',
        'send': 'Send'
      },
      tasks: {
        'my_tasks': 'My Tasks',
        'notes': 'Notes',
        'recomendations': 'Recomendations',
        'tasks': 'Tasks',
        'notifications': 'Notifications',
        'favorites': 'Favorites'
      },
      quiz: {
        player: 'Player'
      }
    });

    $translateProvider.translations('es', {
      menu: {
        menu: 'Menú',
        neurons: 'Neuronas',
        account: 'Cuenta'
      },
      dashboard: {
        welcome: 'Bienvenido'
      },
      login: {
        'login': 'Inicia Sesión',
        'email': 'Correo',
        'password': 'Contraseña',
        'username': 'Nombre de Usuario',
        'next': 'Siguiente',
        'new_login': 'Nuevo Inicio de Sesión',
        'old_login': 'Antiguo Inicio de Sesión'
      },
      register:{
        'enter':  'Entrar',
        'register': 'Register',
        'user': 'Nombres y Apellidos',
        'birthday': 'Fecha de Nacimiento',
        'password': 'Contraseña',
        'password-required': 'Contraseña Actual',
        'city': 'Ciudad',
        'confirm-password': 'Confirme Contraseña',
        'country':  'País',
        'email': 'Correo Electrónico',
        'years': 'Años',
        'school': 'Escuela',
        'age': 'Edad',
        'username': 'Nombre de Usuario',
        'accept': 'Aceptar',
        'refuse': 'Rechazar',
        'terms': 'Términos y Condiciones'
      },
      user: {
        'age': 'Edad',
        'city': 'Ciudad'
      },
      profile: {
        'edit-profile': 'Editar Perfil',
        'last-name': 'Apellidos',
        'my-profile': 'Mi  Perfil',
        'password' : 'Nueva Contraseña',
        'description-photo': 'Tu puedes subir una foto jpg, gif, or png file'
      },
      msgs:{
        error:{
          'required': 'Vacío',
          'email': 'Ingrese un correo válido',
          'confirm-password':'No coincide con la contraseña'
        }
      },
      signup: {
        'signup': 'Registrarse'
      },
      setting: {
        'settings': 'Configuraciones',
        'interests': 'Intereses',
        'level': 'Nivel',
        'choose-interest': 'Seleciona uno o cuantos quieras'
      },
      content: {
        kind: {
          'que-es': 'Qué es?',
          'por-que-es': 'Por qué es?',
          'como-funciona': 'Cómo funciona?',
          'quien-cuando-donde': 'Quién/Cuándo/Dónde?'
        },
        max: {
          'coments': 'Comentarios',
          'media': 'Galeria',
          'recommended': 'Recomendaciones',
          'links': 'Enlaces',
          'update': 'Última Actualización: '
        }
      },
      searches: {
        'search': 'Buscar',
        'friends': 'Amigos'
      },
      buttons: {
        'edit-profile': 'Editar Perfil',
        'add-friend': 'Agregar Amigo',
        'save-changes': 'Guardar Cambios',
        'friends': 'Amigos',
        'choose-photo': 'Escoger foto',
        'upload-photo': 'Cargar foto',
        'change-password': 'Cambiar contraseña'
      },
      titles: {
        'personal-descripcion': 'Descripción Personal',
        'current-photo': 'Foto Actual',
        'items': 'items',
        'title': 'Título',
        'description': 'Descripción'
      },
      social: {
        'title': 'Muestrale a tus amigos!',
        'description': 'Muestra tu progreso en Facebook, Twitter '+
                        'o vía email. Comparte las buenas noticias!',
        'send': 'Enviar'
      },
      tasks: {
        'my_tasks': 'Mis Tareas',
        'notes': 'Notas',
        'recomendations': 'Recomendaciones',
        'tasks': 'Tareas',
        'notifications': 'Notificaciones',
        'favorites': 'Favoritos'
      },
      browser: {
        'chrome': 'Para una mejor experiencia, utilice esta página con Google Chrome'
      },
      quiz: {
        player: 'Jugador'
      },
      terms:{
        tittleTerms: 'Términos de Servicio Moi Aprendizaje Social',
        introDescription: 'Al acceder, usar o registrarse en cualquier sitio o servicio puesto a disposición por Moi Aprendizaje Social,'+
            'o al descargar cualquiera de las aplicaciones móviles de Moi Aprendizaje Social (conjuntamente, los “Materiales”), usted reconoce que (i) ha leído y acordado obligarse por los presentes términos de servicio,'+
            'y (ii) ha acordado cumplir con todas las leyes y regulaciones aplicables.'+
            'Es su responsabilidad revisar estos términos de servicio periódicamente.'+
            'Si en cualquier momento le parecen estos términos de servicio inaceptables o no está de acuerdo con ellos, por favor no acceda a los Materiales.'+
            'Moi Aprendizaje Social pretende ser utilizado por estudiantes, profesores e instituciones educacionales, públicas o privadas.'+
            'Prestamos nuestros servicios a profesores, y Moi Aprendizaje Social está disponible para niños desde los 6 años de edad.'+
            'Fuera de Chile, si eres menor de edad en el país de tu residencia, debes revisar este Acuerdo con tus padres o tutores para asegurarte que tú y tus padres o tutores lo entienden.'+
            'Te notificaremos de cualquier actualización a estos Términos de Servicio al publicarla en Moi Aprendizaje Social y por correo electrónico dirigido a la dirección de correo en tu cuenta.'+
            'En orden de acceder a los Materiales, se te pedirá cierta información tales como nombre de usuario, edad, e-mail, escuela, ciudad y país. Usted acuerda que toda información que provea siempre será correcta.'+
            'Los Materiales podrán contener material de nuestra propiedad o que nos fue licenciada. Este material incluye, pero no está limitado a, diseño, layout, look, apariencia, y gráficas. La reproducción de este contenido fuera de Moi Aprendizaje Social está prohibida.'+
            'Moi Aprendizaje Social es dueña de todo derecho, título e interés en los Materiales, incluyendo todo derecho de propiedad, ya sea que esté registrado o no,  y donde sea que dichos derechos existan.'+
            'Intentar copiar, duplicar, reproducir, vender, transferir o enajenar los Materiales se encuentra estrictamente prohibido sin nuestro consentimiento previo.',
        contentUser: 'Contenido de Usuario',
        contentUserDescription: 'Algunas áreas de los Materiales facultarán a los usuarios a publicar contenidos tales como notas, resultados y comentarios, o cualquier otro contenido o información (cualquier material que un usuario ingrese, publique, presente, o ponga a disposición en los Materiales o sitio se considerará “Contenido de Usuario”).'+
            'Usted mantendrá propiedad sobre su Contenido de Usuario. Bajo ninguna circunstancia Moi Aprendizaje Social sera responsable por el pago del Contenido de Usuario que provea. Usted es el único responsable por el Contenido de Usuario que haga disponible a través de los Materiales. Moi Aprendizaje Social no controla el Contenido de Usuario que se almacena  través del servicio,' +
            'ni garantiza su corrección, integridad o calidad del Contenido de Usuario.'+
            'Usted acuerda no publicar Contenido de Usuario que: (i) pueda crear riesgos de daño, pérdida, lesión física o mental, angustia emocional, muerte, incapacidad, desfiguración, o enfermedad física o mental para usted, para cualquier otra persona,'+
            'o para cualquier animal; (ii) pueda crear riesgo de cualquier pérdida o daño a cualquier persona o propiedad; (iii) busque ocasionar daño o explotar niños al exponerlos a contenidos inapropiados, consultarles por detalles de identificación o de cualquier otra manera;'+
            '(iv) pueda constituir o contribuir a una crimen o delito; (v) contenga cualquier información o contenido que consideremos ilícito, dañino, abusivo, racial o éticamente ofensivo, difamatorio, infraccional, invasivo de la privacidad personal o derechos públicos, abusador, humillante a otras personas, amenazante, profanador,'+
            'o de otra manera objetable; (vi) contenga cualquier información o contenido que sea ilegal (incluyendo, sin limitación, la divulgación de información privilegiada según lo establecido por la ley o los secretos profesionales de otra persona); (vii) contenga cualquier información o contenido del que usted no tenga derecho a disponer bajo ley,'+
            'contrato o relación fiduciaria alguna; o (viii) contenga cualquier información o contenido que usted sepa no es correcto o actualizado. Usted acuerda que cualquier Contenido de Usuario que publique no viola ni violará derechos de terceros de ningún tipo, incluyendo sin limitación cualquier Derecho de Propiedad Intelectual (como se definirá más abajo) y/o derechos de privacidad.'+
            'Usted reconoce y acerda que cualquier Contenido de Usuario que publique podrá ser mostrado y revelado a otros usuarios según lo permita la funcionalidad de los Materiales. Moi Aprendizaje Social se reserva el derecho, pero no está obligado, a editar, remover, re-categorizar, pre-examinar, rechazar y/o modificar cualquier Contenido de Usuario que crea, a su sola discreción, que viola estas provisiones.'+
            'Usted entiende que publicar su Contenido de Usuario en los Materiales o sitio no constituye sustituto del necesario registro que debe realizarse ante las entidades y autoridades pertinentes.'+
            'Para los fines de estos términos de servicio, “Derechos de Propiedad Intelectual” significa todos los derechos de patente, copyrights, derechos sobre los esquemas de trazado de circuitos integrados, derechos morales, derechos de publicidad, marcas comerciales, márcas de fábrica, marcas de servicios, secretos profesionales y cualquier otro derecho de propiedad intelectual que exista actualmente'+
            'o pueda existir, todas sus aplicaciones y los registros, renovaciones y extensiones de los mismos, bajo las leyes de cualquier estado, país, territorio o jurisdicción.'+
            'En conexión con su Contenido de Usuario, usted afirma, representa y garantiza lo siguiente:'+
            'Su Contenido de Usuario y el uso del mismo por parte de Moi Aprendizaje Social según lo contemplado por estos términos de servicio y los Materiales no infringen ninguna ley o derechos de terceros,'+
            'incluyendo pero no limitándose a cualquier Derecho de Propiedad Intelectual o de privacidad.'+
            'Moi Aprendizaje Social podrá ejercer sobre su Contenido de Usuario los derechos que estos términos de servicio le confieran sin responsabilidad en el pago de cualquier tarifa, residual, pago o royalty pagable acordado colectivamente por el usuario o de cualquier otra forma.'+
            'A su mejor saber y entender, todo su Contenido de Usuario y cualquier otra información que nos provea es verdadera y precisa.'+
            'Moi Aprendizaje Social no se hará responsable ni asumirá perjuicio alguno por cualquier Contenido de Usuario que usted o cualquier otro usuario o tercero publique o envíe a través de los Servicios.'+
            'Usted será el único responsable de su Contenido de Usuario y de las consecuencias de publicarlo, y usted acuerda que nosotros solamente actuamos como conducto pasivo de la distribución y publicación en línea de su Contenido de Usuario.'+
            'Usted entiende y acuerda que podrá estar expuesto a Contenido de Usuario que sea impreciso, objetable, inapropiado para niños, o de otra manera inapropiado para su propósito, y acuerda que Moi Aprendizaje Social no será responsable por cualquier perjuicio que pueda sufrir como resultado de Contenido de Usuario.'+
            'Al publicar cualquier Contenido de Usuario en los Materiales o sitio, usted expresamente otorga, y representa y garantiza que tiene derecho a otorgar, a Moi Aprendizaje Social una licencia gratuita, sublicenceable, transferible, perpetua, irrevocable, no-exclusiva, mundial para usar, reproducir, modificar, publicar,'+
            'editar, traducir, distribuir, sindicar, comunicar y exhibir públicamente, y realizar obras derivadas de todo tipo sobre su Contenido de Usuario, en la totalidad o en parte, y en cualquier forma, medio o tecnología, ya sea actualmente conocida o sea desarrollada posteriormente, para su uso en conexión con los Materiales.'+
            'Usted también otorga a cada usuario de los Materiales una licencia no-exclusiva para acceder a su Contenido de Usuario a través de los Materiales, y para usar, reproducir, distribuir, exhibir y realizar dicho Contenido de Usuario como sea permitido a través de la funcionalidad de los Materiales y bajo estos términos de servicio.'+
            'Las licencias otorgadas por usted en su Contenido de Usuario terminarán dentro de un tiempo comercial razonable luego de haber removido o borrado su Contenido de Usuario de los Materiales o sitio. Podremos retener y usar su Contenido de Usuario mientras sea necesario para cumplir con nuestras obligaciones legales, resolver disputas,'+
            ' y hacer cumplir nuestros acuerdos. Consistente con estos requerimientos, trataremos de borrar su Contenido de Usuario tan rápido como sea posible una vez fuese solicitado. Rogamos tener presente que, de todas formas, podrá haber una demora en la supresión del Contenido de Usuario de nuestros servidores y que versiones de respaldo podrán existir después del borrado. Adicionalmente, no borramos Contenido de Usuario de nuestros servidores que tenga en común con otros usuarios.',
        integrityAccount: 'Usted deberá asegurar la seguridad e integridad de su cuenta',
        integrityDescription:'Usted es responsable de mantener la confidencialidad de las contraseñas asociadas con cualquier cuenta que usted utilice para acceder a los Materiales y será responsable de todas las actividades que ocurran bajo sus cuentas. Usted es exclusivamente responsable por toda consequencia,'+
            'pérdida, o daño que nosotros directa o indirectamente suframos debido al uso no autorizado realizado por su cuenta. Moi Aprendizaje Social no será responsable de los perjuicios que sufra por la utilización de su cuenta por parte de terceros. Usted será responsable por los perjuicios que sufra Moi Aprendizaje Social por el uso de su cuenta por parte de terceros.',
        forbiddenActivity: 'Usted no realizará actividades prohibidas',
        forbiddenActivityDescription: 'Usted acuerda no realizar ninguna de las siguientes actividades prohibidas: (i) copiar, distribuir, o revelar ninguna parte de los Materiales por ningún medio, incluyendo sin limitación el realizado por “scraping” automatizado o no-automatizado;'+
          '(ii) usar cualquier sistema automatizado para acceder a los Materiales en orden de enviar mayor número de requerimientos a los servidores de Moi Aprendizaje Social que los que un humano razonablemente puede producir en el mismo periodo de tiempo al usar un navegador convencional de; (iii) transmitir spam, cadena de mensajes, u otro correo electrónico no solicitado;'+
          '(iv) intentar interferir con, comprometer la integridad o seguridad del sistema o descifrar cualquier transmisión para o desde los servidores que ofrecen los Materiales; (v) realizar cualquier acción que imponga, o pueda imponer a su sola discreción una carga irracional o desproporcionado a nuestra infraestructura; (vi) cargar datos inválidos, virus, gusanos, u otro agente software a través de los Materiales; (vii) recolectar o almacenar cualquier información personal indentificable, incluyendo nombres de las cuentas, de los Materiales o sitio;'+
          '(viii) usar los Materiales para cualquier propósito de solicitud comercial; (ix) impersonar a otra persona o declarar falsamente su afiliación con una persona o entidad, realizando fraude o intentando esconder su identidad; (x) interferir con el funcionamiento apropiado del sitio; (xi) acceder a cualquier contenido de los Materiales a través de cualquier tecnología o medio distinto de los proveídos o autorizados por estos Términos; o (xii) eludir las medidas que podamos emplear para prevenir o restringir el acceso a los Materiales, incluyendo sin limitación características que prevengan o restrijan el uso o copien cualquier contenido o forcen limitaciones en el acceso a los Materiales.',
        law: 'Mantenemos el derecho a suspender o poner término al acceso de los Materiales y sus características',
        lawDescription: 'Podremos, sin notificación previa, suspender o poner término al acceso de los Materiales, o a ciertas características de los mismos, o crear límites a su acceso.'+
          'Podremos terminar o suspender permanente o temporalmente su acceso a los Materiales sin notificación y responsabilidad por cualquier razón, incluyendo si por nuestra sola decisión determinamos que usted ha violado cualquier provisión de estos términos de servicio, o por ninguna razón. A la terminación por cualquier razón o ninguna, usted continuará obligado a estos términos de servicios. Cualquier dato, historial y contenido '+
          'de la cuenta que permanezca en los servidores podrá ser borrado, alterado, movido o transferido en cualquier momento por cualquier razón a sola decisión de Moi Aprendizaje Social, con o sin notificación previa y sin responsabilidad alguna. Moi Aprendizaje Social no provee o garantiza, y expresamente niega, cualquier valor que se le pueda atribuir a los datos que permanezcan en los servidores que contienen los Materiales.',
        license: 'Moi Aprendizaje Social le otorga una licencia limitada',
        licenseDescription: 'Sujeto al cumplimiento de los términos y condiciones de estos términos de servicio, se le otorga una licencia no-exclusiva, limitada, intransferible, libremente revocable para acceder a los Materiales como fueron diseñados. '+
          ' Moi Aprendizaje Social se reserva todos los derechos no expresamente otorgados en los Materiales. Moi Aprendizaje Social podrá terminar esta licencia en cualquier momento por cualquier razón o sin razón alguna.',
        pay:'Términos y condiciones de pago',
        payDescription: 'En caso que decida contratar alguno de los productos pagados de Moi Aprendizaje Social y nos proveas con tu información de pago, usted acepta en este acto los siguientes términos y condiciones de pago:',
        payAccount: 'Cuentas pagadas',
        payAccountDescription: 'Moi Aprendizaje Social ofrece la opción de obtener una cuenta para tutores en orden de tener acceso a nuestra plataforma de reportes y recompensas, y disfrutar de características adicionales por una tarifa. '+
          'Si es que decide contratar este producto, usted obtendrá una Cuenta Pagada y tendrá acceso a las características adicionales sobre las Cuentas Gratuitas como se describe en https://growmoi.com/productos. Moi Aprendizaje Social acepta tarjetas de crédito y cuentas de PayPal, y hará el recargo de la tarifa antes de darle acceso a su nueva cuenta.',
        billing: 'Facturación',
        billingDescription: 'Las tarifas de tu Cuenta Pagada se facturarán desde la fecha que se contrate y dependiendo del producto, en cada renovación que proceda a menos y hasta que canceles tu cuenta. Moi Aprendizaje Social cobrará automáticamente tu tarjeta de crédito o cuenta de PayPal en el día calendario que corresponda al comienzo de tu Cuenta Pagada. Todas las tarifas y recargos son pre-pagados y no reembolsables, y no existirán reembolsos o créditos por períodos de uso parcial.',
        accountCancellation: 'Cancelación de tu cuenta',
        accountCancellationDescription: 'Podrás cancelar tu Cuenta Pagada en cualquier momento, y la cancelación tendrá efecto inmediatamente. Su Cuenta Pagada continuará en efecto a menos y hasta que la canceles o nosotros le pongamos término. Usted debe cancelar su Cuenta Pagada antes de que se renueve en orden de evitar que se le cobre por el próximo periodo a su tarjeta de crédito o cuenta de PayPal. De decidir cancelar su Cuenta Pagada, por favor considere que no procederá ningún tipo de reembolso por pagos anteriores.',
        information: 'Usted nos provee su información a su propio riesgo y consciente en que esta sea procesada en Estados Unidos',
        informationDescription: 'Nos preocupa la privacidad de nuestros Usuarios. Hemos implementado medidas técnicas y organizacionales comercialmente razonables para asegurar su información personal de pérdida accidental o de acceso no autorizado, uso, alteración o divulgación. De todas formas, no podemos garantizar que terceros no autorizados nunca serán capaces de derrotar estas medidas o usar su información personal propósitos impropios. Usted acuerda entregar su información personal o toda otra información a Moi Aprendizaje Social a su propio riesgo. Usted acuerda que su información personal sea recopilada, usada, transferida y procesada en Estados Unidos.'+
          'Nos reservamos el derecho de rastrear y reportar de forma anónima la actividad de los usuarios en los Materiales usando información que no permite la identificación personal de los usuarios. No publicitaremos ni comerciaremos a estudiantes, ni compartiremos la información de los estudiantes recolectada por Moi Aprendizaje Social con terceros para fines de publicidad o marketing.',
        materials:'Materiales de terceros',
        materialsDescription: 'Los Materiales podrán contener enlaces a contenidos, sitios web, juegos y/o presentaciones de terceros que no son de propiedad o controladas por Moi Aprendizaje Social. Moi Aprendizaje Social no avala o asume responsabilidad alguna por cualquier de los sitios, informaciones, y contenidos de terceros. Si accede a un sitio web de terceros desde los Materiales o sitio, usted lo hace a su propio riesgo, y entiende que estos términos de servicios no aplicarán en la utilización de dichos sitios. Usted expresamente libera a Moi Aprendizaje Social de toda responsabilidad que pueda originarse en la utilización de cualquier sitio web, información,'+
          ' o contenido de terceros. Usted acuerda que Moi Aprendizaje Social no será responsable por la pérdida o daño de cualquier tipo relacionado a sus transacciones con tales anunciantes.',
        indemnify: 'USTED NOS INDMENIZARÁ',
        indemnifyDescription: 'Usted acuerda defender, indemnizar y eximir a Moi Aprendizaje Social y sus agentes, licenciantes, administradores, y otras compañías afiliadas, y sus empleados, contratistas, agentes, representantes y directores, de toda responsabilidad y/o denuncia, daño, obligación, pérdida, costo o deuda,'+
          ' y gastos que surjan por: (i) su uso de y acceso a los Materiales, incluyendo cualquier información o contenido transmitido o recibido por usted; (ii) su infracción a cualquier término de estos términos de servicio, incluyendo sin limitación su incumplimiento de cualquier de las representaciones y garantías referidas; (iii) su violación de cualquier derecho de terceros, incluyendo sin limitación cualquier derecho de privacidad, publicidad o Derechos de Propiedad Intelectual; (iv) su violación de cualquier ley,'+
          ' norma o regulación de Chile o cualquier otro país; (v) cualquier denuncia o daño que surja como resultado de su Contenido de Usuario o cualquier otro que sea ingresado a través de su cuenta; o (vi) cualquier acceso y uso de los Materiales por parte de terceros con su nombre de usuario único, contraseña u otro código de seguridad apropiado.',
        noGuarante: 'NINGUNA GARANTÍA',
        noGuaranteDescription: 'LOS MATERIALES SON OFRECIDOS TAL COMO SON Y SEGÚN DISPONIBILIDAD. EL USO DE LOS MATERIALES ES A SU PROPIO RIESGO. A LA MÁXIMA EXTENSIÓN PERMITIDA POR LA LEY, LOS MATERIALES SON OFRECIDOS SIN GARANTÍA DE NINGÚN TIPO, YA SEA EXPRESA O IMPLÍCITA, INCLUYENDO, PERO NO LIMITADO A, GARANTÍAS IMPLÍCITAS DE COMERCIABILIDAD,'+
          ' ADECUACIÓN A UN PROPÓSITO PARTICULAR, O NO INFRACCIÓN. NINGÚN CONSEJO O INFORMACIÓN, YA SEA ORAL O ESCRITO, OBTENIDO POR USTED DE MOI APRENDIZAJE SOCIAL O A TRAVÉS DE LOS MATERIALES ORIGINARÁ GARANTÍA ALGUNA QUE NO SE ENCUENTRE ESTABLECIDA EXPRESAMENTE EN ESTOS TÉRMINOS. SIN LIMITACIÓN DE NINGÚN TIPO, MOI APRENDIZAJE SOCIAL Y SUS LICENCIANTES NO GARANTIZAN QUE EL CONTENIDO ES PRECISO, CONFIABLE O CORRECTO; QUE LOS MATERIALES SATISFACERAN SUS REQUERIMIENTOS; QUE LOS MATERIALES'+
          'SE ENCONTRARÁN DISPONIBLES EN CUALQUIER MOMENTO O LUGAR EN PARTICULAR, ININTERRUMPIDAMENTE O DE FORMA SEGURA; QUE CUALQUIER DEFECTO O ERROR SERÁ CORREGIDO; O QUE LOS MATERIALES SE ENCUENTRAN LIBRES DE VIRUS U OTRO COMPONENTE DAÑINO. CUALQUIER CONTENIDO DESCARGADO O DE OTRA FORMA OBTENIDO A TRAVÉS DEL USO DE LOS MATERIALES ES DESCARGADO A SU PROPIO RIESGO Y USTED SERÁ EL ÚNICO RESPONSABLE POR CUALQUIER DAÑO OCASIONADO AL SISTEMA DE SU COMPUTADOR O PÉRDIDA DE INFORMACIÓN  QUE RESULTE POR DICHA DESCARGA O SU USO DE LOS MATERIALES.',
        limitation: 'LIMITACIÓN DE RESPONSABILIDAD',
        limitationDescription: 'A LA MÁXIMA EXTENSIÓN PERMITIDA POR LA LEY, EN NINGÚN EVENTO SERÁ MOI APRENDIZAJE SOCIAL, SUS AFILIADOS, AGENTES, DIRECTORES, EMPLEADOS, PROVEEDORES O LICENCIANTES RESPONSABLE(S) POR CUALQUIER DAÑO DIRECTO, INDIRECTO, PUNITIVO, INCIDENTAL, ESPECIAL, CONSECUENTE O EJEMPLAR, INCLUYENDO SIN LIMITACIÓN DAÑOS POR LUCRO CESANTE, BUENA FE, USO, INFORMACIÓN U OTRAS PÉRDIDAS INTANGIBLES, QUE RESULTEN POR EL USO DE, O LA INHABILIDAD DE USAR, ESTOS SERVICIOS. EN NINGUNA CIRCUNSTANCIA SERÁ MOI APRENDIZAJE SOCIAL RESPONSABLE POR CUALQUIER DAÑO, PÉRDIDA O LESIÓN RESULTANTE DE LA PIRATERÍA, ALTERACIÓN DE DATOS Y OTRO ACCESO NO AUTORIZADO O USO DE LOS MATERIALES O SU CUENTA O LA INFORMACIÓN CONTENIDA EN ELLA.'+
          ' A LA MÁXIMA EXTENSIÓN PERMITIDA POR LA LEY, MOI APRENDIZAJE SOCIAL NO ASUME RESPONSABILIDAD ALGUNA POR (I) CUALQUIER ERROR, EQUIVOCACIÓN, OMISIÓN O INEXACTITUD DEL CONTENIDO; (II) CUALQUIER LESIÓN PERSONAL O DAÑO A LA PROPIEDAD, DE NINGUNA NATURALEZA, RESULTANTE DE SU ACCESO A O USO DE NUESTROS MATERIALES; (III) CUALQUIER ACCESO O USO NO AUTORIZADO DE NUESTROS SERVIDORES  DE SEGURIDAD Y/O CUALQUIER INFORMACIÓN PERSONAL ALMACENADO EN ELLOS; (IV) CUALQUIER INTERRUPCIÓN O CESE DE TRANSMISIÓN A O DE LOS MATERIALES; (V) CUALQUIER BUG, VIRUS, TROYANOS, O SIMILARES QUE PUEDA SER TRANSMITIDO A O POR MEDIO DE NUESTROS MATERIALES POR TERCEROS; (VI) CUALQUIER PÉRDIDA O DAÑO INCURRIDO COMO RESULTADO DEL USO DEL CONTENIDO PUBLICADO,'+
          ' ENVIADO, TRANSMITIDO, O DE OTRA FORMA PUESTO A DISPOSICIÓN A TRAVÉS DE LOS MATERIALES; Y/O (VII) CUALQUIER CONTENIDO DE USUARIO O DE CONDUCTA DIFAMATORIA, OFENSIVA, O ILEGAL DE CUALQUIER TERCERO. EN NINGÚN EVENTO SERÁ MOI APRENDIZAJE SOCIAL, SUS AFILIADOS, AGENTES, DIRECTORES, EMPLEADOS, PROVEEDORES O LICENCIANTES RESPONSABLE(S) ANTE USTED POR CUALQUIER DENUNCIA, PROCEDIMIENTO, RESPONSABILIDAD, OBLIGACIÓN, DAÑO, PÉRDIDA O COSTO EN UN MONTO QUE EXCEDA EL QUE USTED HA PAGADO A MOI APRENDIZAJE SOCIAL.'+
          ' ESTA LIMITACIÓN DE RESPONSABILIDAD SURTE PLENO EFECTO INDEPENDIENTE SI LA RESPONSABILIDAD ALEGADA SE FUNDAMENTE EN SEDE CONTRACTUAL O EXTRACONTRACTUAL, NEGLIGENCIA, RESPONSABILIDAD ESTRICTA, O BAJO CUALQUIER OTRA BASE, INCLUSO SI MOI APRENDIZAJE SOCIAL HA SIDO ASESORADA ACERCA DE LA POSIBILIDAD DE DICHO DAÑO. LA PRESENTE LIMITACIÓN DE RESPONSABILIDAD APLICARÁ A LA MÁXIMA EXTENSIÓN PERMITIDA POR LA LEY ANTE EL TRIBUNAL COMPETENTE.',
        notifications:  'Notificaciones',
        notificationsDescription: 'Moi Aprendizaje Social podrá notificarle, ya sea que tales notificaciones sean requeridas por ley o sean necesarias por otras razones comerciales,  via aviso por e-mail, escrita o en copia de papel, o a través de la publicación de tal aviso en nuestro sitio web, de la forma determinada por Moi Aprendizaje Social a su solo arbitrio. Moi Aprendizaje Social se reserva el derecho a determinar la forma y los medios para notificar a nuestros usuarios. Moi Aprendizaje Social no es responsable por cualquier filtración automática que usted o su proveedor de red puedan aplicar a las notificaciones por e-mail que enviemos a la dirección de correo que nos ha proveído. Recomendamos agregar learning@growmoi.com a su agenda de contactos para así asegurar recibir nuestras notificaciones por e-mail.',
        block: 'Este es todo nuestro acuerdo y si cualquier parte del mismo es considerada inválida, las demás provisiones se mantendrán válidas.',
        blockDescription: 'Este Acuerdo, conjuntamente con cualquier enmienda o acuerdo adicional que suscriba con Moi Aprendizaje Social en conexión con los Materiales, constituirá el acuerdo entero entre usted y Moi Aprendizaje Social respecto de los Materiales. Si cualquier provisión de este Acuerdo se considerara inválida por algún tribunal de competente jurisdicción, la inválidez de dicha provisión no afectará la validez de las demás provisiones de este Acuerdo, que permanecerá totalmente vigente.'+
          'La omisión de exigir el estricto cumplimiento de cualquiera de los términos de estos términos de servicio en una o más ocasiones no podrá ser considerada, en ningún caso, como renuncia de derechos o consentimiento, ni privará a Moi Aprendizaje Social de su facultad de exigir el estricto cumplimiento de las obligaciones que de él derivan.'
      }
    });

    $translateProvider.preferredLanguage('es');
  });
})();
