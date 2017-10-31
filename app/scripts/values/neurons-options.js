(function() {
  'use strict';

  angular.module('moi')
    .value('NeuronsOptions', {
      'root': {
        color: 'yellow'
      },
      'second-level-0': {
        color: 'blue'
      },
      'second-level-1': {
        color: 'green'
      },
      'second-level-2': {
        color: 'yellow'
      },
      'second-level-3': {
        color: 'red'
      },
      'third-level-0': {
        color: 'blue'
      },
      'third-level-2': {
        color: 'green'
      },
      'third-level-3': {
        color: 'green'
      },
      'third-level-4': {
        color: 'yellow'
      },
      'third-level-6': {
        color: 'red'
      },
      'third-level-7': {
        color: 'red'
      },
      'fourth-level-0': {
        color: 'blue'
      },
      'fourth-level-1': {
        color: 'blue'
      },
      'fourth-level-2': {
        color: 'blue'
      },
      'fourth-level-4': {
        color: 'green'
      },
      'fourth-level-5': {
        color: 'green'
      },
      'fourth-level-6': {
        color: 'green'
      },
      'fourth-level-10': {
        color: 'green'
      },
      'fourth-level-11': {
        color: 'green'
      },
      'fourth-level-8': {
        color: 'yellow'
      },
      'fourth-level-9': {
        color: 'yellow'
      },
      'fourth-level-12': {
        color: 'red'
      },
      'fourth-level-13': {
        color: 'red'
      },
      'fourth-level-18': {
        color: 'red'
      },
      'fourth-level-19': {
        color: 'red'
      },
      'fourth-level-20': {
        color: 'red'
      },
      'fourth-level-21': {
        color: 'red'
      },
      'fourth-level-22': {
        color: 'red'
      },
      'fifth-level-0000': {
        color: 'blue'
      },
      'fifth-level-0001': {
        color: 'blue'
      },
      'fifth-level-0002': {
        color: 'blue'
      },
      'fifth-level-0010': {
        color: 'blue'
      },
      'fifth-level-0011': {
        color: 'blue'
      },
      'fifth-level-1000': {
        color: 'green'
      },
      'fifth-level-1100': {
        color: 'green'
      },
      'fifth-level-1101': {
        color: 'green'
      },
      'fifth-level-1020': {
        color: 'green'
      },
      'fifth-level-1024': {
        color: 'green'
      },
      'fifth-level-1025': {
        color: 'green'
      },
      'fifth-level-1023': {
        color: 'green'
      },
      'fifth-level-1022': {
        color: 'green'
      },
      'fifth-level-1021': {
        color: 'green'
      },
      'fifth-level-2000': {
        color: 'yellow'
      },
      'fifth-level-2001': {
        color: 'yellow'
      },
      'fifth-level-2002': {
        color: 'yellow'
      },
      'fifth-level-2003': {
        color: 'yellow'
      },
      'fifth-level-2010': {
        color: 'yellow'
      },
      'fifth-level-2011': {
        color: 'yellow'
      },
      'fifth-level-3000': {
        color: 'red'
      },
      'fifth-level-3010': {
        color: 'red'
      },
      'fifth-level-3011': {
        color: 'red'
      },
      'fifth-level-3100': {
        color: 'red'
      },
      'fifth-level-3101': {
        color: 'red'
      },
      'fifth-level-3110': {
        color: 'red'
      },
      'fifth-level-3111': {
        color: 'red'
      },
      'fifth-level-3112': {
        color: 'red'
      },
      'fifth-level-3113': {
        color: 'red'
      },
      'fifth-level-3130': {
        color: 'red'
      },
      'fifth-level-3131': {
        color: 'red'
      },
      'fifth-level-3140': {
        color: 'red'
      },
      'fifth-level-3141': {
        color: 'red'
      },
      //level-6
      'sixth-level-00000': {
        color: 'blue'
      },
      'sixth-level-00010': {
        color: 'blue'
      },
      'sixth-level-00011': {
        color: 'blue'
      },
      'sixth-level-00012': {
        color: 'blue'
      },
      'sixth-level-00100': {
        color: 'blue'
      },
      'sixth-level-00101': {
        color: 'blue'
      },
      'sixth-level-00102': {
        color: 'blue'
      },
      'sixth-level-00103': {
        color: 'blue'
      },
      'sixth-level-00112': {
        color: 'blue'
      },
      'sixth-level-00111': {
        color: 'blue'
      },
      'sixth-level-00110': {
        color: 'blue'
      },
      'sixth-level-10000': {
        color: 'green'
      },
      'sixth-level-10001': {
        color: 'green'
      },
      'sixth-level-11000': {
        color: 'green'
      },
      'sixth-level-11010': {
        color: 'green'
      },
      'sixth-level-10200': {
        color: 'green'
      },
      'sixth-level-10240': {
        color: 'green'
      },
      'sixth-level-10250': {
        color: 'green'
      },
      'sixth-level-10231': {
        color: 'green'
      },
      'sixth-level-10230': {
        color: 'green'
      },
      'sixth-level-10220': {
        color: 'green'
      },
      'sixth-level-11011': {
        color: 'green'
      },
      'sixth-level-11001': {
        color: 'green'
      },
      'sixth-level-10210': {
        color: 'green'
      },
      'sixth-level-11012': {
        color: 'green'
      },
      'sixth-level-11013': {
        color: 'green'
      },
      'sixth-level-20000': {
        color: 'yellow'
      },
      'sixth-level-20010': {
        color: 'yellow'
      },
      'sixth-level-20011': {
        color: 'yellow'
      },
      'sixth-level-20020': {
        color: 'yellow'
      },
      'sixth-level-20021': {
        color: 'yellow'
      },
      'sixth-level-20012': {
        color: 'yellow'
      },
      'sixth-level-20030': {
        color: 'yellow'
      },
      'sixth-level-20031': {
        color: 'yellow'
      },
      'sixth-level-20100': {
        color: 'yellow'
      },
      'sixth-level-20101': {
        color: 'yellow'
      },
      'sixth-level-20110': {
        color: 'yellow'
      },
      'sixth-level-20111': {
        color: 'yellow'
      },
      'sixth-level-30000': {
        color: 'red'
      },
      'sixth-level-30001': {
        color: 'red'
      },
      'sixth-level-30100': {
        color: 'red'
      },
      'sixth-level-30101': {
        color: 'red'
      },
      'sixth-level-30110': {
        color: 'red'
      },
      'sixth-level-31000': {
        color: 'red'
      },
      'sixth-level-31010': {
        color: 'red'
      },
      'sixth-level-31100': {
        color: 'red'
      },
      'sixth-level-31101': {
        color: 'red'
      },
      'sixth-level-31110': {
        color: 'red'
      },
      'sixth-level-31310': {
        color: 'red'
      },
      'sixth-level-31311': {
        color: 'red'
      },
      'sixth-level-31410': {
        color: 'red'
      },
      'sixth-level-31411': {
        color: 'red'
      },
      'sixth-level-31412': {
        color: 'red'
      },
      'seventh-level-001020': { //ángulos
        color: 'blue'
      },
      'seventh-level-001001': { //problemas
        color: 'blue'
      },
      'seventh-level-000102': { //materia
        color: 'blue'
      },
      'seventh-level-000101': { //mecanica
        color: 'blue'
      },
      'seventh-level-000121': { //telemetria
        color: 'blue'
      },
      'seventh-level-000111': { //prisma
        color: 'blue'
      },
      'seventh-level-000103': { //tiempo
        color: 'blue'
      },
      'seventh-level-000100': { //astronomia
        color: 'blue'
      },
      'seventh-level-000110': { //microscopio
        color: 'blue'
      },
      'seventh-level-000120': { //estadistica
        color: 'blue'
      },
      'seventh-level-001010': { //division
        color: 'blue'
      },
      'seventh-level-001120': { //reales
        color: 'blue'
      },
      'seventh-level-001000': { //multiplicacion
        color: 'blue'
      },
      'seventh-level-102500': { //clima
        color: 'green'
      },
      'seventh-level-100001': { //hidrogeno
        color: 'green'
      },
      'seventh-level-100000': { //oxigeno
        color: 'green'
      },
      'seventh-level-102310': { //carbono
        color: 'green'
      },
      'seventh-level-110103': { //organica
        color: 'green'
      },
      'seventh-level-110100': { //parasito
        color: 'green'
      },
      'seventh-level-110131': { //invertebrados
        color: 'green'
      },
      'seventh-level-110130': { //vertebrados
        color: 'green'
      },
      'seventh-level-110121': { //arbol
        color: 'green'
      },
      'seventh-level-110122': { //botanica
        color: 'green'
      },
      'seventh-level-110120': { //fotosintesis
        color: 'green'
      },
      'seventh-level-110101': { //citoplasma
        color: 'green'
      },
      'seventh-level-110102': { //c de la vida
        color: 'green'
      },
      'seventh-level-102301': { //corteza
        color: 'green'
      },
      'seventh-level-102300': { //geografia
        color: 'green'
      },
      'seventh-level-102200': { //corriente
        color: 'green'
      },
      'seventh-level-200000': { //familia
        color: 'yellow'
      },
      'seventh-level-200001': { //habilidades
        color: 'yellow'
      },
      'seventh-level-201100': { //coherencia
        color: 'yellow'
      },
      'seventh-level-201010': { //idea
        color: 'yellow'
      },
      'seventh-level-201000': { //experiencia
        color: 'yellow'
      },
      'seventh-level-313100': { //comic
        color: 'red'
      },
      'seventh-level-313110': { //fotografia
        color: 'red'
      },
      'seventh-level-310100': { //fábula
        color: 'red'
      },
      'seventh-level-311100': { //escala
        color: 'red'
      },
      'seventh-level-314110': { //mitologia
        color: 'red'
      },
      'seventh-level-311000': { //piano
        color: 'red'
      },
      'seventh-level-311010': { //orquesta
        color: 'red'
      },
      'eighth-level-0001022': { //entropia
        color: 'blue'
      },
      'eighth-level-0001011': { //computador
        color: 'blue'
      },
      'eighth-level-0001014': { //sistema
        color: 'blue'
      },
      'eighth-level-0010200': { //vector
        color: 'blue'
      },
      'eighth-level-0001010': { //masa
        color: 'blue'
      },
      'eighth-level-0001012': { //maquina
        color: 'blue'
      },
      'eighth-level-0010000': { //exponentes
        color: 'blue'
      },
      'eighth-level-0010010': { //algebra
        color: 'blue'
      },
      'eighth-level-0010013': { //fuerza
        color: 'blue'
      },
      'eighth-level-0001020': { //molecula
        color: 'blue'
      },
      'eighth-level-0001021': { //energia
        color: 'blue'
      },
      'eighth-level-0001000': { //universo
        color: 'blue'
      },
      'eighth-level-0001013': { //fuerza
        color: 'blue'
      },
      'eighth-level-1101011': { //n. celular
        color: 'green'
      },
      'eighth-level-1101010': { //aminoacido
        color: 'green'
      },
      'eighth-level-1101210': { //bosque
        color: 'green'
      },
      'eighth-level-1101300': { //peces
        color: 'green'
      },
      'eighth-level-1101310': { //artropodos
        color: 'green'
      },
      'eighth-level-1101301': { //mamifero
        color: 'green'
      },
      'eighth-level-1101020': { //reproduccion
        color: 'green'
      },
      'eighth-level-1101302': { //primates
        color: 'green'
      },
      'eighth-level-1101220': { //agricultura
        color: 'green'
      },
      'eighth-level-1101303': { //humanos
        color: 'green'
      },
      'eighth-level-2000011': { //escribir
        color: 'yellow'
      },
      'eighth-level-2000016': { //deportes
        color: 'yellow'
      },
      'eighth-level-2000015': { //filosofia
        color: 'yellow'
      },
      'eighth-level-2000012': { //gramatica
        color: 'yellow'
      },
      'eighth-level-2000014': { //historia
        color: 'yellow'
      },
      'eighth-level-2000010': { //herramientas
        color: 'yellow'
      },
      'eighth-level-2000013': { //economia
        color: 'yellow'
      },
      'eighth-level-2010000': { //inventar
        color: 'yellow'
      },
      'eighth-level-3110100': { //sinfonia
        color: 'red'
      },
      'eighth-level-3131100': { //cine
        color: 'red'
      },
      'eighth-level-3101000': { //magia
        color: 'red'
      },
      'nineth-level-00010120': { //motor
        color: 'blue'
      },
      'nineth-level-00010002': { //planetas
        color: 'blue'
      },
      'nineth-level-00010140': { //programacion
        color: 'blue'
      },
      'nineth-level-00010110': { //robot
        color: 'blue'
      },
      'nineth-level-00010001': { //estrella
        color: 'blue'
      },
      'nineth-level-00010000': { //espacio
        color: 'blue'
      },
      'nineth-level-00010210': { //renovable
        color: 'blue'
      },
      'nineth-level-00010141': { //inteligencia artificial
        color: 'blue'
      },
      'nineth-level-11013000': { //aves
        color: 'green'
      },
      'nineth-level-11013102': { //gusanos
        color: 'green'
      },
      'nineth-level-11012201': { //frutos
        color: 'green'
      },
      'nineth-level-11013030': { //corazon
        color: 'green'
      },
      'nineth-level-11010200': { //evolucion
        color: 'green'
      },
      'nineth-level-11010112': { //mitosis
        color: 'green'
      },
      'nineth-level-11010111': { //mitocondrio
        color: 'green'
      },
      'nineth-level-11010110': { //A.D.N
        color: 'green'
      },
      'nineth-level-11013031': { //cerebro
        color: 'green'
      },
      'nineth-level-11010100': { //proteina
        color: 'green'
      },
      'nineth-level-11013032': { //digestivo
        color: 'green'
      },
      'nineth-level-11013010': { //roedores
        color: 'green'
      },
      'nineth-level-11013002': { //reptiles
        color: 'green'
      },
      'nineth-level-11012200': { //permacultura
        color: 'green'
      },
      'nineth-level-11013101': { //Moluscos
        color: 'green'
      },
      'nineth-level-11013001': { //tiburon
        color: 'green'
      },
      'nineth-level-11013033': { //esqueleto
        color: 'green'
      },
      'nineth-level-11013034': { //piel
        color: 'green'
      },
      'nineth-level-11013100': { //medusas
        color: 'green'
      },
      'nineth-level-11013020': { //chimpance
        color: 'green'
      },
      'nineth-level-11013011': { //cetaceos
        color: 'green'
      },
      'nineth-level-20000102': { //internet
        color: 'yellow'
      },
      'nineth-level-20000110': { //ensayo
        color: 'yellow'
      },
      'nineth-level-20000120': { //idiomas
        color: 'yellow'
      },
      'nineth-level-20000100': { //experto
        color: 'yellow'
      },
      'nineth-level-20000140': { //guerra
        color: 'yellow'
      },
      'nineth-level-20000152': { //politica
        color: 'yellow'
      },
      'nineth-level-20000131': { //mercados
        color: 'yellow'
      },
      'nineth-level-20000130': { //eficiencia
        color: 'yellow'
      },
      'nineth-level-20000101': { //imitar
        color: 'yellow'
      },
      'nineth-level-20000150': { //religiones
        color: 'yellow'
      },
      'nineth-level-20000141': { //civilizacion
        color: 'yellow'
      },
      'nineth-level-20000162': { //olimpiadas
        color: 'yellow'
      },
      'nineth-level-20100000': { //hacker
        color: 'yellow'
      },
      'nineth-level-20000154': { //libertad
        color: 'yellow'
      },
      'nineth-level-20000160': { //correr
        color: 'yellow'
      },
      'nineth-level-20000161': { //futbol
        color: 'yellow'
      },
      'nineth-level-20000153': { //verdad
        color: 'yellow'
      },
      'nineth-level-20000151': { //psicologia
        color: 'yellow'
      },
      'nineth-level-20000111': { //metafora
        color: 'yellow'
      },
      'nineth-level-31101002': { //vinilo
        color: 'red'
      },
      'nineth-level-31101000': { //jazz
        color: 'red'
      },
      'nineth-level-31101001': { //hip hop
        color: 'red'
      },
      'nineth-level-31010000': { //ciencia ficcion
        color: 'red'
      },
      'nineth-level-31311001': { //perspectiva
        color: 'red'
      },
      'nineth-level-31311000': { //realidad virtual
        color: 'red'
      },
      'nineth-level-31010001': { //Dibujos Animados
        color: 'red'
      }
    });
})();
