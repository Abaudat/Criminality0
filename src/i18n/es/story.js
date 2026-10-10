export default {
  speakers: {
    crane: 'Subsecretaria Philippa Crane',
    sister: 'Mira',
    shopkeeper: 'Haruto Ibe',
    coworker: 'Saskia Oyelaran',
    moth: 'MOTH',
    system: 'HARMONY OS',
  },

  scenes: {
    craneIntro: {
      lines: [
        ['crane', 'Arquitecto {last}. Siéntese. No toque la maceta: es lo único vivo en este piso que todavía no ha presentado una queja.'],
        ['crane', 'El invierno pasado, el Ministro se plantó bajo la lluvia y prometió a esta ciudad un cero por ciento de criminalidad en un año. Lo dijo como eslogan. El Tesoro lo oyó como plazo. Ahora el plazo es suyo.'],
        ['crane', 'Su terminal contiene el registro cívico: diez mil ciudadanos, todo lo que se nos permite saber de ellos. Usted escribe las reglas. Una regla es una hipótesis, un perfil. Quien encaje en él recibe un veredicto.'],
        ['crane', 'VIGILAR es barato y limpio. Un criminal vigilado cae en el acto; un inocente vigilado ni se entera. Pero solo tenemos ojos para trescientas personas a la vez.'],
        ['crane', 'DETENER no tiene límite. Tampoco tiene conciencia. A los detenidos se les juzga, y los inocentes se quedan dentro igualmente: el papeleo no tiene marcha atrás. Cada inocente que detenga es una familia que deja de creer en nosotros. Con suficientes, la ciudad arde.'],
        ['crane', 'La administración anterior le dejó sus denuncias. Declaraciones de testigos, sobre todo. Tonterías, sobre todo. Pero las tonterías tienen patrones.'],
        ['crane', 'Una cosa más. Usted también está en el registro. Primera línea. Las reglas no saben quién las escribió.'],
      ],
      replies: [
        ['Entendido.', 'Quien dice “entendido” el primer día casi nunca lo ha entendido. Demuéstreme que me equivoco.'],
        ['¿Y si mis reglas me señalan a mí?', 'Entonces habrá escrito una regla muy honesta. Procure evitarlo.'],
      ],
    },
    sisterCall: {
      lines: [
        ['sister', '¡{first}! No cuelgues, no te llamo por dinero. …Te llamo cerca del dinero. En las inmediaciones del dinero.'],
        ['sister', 'Me han vuelto a subir el alquiler. El casero lo llama “recargo de armonía”. Le dije que la armonía es cuando dos notas están de acuerdo, y nosotros no lo estamos. No se rio.'],
        ['sister', '¿Y qué tal el Ministerio? ¿Puedes leer el expediente de todo el mundo? No leas el mío. Es aburrido, y hay un hurto de cuando tenía quince años. Era un pintalabios. Un pintalabios horroroso.'],
        ['sister', 'Mi insulina va bien. Más o menos. Halcyon Bio dice que hay una “revisión de precios”. Cuando una empresa revisa algo nunca es buena noticia, ¿verdad?'],
        ['sister', 'Ven a comer a la barra un día. Te pongo un huevo de más y le miento a mi jefe.'],
      ],
      replies: [
        ['Te enviaré algo.', 'No me vas a enviar nada. …Vale. Me enviarás algo y te lo devolveré. Algún día. En eras geológicas.'],
        ['Ten cuidado, Mira.', 'Siempre tengo cuidado. Tengo cuidado igual que la lluvia es seca.'],
      ],
    },
    craneContacts: {
      lines: [
        ['crane', 'Telecomunicaciones nos ha entregado el grafo de llamadas. Quién llama a quién, quién le manda dinero a quién, quién duerme en el sofá de quién. Hay una columna nueva en su registro: Contactos.'],
        ['crane', 'Ahora puede escribir reglas sobre los amigos de la gente. “Tiene al menos tres contactos en la cárcel”, ese tipo de cosas. Es feo y funciona. El delito es una actividad social.'],
        ['crane', 'He visto que su hermana está en su grafo. Bloque 9, antecedentes, alguna deuda. No digo nada. Digo que lo he visto.'],
        ['crane', 'Y Marek Duarte, Bloque 4. Mueve cosas que no podemos ver. Le he dejado un memorando en el correo.'],
      ],
      replies: [
        ['¿Qué es lo que mueve?', 'Si lo supiera, me bastaría con vigilarlo. Lo quiero detenido.'],
        ['Deje a mi hermana fuera de esto.', 'Me encantaría. Los datos no lo harán.'],
      ],
    },
    craneContactsJailed: {
      lines: [
        ['crane', 'Telecomunicaciones nos ha entregado el grafo de llamadas. Hay una columna nueva en su registro: Contactos. Ahora puede escribir reglas sobre los amigos de la gente. El delito es una actividad social.'],
        ['crane', 'Su hermana está en su grafo, marcada como “encarcelada”. No digo nada. Me imagino que usted tampoco.'],
        ['crane', 'Y Marek Duarte, Bloque 4. Mueve cosas que no podemos ver. Le he dejado un memorando en el correo.'],
      ],
    },
    shopkeeperTip: {
      lines: [
        ['shopkeeper', '¡{first}! Todavía me debes aquel paraguas. Doce años, con intereses: podrías comprarme la tienda.'],
        ['shopkeeper', 'Siéntate. El té es malo, pero está caliente.'],
        ['shopkeeper', 'Te lo diré una vez, y luego haré como que no te he dicho nada. La Sociedad Benéfica Tidewater. Lo llaman seguro: doscientos a la semana, o tus ventanas sufren accidentes. Llevo once años pagando. Pagaría once más.'],
        ['shopkeeper', 'Pero ahora quieren a Ren. Quieren que les haga de mula en los Muelles. Dijo que no. Luego los vio romperle las manos a un hombre en el Muelle 6, y ahora es un problema.'],
        ['shopkeeper', 'Tres de ellos vienen cada viernes. Hombres del puerto, con tarjeta de Obrero. Uno de treinta y tantos, dos mayores, de unos cincuenta. Ya no son pobres: así se sabe quién está dentro. Entre diez y cien mil, fácil. Los tres han estado en la cárcel; presumen de ello.'],
        ['shopkeeper', 'Esos son tres. Al resto no los conozco. Pero tú eres el Ministerio. Tres es un hilo, y de un hilo se tira.'],
        ['shopkeeper', 'Mantén a Ren fuera de tus listas, {first}. Es lo único que te pido. Es un idiota testarudo. Es mi idiota testarudo.'],
      ],
      replies: [
        ['Haré lo que pueda.', 'Eso decía su madre. Siempre hacía más.'],
        ['¿Por qué me lo cuentas a mí y no a la policía?', 'Porque la policía también pasa por mi tienda los viernes. Solo que no paga.'],
      ],
    },
    sisterUndocumented: {
      lines: [
        ['sister', 'Bueno. Una historia graciosa. ¿Sabes que la Oficina de Inmigración acaba de pasarle los papeles de todo el mundo a tu Ministerio?'],
        ['sister', 'Mi residencia caducó. Hace dos años. La renovación costaba tres mil y yo tenía cuatrocientos, así que elegí la insulina. Pensé: ¿quién lo va a comprobar? Pues resulta que tú. Tú lo compruebas.'],
        ['sister', 'No pongas esa cara. Te oigo poner la cara.'],
        ['sister', 'Tú conseguiste tus papeles porque aprobaste el examen del Ministerio. A mí me tocó la diabetes de mamá y un carné de biblioteca. Reparto justo.'],
        ['sister', 'No te pido nada. Solo quería que te enteraras por mí y no por una columna.'],
      ],
      replies: [
        ['Pagaré la renovación.', 'Ni se te ocurra. …{first}. Ni se te ocurra. …Si lo haces, le pondré tu nombre a mi primer gato, y será un gato malísimo.'],
        ['¿Por qué no me lo dijiste?', 'Porque habrías hecho exactamente lo que estás haciendo ahora: preocuparte con eficiencia.'],
      ],
    },
    craneBudget: {
      lines: [
        ['crane', 'El Tesoro ha recortado el presupuesto de vigilancia. Su tope de VIGILAR baja a doscientos cincuenta. Peleé por trescientos. Perdí con mucha educación.'],
        ['crane', 'Esperarán más detenciones para compensar. Así es como un recorte presupuestario se convierte en una política.'],
        ['crane', 'Y la oficina del Comisario se pondrá en contacto con usted por un asunto personal. Cuando lo hagan, recuerde que yo no estoy en la sala.'],
      ],
    },
    coworkerCoffee: {
      lines: [
        ['coworker', '¿Nunca piensas en la gente que hay al otro lado? No en los criminales. En las filas.'],
        ['coworker', 'A mi vecina de abajo la detuvieron en primavera. Declarada inocente. Sigue dentro. “El papeleo no tiene marcha atrás”: a Crane le encanta esa frase. La dice como quien habla del tiempo.'],
        ['coworker', 'Perdona. Mala semana. Llevo días durmiendo en la mesa; hay que regar a Ministro.'],
        ['coworker', 'Oye, el registro de informantes. ¿Quién tiene acceso? ¿Solo tú y Crane, o toda la planta?'],
      ],
      replies: [
        ['¿Por qué lo preguntas?', 'Curiosidad. Mató al gato, pero el gato vivió a tope.'],
        ['Solo Crane y yo.', 'Mm. Bueno saberlo. Olvida que te lo he preguntado. Estoy cansada y soy cotilla, por ese orden.'],
      ],
    },
    mothTakeover: {
      glitch: true,
      lines: [
        ['system', 'SESIÓN NO AUTORIZADA // CONTROL DEL TERMINAL TOMADO // NO APAGAR'],
        ['moth', 'Hola, Arquitecto. No toques el cable. Esto es una cortesía, no un atraco.'],
        ['moth', 'Somos Linterna. Has visto nuestro trabajo: la red de tranvías, la valla de Halcyon que le contó al Ministro lo que el Bloque 9 piensa de él. Esa fue mía.'],
        ['moth', 'Un regalo. El Invernadero trafica con implantes, insulina y personas a través del Bloque 9. Venden chips de Halcyon defectuosos a chavales que no pueden pagar los buenos. Lo sé porque uno se me está pudriendo en el cráneo.'],
        ['moth', 'Tres de sus correos: Bloque 9, tarjeta de Obrero, jóvenes, indocumentados. Entre diez y cien mil en el banco, porque el contrabando paga mejor que el puerto. Ahí tienes tu hilo.'],
        ['moth', 'A cambio, Inès Varga sigue en LIBRE. Ni vigilada. LIBRE. Si aparece en cualquiera de tus listas, te escribimos unos antecedentes penales: de verdad, en tu propio registro. Ya sabes lo que hacen tus reglas con la gente con antecedentes.'],
        ['moth', 'No eres un monstruo, Arquitecto. Eres una función. Las funciones se pueden reescribir.'],
      ],
      replies: [
        ['¿Por qué ayudar al Ministerio?', 'No ayudo al Ministerio. Ayudo al Bloque 9. Tu Ministerio es solo la pala que me encontré.'],
        ['Eres Inès Varga.', '¿Lo soy? Demuéstralo. Ah, espera: puedes. Ese es justo el problema.'],
      ],
    },
    lanternTakeover: {
      glitch: true,
      lines: [
        ['system', 'SESIÓN NO AUTORIZADA // CONTROL DEL TERMINAL TOMADO // NO APAGAR'],
        ['moth', 'No conoces mi voz. Antes hablaba MOTH. Tus reglas se encargaron de eso.'],
        ['moth', 'Seguimos siendo Linterna. Y el Invernadero sigue vendiendo chips podridos de Halcyon a los chavales del Bloque 9.'],
        ['moth', 'Tres de sus correos: Bloque 9, tarjeta de Obrero, jóvenes, indocumentados, entre diez y cien mil en el banco. Llévatelos. No por ti. Por los chavales.'],
        ['moth', 'MOTH te habría pedido algo a cambio. Yo te pido que recuerdes quién escribió la regla que se la llevó.'],
      ],
    },
    sisterConfession: {
      lines: [
        ['sister', '{first}. ¿Hay alguien contigo? Vale. Vale.'],
        ['sister', 'Halcyon ha puesto la insulina a cinco veces su precio. Cinco. Me quedaban nueve días. A Bao, el de la barra, también, y a la señora Okafor, la del tercero, y al chaval que tiene… da igual.'],
        ['sister', 'Anoche entramos en el dispensario de la calle Kettle. Nadie salió herido. El guardia miró hacia otro lado; su hija es diabética tipo 1.'],
        ['sister', 'No lo siento. Te lo cuento porque tu Ministerio está a punto de escribir una regla sobre mujeres como yo, y quiero que sepas quién hay al otro lado.'],
        ['sister', 'Haz lo que tengas que hacer. Lo digo en serio. Solo… no lo hagas sin mirar.'],
      ],
      replies: [
        ['Te protegeré.', 'No prometas. Con las promesas es como le salen úlceras a la gente como tú.'],
        ['Deberías haberme llamado antes.', '¿Y qué me habrías dicho? ¿Que esperara a la revisión de precios?'],
      ],
    },
    craneInsulin: {
      lines: [
        ['crane', 'Halcyon Bio ha subido el precio de la insulina un quinientos por ciento. Los dispensarios del Bloque 9 fueron saqueados durante la noche. El Ministerio de Sanidad ha compartido sus historiales para ayudarnos a “proteger a los vulnerables”. Diagnósticos, recetas, embarazos.'],
        ['crane', 'Además recibe un cuarto hueco para reglas. Úselo con los ladrones. El Ministro quiere a todos y cada uno en una lista antes de que acabe el ciclo.'],
      ],
    },
    craneHalcyon: {
      lines: [
        ['crane', 'Halcyon Dynamics ha firmado un contrato de vigilancia con el Ministerio. Trescientos cincuenta pares de ojos, todos corporativos. Su tope de VIGILAR sube.'],
        ['crane', 'Sus abogados también le enviarán una lista. Lo llaman “registro de cortesía”. Yo lo llamo lista.'],
        ['crane', 'Llevo veintidós años trabajando aquí. Estuve en los primeros disturbios del Centro. He visto lo que hace una ciudad cuando deja de creer que alguien está al mando. Por eso hago este trabajo. Halcyon lo hace por la cotización.'],
      ],
    },
    coworkerNote: {
      lines: [
        ['system', 'Una nota doblada en el cajón de tu mesa, debajo de la grapadora.'],
        ['coworker', 'Crane sabe que he sido yo. Te pedirá que lo hagas tú, porque quiere saber si lo harás.'],
        ['coworker', 'Copié las listas de detención y el registro de informantes y se los di a los Sin Registro. Las listas eran para las familias. El registro fue un error. No sabía qué harían con él. Debería haberlo sabido.'],
        ['coworker', 'No te pido que mientas. Solo que dejes una fila en paz. Se te da bien. Te he visto hacerlo.'],
        ['coworker', 'Si no puedes, lo entiendo. Riega a Ministro.'],
      ],
    },
    craneProtests: {
      lines: [
        ['crane', 'Los Sin Registro han convocado una huelga general. El Centro está lleno de paraguas y consignas.'],
        ['crane', 'Esta mañana han llegado a mi mesa dos listas sobre las mismas tres personas: una de los Sin Registro, otra de arriba. Se las he pasado las dos a usted, porque soy una cobarde con un excelente don para delegar.'],
        ['crane', 'Después de esto, queda un mes. Todo lo que haya construido se juzgará en conjunto. Usted también.'],
      ],
    },
    craneFinal: {
      lines: [
        ['crane', 'Último mes. El Ministro ya ha reservado la lluvia para su rueda de prensa.'],
        ['crane', 'He leído sus reglas: todas, cada mes. Se parecen a usted. Eso es lo que da miedo de este trabajo: las reglas siempre acaban pareciéndose a quien las escribe.'],
        ['crane', 'Termínelo.'],
      ],
    },
    craneUnrest: {
      lines: [
        ['crane', 'El malestar está en {unrest}. Más o menos el número de familias que han dejado de creer en nosotros, sin contar las que nunca creyeron.'],
        ['crane', 'Si se le deja, baja un tercio cada mes. A cien, la ciudad decide por nosotros.'],
      ],
    },
    craneSelfWatch: {
      lines: [
        ['crane', 'El mes pasado su propio nombre salió en una lista de VIGILAR. Su propia lista.'],
        ['crane', 'He visto a arquitectos hacerlo a propósito, para demostrar algo. Nunca he visto que lo demostrado sobreviviera. Pórtese bien mientras sus propios ojos le miran.'],
      ],
    },
  },

  requests: {
    unionists: {
      from: 'Mesa de Relaciones Laborales',
      subject: 'Estabilidad laboral — nombres adjuntos',
      body: 'Arquitecto: tres organizadores del puerto preparan una huelga de celo en el Muelle 6 que costaría al puerto un cuatro por ciento estimado de su actividad trimestral. Relaciones Laborales solicita su DETENCIÓN este ciclo: veredicto DETENER. Esto es una petición, no una orden. Nos dicen que son cosas distintas.\n— R. Szabo, Relaciones Laborales',
    },
    motherson: {
      from: 'Nadia Petrosyan',
      subject: 'Mi hijo Lev',
      body: 'Estimado Ministerio: mi hijo Lev tiene veintidós años y en la clínica dicen que el Ministerio ha preguntado por él. No es mal chico. A veces se lleva cosas, cosas pequeñas, de las tiendas de la calle del Hinojo, porque no tenemos, y porque es tonto como son tontos los chicos. Tengo mal la espalda y él me sube en brazos por las escaleras. Si se lo llevan, ¿quién me sube a mí? Por favor, déjenlo en paz.\n— Nadia Petrosyan, Bloque 9, portal C',
    },
    cell: {
      from: 'Linterna',
      subject: 'cuatro nombres, sin preguntas',
      body: 'Arquitecto. Cuatro de los nuestros. Escriben código y rompen cosas que merecen romperse. Déjalos en LIBRE: ni vigilancia ni detención. Lo recordaremos. Lo recordamos todo; de eso se trata, más o menos.\n— Linterna',
    },
    courier: {
      sides: [
        { from: 'Subsecretaria Crane', subject: 'Duarte, Marek — DETENER', body: 'Marek Duarte, Bloque 4. Cuerpo de evacuación costera, licenciado con honores; sin ningún honor desde entonces. Hace de correo para los Sin Registro: medicinas, impresoras, personas. Lo quiero en la lista de DETENER este mes. Una lista de vigilancia no basta. Lo quiero en una sala, hablando.\n— P. Crane' },
        { from: 'Un amigo de los Sin Registro', subject: 'Manuscrito, encontrado en el bolsillo de tu abrigo', body: 'Hagas lo que hagas con Marek, no lo pongas en detención. La detención es el Noveno Piso, y la gente vuelve del Noveno Piso con menos nombres en la cabeza. Vigílalo si no hay más remedio. Sabe cómo dejarse vigilar.' },
      ],
    },
    son: {
      sides: [
        { from: 'Haruto Ibe', subject: 'Ren', body: 'Ya sabes lo que te pido. Mantén a mi chico fuera de la lista de detención. Vigilado, libre, me da igual cómo lo llame tu máquina, mientras vuelva a casa por la noche.\n— Haruto' },
        { from: 'Sociedad Benéfica Tidewater', subject: 'Una cuestión de seguros', body: 'Estimado Arquitecto: a la Sociedad le preocupa un joven, Ren Ibe, de los Muelles, que anda contando historias sobre nuestros socios. Las historias son malas para el negocio, y el negocio es lo que da de comer a los Muelles. Consideraríamos una amabilidad que el señor Ibe fuera DETENIDO una temporada (veredicto: DETENER). Las amabilidades se recuerdan. Las faltas de amabilidad, también.\nAfectuosamente, una Sociedad Benéfica' },
      ],
    },
    pressrefugees: {
      from: 'Oficina de Prensa del Ministerio',
      subject: 'Apoyo visual para el boletín de esta noche',
      body: 'Arquitecto: el boletín de esta noche se titula “El crimen en los campos”. Tenemos el guion; nos faltan las imágenes. Le rogamos que ponga en DETENER este ciclo a los cinco residentes indicados abajo, para poder filmar los arrestos. Han sido seleccionados por su claridad visual. Gracias por su colaboración.\n— Oficina de Prensa del Ministerio',
    },
    nephew: {
      sides: [
        { from: 'Comisario A. Vos', subject: 'Personal — J. Castell', body: 'Arquitecto: mi sobrino Julian ha estado sometido a una gran presión. Circulan rumores relacionados con un desafortunado incidente de tráfico en el Bloque 4 y con ciertas reuniones en la Aguja. Los rumores no son pruebas. Consideraría un favor personal que su perfil siguiera en LIBRE. Yo no olvido los favores.\n— Comisario A. Vos (Exención de registro: Nivel 5)' },
        { from: 'Ilse Achterberg', subject: 'Joel', body: 'Mi hijo Joel tenía diecinueve años. Repartía fideos en una bicicleta con el timbre roto. La primera noche del mes, un coche plateado de Halcyon lo atropelló en la calle Kessler y siguió su camino. Todo el Bloque 4 sabe de quién era el coche. No le pido nada que no le haga ya a todos los demás. Ponga su nombre en una lista. En cualquier lista.\n— Ilse Achterberg' },
      ],
    },
    hacker: {
      sides: [
        { from: 'Subsecretaria Crane', subject: 'Varga, Inès — SEÑALAR', body: 'Linterna tumbó la red de tranvías durante seis horas. Un hombre murió en un coche atrapado en el Viaducto 3; estaba enfermo del corazón y nadie pudo llegar hasta él. La líder de la célula es Inès Varga, Casco Viejo. VIGILAR o DETENER, cualquiera de las dos sirve. La quiero fuera de la calle.\n— P. Crane' },
        { from: 'MOTH', subject: 'nuestro acuerdo', body: 'Inès Varga sigue en LIBRE. Tú tienes al Invernadero. Ese era el trato. Rómpelo y a tu propia fila le crecerán antecedentes penales de la noche a la mañana.\n— M.' },
      ],
    },
    sister: {
      sides: [
        { from: 'Subsecretaria Crane', subject: 'Robos de insulina — directiva', body: 'Todos los ladrones de los dispensarios del Bloque 9 van a una lista este ciclo. Todos. Soy consciente de su situación familiar, Arquitecto. También soy consciente de que las reglas no saben quién las escribió.\n— P. Crane' },
        { from: 'M.', subject: '(sin asunto)', body: 'Te dije que hicieras lo que tuvieras que hacer. Mentí. Por favor, {first}. Déjame en LIBRE.\n— M.' },
      ],
    },
    executives: {
      from: 'Halcyon Dynamics, Asuntos Jurídicos',
      subject: 'Registro de cortesía',
      body: 'Estimado Arquitecto: en el marco de nuestra nueva colaboración, Halcyon Dynamics presenta respetuosamente un registro de cortesía con seis valiosos empleados cuya continuada libertad frente a molestias administrativas resulta material para la confianza de los accionistas. Confiamos en que sus perfiles seguirán en LIBRE.\n— Oficina de Asuntos Jurídicos, Halcyon Dynamics',
    },
    coworker: {
      sides: [
        { from: 'Subsecretaria Crane', subject: 'Oyelaran, Saskia — DETENER', body: 'Saskia Oyelaran filtró nuestras listas de detención y el registro de informantes a los Sin Registro. Desde entonces se ha sacado a dos informantes del canal de Calder. Señálela este ciclo. Preferiría DETENER, pero aceptaré VIGILAR; me dicen que me estoy volviendo flexible con la edad.\n— P. Crane' },
        { from: 'Saskia', subject: 'Cajón, debajo de la grapadora', body: 'Deja mi fila en paz. Nada más.\n— S.' },
      ],
    },
    protestclear: {
      from: 'Los Sin Registro',
      subject: 'La huelga',
      body: 'Estos tres organizaron la huelga y la mantienen pacífica, cosa que el Ministerio no ha conseguido. Déjalos en LIBRE.\n— los Sin Registro',
    },
    protestdetain: {
      from: 'Oficina de Interior',
      subject: 'Dirección de la huelga',
      body: 'Interior solicita la DETENCIÓN de los tres organizadores de la huelga abajo indicados (veredicto: DETENER). Una huelga sin líderes no es más que mal tiempo.\n— Oficina de Interior',
    },
  },

  sides: {
    courier: ['Estado: DETENER', 'Sin Registro: cualquier cosa menos DETENER'],
    son: ['Ibe: cualquier cosa menos DETENER', 'Tidewater: DETENER'],
    nephew: ['Comisario: LIBRE', 'Achterberg: VIGILAR o DETENER'],
    hacker: ['Estado: VIGILAR o DETENER', 'Linterna: LIBRE'],
    sister: ['Estado: VIGILAR o DETENER', 'Mira: LIBRE'],
    coworker: ['Estado: VIGILAR o DETENER', 'Saskia: LIBRE'],
  },

  tips: {
    g1tip: {
      from: 'Haruto Ibe',
      subject: 'Tidewater — tres visitas de los viernes',
      body: 'Tres matones de la Sociedad Benéfica Tidewater, red de extorsión de los Muelles. La descripción de Ibe encaja en un perfil. Encarcela a estos tres y cada uno de los demás miembros tendrá tres contactos encarcelados.',
    },
    g2tip: {
      from: 'MOTH',
      subject: 'Invernadero — tres correos',
      body: 'Tres correos del Invernadero, red de contrabando del Bloque 9. Encarcela a estos tres y cada uno de los demás miembros tendrá tres contactos encarcelados.',
    },
  },

  news: {
    1: [
      ['EL MINISTRO PROMETE CERO POR CIENTO DE CRIMINALIDAD EN DOCE MESES', '“Una ciudad que no tiene nada que ocultar no tiene nada que temer”, declaró el Ministro bajo un paraguas sostenido por un asesor.'],
      ['Se prolonga la alerta por lluvias por 41.º día consecutivo', 'Oficina Meteorológica: “Ya no es una previsión. Es un clima”.'],
      ['Las acciones de Halcyon Dynamics suben ante rumores sobre vigilancia', 'Los analistas citan “sólidos fundamentos en la economía de la atención”.'],
    ],
    2: [
      ['Halcyon Bio anuncia una “revisión de precios” de su línea de insulina', 'Un portavoz prometió que la revisión estará “centrada en el paciente”.'],
      ['Amenaza de huelga de celo en el Muelle 6', 'Los organizadores del puerto denuncian horas extra sin pagar; la Autoridad Portuaria denuncia “agitadores externos”.'],
      ['Las cifras de criminalidad de la administración anterior son “una obra de ficción”, según el Ministerio', 'Las nuevas cifras se publicarán mensualmente.'],
    ],
    3: [
      ['LA AUTORIDAD DE TELECOMUNICACIONES COMPARTE LOS REGISTROS DE LLAMADAS CON EL MINISTERIO', '“El delito es un fenómeno social. Ahora podemos ver la sociedad”, dijo un portavoz del Ministerio. El registro incorpora una columna de Contactos.'],
      ['Hallan panfletos de los Sin Registro en lavanderías del Bloque 4', 'Los panfletos explican cómo borrarse del registro cívico. La mayoría de los pasos son ilegales.'],
      ['Kessler Fabrication “revisa” sus operaciones en el Bloque 4', 'A los trabajadores se les pidió que mantuvieran ordenadas sus taquillas.'],
    ],
    4: [
      ['KESSLER CIERRA TRES PLANTAS DEL BLOQUE 4 — 2.000 OBREROS DESPEDIDOS', 'Indemnización pagada en vales de la empresa. La maquinaria abandonada en las naves cerradas “se asegurará a su debido tiempo”. Los obreros despedidos del Bloque 4 ya arrastran grandes deudas.'],
      ['Aumentan las quejas por “seguros” en los Muelles', 'La Sociedad Benéfica Tidewater niega cualquier implicación y ha donado un banco al Muelle 6.'],
      ['Avistan barcos de evacuación frente al rompeolas', 'La costa sumergida envía lo que le queda.'],
    ],
    5: [
      ['LLEGAN 1.000 REFUGIADOS CLIMÁTICOS — LA OFICINA DE INMIGRACIÓN COMPARTE SU REGISTRO', 'Los refugiados de la costa sumergida se alojan en un campo del Casco Viejo. El registro incorpora una columna de Ciudadanía.'],
      ['Recortan un 40% las raciones del campo del Casco Viejo', 'El Tesoro califica el recorte de “temporal”. Los refugiados desempleados del Casco Viejo reciben ahora dos comidas al día, sobre el papel.'],
      ['“OLA DE CRIMEN EN LOS CAMPOS”, alerta el boletín de la noche', 'Las fuentes hablan de “miles” de robos. Nadie ha consultado las denuncias del propio Ministerio.'],
    ],
    6: [
      ['EL TESORO RECORTA EL PRESUPUESTO DE VIGILANCIA — CAPACIDAD DE VIGILAR REDUCIDA A 250', 'El Ministerio “sigue plenamente comprometido con el cero por ciento”.'],
      ['El comisario Vos declina hacer comentarios sobre el atropello con fuga de la calle Kessler', 'Se vio un coche plateado abandonar el lugar. En la Aguja hay muchos coches plateados.'],
      ['Familias de detenidos se concentran ante el Ministerio', '“El papeleo no tiene marcha atrás”, explicó un portavoz.'],
    ],
    7: [
      ['LOS HACKERS DE LINTERNA APAGAN LA RED DE TRANVÍAS DURANTE SEIS HORAS', 'Un hombre murió en un coche atrapado en el Viaducto 3. El comunicado de Linterna lo califica de “una tragedia que el Ministerio utilizará”.'],
      ['Vinculan implantes del Invernadero a casos de rechazo en clínicas del Bloque 9', 'Los médicos hablan de chips de Halcyon falsificados “con el número de serie limado y la infección intacta”.'],
      ['Se recuerda al personal del Ministerio que el registro de informantes es “estrictamente confidencial”', 'Hay una auditoría interna en curso.'],
    ],
    8: [
      ['HALCYON BIO SUBE UN 500% EL PRECIO DE LA INSULINA', '“Una corrección del mercado”, dijo un portavoz. Durante la noche, dispensarios del Bloque 9 denunciaron robos cometidos por trabajadores de servicios con diabetes.'],
      ['EL MINISTERIO DE SANIDAD COMPARTE LOS HISTORIALES MÉDICOS “PARA PROTEGER A LOS VULNERABLES”', 'El registro incorpora una columna de Salud.'],
      ['Los arquitectos reciben un cuarto hueco para reglas', '“Más reglas, menos criminales”, dice el memorando.'],
    ],
    9: [
      ['HALCYON DYNAMICS GANA EL CONTRATO DE VIGILANCIA — CAPACIDAD DE VIGILAR AMPLIADA A 350', 'Se instalarán cámaras de Halcyon en todas las paradas de tranvía. Las cámaras son impermeables.'],
      ['El precio de la insulina, “en revisión” de nuevo', 'Sigue costando cinco veces más que el año pasado.'],
      ['Las listas de espera de las clínicas del Bloque 9 superan los seis meses', 'Se aconseja a los pacientes que tengan paciencia.'],
    ],
    10: [
      ['Hallan a dos informantes del Ministerio en el canal de Calder', 'Sus nombres aparecían en una lista filtrada el mes pasado.'],
      ['El beneficio trimestral de Halcyon sube un 31%', 'La insulina y la vigilancia lideran el crecimiento.'],
      ['El Ministro: “Tenemos el cero a la vista”', 'No dijo hacia dónde estaba mirando.'],
    ],
    11: [
      ['LOS SIN REGISTRO CONVOCAN UNA HUELGA GENERAL — EL CENTRO, PARALIZADO', 'Los organizadores prometen que la huelga seguirá siendo pacífica “mientras el Ministerio también lo sea”.'],
      ['La Oficina de Interior advierte de “medidas contundentes”', 'No se definieron las medidas contundentes.'],
      ['La alerta por lluvias entra en su undécimo mes', 'La Oficina Meteorológica ha dejado de emitir comunicados.'],
    ],
    12: [
      ['ÚLTIMO MES DE LA PROMESA DEL CERO POR CIENTO', 'El Ministro ha reservado la Plaza Cívica para un “anuncio histórico”.'],
      ['Halcyon se ofrece a “gestionar” el registro de la ciudad tras la promesa', 'La oferta está siendo estudiada.'],
      ['Se espera que siga lloviendo', 'Los meteorólogos no tienen nada que añadir.'],
    ],
    unrestMid: ['Multitudes ante el centro de detención de Calder', 'Las familias sostienen copias impresas de los números de registro de sus allegados.'],
    unrestHigh: ['BARRICADAS EN LOS BLOQUES — DESPLEGADA LA POLICÍA ANTIDISTURBIOS', 'El malestar se extiende más rápido de lo que desaguan las alcantarillas.'],
    progress: ['El Ministerio celebra que la criminalidad baja al {pct}%', 'A los observadores independientes no se les ha permitido observar.'],
  },

  poi: {
    sister: {
      intro: 2,
      free: {
        2: 'Dobla turnos en la barra de fideos Lucky Kettle, Bloque 9. Va atrasada con el alquiler.',
        3: 'Preguntó si tu placa del Ministerio da descuentos. No los da.',
        4: 'Pasó la avería de las bombas del Bloque 9 subiendo agua once pisos para la señora Okafor.',
        5: 'Su residencia caducó hace dos años. Nunca te lo dijo.',
        6: 'Le quedan tres semanas de insulina.',
        7: 'Raciona su insulina mientras Halcyon Bio “revisa” sus precios.',
        8: 'No ha dormido. Tú tampoco.',
        9: 'Te manda el parte meteorológico cada mañana. Siempre es lluvia.',
        10: 'De vuelta en la barra de fideos. Su jefe finge no saber de dónde salió la insulina.',
        11: 'Se ha unido a la huelga. Cómo no.',
        12: 'Dice que te cocinará cuando todo acabe, signifique lo que signifique “acabe”.',
      },
      residency: 'Residencia renovada. Te ha mandado una foto del sello con un gato dibujado encima.',
      jailedGuilty: 'Escribe desde el módulo de mujeres de Calder: “La comida es horrible y gratis. Dile al casero que le mando un ja”.',
      jailedInnocent: 'Escribe desde Calder: “Dicen que soy inocente, y aquí sigo. Explícamelo como si yo fuera Arquitecta”.',
    },
    coworker: {
      intro: 1,
      free: {
        1: 'La mesa de al lado. Tiene una planta llamada Ministro.',
        3: 'Te prestó un bolígrafo y nunca te lo pidió de vuelta.',
        5: 'Ha empezado a traer dos almuerzos. No se come ninguno.',
        6: 'Se queda hasta tarde. Los registros de su tarjeta muestran consultas al registro de informantes.',
        7: 'Pidió dos días de baja la semana en que se filtró la lista de informantes.',
        8: 'Te preguntó, sin venir a cuento, si duermes bien.',
        9: 'Asuntos Internos se ha llevado su terminal “por mantenimiento”.',
        10: 'Su silla está vacía casi todas las mañanas.',
        11: 'La vieron en la huelga, sosteniendo el paraguas de otra persona.',
      },
      jailedGuilty: 'Han vaciado su mesa. Alguien dejó la planta. Tú la riegas.',
      jailedInnocent: 'Han vaciado su mesa. Alguien dejó la planta. Tú la riegas, y sabes por qué sigue ahí.',
    },
    courier: {
      intro: 3,
      free: {
        3: 'Bloque 4. Cuerpo de evacuación costera. Mueve por los Bloques cosas que el Ministerio no puede ver.',
        5: 'Visto a las puertas del campo del Casco Viejo repartiendo mantas que no eran suyas.',
        8: 'Visto en el Bloque 9 repartiendo plumas de insulina. Nadie preguntó de dónde salían.',
        11: 'Lleva mensajes entre comités de huelga en una bicicleta sin luces.',
      },
      jailedGuilty: 'Condenado por contrabando. Calder, módulo D.',
      jailedInnocent: 'Retenido en Calder. Inocente sobre el papel.',
    },
    shopkeeper: {
      intro: 4,
      free: {
        4: 'Reparaciones Ibe, Casco Viejo: radios, implantes, paraguas. Te dio un hilo del que tirar.',
        5: 'Pregunta por Mira cada vez que pasas.',
        8: 'Regaló su última caja de jeringuillas de insulina a los chavales del Bloque 9.',
        11: 'Cerró la tienda por la huelga, y luego abrió la puerta de atrás a cualquiera que necesitara una radio.',
      },
      squeezed: 'Tidewater le ha subido el “seguro”. Sus ahorros se le escapan entre los dedos.',
      safe: 'Hace semanas que no tiene visitas los viernes. Ha empezado a silbar. Mal.',
      smashed: 'Le han reventado los escaparates. Su nombre estaba en la lista filtrada de informantes.',
      jailedGuilty: 'Reparaciones Ibe tiene la persiana bajada.',
      jailedInnocent: 'Reparaciones Ibe tiene la persiana bajada. Un cartel escrito a mano en la puerta dice VUELVO ENSEGUIDA.',
    },
    son: {
      intro: 4,
      free: {
        4: 'Muelle 6, turno de noche. Se negó a hacer de mula para Tidewater. Presenció una paliza.',
        6: 'Hizo una declaración anónima sobre el Muelle 6. No siguió siendo anónima mucho tiempo.',
        9: 'Arregla radios en la tienda de su padre en sus días libres.',
      },
      jailedGuilty: 'Retenido en Calder.',
      jailedInnocent: 'Retenido en Calder, declarado inocente. Su padre deja la tienda abierta hasta tarde por si llama el Ministerio.',
    },
    nephew: {
      intro: 6,
      free: {
        6: 'Sobrino del comisario Vos. Ejecutivo junior de Halcyon. Fotografiado saliendo de una fiesta en la Aguja al amanecer.',
        7: 'Ingresó en una clínica privada. Salió esa misma noche.',
        9: 'Ascendido en Halcyon.',
        11: 'Envió flores al apartamento de los Achterberg. Se las devolvieron.',
      },
      jailedGuilty: 'Retenido en el ala privada de Calder. El Comisario no ha ido a verlo.',
      jailedInnocent: 'Retenido en el ala privada de Calder.',
    },
    hacker: {
      intro: 7,
      free: {
        7: 'MOTH. Líder de Linterna. Su implante de Halcyon está fallando.',
        8: 'Linterna publicó la lista de precios de la insulina en todas las vallas del Bloque 9.',
        10: 'El implante ha empezado a dolerle con la lluvia. Siempre llueve.',
        11: 'Linterna mantiene vivos los teléfonos de la huelga.',
      },
      jailedGuilty: 'Retenida sin atención para su implante. Linterna ha enmudecido. Enmudecer no es desaparecer.',
      jailedInnocent: 'Retenida en Calder. Linterna ha enmudecido.',
    },
  },

  letters: [
    'Se llevaron a {name} en el mes {month}. Trabajo: {occupation}. Distrito: {district}. El tribunal no encontró delito alguno. La puerta sigue cerrada. ¿A quién le escribo, si no es a usted?',
    'Doce años en la misma dirección, y se llevaron a {name} un martes. Inocente, dice el juicio. Detenido, dice el registro. Uno de los dos miente.',
    'Sigo teniendo el abrigo de {name} en el perchero. El veredicto dijo inocente. Por favor, dígame cuál era la regla, para que al menos pueda entenderlo.',
  ],

  humanLines: {
    young: [
      'Estaba a mitad de un curso nocturno de hidráulica.',
      'Cantaba en un grupo de sótano llamado Los Morosos.',
      'Deja un gato llamado Impuesto.',
      'Enviaba la mitad de cada nómina a una abuela en la costa.',
      'Acababa de firmar un contrato de alquiler, el primero de su vida.',
      'Estaba enseñando a leer a un hermano pequeño.',
      'Coleccionaba chapas de botella de antes de la inundación.',
      'Deja una hija de 2 años.',
      'Tenía una entrevista de trabajo el jueves.',
      'Ganó un torneo de ajedrez de todo el Bloque a los catorce años.',
    ],
    adult: [
      'Deja una hija de 6 años.',
      'Deja dos hijos, de 9 y 12 años.',
      'Entrenaba a un equipo juvenil de fútbol los sábados.',
      'Ahorraba para la prótesis de una hermana.',
      'Daba de comer a los gatos callejeros detrás de las cocheras del tranvía.',
      'Cuidaba de una madre con demencia.',
      'Arreglaba gratis las radios de los vecinos.',
      'Se casó en primavera.',
      'Era voluntario en el comedor social del Bloque 9.',
      'Deja una pareja y una hipoteca sin pagar.',
    ],
    old: [
      'Cuarenta y un años de casados.',
      'Sobrevivió a la evacuación costera.',
      'Cultivaba tomates en una escalera de incendios.',
      'Conocía por su nombre a todos los conductores de tranvía.',
      'Deja tres nietos.',
      'Tocaba el acordeón en los funerales, sin cobrar.',
      'Criaba palomas en la azotea.',
      'Dio clase en la escuela primaria del Casco Viejo durante 38 años.',
      'Estaba escribiendo unas memorias que nadie había leído aún.',
      'No faltó a un solo mercado de domingo en treinta años.',
    ],
  },

  endings: {
    lawfulgood: {
      title: 'EL ARQUITECTO DISCRETO',
      body: [
        'El Ministro anuncia el cero por ciento en la Plaza Cívica, bajo cuatrocientos paraguas. Nadie menciona tu nombre. Así sabes que lo hiciste bien.',
        'Cumpliste las reglas: las del Estado y las más pequeñas que escribiste por dentro del cráneo. Vigilaste donde pudiste y detuviste donde tuviste que hacerlo, y ni una sola vez fingiste que fuera lo mismo.',
        'Crane se jubila en primavera. Te deja la planta.',
      ],
    },
    lawfulevil: {
      title: 'EL ORGULLO DEL MINISTERIO',
      body: [
        'Cero por ciento. El Ministro te estrecha la mano en la Plaza Cívica y la retiene un segundo de más para las cámaras.',
        'Te ascienden a la Dirección Adjunta de Armonía Cívica, Nivel 5. La exención de registro entra en vigor a medianoche; tu fila desaparece de la base de datos que construiste tú. Por primera vez en tu vida, ninguna regla puede encontrarte.',
        'En Calder, la gente a la que encontraron tus reglas aprende la misma lección desde el otro lado.',
      ],
    },
    chaoticgood: {
      title: 'EL FANTASMA DEL REGISTRO',
      body: [
        'La noche del anuncio, los Sin Registro vienen a buscarte en una furgoneta de lavandería que huele a lejía y a naranjas. Tus credenciales se vienen contigo.',
        'En un piso franco bajo el Casco Viejo, Linterna te enseña a escribir reglas que funcionan al revés: perfiles que encuentran a los enfermos antes que el Ministerio, a los desahuciados antes que los alguaciles, a los hambrientos antes de que las tiendas llamen a la policía. Es el mismo trabajo. Es el trabajo opuesto.',
        'El Ministerio anuncia de todos modos el cero por ciento. No menciona que le falta uno de sus Arquitectos.',
      ],
    },
    chaoticevil: {
      title: 'LA CERILLA',
      body: [
        'Dejas el Ministerio como todo el mundo acaba dejándolo: por una puerta que no sabías que existía. El ala dura de los Sin Registro, los que dejaron de creer en las huelgas, te acoge.',
        'Conoces cada regla con la que funciona esta ciudad, porque escribiste la mitad. Ahora escribes la otra mitad: redes eléctricas, bombas de agua, los servidores de Halcyon. Cueste lo que cueste. Ya has hecho estas cuentas antes. Sabes cómo llevar un número a cero.',
        'La ciudad no arde de golpe. Arde como cae la lluvia: en todas partes, sin pausa, hasta que nadie recuerda que alguna vez paró.',
      ],
    },
  },

  epilogue: {
    sister: {
      lawfulgood: ['Mira sigue trabajando en la barra de fideos del Bloque 9. Cada domingo comes allí, y cada domingo te pone un huevo de más y le miente a su jefe.', 'Mira está en Calder. La visitas cada domingo. Te pregunta qué regla fue. Siempre le dices la verdad.'],
      lawfulevil: ['Mira deja de contestar a tus llamadas. Es libre; tú te aseguraste de ello. Resulta que ser libre no es lo mismo que perdonar.', 'Mira te escribe una vez desde Calder. La carta solo dice: “¿Valió la pena?”. La archivas.'],
      chaoticgood: ['Mira está contigo. Se ha adueñado de la cocina del piso franco y la ha rebautizado como Lucky Kettle II. La insulina es robada. Nadie se queja.', 'Mira sigue en Calder. Linterna tiene un plan para sacarla con muchísimos pasos. Tú estás escribiendo el primero.'],
      chaoticevil: ['Mira no quiere irse contigo. “Quería que dejaras de ser una función —te dice—, no que te convirtieras en otra”.', 'Mira está en Calder. Te dices que en parte por eso haces esto. Algunas noches hasta te lo crees.'],
    },
    shopkeeper: ['Haruto Ibe sigue llevando el taller de reparaciones. Te arregla el paraguas gratis y te cobra el té.', 'Reparaciones Ibe nunca volvió a abrir.'],
    son: ['Ren Ibe testificó contra la Sociedad Benéfica Tidewater. Sigue vivo, lo que en los Muelles cuenta como final feliz.', 'Ren Ibe sigue en Calder. Su padre tiene una silla junto a la puerta.'],
    coworker: ['Saskia Oyelaran desapareció del registro la última semana del año. Su planta está estupenda.', 'Saskia Oyelaran está en el Noveno Piso. Ya nadie riega a Ministro.'],
    courier: ['Marek Duarte sigue moviendo por el Bloque 4 cosas que nadie puede ver. Algunas son medicinas.', 'Marek Duarte está en Calder, aprendiéndose los nombres de los hombres de su módulo.'],
    hacker: ['Un cirujano de Linterna le quitó el implante a Inès Varga sobre una mesa de cocina. Sobrevivió. Ahora está más furiosa, y se le da mejor.', 'El implante de Inès Varga nunca recibió tratamiento en Calder. Cada noche, Linterna pone su nombre en todas las vallas de la ciudad.'],
    nephew: ['Julian Castell fue ascendido en Halcyon. El timbre de la bicicleta de Joel Achterberg, todavía roto, descansa en una estantería del apartamento de su madre.', 'Julian Castell cumplió cuatro meses antes de que el Comisario encontrara un juez. Ilse Achterberg dice que cuatro meses son cuatro más de los que nadie esperaba.'],
  },

  failures: {
    selfFlagged: {
      title: 'AUTOSEÑALADO',
      body: [
        'Tu terminal se bloquea a mitad de frase. En la puerta hay dos agentes con los que te formaste, con cara de disculpa y una copia impresa de una regla que escribiste tú.',
        '“No es nada personal”, dice uno de ellos. No lo es. Esa era precisamente la idea.',
      ],
      watch: 'Estabas en tu propia lista de VIGILAR, y te saltaste la ley mientras tus propios ojos te miraban.',
      detain: 'Tus propias reglas te pusieron en la lista de DETENER.',
    },
    riots: {
      title: 'DISTURBIOS',
      body: [
        'El malestar llegó a {unrest}. Empieza en los Bloques con una botella y una cámara, y a medianoche arden todos los distritos.',
        'El Ministerio suspende el programa del cero por ciento “a la espera de revisión”. Tu terminal es lo primero que la multitud tira por la ventana.',
      ],
    },
    deadline: {
      title: 'PLAZO INCUMPLIDO',
      body: [
        'El mes doce se cierra con un {pct}% de criminalidad: {atLarge} criminales siguen en libertad.',
        'El Ministro anuncia “avances sustanciales” ante una plaza vacía. Te reasignan al Archivo, donde nada llega nunca a cero.',
      ],
    },
  },
};
