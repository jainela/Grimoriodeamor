import React, { useState, useEffect, useCallback, useRef, lazy, Suspense, useMemo } from 'react';
import './styles/App.css';

// Datos iniciales optimizados - COMPLETOS (32 hechizos)
const initialSpells = [
  {
    id: 1,
    page: 1,
    title: "El Hechizo del Caminante",
    content: "A veces, la magia más poderosa es simplemente seguir adelante, un paso a la vez, aunque no veas el camino.",
    meaning: "Cuando sientas que no puedes más, recuerda que cada paso pequeño cuenta.",
    notes: "Inscrito en la luna llena de invierno",
    author: "Frieren",
    date: "Primavera del año 1023",
    category: "Consuelo",
    unlocked: true,
    tags: ["perseverancia", "esperanza"],
    difficulty: 1,
    createdAt: new Date('2023-01-15').toISOString()
  },
  {
    id: 2,
    page: 2,
    title: "Susurros del Viento",
    content: "Los recuerdos no pesan, flotan como pétalos en el viento, llevando consuelo en su danza eterna.",
    meaning: "Deja que los buenos recuerdos te envuelvan cuando la tristeza llame a tu puerta.",
    notes: "Encontrado en un árbol antiguo del bosque",
    author: "Himmel",
    date: "Verano del año 1018",
    category: "Recuerdo",
    unlocked: true,
    tags: ["memoria", "consuelo"],
    difficulty: 2,
    createdAt: new Date('2023-02-20').toISOString()
  },
  {
    id: 3,
    page: 3,
    title: "El Encantamiento del Alba",
    content: "Cada final es un comienzo disfrazado de despedida, cada noche lleva dentro la promesa de un nuevo amanecer.",
    meaning: "En los momentos más oscuros, confía en que la luz volverá.",
    author: "Heiter",
    date: "Otoño del año 1020",
    category: "Esperanza",
    unlocked: true,
    tags: ["esperanza", "renacimiento"],
    difficulty: 2,
    createdAt: new Date('2023-03-10').toISOString()
  },
  {
    id: 4,
    page: 4,
    title: "Conjuro de las Lágrimas Silenciosas",
    content: "La tristeza es solo amor que busca donde quedarse, un río que limpia el alma en su corriente.",
    meaning: "No temas llorar, cada lágrima riega las semillas de la esperanza.",
    author: "Eisen",
    date: "Invierno del año 1019",
    category: "Sanación",
    unlocked: true,
    tags: ["sanación", "emociones"],
    difficulty: 3,
    createdAt: new Date('2023-03-25').toISOString()
  },
  {
    id: 5,
    page: 5,
    title: "Pacto con el Tiempo",
    content: "El tiempo no cura, enseña a convivir con las cicatrices, transformando el dolor en sabiduría.",
    meaning: "Las heridas sanan, las lecciones permanecen.",
    notes: "Grabado en la piedra del río del olvido",
    author: "Stark",
    date: "Año 1022",
    category: "Sabiduría",
    unlocked: true,
    tags: ["tiempo", "sabiduría"],
    difficulty: 3,
    createdAt: new Date('2023-04-05').toISOString()
  },
  {
    id: 6,
    page: 6,
    title: "Invocación a las Estrellas Caídas",
    content: "Las estrellas que se apagan en el cielo siguen brillando en la memoria de quienes las amaron.",
    meaning: "Nadie se va del todo mientras vive en nuestro corazón.",
    author: "Fern",
    date: "Noche de estrellas fugaces, 1021",
    category: "Eterno",
    unlocked: true,
    tags: ["memoria", "eternidad"],
    difficulty: 1,
    createdAt: new Date('2023-04-15').toISOString()
  },
  {
    id: 7,
    page: 7,
    title: "El Juramento del Horizonte",
    content: "El horizonte nunca se alcanza, pero siempre guía al viajero hacia nuevos sueños.",
    meaning: "La meta no es llegar, sino avanzar con propósito.",
    notes: "Escrito en la arena al amanecer",
    author: "Frieren",
    date: "Primavera del año 1024",
    category: "Destino",
    unlocked: true,
    tags: ["viaje", "propósito"],
    difficulty: 2,
    createdAt: new Date('2023-05-01').toISOString()
  },
  {
    id: 8,
    page: 8,
    title: "Cántico del Silencio",
    content: "En el silencio habitan las respuestas que las palabras no alcanzan.",
    meaning: "Escucha lo que calla tu corazón.",
    notes: "Hallado en un templo olvidado",
    author: "Heiter",
    date: "Invierno del año 1025",
    category: "Sabiduría",
    unlocked: true,
    tags: ["silencio", "introspección"],
    difficulty: 3,
    createdAt: new Date('2023-05-15').toISOString()
  },
  {
    id: 9,
    page: 9,
    title: "El Relato de las Sombras",
    content: "Las sombras no son ausencia de luz, sino testigos de su fuerza.",
    meaning: "Incluso en la oscuridad, la luz deja huella.",
    author: "Eisen",
    date: "Otoño del año 1023",
    category: "Esperanza",
    unlocked: true,
    tags: ["oscuridad", "luz"],
    difficulty: 1,
    createdAt: new Date('2023-06-01').toISOString()
  },
  {
    id: 10,
    page: 10,
    title: "El Círculo de los Sueños",
    content: "Cada sueño es un círculo que regresa, enseñando lo que aún no comprendemos.",
    meaning: "Los sueños son maestros disfrazados.",
    notes: "Grabado en la piedra lunar",
    author: "Fern",
    date: "Noche de eclipse, 1020",
    category: "Memoria",
    unlocked: true,
    tags: ["sueños", "aprendizaje"],
    difficulty: 2,
    createdAt: new Date('2023-06-20').toISOString()
  },
  {
    id: 11,
    page: 11,
    title: "El Sendero de la Eternidad",
    content: "La eternidad no se mide en años, sino en los momentos que permanecen en el corazón.",
    meaning: "Lo que amas nunca desaparece.",
    notes: "Escrito bajo la primera nevada",
    author: "Frieren",
    date: "Invierno del año 1026",
    category: "Eterno",
    unlocked: true,
    tags: ["eternidad", "amor"],
    difficulty: 2,
    createdAt: new Date('2023-07-01').toISOString()
  },
  {
    id: 12,
    page: 12,
    title: "La Promesa del Compañero",
    content: "Un amigo verdadero es un puente que nunca se derrumba, incluso cuando el río crece.",
    meaning: "La amistad sostiene en las tormentas.",
    notes: "Hallado en una espada olvidada",
    author: "Himmel",
    date: "Primavera del año 1021",
    category: "Recuerdo",
    unlocked: true,
    tags: ["amistad", "fortaleza"],
    difficulty: 1,
    createdAt: new Date('2023-07-15').toISOString()
  },
  {
    id: 13,
    page: 13,
    title: "La Luz del Sacerdote",
    content: "La fe no es certeza, es caminar confiando en que la luz volverá.",
    meaning: "Incluso en la duda, la esperanza guía.",
    notes: "Inscrito en un cáliz dorado",
    author: "Heiter",
    date: "Verano del año 1020",
    category: "Esperanza",
    unlocked: true,
    tags: ["fe", "esperanza"],
    difficulty: 3,
    createdAt: new Date('2023-08-01').toISOString()
  },
  {
    id: 14,
    page: 14,
    title: "El Martillo del Silencio",
    content: "La fuerza no siempre golpea, a veces sostiene en silencio lo que otros no pueden.",
    meaning: "La verdadera fortaleza es paciencia.",
    notes: "Grabado en la roca del valle",
    author: "Eisen",
    date: "Otoño del año 1022",
    category: "Sanación",
    unlocked: true,
    tags: ["fortaleza", "paciencia"],
    difficulty: 2,
    createdAt: new Date('2023-08-15').toISOString()
  },
  {
    id: 15,
    page: 15,
    title: "El Juramento del Aprendiz",
    content: "Cada error es una piedra en el camino, pero también un escalón hacia la maestría.",
    meaning: "Aprender es caer y levantarse.",
    notes: "Escrito en la torre del maestro",
    author: "Stark",
    date: "Primavera del año 1025",
    category: "Sabiduría",
    unlocked: true,
    tags: ["aprendizaje", "valentía"],
    difficulty: 3,
    createdAt: new Date('2023-09-01').toISOString()
  },
  {
    id: 16,
    page: 16,
    title: "El Legado de la Maestra",
    content: "Las enseñanzas no mueren, se transforman en raíces que sostienen a quienes siguen.",
    meaning: "Cada lección es semilla de futuro.",
    notes: "Inscrito en la biblioteca arcana",
    author: "Flamme",
    date: "Verano del año 1017",
    category: "Sabiduría",
    unlocked: true,
    tags: ["enseñanza", "destino"],
    difficulty: 2,
    createdAt: new Date('2023-09-15').toISOString()
  },
  {
    id: 17,
    page: 17,
    title: "El Eco del Valle Perdido",
    content: "Los ecos no repiten, recuerdan lo que alguna vez fue amado.",
    meaning: "Cada recuerdo es un puente hacia la calma.",
    notes: "Encontrado en una linterna antigua",
    author: "Himmel",
    date: "Verano del año 1022",
    category: "Recuerdo",
    unlocked: true,
    tags: ["memoria", "consuelo"],
    difficulty: 1,
    createdAt: new Date('2023-10-01').toISOString()
  },
  {
    id: 18,
    page: 18,
    title: "La Oración del Alba",
    content: "La primera luz del día es también la primera esperanza.",
    meaning: "Cada amanecer trae una nueva oportunidad.",
    author: "Heiter",
    date: "Primavera del año 1023",
    category: "Esperanza",
    unlocked: true,
    tags: ["fe", "renacimiento"],
    difficulty: 2,
    createdAt: new Date('2023-10-10').toISOString()
  },
  {
    id: 19,
    page: 19,
    title: "El Peso de la Espada",
    content: "La espada no pesa por su metal, sino por las promesas que guarda.",
    meaning: "La responsabilidad es la verdadera carga del héroe.",
    notes: "Forjada en la montaña del destino",
    author: "Stark",
    date: "Invierno del año 1024",
    category: "Valentía",
    unlocked: true,
    tags: ["responsabilidad", "aprendizaje"],
    difficulty: 3,
    createdAt: new Date('2023-10-20').toISOString()
  },
  {
    id: 20,
    page: 20,
    title: "El Suspiro de las Montañas",
    content: "Las montañas no hablan, pero su silencio enseña paciencia.",
    meaning: "La calma es la mayor fortaleza.",
    author: "Eisen",
    date: "Otoño del año 1021",
    category: "Sanación",
    unlocked: true,
    tags: ["fortaleza", "paciencia"],
    difficulty: 2,
    createdAt: new Date('2023-11-01').toISOString()
  },
  {
    id: 21,
    page: 21,
    title: "El Manto de las Estrellas",
    content: "Cada estrella caída es un deseo que alguien sostuvo con fuerza.",
    meaning: "Los sueños nunca mueren, se transforman.",
    notes: "Visto durante una noche clara",
    author: "Fern",
    date: "Noche estrellada, 1022",
    category: "Memoria",
    unlocked: true,
    tags: ["sueños", "eternidad"],
    difficulty: 1,
    createdAt: new Date('2023-11-10').toISOString()
  },
  {
    id: 22,
    page: 22,
    title: "El Legado del Fuego",
    content: "El fuego no destruye, transforma lo que toca en nueva vida.",
    meaning: "Toda pérdida abre espacio para el renacimiento.",
    author: "Flamme",
    date: "Primavera del año 1016",
    category: "Sabiduría",
    unlocked: true,
    tags: ["renacimiento", "enseñanza"],
    difficulty: 2,
    createdAt: new Date('2023-11-20').toISOString()
  },
  {
    id: 23,
    page: 23,
    title: "El Camino de las Hojas",
    content: "Cada hoja caída recuerda que todo ciclo tiene su belleza.",
    meaning: "Aceptar el cambio es aceptar la vida.",
    notes: "Escrito en un libro antiguo de botánica",
    author: "Frieren",
    date: "Otoño del año 1025",
    category: "Destino",
    unlocked: true,
    tags: ["cambio", "vida"],
    difficulty: 2,
    createdAt: new Date('2023-12-01').toISOString()
  },
  {
    id: 24,
    page: 24,
    title: "La Canción del Río Oculto",
    content: "Los ríos invisibles siguen fluyendo bajo la tierra, llevando esperanza en silencio.",
    meaning: "Lo que no ves también sostiene tu camino.",
    author: "Heiter",
    date: "Verano del año 1024",
    category: "Esperanza",
    unlocked: true,
    tags: ["esperanza", "silencio"],
    difficulty: 3,
    createdAt: new Date('2023-12-10').toISOString()
  },
  {
    id: 25,
    page: 25,
    title: "El Guardián del Acero",
    content: "El acero no protege por su dureza, sino por la voluntad que lo empuña.",
    meaning: "La fuerza nace del corazón, no de la espada.",
    notes: "Forjado en la montaña sagrada",
    author: "Eisen",
    date: "Invierno del año 1023",
    category: "Sanación",
    unlocked: true,
    tags: ["fortaleza", "voluntad"],
    difficulty: 2,
    createdAt: new Date('2023-12-20').toISOString()
  },
  {
    id: 26,
    page: 26,
    title: "El Susurro del Cometa",
    content: "Los cometas son mensajes fugaces que recuerdan la eternidad del cielo.",
    meaning: "Lo breve también puede ser eterno.",
    notes: "Visto durante una noche especial",
    author: "Fern",
    date: "Noche de cometas, 1021",
    category: "Eterno",
    unlocked: true,
    tags: ["memoria", "eternidad"],
    difficulty: 1,
    createdAt: new Date('2024-01-01').toISOString()
  },
  {
    id: 27,
    page: 27,
    title: "El Juramento del Maestro",
    content: "Un maestro no enseña respuestas, sino caminos hacia ellas.",
    meaning: "La enseñanza es abrir puertas, no cerrarlas.",
    author: "Flamme",
    date: "Verano del año 1018",
    category: "Sabiduría",
    unlocked: true,
    tags: ["enseñanza", "destino"],
    difficulty: 2,
    createdAt: new Date('2024-01-10').toISOString()
  },
  {
    id: 28,
    page: 28,
    title: "El Alba de los Recuerdos",
    content: "Cada amanecer trae consigo la memoria de quienes caminaron antes.",
    meaning: "Recordar es honrar la vida.",
    notes: "Escrito en un mural antiguo",
    author: "Himmel",
    date: "Primavera del año 1020",
    category: "Recuerdo",
    unlocked: true,
    tags: ["memoria", "honor"],
    difficulty: 1,
    createdAt: new Date('2024-01-20').toISOString()
  },
  {
    id: 29,
    page: 29,
    title: "El Martillo del Tiempo",
    content: "El tiempo golpea sin ruido, pero su huella permanece en todos.",
    meaning: "El tiempo enseña más que cualquier maestro.",
    author: "Eisen",
    date: "Invierno del año 1022",
    category: "Sabiduría",
    unlocked: true,
    tags: ["tiempo", "fortaleza"],
    difficulty: 3,
    createdAt: new Date('2024-02-01').toISOString()
  },
  {
    id: 30,
    page: 30,
    title: "El Sendero del Aprendizaje",
    content: "Cada paso inseguro es parte del viaje hacia la maestría.",
    meaning: "El error es un maestro oculto.",
    notes: "Escrito en el diario de un joven mago",
    author: "Stark",
    date: "Otoño del año 1025",
    category: "Sabiduría",
    unlocked: true,
    tags: ["aprendizaje", "valentía"],
    difficulty: 2,
    createdAt: new Date('2024-02-10').toISOString()
  },
  {
    id: 31,
    page: 31,
    title: "El Espejo del Alma",
    content: "El alma se refleja en los actos, no en las palabras.",
    meaning: "Lo que haces revela quién eres.",
    author: "Frieren",
    date: "Primavera del año 1026",
    category: "Destino",
    unlocked: true,
    tags: ["alma", "destino"],
    difficulty: 2,
    createdAt: new Date('2024-02-20').toISOString()
  },
  {
    id: 32,
    page: 32,
    title: "La Luz del Recuerdo",
    content: "Los recuerdos iluminan incluso los caminos más oscuros.",
    notes: "Encontrado en una linterna antigua",
    meaning: "La memoria es una lámpara que nunca se apaga.",
    author: "Himmel",
    date: "Invierno del año 1021",
    category: "Recuerdo",
    unlocked: true,
    tags: ["memoria", "esperanza"],
    difficulty: 1,
    createdAt: new Date('2024-03-01').toISOString()
  },
  
{
  id: 33,
  page: 33,
  title: "El Teñido de las Telas",
  content: "El color que eliges hoy es el que recordarán cuando el sol se ponga.",
  meaning: "Nuestras decisiones diarias definen nuestro legado.",
  author: "Frieren",
  date: "Primavera del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["decisiones", "legado", "intención"],
  difficulty: 2,
  createdAt: new Date('2024-03-15').toISOString()
},
{
  id: 34,
  page: 34,
  title: "La Promesa de la Flor de Hielo",
  content: "Hay bellezas que solo florecen en la adversidad del frío más absoluto.",
  meaning: "El carácter se forja en los momentos difíciles.",
  notes: "Observado durante una ventisca tardía",
  author: "Eisen",
  date: "Invierno del año 1026",
  category: "Fortaleza",
  unlocked: true,
  tags: ["adversidad", "carácter", "resiliencia"],
  difficulty: 3,
  createdAt: new Date('2024-03-22').toISOString()
},
{
  id: 35,
  page: 35,
  title: "El Mapa de lo Invisible",
  content: "No todas las rutas están trazadas en papel; algunas se sienten con los pies.",
  meaning: "Confía en tu intuición cuando no tengas guía.",
  author: "Heiter",
  date: "Otoño del año 1026",
  category: "Destino",
  unlocked: true,
  tags: ["intuición", "camino", "búsqueda"],
  difficulty: 2,
  createdAt: new Date('2024-03-29').toISOString()
},
{
  id: 36,
  page: 36,
  title: "El Vuelo de la Pluma de Grulla",
  content: "Soltar no es perder, es permitir que lo que amamos encuentre su propio cielo.",
  meaning: "El amor verdadero incluye saber dejar ir.",
  notes: "Escrito a la orilla de un lago al atardecer",
  author: "Himmel",
  date: "Verano del año 1026",
  category: "Consuelo",
  unlocked: true,
  tags: ["desapego", "amor", "libertad"],
  difficulty: 2,
  createdAt: new Date('2024-04-05').toISOString()
},
{
  id: 37,
  page: 37,
  title: "Conjuro para la Lluvia Menuda",
  content: "Incluso el agua más suave termina por dar forma a la piedra más dura.",
  meaning: "La constancia vence al talento bruto.",
  author: "Fern",
  date: "Primavera del año 1025",
  category: "Paciencia",
  unlocked: true,
  tags: ["constancia", "paciencia", "disciplina"],
  difficulty: 1,
  createdAt: new Date('2024-04-12').toISOString()
},
{
  id: 38,
  page: 38,
  title: "El Secreto del Pan Recién Hecho",
  content: "La magia más cálida no requiere maná, sino manos que cuiden el fuego.",
  meaning: "Valora los pequeños placeres de la vida hogareña.",
  notes: "Anotado en una cocina comunitaria",
  author: "Stark",
  date: "Otoño del año 1026",
  category: "Sanación",
  unlocked: true,
  tags: ["hogar", "cuidado", "calidez"],
  difficulty: 2,
  createdAt: new Date('2024-04-19').toISOString()
},
{
  id: 39,
  page: 39,
  title: "La Teoría de las Sombras Largas",
  content: "Cuanto más bajo está el sol, más grandes nos proyectamos hacia el futuro.",
  meaning: "Al final de la vida, nuestra influencia es mayor.",
  author: "Flamme",
  date: "Invierno del año 1026",
  category: "Eterno",
  unlocked: true,
  tags: ["legado", "tiempo", "proyección"],
  difficulty: 2,
  createdAt: new Date('2024-04-26').toISOString()
},
{
  id: 40,
  page: 40,
  title: "El Silencio del Campo de Batalla",
  content: "La verdadera victoria es no tener que desenvainar la espada.",
  meaning: "La paz es el logro más alto de un guerrero.",
  author: "Eisen",
  date: "Otoño del año 1025",
  category: "Sabiduría",
  unlocked: true,
  tags: ["paz", "templanza", "prudencia"],
  difficulty: 2,
  createdAt: new Date('2024-05-03').toISOString()
},
{
  id: 41,
  page: 41,
  title: "El Reloj de Arena Roto",
  content: "El tiempo que 'perdemos' con amigos es el único tiempo realmente ganado.",
  meaning: "Prioriza las relaciones sobre la productividad.",
  notes: "Inscrito en la base de una vieja cantina",
  author: "Himmel",
  date: "Primavera del año 1026",
  category: "Recuerdo",
  unlocked: true,
  tags: ["amistad", "tiempo", "prioridades"],
  difficulty: 1,
  createdAt: new Date('2024-05-10').toISOString()
},
{
  id: 42,
  page: 42,
  title: "La Invocación del Té Frío",
  content: "Aceptar que las cosas se enfrían es el primer paso para volver a encender el fuego.",
  meaning: "Acepta el final de los ciclos para empezar otros.",
  author: "Frieren",
  date: "Verano del año 1027",
  category: "Cambio",
  unlocked: true,
  tags: ["ciclos", "renovación", "aceptación"],
  difficulty: 2,
  createdAt: new Date('2024-05-17').toISOString()
},
{
  id: 43,
  page: 43,
  title: "El Latido de la Tierra Dormida",
  content: "Bajo la nieve, la vida no descansa; simplemente se prepara para brillar.",
  meaning: "Los periodos de inactividad son necesarios para crecer.",
  author: "Heiter",
  date: "Invierno del año 1026",
  category: "Esperanza",
  unlocked: true,
  tags: ["descanso", "crecimiento", "renacimiento"],
  difficulty: 1,
  createdAt: new Date('2024-05-24').toISOString()
},
{
  id: 44,
  page: 44,
  title: "La Balada del Viajero Solitario",
  content: "La soledad es un espejo donde el alma se reconoce sin disfraces.",
  meaning: "Conócete a ti mismo en el silencio.",
  author: "Stark",
  date: "Otoño del año 1026",
  category: "Introspección",
  unlocked: true,
  tags: ["soledad", "autoconocimiento", "silencio"],
  difficulty: 2,
  createdAt: new Date('2024-05-31').toISOString()
},
{
  id: 45,
  page: 45,
  title: "El Grabado de la Llave Oxidada",
  content: "A veces, la puerta más importante se abre con la llave que habías olvidado.",
  meaning: "Las soluciones suelen estar en nuestro pasado.",
  notes: "Hallado en un taller de cerrajería",
  author: "Fern",
  date: "Primavera del año 1026",
  category: "Memoria",
  unlocked: true,
  tags: ["pasado", "soluciones", "recuerdo"],
  difficulty: 1,
  createdAt: new Date('2024-06-07').toISOString()
},
{
  id: 46,
  page: 46,
  title: "El Hechizo de la Mirada Firme",
  content: "El miedo solo retrocede cuando dejas de cerrar los ojos ante él.",
  meaning: "La valentía es mirar de frente a lo que temes.",
  author: "Eisen",
  date: "Otoño del año 1026",
  category: "Valentía",
  unlocked: true,
  tags: ["miedo", "coraje", "afrontamiento"],
  difficulty: 3,
  createdAt: new Date('2024-06-14').toISOString()
},
{
  id: 47,
  page: 47,
  title: "La Sinfonía del Trigo al Viento",
  content: "Inclinarse no es rendirse, es saber bailar con la tormenta.",
  meaning: "La flexibilidad es una forma de resistencia.",
  author: "Flamme",
  date: "Verano del año 1026",
  category: "Sabiduría",
  unlocked: true,
  tags: ["flexibilidad", "resiliencia", "adaptación"],
  difficulty: 2,
  createdAt: new Date('2024-06-21').toISOString()
},
{
  id: 48,
  page: 48,
  title: "El Fragmento de la Estrella fugaz",
  content: "Un deseo es una semilla que plantamos en el jardín de lo imposible.",
  meaning: "Mantén viva la capacidad de soñar.",
  notes: "Recolectado tras una lluvia de meteoros",
  author: "Frieren",
  date: "Noche de cometas, 1027",
  category: "Esperanza",
  unlocked: true,
  tags: ["sueños", "deseo", "posibilidad"],
  difficulty: 1,
  createdAt: new Date('2024-06-28').toISOString()
},
{
  id: 49,
  page: 49,
  title: "El Brindis del Sacerdote Borracho",
  content: "Dios no cuenta las copas, sino las risas que compartiste antes de que se acabaran.",
  meaning: "La alegría compartida es una forma de oración.",
  author: "Heiter",
  date: "Verano del año 1026",
  category: "Consuelo",
  unlocked: true,
  tags: ["alegría", "compartir", "fe"],
  difficulty: 2,
  createdAt: new Date('2024-07-05').toISOString()
},
{
  id: 50,
  page: 50,
  title: "El Camino de las Hormigas",
  content: "Ninguna tarea es pequeña si se hace con el corazón de un gigante.",
  meaning: "La humildad en el trabajo otorga dignidad.",
  author: "Stark",
  date: "Primavera del año 1027",
  category: "Propósito",
  unlocked: true,
  tags: ["humildad", "trabajo", "dignidad"],
  difficulty: 2,
  createdAt: new Date('2024-07-12').toISOString()
},
{
  id: 51,
  page: 51,
  title: "El Susurro de la Concha de Mar",
  content: "Aunque estés lejos del origen, el eco de tu hogar siempre viaja contigo.",
  meaning: "Nunca perdemos nuestras raíces del todo.",
  notes: "Escrito junto al océano al amanecer",
  author: "Fern",
  date: "Verano del año 1026",
  category: "Memoria",
  unlocked: true,
  tags: ["raíces", "hogar", "pertenencia"],
  difficulty: 1,
  createdAt: new Date('2024-07-19').toISOString()
},
{
  id: 52,
  page: 52,
  title: "El Código del Bosque de Niebla",
  content: "Perderse es, a veces, la única forma de encontrar un camino nuevo.",
  meaning: "No temas a la confusión; es preludio del hallazgo.",
  author: "Frieren",
  date: "Otoño del año 1027",
  category: "Destino",
  unlocked: true,
  tags: ["confusión", "descubrimiento", "búsqueda"],
  difficulty: 2,
  createdAt: new Date('2024-07-26').toISOString()
},
{
  id: 53,
  page: 53,
  title: "La Llama del Candil Gastado",
  content: "Lo que importa no es cuánto brillas, sino a cuántos iluminas.",
  meaning: "El altruismo es la verdadera magnitud de una persona.",
  author: "Himmel",
  date: "Invierno del año 1026",
  category: "Eterno",
  unlocked: true,
  tags: ["altruismo", "luz", "impacto"],
  difficulty: 2,
  createdAt: new Date('2024-08-02').toISOString()
},
{
  id: 54,
  page: 54,
  title: "El Peso de las Palabras Calladas",
  content: "Lo que no decimos pesa más que el hierro en el fondo del alma.",
  meaning: "Aprende a expresar tus sentimientos a tiempo.",
  author: "Eisen",
  date: "Primavera del año 1026",
  category: "Sanación",
  unlocked: true,
  tags: ["expresión", "emociones", "comunicación"],
  difficulty: 3,
  createdAt: new Date('2024-08-09').toISOString()
},
{
  id: 55,
  page: 55,
  title: "El Dibujo en la Escarcha",
  content: "La belleza efímera es la que más profundamente se graba en la retina.",
  meaning: "Aprecia el presente porque es irrepetible.",
  author: "Flamme",
  date: "Invierno del año 1026",
  category: "Sabiduría",
  unlocked: true,
  tags: ["efímero", "presente", "aprecio"],
  difficulty: 2,
  createdAt: new Date('2024-08-16').toISOString()
},
{
  id: 56,
  page: 56,
  title: "La Oración del Puente de Piedra",
  content: "Ser un puente significa permitir que otros pasen sobre ti hacia sus sueños.",
  meaning: "El sacrificio por los demás es un acto noble.",
  notes: "Escrito en el arco de un antiguo puente",
  author: "Heiter",
  date: "Otoño del año 1026",
  category: "Amor",
  unlocked: true,
  tags: ["sacrificio", "servicio", "nobleza"],
  difficulty: 2,
  createdAt: new Date('2024-08-23').toISOString()
},
{
  id: 57,
  page: 57,
  title: "El Vuelo del Halcón Herido",
  content: "La cicatriz en el ala es la prueba de que sobreviviste al cielo.",
  meaning: "Tus heridas son testimonios de tu fuerza.",
  author: "Stark",
  date: "Verano del año 1026",
  category: "Fortaleza",
  unlocked: true,
  tags: ["heridas", "resiliencia", "superación"],
  difficulty: 3,
  createdAt: new Date('2024-08-30').toISOString()
},
{
  id: 58,
  page: 58,
  title: "El Perfume de las Uvas Silvestres",
  content: "La madurez no llega con los años, sino con las heladas que superamos.",
  meaning: "El sufrimiento bien llevado nos hace sabios.",
  author: "Fern",
  date: "Otoño del año 1026",
  category: "Aprendizaje",
  unlocked: true,
  tags: ["madurez", "experiencia", "sabiduría"],
  difficulty: 2,
  createdAt: new Date('2024-09-06').toISOString()
},
{
  id: 59,
  page: 59,
  title: "El Tratado de los Pasos Cortos",
  content: "Si miras la cima te cansarás; si miras tus pies, llegarás sin darte cuenta.",
  meaning: "Enfócate en el proceso, no solo en la meta.",
  author: "Frieren",
  date: "Primavera del año 1027",
  category: "Perseverancia",
  unlocked: true,
  tags: ["proceso", "constancia", "metas"],
  difficulty: 1,
  createdAt: new Date('2024-09-13').toISOString()
},
{
  id: 60,
  page: 60,
  title: "El Sueño de la Estatua de Piedra",
  content: "Incluso lo que parece inmóvil está cambiando bajo el abrazo del tiempo.",
  meaning: "Nada en este mundo es realmente estático.",
  author: "Himmel",
  date: "Invierno del año 1026",
  category: "Cambio",
  unlocked: true,
  tags: ["transformación", "tiempo", "impermanencia"],
  difficulty: 2,
  createdAt: new Date('2024-09-20').toISOString()
},
{
  id: 61,
  page: 61,
  title: "La Tinta que no se Borra",
  content: "Escribimos nuestra historia con actos que el tiempo no puede desgastar.",
  meaning: "La bondad es la única marca permanente.",
  author: "Flamme",
  date: "Otoño del año 1026",
  category: "Legado",
  unlocked: true,
  tags: ["bondad", "huella", "historia"],
  difficulty: 2,
  createdAt: new Date('2024-09-27').toISOString()
},
{
  id: 62,
  page: 62,
  title: "El Aliento del Dragón Dormido",
  content: "El poder más grande es el que se mantiene bajo control por voluntad propia.",
  meaning: "La templanza es la maestría del espíritu.",
  author: "Eisen",
  date: "Primavera del año 1026",
  category: "Sabiduría",
  unlocked: true,
  tags: ["templanza", "poder", "autocontrol"],
  difficulty: 3,
  createdAt: new Date('2024-10-04').toISOString()
},
{
  id: 63,
  page: 63,
  title: "El Canto de la Alondra al Ocaso",
  content: "Cantar cuando el sol se va es un acto de fe en el mañana.",
  meaning: "Mantén el optimismo incluso en el final.",
  notes: "Escuchado en un valle al anochecer",
  author: "Heiter",
  date: "Verano del año 1026",
  category: "Esperanza",
  unlocked: true,
  tags: ["optimismo", "fe", "finales"],
  difficulty: 1,
  createdAt: new Date('2024-10-11').toISOString()
},
{
  id: 64,
  page: 64,
  title: "La Sombra del Sauce Llorón",
  content: "No te avergüences de inclinarte ante el peso de la tristeza.",
  meaning: "La vulnerabilidad es parte de la condición humana.",
  author: "Frieren",
  date: "Otoño del año 1027",
  category: "Emociones",
  unlocked: true,
  tags: ["tristeza", "vulnerabilidad", "humanidad"],
  difficulty: 2,
  createdAt: new Date('2024-10-18').toISOString()
},
{
  id: 65,
  page: 65,
  title: "El Brillo de la Armadura Vieja",
  content: "Las abolladuras cuentan las historias que los desfiles olvidan.",
  meaning: "Valora la experiencia sobre la apariencia.",
  notes: "Grabado en la coraza de un veterano",
  author: "Stark",
  date: "Primavera del año 1027",
  category: "Valentía",
  unlocked: true,
  tags: ["experiencia", "historia", "coraje"],
  difficulty: 3,
  createdAt: new Date('2024-10-25').toISOString()
}, 

{
  id: 66,
  page: 66,
  title: "La Paciencia del Pescador",
  content: "El río no da sus tesoros al que más corre, sino al que sabe esperar en la orilla.",
  meaning: "El éxito requiere saber aguardar el momento oportuno.",
  notes: "Anotado en una tarima de pesca al amanecer",
  author: "Eisen",
  date: "Primavera del año 1026",
  category: "Sabiduría",
  unlocked: true,
  tags: ["paciencia", "oportunidad", "prudencia"],
  difficulty: 2,
  createdAt: new Date('2024-11-01').toISOString()
},
{
  id: 67,
  page: 67,
  title: "El Reflejo en el Pozo Profundo",
  content: "Para ver las estrellas de día, hay que mirar hacia lo más hondo de la tierra.",
  meaning: "La introspección revela verdades que el ruido oculta.",
  author: "Heiter",
  date: "Otoño del año 1027",
  category: "Introspección",
  unlocked: true,
  tags: ["silencio", "verdad", "autoconocimiento"],
  difficulty: 2,
  createdAt: new Date('2024-11-08').toISOString()
},
{
  id: 68,
  page: 68,
  title: "El Hechizo de la Ropa Seca",
  content: "Un viento suave y un poco de sol son capaces de quitar el peso más húmedo.",
  meaning: "Las soluciones simples son a menudo las más efectivas.",
  notes: "Secado en un patio de piedra",
  author: "Frieren",
  date: "Verano del año 1027",
  category: "Sanación",
  unlocked: true,
  tags: ["simpleza", "cuidado", "alivio"],
  difficulty: 1,
  createdAt: new Date('2024-11-15').toISOString()
},
{
  id: 69,
  page: 69,
  title: "La Última Brasa del Campamento",
  content: "Mientras quede un punto rojo en la ceniza, el frío no habrá ganado la batalla.",
  meaning: "Nunca subestimes el poder de un último esfuerzo.",
  author: "Stark",
  date: "Invierno del año 1026",
  category: "Esperanza",
  unlocked: true,
  tags: ["persistencia", "final", "esfuerzo"],
  difficulty: 2,
  createdAt: new Date('2024-11-22').toISOString()
},
{
  id: 70,
  page: 70,
  title: "El Laberinto de las Enredaderas",
  content: "No busques el centro; busca la salida que te permita ver el cielo de nuevo.",
  meaning: "A veces el objetivo no es entender el problema, sino superarlo.",
  author: "Fern",
  date: "Primavera del año 1027",
  category: "Destino",
  unlocked: true,
  tags: ["solución", "claridad", "superación"],
  difficulty: 2,
  createdAt: new Date('2024-11-29').toISOString()
},
{
  id: 71,
  page: 71,
  title: "La Promesa del Pan de Viaje",
  content: "Incluso el bocado más duro sabe a banquete cuando se comparte con amigos.",
  meaning: "La compañía transforma la escasez en abundancia.",
  notes: "Inscrito en una posada de ruta",
  author: "Himmel",
  date: "Verano del año 1026",
  category: "Recuerdo",
  unlocked: true,
  tags: ["amistad", "compartir", "abundancia"],
  difficulty: 1,
  createdAt: new Date('2024-12-06').toISOString()
},
{
  id: 72,
  page: 72,
  title: "La Lección del Alfarero",
  content: "El barro debe pasar por el fuego para dejar de ser polvo y convertirse en arte.",
  meaning: "El dolor tiene el potencial de transformarnos en algo hermoso.",
  author: "Flamme",
  date: "Otoño del año 1026",
  category: "Sabiduría",
  unlocked: true,
  tags: ["transformación", "fuego", "arte"],
  difficulty: 2,
  createdAt: new Date('2024-12-13').toISOString()
},
{
  id: 73,
  page: 73,
  title: "El Silencio de las Bibliotecas",
  content: "Los libros no gritan sus verdades; esperan a que alguien tenga sed de ellas.",
  meaning: "El conocimiento requiere una búsqueda activa y humilde.",
  author: "Frieren",
  date: "Invierno del año 1027",
  category: "Aprendizaje",
  unlocked: true,
  tags: ["conocimiento", "humildad", "búsqueda"],
  difficulty: 2,
  createdAt: new Date('2024-12-20').toISOString()
},
{
  id: 74,
  page: 74,
  title: "El Vuelo de la Mariposa de Invierno",
  content: "Existir contra todo pronóstico es la forma más pura de rebeldía.",
  meaning: "Tu sola persistencia es un triunfo sobre el destino.",
  author: "Eisen",
  date: "Invierno del año 1026",
  category: "Fortaleza",
  unlocked: true,
  tags: ["persistencia", "rebeldía", "fortaleza"],
  difficulty: 3,
  createdAt: new Date('2024-12-27').toISOString()
},
{
  id: 75,
  page: 75,
  title: "La Teoría del Nudo Gordiano",
  content: "A veces, la mejor forma de desatar un problema es cortarlo de raíz.",
  meaning: "No temas tomar decisiones drásticas cuando sean necesarias.",
  author: "Fern",
  date: "Primavera del año 1027",
  category: "Valentía",
  unlocked: true,
  tags: ["decisión", "coraje", "resolución"],
  difficulty: 3,
  createdAt: new Date('2025-01-03').toISOString()
},
{
  id: 76,
  page: 76,
  title: "El Eco de las Campanas de Aldea",
  content: "El sonido se apaga, pero el aviso que dio permanece en el aire.",
  meaning: "Las advertencias de quienes nos aman deben ser atesoradas.",
  notes: "Escuchado en una plaza al mediodía",
  author: "Heiter",
  date: "Verano del año 1027",
  category: "Destino",
  unlocked: true,
  tags: ["alerta", "cuidado", "comunidad"],
  difficulty: 2,
  createdAt: new Date('2025-01-10').toISOString()
},
{
  id: 77,
  page: 77,
  title: "El Regalo de las Flores de Campo",
  content: "No necesitan un jardín real para ser hermosas, solo un rayo de luz.",
  meaning: "La dignidad no depende de tu estatus social.",
  author: "Himmel",
  date: "Primavera del año 1026",
  category: "Consuelo",
  unlocked: true,
  tags: ["dignidad", "belleza", "igualdad"],
  difficulty: 1,
  createdAt: new Date('2025-01-17').toISOString()
},
{
  id: 78,
  page: 78,
  title: "El Pulido del Espejo de Bronce",
  content: "Si solo ves manchas, es que has dejado de mirar el reflejo que hay detrás.",
  meaning: "No dejes que tus defectos te impidan ver tu valor.",
  author: "Stark",
  date: "Otoño del año 1027",
  category: "Autoestima",
  unlocked: true,
  tags: ["valor", "autoimagen", "claridad"],
  difficulty: 2,
  createdAt: new Date('2025-01-24').toISOString()
},
{
  id: 79,
  page: 79,
  title: "La Danza de las Hojas Secas",
  content: "Incluso al caer, hay una gracia que solo el que acepta su destino posee.",
  meaning: "Hay honor en saber retirarse cuando el tiempo lo dicta.",
  author: "Frieren",
  date: "Otoño del año 1027",
  category: "Eterno",
  unlocked: true,
  tags: ["ciclo", "aceptación", "gracia"],
  difficulty: 2,
  createdAt: new Date('2025-01-31').toISOString()
},
{
  id: 80,
  page: 80,
  title: "El Mapa de las Constelaciones Olvidadas",
  content: "El cielo cambia, pero la dirección del norte siempre es la misma en el alma.",
  meaning: "Mantén tus principios aunque el mundo a tu alrededor cambie.",
  author: "Flamme",
  date: "Invierno del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["principios", "rumbo", "integridad"],
  difficulty: 2,
  createdAt: new Date('2025-02-07').toISOString()
},
{
  id: 81,
  page: 81,
  title: "El Secreto del Herrero de Montaña",
  content: "El acero más fuerte es el que fue doblado mil veces sin romperse.",
  meaning: "La resiliencia se construye a través de la repetición.",
  notes: "Forjado en una fragua de altura",
  author: "Eisen",
  date: "Verano del año 1026",
  category: "Fortaleza",
  unlocked: true,
  tags: ["resiliencia", "práctica", "fortaleza"],
  difficulty: 3,
  createdAt: new Date('2025-02-14').toISOString()
},
{
  id: 82,
  page: 82,
  title: "La Invocación del Caldo Caliente",
  content: "Un cuerpo caliente es el primer paso para un espíritu valiente.",
  meaning: "Cuida tus necesidades básicas para poder enfrentar tus miedos.",
  author: "Stark",
  date: "Invierno del año 1026",
  category: "Sanación",
  unlocked: true,
  tags: ["cuidado", "templanza", "coraje"],
  difficulty: 1,
  createdAt: new Date('2025-02-21').toISOString()
},
{
  id: 83,
  page: 83,
  title: "La Sombra del Reloj de Sol",
  content: "La sombra no persigue al tiempo, solo nos recuerda que se está moviendo.",
  meaning: "La conciencia de la muerte le da sentido a la vida.",
  author: "Himmel",
  date: "Primavera del año 1026",
  category: "Tiempo",
  unlocked: true,
  tags: ["tiempo", "mortalidad", "sentido"],
  difficulty: 2,
  createdAt: new Date('2025-02-28').toISOString()
},
{
  id: 84,
  page: 84,
  title: "El Susurro de las Telas de Araña",
  content: "Lo más frágil puede atrapar lo más fuerte si está bien tejido.",
  meaning: "La estrategia y la paciencia vencen a la fuerza bruta.",
  author: "Fern",
  date: "Verano del año 1027",
  category: "Estrategia",
  unlocked: true,
  tags: ["estrategia", "paciencia", "inteligencia"],
  difficulty: 2,
  createdAt: new Date('2025-03-07').toISOString()
},
{
  id: 85,
  page: 85,
  title: "El Brindis por los Ausentes",
  content: "No bebemos por los que se fueron, sino por el camino que nos enseñaron.",
  meaning: "El duelo debe transformarse en gratitud por lo vivido.",
  author: "Heiter",
  date: "Otoño del año 1026",
  category: "Recuerdo",
  unlocked: true,
  tags: ["duelo", "gratitud", "memoria"],
  difficulty: 2,
  createdAt: new Date('2025-03-14').toISOString()
},
{
  id: 86,
  page: 86,
  title: "El Hechizo para Ver Colores en la Oscuridad",
  content: "La oscuridad absoluta no existe para quien lleva una luz interna.",
  meaning: "La esperanza es una percepción, no una circunstancia.",
  notes: "Anotado tras una noche sin luna",
  author: "Frieren",
  date: "Invierno del año 1027",
  category: "Esperanza",
  unlocked: true,
  tags: ["luz", "percepción", "esperanza"],
  difficulty: 1,
  createdAt: new Date('2025-03-21').toISOString()
},
{
  id: 87,
  page: 87,
  title: "La Raíz que Agrieta la Muralla",
  content: "La suavidad de la vida siempre termina venciendo a la dureza de la piedra.",
  meaning: "La vitalidad es más persistente que cualquier obstáculo.",
  author: "Flamme",
  date: "Primavera del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["vitalidad", "suavidad", "persistencia"],
  difficulty: 2,
  createdAt: new Date('2025-03-28').toISOString()
},
{
  id: 88,
  page: 88,
  title: "El Cuidado del Filo de la Hacha",
  content: "Un descanso para afilar es más valioso que una hora de golpeo ciego.",
  meaning: "El descanso productivo es parte esencial del trabajo.",
  author: "Eisen",
  date: "Otoño del año 1026",
  category: "Eficiencia",
  unlocked: true,
  tags: ["descanso", "eficiencia", "mejora"],
  difficulty: 2,
  createdAt: new Date('2025-04-04').toISOString()
},
{
  id: 89,
  page: 89,
  title: "La Balada del Puente de Madera",
  content: "Cruza con cuidado, pero no dejes de cruzar por miedo al crujido.",
  meaning: "El riesgo es necesario para avanzar en cualquier viaje.",
  author: "Stark",
  date: "Primavera del año 1027",
  category: "Valentía",
  unlocked: true,
  tags: ["riesgo", "avance", "coraje"],
  difficulty: 2,
  createdAt: new Date('2025-04-11').toISOString()
},
{
  id: 90,
  page: 90,
  title: "El Relato del Grano de Arena",
  content: "Ninguna montaña existiría si el primer grano se hubiera rendido.",
  meaning: "Las grandes obras son la suma de esfuerzos minúsculos.",
  author: "Fern",
  date: "Verano del año 1027",
  category: "Perseverancia",
  unlocked: true,
  tags: ["esfuerzo", "constancia", "progreso"],
  difficulty: 1,
  createdAt: new Date('2025-04-18').toISOString()
},
{
  id: 91,
  page: 91,
  title: "La Bendición de la Lluvia de Primavera",
  content: "Llorar es solo la forma que tiene el corazón de prepararse para florecer.",
  meaning: "La tristeza es un proceso de limpieza necesario.",
  author: "Heiter",
  date: "Primavera del año 1026",
  category: "Sanación",
  unlocked: true,
  tags: ["tristeza", "limpieza", "florecimiento"],
  difficulty: 2,
  createdAt: new Date('2025-04-25').toISOString()
},
{
  id: 92,
  page: 92,
  title: "El Hechizo de la Memoria Sensorial",
  content: "Un olor puede traerte de vuelta a alguien que el tiempo intentó borrar.",
  meaning: "Los sentidos guardan recuerdos que la mente olvida.",
  author: "Frieren",
  date: "Otoño del año 1027",
  category: "Memoria",
  unlocked: true,
  tags: ["sentidos", "recuerdo", "nostalgia"],
  difficulty: 1,
  createdAt: new Date('2025-05-02').toISOString()
},
{
  id: 93,
  page: 93,
  title: "El Juramento del Caminante Nocturno",
  content: "Las estrellas solo se ven cuando el sol deja de gritar.",
  meaning: "La humildad permite ver las verdades universales.",
  author: "Himmel",
  date: "Invierno del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["humildad", "verdad", "claridad"],
  difficulty: 2,
  createdAt: new Date('2025-05-09').toISOString()
},
{
  id: 94,
  page: 94,
  title: "El Peso de la Medalla de Oro",
  content: "Si la llevas para presumir, pesará más que si la llevas por lo que representa.",
  meaning: "El orgullo vacío es una carga; el honor es una guía.",
  author: "Eisen",
  date: "Verano del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["honor", "humildad", "orgullo"],
  difficulty: 2,
  createdAt: new Date('2025-05-16').toISOString()
},
{
  id: 95,
  page: 95,
  title: "La Teoría del Viento de Cola",
  content: "A veces la vida te empuja, otras te frena; aprende a usar ambos para volar.",
  meaning: "Aprovecha tanto la suerte como los contratiempos.",
  notes: "Escrito en un mirador montañoso",
  author: "Flamme",
  date: "Otoño del año 1027",
  category: "Destino",
  unlocked: true,
  tags: ["adaptación", "suerte", "aprendizaje"],
  difficulty: 2,
  createdAt: new Date('2025-05-23').toISOString()
},
{
  id: 96,
  page: 96,
  title: "El Código del Fuego Fatuo",
  content: "No todas las luces guían al hogar; algunas solo están para ser admiradas.",
  meaning: "Aprende a distinguir entre lo útil y lo simplemente bello.",
  author: "Fern",
  date: "Verano del año 1027",
  category: "Prudencia",
  unlocked: true,
  tags: ["prudencia", "discernimiento", "belleza"],
  difficulty: 2,
  createdAt: new Date('2025-05-30').toISOString()
},
{
  id: 97,
  page: 97,
  title: "La Canción del Viejo Roble",
  content: "Mis hojas caen cada año, pero mi tronco solo sabe mirar hacia arriba.",
  meaning: "Mantén tus ideales firmes a pesar de los cambios externos.",
  author: "Frieren",
  date: "Otoño del año 1027",
  category: "Eternidad",
  unlocked: true,
  tags: ["ideales", "perseverancia", "crecimiento"],
  difficulty: 2,
  createdAt: new Date('2025-06-06').toISOString()
},
{
  id: 98,
  page: 98,
  title: "El Brillo de la Moneda Perdida",
  content: "Tu valor no disminuye porque alguien te haya dejado de buscar.",
  meaning: "Tu valor intrínseco es independiente de la atención ajena.",
  notes: "Encontrada junto a un pozo de camino",
  author: "Stark",
  date: "Primavera del año 1027",
  category: "Consuelo",
  unlocked: true,
  tags: ["valor", "autoestima", "independencia"],
  difficulty: 1,
  createdAt: new Date('2025-06-13').toISOString()
},
{
  id: 99,
  page: 99,
  title: "La Oración del Pan Compartido",
  content: "Donde comen dos, el hambre se divide y la fuerza se multiplica.",
  meaning: "La generosidad es la mejor inversión para el viaje.",
  author: "Heiter",
  date: "Verano del año 1027",
  category: "Esperanza",
  unlocked: true,
  tags: ["generosidad", "comunidad", "fuerza"],
  difficulty: 1,
  createdAt: new Date('2025-06-20').toISOString()
},
{
  id: 100,
  page: 100,
  title: "El Final del Primer Capítulo",
  content: "Cada cien pasos, detente y mira cuánto ha cambiado el horizonte.",
  meaning: "La reflexión periódica es necesaria para no perder el rumbo.",
  notes: "Marcado en un hito de piedra del camino",
  author: "Himmel",
  date: "Primavera del año 1028",
  category: "Destino",
  unlocked: true,
  tags: ["reflexión", "rumbo", "ciclos"],
  difficulty: 2,
  createdAt: new Date('2025-06-27').toISOString()
},

{
  id: 101,
  page: 101,
  title: "El Vuelo de la Ceniza",
  content: "Lo que el fuego consumió no desaparece; se vuelve parte del aire que respiras.",
  meaning: "El pasado nos nutre incluso cuando parece haber sido destruido.",
  notes: "Anotado tras una hoguera de despedida",
  author: "Flamme",
  date: "Invierno del año 1027",
  category: "Eterno",
  unlocked: true,
  tags: ["memoria", "transformación", "legado"],
  difficulty: 2,
  createdAt: new Date('2025-07-04').toISOString()
},
{
  id: 102,
  page: 102,
  title: "El Hechizo para Encontrar Agujas",
  content: "No busques el metal, busca el brillo que la luz regala a lo pequeño.",
  meaning: "La solución a los grandes problemas suele ser un detalle minúsculo.",
  author: "Frieren",
  date: "Primavera del año 1028",
  category: "Sabiduría",
  unlocked: true,
  tags: ["detalle", "atención", "claridad"],
  difficulty: 2,
  createdAt: new Date('2025-07-11').toISOString()
},
{
  id: 103,
  page: 103,
  title: "El Compás del Corazón Valiente",
  content: "El miedo no es el enemigo; es la señal de que algo importante está por suceder.",
  meaning: "Sentir temor es el primer paso para demostrar valentía.",
  author: "Stark",
  date: "Otoño del año 1027",
  category: "Valentía",
  unlocked: true,
  tags: ["miedo", "coraje", "señales"],
  difficulty: 3,
  createdAt: new Date('2025-07-18').toISOString()
},
{
  id: 104,
  page: 104,
  title: "La Teoría de la Gota que Rebosa",
  content: "No es la última gota la que importa, sino todas las que llenaron el vaso antes.",
  meaning: "Valora el esfuerzo acumulado, no solo el resultado final.",
  author: "Fern",
  date: "Verano del año 1027",
  category: "Paciencia",
  unlocked: true,
  tags: ["acumulación", "proceso", "paciencia"],
  difficulty: 2,
  createdAt: new Date('2025-07-25').toISOString()
},
{
  id: 105,
  page: 105,
  title: "El Cantar del Grillo en la Tormenta",
  content: "Incluso cuando el cielo grita, hay una voz pequeña que no deja de sonar.",
  meaning: "Tu identidad debe permanecer firme ante la presión externa.",
  author: "Heiter",
  date: "Invierno del año 1026",
  category: "Esperanza",
  unlocked: true,
  tags: ["identidad", "presión", "constancia"],
  difficulty: 2,
  createdAt: new Date('2025-08-01').toISOString()
},
{
  id: 106,
  page: 106,
  title: "La Sombra del Héroe",
  content: "Nadie es tan grande como su estatua, ni tan pequeño como sus dudas.",
  meaning: "La humanidad reside en el equilibrio entre el mito y la realidad.",
  author: "Himmel",
  date: "Otoño del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["humildad", "mito", "realidad"],
  difficulty: 2,
  createdAt: new Date('2025-08-08').toISOString()
},
{
  id: 107,
  page: 107,
  title: "El Temple del Escudo de Hierro",
  content: "Un escudo no se juzga por lo limpio que está, sino por las grietas que aguantó.",
  meaning: "El valor se demuestra en la resistencia, no en la apariencia.",
  author: "Eisen",
  date: "Invierno del año 1026",
  category: "Fortaleza",
  unlocked: true,
  tags: ["resistencia", "experiencia", "protección"],
  difficulty: 3,
  createdAt: new Date('2025-08-15').toISOString()
},
{
  id: 108,
  page: 108,
  title: "La Invocación del Viento de Otoño",
  content: "Aprende de las hojas: hay belleza en el arte de soltar lo que ya cumplió su tiempo.",
  meaning: "Dejar ir es una forma de sabiduría necesaria para crecer.",
  author: "Frieren",
  date: "Otoño del año 1027",
  category: "Cambio",
  unlocked: true,
  tags: ["desapego", "ciclo", "crecimiento"],
  difficulty: 2,
  createdAt: new Date('2025-08-22').toISOString()
},
{
  id: 109,
  page: 109,
  title: "El Mapa de las Grietas en la Pared",
  content: "Por donde se rompe el muro es por donde empieza a entrar la luz del jardín.",
  meaning: "Nuestras debilidades son las puertas a nuestra iluminación.",
  author: "Heiter",
  date: "Primavera del año 1027",
  category: "Sanación",
  unlocked: true,
  tags: ["debilidad", "luz", "aprendizaje"],
  difficulty: 2,
  createdAt: new Date('2025-08-29').toISOString()
},
{
  id: 110,
  page: 110,
  title: "La Balada del Zapatero Remendón",
  content: "Un camino largo no se hace con botas nuevas, sino con botas que conocen el pie.",
  meaning: "La experiencia previa es tu mejor herramienta para el futuro.",
  author: "Stark",
  date: "Verano del año 1027",
  category: "Aprendizaje",
  unlocked: true,
  tags: ["experiencia", "camino", "herramientas"],
  difficulty: 2,
  createdAt: new Date('2025-09-05').toISOString()
},
{
  id: 111,
  page: 111,
  title: "El Secreto del Manantial Oculto",
  content: "Lo que más vida da es, a menudo, lo que menos ruido hace al brotar.",
  meaning: "Las influencias más profundas suelen ser las más discretas.",
  author: "Flamme",
  date: "Primavera del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["discreción", "vida", "profundidad"],
  difficulty: 2,
  createdAt: new Date('2025-09-12').toISOString()
},
{
  id: 112,
  page: 112,
  title: "El Código del Relámpago Fugaz",
  content: "La fuerza no reside en durar para siempre, sino en ser inolvidable mientras duras.",
  meaning: "La intensidad del momento supera a la extensión del tiempo.",
  author: "Fern",
  date: "Verano del año 1027",
  category: "Destino",
  unlocked: true,
  tags: ["intensidad", "memoria", "instante"],
  difficulty: 2,
  createdAt: new Date('2025-09-19').toISOString()
},
{
  id: 113,
  page: 113,
  title: "La Promesa de la Piedra de Molino",
  content: "Girando siempre en el mismo sitio, el grano se vuelve harina que alimenta a miles.",
  meaning: "La rutina con propósito es la base de la generosidad.",
  author: "Eisen",
  date: "Otoño del año 1026",
  category: "Propósito",
  unlocked: true,
  tags: ["rutina", "propósito", "generosidad"],
  difficulty: 2,
  createdAt: new Date('2025-09-26').toISOString()
},
{
  id: 114,
  page: 114,
  title: "El Hechizo para Calentar las Manos",
  content: "El calor no viene de la llama, sino del recuerdo de un hogar compartido.",
  meaning: "El afecto de los demás es nuestra mejor defensa contra el frío.",
  notes: "Escrito junto a un brasero común",
  author: "Frieren",
  date: "Invierno del año 1027",
  category: "Consuelo",
  unlocked: true,
  tags: ["hogar", "afecto", "calor"],
  difficulty: 1,
  createdAt: new Date('2025-10-03').toISOString()
},
{
  id: 115,
  page: 115,
  title: "La Teoría del Eco en la Caverna",
  content: "Si gritas con odio, el mundo te devolverá odio; si cantas, el eco cantará contigo.",
  meaning: "Recibimos de la vida un reflejo de lo que proyectamos.",
  author: "Himmel",
  date: "Primavera del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["proyección", "reflejo", "actitud"],
  difficulty: 2,
  createdAt: new Date('2025-10-10').toISOString()
},
{
  id: 116,
  page: 116,
  title: "El Vuelo de la Libélula sobre el Pantano",
  content: "Mantenerse por encima del lodo requiere un aleteo constante y ligero.",
  meaning: "La pureza de espíritu requiere un esfuerzo diario y sutil.",
  author: "Fern",
  date: "Verano del año 1027",
  category: "Disciplina",
  unlocked: true,
  tags: ["disciplina", "esfuerzo", "ligereza"],
  difficulty: 2,
  createdAt: new Date('2025-10-17').toISOString()
},
{
  id: 117,
  page: 117,
  title: "La Oración del Soldado Cansado",
  content: "Descansar no es rendirse; es preparar el mañana mientras el hoy se apaga.",
  meaning: "El sueño es un acto de fe en que el cuerpo sanará.",
  author: "Heiter",
  date: "Invierno del año 1026",
  category: "Sanación",
  unlocked: true,
  tags: ["descanso", "fe", "recuperación"],
  difficulty: 1,
  createdAt: new Date('2025-10-24').toISOString()
},
{
  id: 118,
  page: 118,
  title: "El Brillo del Musgo en la Sombra",
  content: "Hay vida que solo prospera donde el sol no se atreve a tocar.",
  meaning: "Encuentra tu valor en los lugares donde otros no quieren estar.",
  author: "Stark",
  date: "Otoño del año 1027",
  category: "Autoestima",
  unlocked: true,
  tags: ["valor", "entornos", "autoconfianza"],
  difficulty: 2,
  createdAt: new Date('2025-10-31').toISOString()
},
{
  id: 119,
  page: 119,
  title: "El Tratado del Hilo de Ariadna",
  content: "No importa cuán oscuro sea el camino si tienes un vínculo que te une a la salida.",
  meaning: "La conexión con los demás es nuestra guía en la confusión.",
  author: "Flamme",
  date: "Primavera del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["vínculo", "guía", "comunidad"],
  difficulty: 2,
  createdAt: new Date('2025-11-07').toISOString()
},
{
  id: 120,
  page: 120,
  title: "El Susurro del Trigo Maduro",
  content: "Inclinarse ante el peso del fruto es la mayor señal de madurez.",
  meaning: "La humildad es el resultado natural de haber crecido de verdad.",
  author: "Eisen",
  date: "Verano del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["madurez", "humildad", "fruto"],
  difficulty: 2,
  createdAt: new Date('2025-11-14').toISOString()
},
{
  id: 121,
  page: 121,
  title: "El Relato de la Vela que se Apaga",
  content: "La última luz es la que más se aprecia, pero es la primera la que permitió el viaje.",
  meaning: "No olvides los inicios cuando estés cerca del final.",
  notes: "Escrito tras una vigilia de despedida",
  author: "Himmel",
  date: "Invierno del año 1027",
  category: "Memoria",
  unlocked: true,
  tags: ["inicio", "final", "gratitud"],
  difficulty: 2,
  createdAt: new Date('2025-11-21').toISOString()
},
{
  id: 122,
  page: 122,
  title: "La Invocación del Agua que Corre",
  content: "El agua que se detiene se pudre; el alma que se estanca pierde su magia.",
  meaning: "El movimiento y el cambio son esenciales para la salud espiritual.",
  author: "Frieren",
  date: "Primavera del año 1028",
  category: "Cambio",
  unlocked: true,
  tags: ["flujo", "cambio", "vitalidad"],
  difficulty: 2,
  createdAt: new Date('2025-11-28').toISOString()
},
{
  id: 123,
  page: 123,
  title: "El Código del Mirlo Madrugador",
  content: "Anunciar el alba cuando aún es de noche es el mayor acto de fe.",
  meaning: "Sé tú quien traiga la esperanza antes de que los demás la vean.",
  author: "Heiter",
  date: "Invierno del año 1027",
  category: "Esperanza",
  unlocked: true,
  tags: ["fe", "alba", "iniciativa"],
  difficulty: 1,
  createdAt: new Date('2025-12-05').toISOString()
},
{
  id: 124,
  page: 124,
  title: "El Peso de la Medalla de Madera",
  content: "Si fue ganada con honor, brilla más que el oro robado.",
  meaning: "La integridad personal vale más que cualquier reconocimiento falso.",
  author: "Stark",
  date: "Otoño del año 1027",
  category: "Valentía",
  unlocked: true,
  tags: ["integridad", "honor", "mérito"],
  difficulty: 3,
  createdAt: new Date('2025-12-12').toISOString()
},
{
  id: 125,
  page: 125,
  title: "La Teoría de la Telaraña en el Rocío",
  content: "La belleza es frágil, pero su estructura es capaz de resistir el viento.",
  meaning: "No confundas delicadeza con debilidad.",
  author: "Fern",
  date: "Primavera del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["belleza", "estructura", "resistencia"],
  difficulty: 2,
  createdAt: new Date('2025-12-19').toISOString()
},
{
  id: 126,
  page: 126,
  title: "El Hechizo para Leer en la Oscuridad",
  content: "A veces hay que cerrar los ojos para entender lo que las palabras callan.",
  meaning: "La comprensión profunda va más allá de la vista.",
  author: "Frieren",
  date: "Otoño del año 1027",
  category: "Introspección",
  unlocked: true,
  tags: ["comprensión", "silencio", "profundidad"],
  difficulty: 2,
  createdAt: new Date('2025-12-26').toISOString()
},
{
  id: 127,
  page: 127,
  title: "La Balada del Árbol Frutal",
  content: "Nadie tira piedras a un árbol que no da nada; tus problemas son señal de tu valor.",
  meaning: "La envidia ajena es a menudo un reconocimiento de tu éxito.",
  author: "Flamme",
  date: "Verano del año 1027",
  category: "Consuelo",
  unlocked: true,
  tags: ["éxito", "envidia", "valor"],
  difficulty: 1,
  createdAt: new Date('2026-01-02').toISOString()
},
{
  id: 128,
  page: 128,
  title: "El Juramento del Ancla en la Tormenta",
  content: "Estar quieto cuando todo se mueve es la forma más dura de luchar.",
  meaning: "La estabilidad emocional es una gran victoria en tiempos de caos.",
  author: "Eisen",
  date: "Invierno del año 1026",
  category: "Fortaleza",
  unlocked: true,
  tags: ["estabilidad", "templanza", "resistencia"],
  difficulty: 3,
  createdAt: new Date('2026-01-09').toISOString()
},
{
  id: 129,
  page: 129,
  title: "El Brillo de la Escama de Dragón",
  content: "Incluso lo más duro tiene un punto débil, y lo más débil tiene un punto de fuerza.",
  meaning: "Nada es absoluto; busca el equilibrio en todas las cosas.",
  author: "Fern",
  date: "Primavera del año 1027",
  category: "Estrategia",
  unlocked: true,
  tags: ["equilibrio", "análisis", "fortalezas"],
  difficulty: 2,
  createdAt: new Date('2026-01-16').toISOString()
},
{
  id: 130,
  page: 130,
  title: "La Bendición de la Mesa Puesta",
  content: "Un lugar vacío en la mesa es un espacio lleno de recuerdos queridos.",
  meaning: "Honrar a los que se fueron es mantenerles un sitio en nuestra vida.",
  notes: "Dedicado durante una cena de recuerdo",
  author: "Himmel",
  date: "Otoño del año 1027",
  category: "Recuerdo",
  unlocked: true,
  tags: ["honor", "ausencia", "memoria"],
  difficulty: 1,
  createdAt: new Date('2026-01-23').toISOString()
},
{
  id: 131,
  page: 131,
  title: "El Eco del Martillo sobre el Yunque",
  content: "El ritmo constante crea la forma; la prisa solo crea errores.",
  meaning: "La maestría es hija de la repetición rítmica.",
  author: "Stark",
  date: "Verano del año 1027",
  category: "Aprendizaje",
  unlocked: true,
  tags: ["ritmo", "práctica", "maestría"],
  difficulty: 2,
  createdAt: new Date('2026-01-30').toISOString()
},
{
  id: 132,
  page: 132,
  title: "La Oración del Álamo Plateado",
  content: "Cada hoja tiene dos caras; aprende a ver ambas antes de juzgar el árbol.",
  meaning: "La empatía requiere observar todas las facetas de una situación.",
  author: "Heiter",
  date: "Primavera del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["empatía", "perspectiva", "juicio"],
  difficulty: 2,
  createdAt: new Date('2026-02-06').toISOString()
},
{
  id: 133,
  page: 133,
  title: "El Hechizo para Hacer Florecer el Desierto",
  content: "La magia no crea la vida, solo despierta la semilla que ya estaba allí.",
  meaning: "Nuestra labor es facilitar el potencial que ya existe en otros.",
  author: "Frieren",
  date: "Verano del año 1028",
  category: "Enseñanza",
  unlocked: true,
  tags: ["potencial", "acompañamiento", "crecimiento"],
  difficulty: 2,
  createdAt: new Date('2026-02-13').toISOString()
},
{
  id: 134,
  page: 134,
  title: "El Secreto del Nido de Pájaro",
  content: "Hecho de sobras y ramas secas, es el lugar más seguro del mundo.",
  meaning: "Se puede construir algo grandioso con lo que otros consideran basura.",
  author: "Eisen",
  date: "Invierno del año 1026",
  category: "Sabiduría",
  unlocked: true,
  tags: ["ingenio", "reuso", "cuidado"],
  difficulty: 1,
  createdAt: new Date('2026-02-20').toISOString()
},
{
  id: 135,
  page: 135,
  title: "El Relato del Horizonte Infinito",
  content: "Nunca llegamos al final, solo a nuevos comienzos que parecen finales.",
  meaning: "La vida es un proceso continuo de descubrimiento.",
  author: "Himmel",
  date: "Primavera del año 1027",
  category: "Destino",
  unlocked: true,
  tags: ["ciclos", "descubrimiento", "rumbo"],
  difficulty: 2,
  createdAt: new Date('2026-02-27').toISOString()
},

{
  id: 136,
  page: 136,
  title: "Hechizo para volver agrias las uvas",
  content: "A veces, un poco de acidez es lo que hace que el dulzor posterior valga la pena.",
  meaning: "Disfruta de los contrastes de la vida; no todo debe ser perfecto.",
  author: "Frieren",
  date: "Verano del año 1028",
  category: "Sabiduría",
  unlocked: true,
  tags: ["contraste", "equilibrio", "sabor"],
  difficulty: 2,
  createdAt: new Date('2026-03-06').toISOString()
},
{
  id: 137,
  page: 137,
  title: "La Teoría del Zapato Izquierdo",
  content: "Un paso no es nada, pero es el único que te permite dar el siguiente.",
  meaning: "No te obsesiones con el destino; concéntrate en el paso actual.",
  author: "Stark",
  date: "Primavera del año 1027",
  category: "Perseverancia",
  unlocked: true,
  tags: ["paso", "presente", "proceso"],
  difficulty: 1,
  createdAt: new Date('2026-03-13').toISOString()
},
{
  id: 138,
  page: 138,
  title: "El Conjuro de la Ropa sin Arrugas",
  content: "Presentarse ante el mundo con orden es una forma de respeto hacia uno mismo.",
  meaning: "El cuidado personal es el reflejo del orden interno.",
  author: "Fern",
  date: "Otoño del año 1027",
  category: "Disciplina",
  unlocked: true,
  tags: ["cuidado", "orden", "respeto"],
  difficulty: 2,
  createdAt: new Date('2026-03-20').toISOString()
},
{
  id: 139,
  page: 139,
  title: "La Bendición de la Sopa Caliente",
  content: "El vapor que sube del cuenco es la oración más sincera de un estómago vacío.",
  meaning: "Agradece las necesidades básicas cubiertas.",
  notes: "Servida en una casa de retiro",
  author: "Heiter",
  date: "Invierno del año 1027",
  category: "Esperanza",
  unlocked: true,
  tags: ["gratitud", "hogar", "calor"],
  difficulty: 1,
  createdAt: new Date('2026-03-27').toISOString()
},
{
  id: 140,
  page: 140,
  title: "El Secreto del Acero Frío",
  content: "El metal no tiene sentimientos, pero recuerda la mano que lo forjó.",
  meaning: "Tus herramientas y obras llevan tu impronta personal.",
  author: "Eisen",
  date: "Otoño del año 1026",
  category: "Memoria",
  unlocked: true,
  tags: ["obra", "oficio", "huella"],
  difficulty: 2,
  createdAt: new Date('2026-04-03').toISOString()
},
{
  id: 141,
  page: 141,
  title: "La Balada del Espejo Roto",
  content: "En cada fragmento sigues estando tú, solo que ahora te ves desde más ángulos.",
  meaning: "Las crisis nos permiten conocernos de formas nuevas.",
  author: "Himmel",
  date: "Verano del año 1027",
  category: "Sanación",
  unlocked: true,
  tags: ["crisis", "autoconocimiento", "reencuadre"],
  difficulty: 2,
  createdAt: new Date('2026-04-10').toISOString()
},
{
  id: 142,
  page: 142,
  title: "Hechizo para quitar el óxido",
  content: "Lo que el tiempo desgasta, el cuidado puede restaurar si hay paciencia.",
  meaning: "Siempre hay oportunidad para redimirse o arreglar vínculos.",
  author: "Frieren",
  date: "Primavera del año 1028",
  category: "Cambio",
  unlocked: true,
  tags: ["restauración", "paciencia", "cuidado"],
  difficulty: 2,
  createdAt: new Date('2026-04-17').toISOString()
},
{
  id: 143,
  page: 143,
  title: "La Danza de la Polilla y la Vela",
  content: "Buscar la luz es un instinto; saber no quemarse es una maestría.",
  meaning: "Persigue tus sueños con inteligencia, no con ceguera.",
  author: "Flamme",
  date: "Otoño del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["luz", "prudencia", "sueños"],
  difficulty: 2,
  createdAt: new Date('2026-04-24').toISOString()
},
{
  id: 144,
  page: 144,
  title: "El Código del Viento Norte",
  content: "Cuando el viento sopla en contra, es cuando las alas deben trabajar más.",
  meaning: "La adversidad es el mejor entrenador de la voluntad.",
  author: "Fern",
  date: "Invierno del año 1026",
  category: "Fortaleza",
  unlocked: true,
  tags: ["adversidad", "entrenamiento", "voluntad"],
  difficulty: 3,
  createdAt: new Date('2026-05-01').toISOString()
},
{
  id: 145,
  page: 145,
  title: "El Susurro del Trébol de Tres Hojas",
  content: "No esperes a la suerte de cuatro para ser feliz con lo que tienes delante.",
  meaning: "La felicidad está en lo común, no en lo extraordinario.",
  author: "Himmel",
  date: "Primavera del año 1027",
  category: "Consuelo",
  unlocked: true,
  tags: ["felicidad", "sencillez", "presente"],
  difficulty: 1,
  createdAt: new Date('2026-05-08').toISOString()
},
{
  id: 146,
  page: 146,
  title: "La Invocación del Té de Hierbas",
  content: "Hay silencios que se disfrutan mejor con una taza entre las manos.",
  meaning: "Aprende a estar cómodo en la quietud compartida.",
  notes: "Preparado en una reunión de viajeros",
  author: "Stark",
  date: "Otoño del año 1027",
  category: "Introspección",
  unlocked: true,
  tags: ["silencio", "compañía", "calma"],
  difficulty: 2,
  createdAt: new Date('2026-05-15').toISOString()
},
{
  id: 147,
  page: 147,
  title: "El Relato de la Piedra del Camino",
  content: "Me han pisado mil héroes, pero sigo aquí viendo pasar el tiempo.",
  meaning: "La humildad de lo eterno supera a la gloria de lo efímero.",
  author: "Eisen",
  date: "Verano del año 1026",
  category: "Eterno",
  unlocked: true,
  tags: ["humildad", "eternidad", "testimonio"],
  difficulty: 2,
  createdAt: new Date('2026-05-22').toISOString()
},
{
  id: 148,
  page: 148,
  title: "Hechizo para encontrar objetos perdidos",
  content: "A menudo, lo que buscas no está escondido, simplemente has dejado de verlo.",
  meaning: "Cambia tu perspectiva para encontrar soluciones evidentes.",
  author: "Frieren",
  date: "Primavera del año 1028",
  category: "Sabiduría",
  unlocked: true,
  tags: ["perspectiva", "claridad", "búsqueda"],
  difficulty: 2,
  createdAt: new Date('2026-05-29').toISOString()
},
{
  id: 149,
  page: 149,
  title: "La Oración del Alba en el Bosque",
  content: "La luz no pide permiso para entrar, simplemente disipa las sombras.",
  meaning: "La verdad siempre termina por imponerse sobre la mentira.",
  notes: "Anotado en un claro al amanecer",
  author: "Heiter",
  date: "Primavera del año 1027",
  category: "Esperanza",
  unlocked: true,
  tags: ["verdad", "luz", "claridad"],
  difficulty: 1,
  createdAt: new Date('2026-06-05').toISOString()
},
{
  id: 150,
  page: 150,
  title: "El Peso de la Pluma de Fénix",
  content: "Lo más ligero puede ser lo más difícil de sostener si no tienes esperanza.",
  meaning: "El optimismo es una carga que requiere fuerza mental.",
  author: "Flamme",
  date: "Verano del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["optimismo", "fuerza", "renacer"],
  difficulty: 2,
  createdAt: new Date('2026-06-12').toISOString()
},
{
  id: 151,
  page: 151,
  title: "La Teoría de la Brújula Estropeada",
  content: "Si la aguja no gira, aprende a leer las estrellas por ti mismo.",
  meaning: "No dependas de herramientas si puedes confiar en tu instinto.",
  author: "Fern",
  date: "Otoño del año 1027",
  category: "Autonomía",
  unlocked: true,
  tags: ["instinto", "orientación", "criterio"],
  difficulty: 2,
  createdAt: new Date('2026-06-19').toISOString()
},
{
  id: 152,
  page: 152,
  title: "El Canto de la Lluvia sobre el Techo",
  content: "Cada gota es un recordatorio de que el mundo sigue vivo mientras duermes.",
  meaning: "Hay consuelo en saber que somos parte de algo más grande.",
  author: "Himmel",
  date: "Otoño del año 1027",
  category: "Consuelo",
  unlocked: true,
  tags: ["consuelo", "naturaleza", "pertenencia"],
  difficulty: 1,
  createdAt: new Date('2026-06-26').toISOString()
},
{
  id: 153,
  page: 153,
  title: "El Hechizo para que las Flores no se Marchiten",
  content: "La belleza eterna es una ilusión; la verdadera belleza es la que sabe morir.",
  meaning: "Acepta la finitud de las cosas para valorarlas de verdad.",
  author: "Frieren",
  date: "Verano del año 1028",
  category: "Tiempo",
  unlocked: true,
  tags: ["finitud", "aprecio", "impermanencia"],
  difficulty: 2,
  createdAt: new Date('2026-07-03').toISOString()
},
{
  id: 154,
  page: 154,
  title: "El Secreto del Escudo de Madera",
  content: "A veces, lo que cede es lo que mejor protege del impacto.",
  meaning: "La flexibilidad emocional previene que el alma se quiebre.",
  author: "Eisen",
  date: "Primavera del año 1027",
  category: "Fortaleza",
  unlocked: true,
  tags: ["flexibilidad", "protección", "temple"],
  difficulty: 3,
  createdAt: new Date('2026-07-10').toISOString()
},
{
  id: 155,
  page: 155,
  title: "La Balada del Aprendiz Eterno",
  content: "El día que creas que lo sabes todo, ese día habrás dejado de ser mago.",
  meaning: "La curiosidad es el motor de la verdadera magia.",
  author: "Flamme",
  date: "Otoño del año 1027",
  category: "Aprendizaje",
  unlocked: true,
  tags: ["curiosidad", "maestría", "humildad"],
  difficulty: 2,
  createdAt: new Date('2026-07-17').toISOString()
},
{
  id: 156,
  page: 156,
  title: "El Código del Lobo Solitario",
  content: "Aullar a la luna no te quita el hambre, pero te recuerda que tienes voz.",
  meaning: "Expresar tu dolor es necesario, aunque no lo solucione todo.",
  author: "Stark",
  date: "Invierno del año 1027",
  category: "Emociones",
  unlocked: true,
  tags: ["expresión", "dolor", "voz"],
  difficulty: 2,
  createdAt: new Date('2026-07-24').toISOString()
},
{
  id: 157,
  page: 157,
  title: "La Bendición del Pan con Miel",
  content: "Un pequeño lujo en el camino hace que las leguas parezcan metros.",
  meaning: "Date permiso para disfrutar de pequeñas recompensas.",
  author: "Frieren",
  date: "Primavera del año 1028",
  category: "Sanación",
  unlocked: true,
  tags: ["recompensa", "cuidado", "placer"],
  difficulty: 1,
  createdAt: new Date('2026-07-31').toISOString()
},
{
  id: 158,
  page: 158,
  title: "La Invocación del Humo de la Chimenea",
  content: "Donde hay humo, hay alguien esperando que vuelvas a casa.",
  meaning: "El hogar no es un lugar, es la gente que te espera.",
  author: "Himmel",
  date: "Invierno del año 1027",
  category: "Memoria",
  unlocked: true,
  tags: ["hogar", "espera", "afecto"],
  difficulty: 1,
  createdAt: new Date('2026-08-07').toISOString()
},
{
  id: 159,
  page: 159,
  title: "El Relato del Reloj sin Manecillas",
  content: "El tiempo no se mide, se vive en cada respiración consciente.",
  meaning: "Deja de contar los años y empieza a contar los momentos.",
  author: "Heiter",
  date: "Primavera del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["presencia", "conciencia", "tiempo"],
  difficulty: 2,
  createdAt: new Date('2026-08-14').toISOString()
},
{
  id: 160,
  page: 160,
  title: "Hechizo para que el pelo brille",
  content: "Incluso en la batalla más cruenta, no hay que perder la elegancia.",
  meaning: "Mantener la dignidad es una forma de resistencia.",
  author: "Fern",
  date: "Otoño del año 1027",
  category: "Disciplina",
  unlocked: true,
  tags: ["dignidad", "cuidado", "resistencia"],
  difficulty: 1,
  createdAt: new Date('2026-08-21').toISOString()
},
{
  id: 161,
  page: 161,
  title: "La Teoría de la Sombra Corta",
  content: "Al mediodía, tu sombra es pequeña porque estás justo donde debes estar.",
  meaning: "La paz llega cuando te alineas con tu propósito presente.",
  author: "Frieren",
  date: "Verano del año 1028",
  category: "Destino",
  unlocked: true,
  tags: ["propósito", "alineación", "paz"],
  difficulty: 2,
  createdAt: new Date('2026-08-28').toISOString()
},
{
  id: 162,
  page: 162,
  title: "El Secreto del Martillo de Plomo",
  content: "La fuerza sin dirección es solo ruido; la fuerza con peso es creación.",
  meaning: "Canaliza tu energía hacia objetivos constructivos.",
  author: "Eisen",
  date: "Primavera del año 1027",
  category: "Propósito",
  unlocked: true,
  tags: ["dirección", "energía", "creación"],
  difficulty: 2,
  createdAt: new Date('2026-09-04').toISOString()
},
{
  id: 163,
  page: 163,
  title: "La Oración del Puente de Cuerda",
  content: "Confía en los nudos que otros ataron antes que tú.",
  meaning: "La fe en los que nos precedieron nos permite avanzar.",
  author: "Heiter",
  date: "Otoño del año 1027",
  category: "Esperanza",
  unlocked: true,
  tags: ["confianza", "tradición", "avance"],
  difficulty: 1,
  createdAt: new Date('2026-09-11').toISOString()
},
{
  id: 164,
  page: 164,
  title: "El Brillo de la Luciérnaga en el Frasco",
  content: "La libertad brilla más que cualquier luz cautiva.",
  meaning: "No intentes poseer aquello que amas por su brillo.",
  author: "Himmel",
  date: "Verano del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["libertad", "amor", "desapego"],
  difficulty: 2,
  createdAt: new Date('2026-09-18').toISOString()
},
{
  id: 165,
  page: 165,
  title: "La Balada de la Capa Remendada",
  content: "Cada parche cuenta una historia de una tormenta que no pudo contigo.",
  meaning: "Tus cicatrices y arreglos son medallas de supervivencia.",
  author: "Stark",
  date: "Invierno del año 1027",
  category: "Fortaleza",
  unlocked: true,
  tags: ["cicatrices", "supervivencia", "honor"],
  difficulty: 3,
  createdAt: new Date('2026-09-25').toISOString()
},
{
  id: 166,
  page: 166,
  title: "El Código de la Cumbre Nevada",
  content: "Llegar arriba es opcional; bajar sano es obligatorio.",
  meaning: "Prioriza tu bienestar sobre la ambición ciega.",
  author: "Fern",
  date: "Invierno del año 1026",
  category: "Prudencia",
  unlocked: true,
  tags: ["seguridad", "bienestar", "ambición"],
  difficulty: 2,
  createdAt: new Date('2026-10-02').toISOString()
},
{
  id: 167,
  page: 167,
  title: "Hechizo para que el pan siempre esté tierno",
  content: "La suavidad es una virtud que derrota a la dureza del mundo.",
  meaning: "Trata a los demás con la ternura que esperas recibir.",
  author: "Frieren",
  date: "Primavera del año 1028",
  category: "Consuelo",
  unlocked: true,
  tags: ["ternura", "bondad", "cuidado"],
  difficulty: 1,
  createdAt: new Date('2026-10-09').toISOString()
},
{
  id: 168,
  page: 168,
  title: "La Teoría del Eco Lejano",
  content: "Lo que hagas hoy resonará en las montañas de los que nacerán mañana.",
  meaning: "Somos responsables del eco que dejamos en el futuro.",
  author: "Flamme",
  date: "Otoño del año 1027",
  category: "Eternidad",
  unlocked: true,
  tags: ["futuro", "eco", "responsabilidad"],
  difficulty: 2,
  createdAt: new Date('2026-10-16').toISOString()
},
{
  id: 169,
  page: 169,
  title: "El Susurro del Río en Verano",
  content: "El agua que hoy te refresca es la misma que ayer era hielo.",
  meaning: "Todo estado es transitorio; la calma volverá tras el frío.",
  author: "Eisen",
  date: "Verano del año 1026",
  category: "Sabiduría",
  unlocked: true,
  tags: ["transición", "ciclos", "calma"],
  difficulty: 2,
  createdAt: new Date('2026-10-23').toISOString()
},
{
  id: 170,
  page: 170,
  title: "El Relato de la Primera Estrella",
  content: "Ser el primero en brillar requiere el valor de aceptar la oscuridad.",
  meaning: "No esperes a que otros den el primer paso hacia lo bueno.",
  author: "Himmel",
  date: "Primavera del año 1027",
  category: "Valentía",
  unlocked: true,
  tags: ["iniciativa", "oscuridad", "coraje"],
  difficulty: 2,
  createdAt: new Date('2026-10-30').toISOString()
},

{
  id: 171,
  page: 171,
  title: "Hechizo para invocar un campo de flores",
  content: "La magia no es solo para la guerra; es para recordar por qué vale la pena luchar.",
  meaning: "Rodéate de belleza para no olvidar tu humanidad.",
  notes: "Inscrito en un prado después de la lluvia",
  author: "Frieren",
  date: "Primavera del año 1028",
  category: "Esperanza",
  unlocked: true,
  tags: ["belleza", "humanidad", "consuelo"],
  difficulty: 1,
  createdAt: new Date('2026-11-06').toISOString()
},
{
  id: 172,
  page: 172,
  title: "La Teoría de la Brisa en el Trigal",
  content: "El viento no busca mover el trigo, pero el trigo aprende a bailar con él.",
  meaning: "Adáptate a las circunstancias sin perder tu posición.",
  author: "Flamme",
  date: "Verano del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["adaptación", "equilibrio", "naturaleza"],
  difficulty: 2,
  createdAt: new Date('2026-11-13').toISOString()
},
{
  id: 173,
  page: 173,
  title: "El Código del Hierro Candente",
  content: "Solo cuando el metal está más rojo es cuando puede ser transformado.",
  meaning: "Los momentos de crisis son las mejores oportunidades de cambio.",
  author: "Eisen",
  date: "Invierno del año 1026",
  category: "Fortaleza",
  unlocked: true,
  tags: ["crisis", "cambio", "temple"],
  difficulty: 3,
  createdAt: new Date('2026-11-20').toISOString()
},
{
  id: 174,
  page: 174,
  title: "La Invocación del Sueño sin Pesadillas",
  content: "Para dormir en paz, entrega tus deudas al viento antes de cerrar los ojos.",
  meaning: "El perdón a uno mismo es la clave del descanso.",
  notes: "Anotado junto a una ventana abierta",
  author: "Heiter",
  date: "Otoño del año 1027",
  category: "Sanación",
  unlocked: true,
  tags: ["descanso", "perdón", "calma"],
  difficulty: 1,
  createdAt: new Date('2026-11-27').toISOString()
},
{
  id: 175,
  page: 175,
  title: "La Balada de la Sandalia Rota",
  content: "Un tropiezo no es una caída, es una invitación a mirar el suelo que pisas.",
  meaning: "Presta atención a los detalles de tu realidad inmediata.",
  author: "Stark",
  date: "Primavera del año 1027",
  category: "Aprendizaje",
  unlocked: true,
  tags: ["atención", "detalle", "práctica"],
  difficulty: 2,
  createdAt: new Date('2026-12-04').toISOString()
},
{
  id: 176,
  page: 176,
  title: "El Secreto del Tintero Lleno",
  content: "La historia no se escribe sola, requiere una mano que no tema mancharse.",
  meaning: "Sé el protagonista activo de tu propia vida.",
  author: "Himmel",
  date: "Verano del año 1027",
  category: "Destino",
  unlocked: true,
  tags: ["acción", "protagonismo", "decisión"],
  difficulty: 2,
  createdAt: new Date('2026-12-11').toISOString()
},
{
  id: 177,
  page: 177,
  title: "Hechizo para limpiar estatuas de piedra",
  content: "Quitar el polvo del pasado nos permite ver los ojos de quienes nos cuidaron.",
  meaning: "Mantén vivos los monumentos y recuerdos de tus ancestros.",
  notes: "Aplicado en una plaza antigua",
  author: "Frieren",
  date: "Otoño del año 1028",
  category: "Memoria",
  unlocked: true,
  tags: ["ancestros", "cuidado", "legado"],
  difficulty: 2,
  createdAt: new Date('2026-12-18').toISOString()
},
{
  id: 178,
  page: 178,
  title: "La Teoría del Nudo de Pescador",
  content: "Cuanto más tiras de un vínculo verdadero, más fuerte se aprieta la unión.",
  meaning: "Las dificultades fortalecen las amistades auténticas.",
  author: "Fern",
  date: "Primavera del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["amistad", "vínculo", "confianza"],
  difficulty: 2,
  createdAt: new Date('2026-12-25').toISOString()
},
{
  id: 179,
  page: 179,
  title: "El Susurro del Musgo en el Norte",
  content: "Crecer despacio no significa no avanzar; significa echar raíces profundas.",
  meaning: "Valora el crecimiento interno sobre la velocidad externa.",
  author: "Eisen",
  date: "Invierno del año 1026",
  category: "Paciencia",
  unlocked: true,
  tags: ["raíces", "proceso", "profundidad"],
  difficulty: 1,
  createdAt: new Date('2027-01-01').toISOString()
},
{
  id: 180,
  page: 180,
  title: "La Oración de la Lámpara de Aceite",
  content: "Consume tu energía iluminando el camino de otros, y nunca estarás a oscuras.",
  meaning: "La generosidad es una fuente de luz inagotable.",
  author: "Heiter",
  date: "Invierno del año 1027",
  category: "Esperanza",
  unlocked: true,
  tags: ["generosidad", "luz", "servicio"],
  difficulty: 1,
  createdAt: new Date('2027-01-08').toISOString()
},
{
  id: 181,
  page: 181,
  title: "El Relato del Águila y el Gorrión",
  content: "El cielo es el mismo para ambos; la diferencia está en cómo usan el viento.",
  meaning: "No envidies el talento ajeno, perfecciona tu propia técnica.",
  author: "Flamme",
  date: "Verano del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["técnica", "comparación", "superación"],
  difficulty: 2,
  createdAt: new Date('2027-01-15').toISOString()
},
{
  id: 182,
  page: 182,
  title: "Hechizo para que la leche no se derrame",
  content: "El control sobre lo pequeño es el ensayo para el dominio de lo grande.",
  meaning: "La maestría empieza en la atención a lo cotidiano.",
  author: "Fern",
  date: "Otoño del año 1027",
  category: "Disciplina",
  unlocked: true,
  tags: ["cotidiano", "detalle", "maestría"],
  difficulty: 1,
  createdAt: new Date('2027-01-22').toISOString()
},
{
  id: 183,
  page: 183,
  title: "La Balada del Escudo Abollado",
  content: "Cada marca es una vida que salvaste, incluyendo la tuya propia.",
  meaning: "No te avergüences de tus traumas; son pruebas de tu valor.",
  author: "Stark",
  date: "Primavera del año 1027",
  category: "Valentía",
  unlocked: true,
  tags: ["trauma", "valor", "resiliencia"],
  difficulty: 3,
  createdAt: new Date('2027-01-29').toISOString()
},
{
  id: 184,
  page: 184,
  title: "El Secreto de la Cumbre Nublada",
  content: "Que no veas la cima no significa que la montaña haya dejado de existir.",
  meaning: "Mantén la fe en tus metas aunque el camino se oscurezca.",
  author: "Himmel",
  date: "Invierno del año 1027",
  category: "Esperanza",
  unlocked: true,
  tags: ["metas", "fe", "claridad"],
  difficulty: 2,
  createdAt: new Date('2027-02-05').toISOString()
},
{
  id: 185,
  page: 185,
  title: "La Invocación de la Lluvia de Estrellas",
  content: "A veces el universo se rompe un poco solo para recordarnos que brilla.",
  meaning: "Encuentra lo sublime en los momentos de caos.",
  author: "Frieren",
  date: "Noche de cometas, 1028",
  category: "Eterno",
  unlocked: true,
  tags: ["sublime", "caos", "cielo"],
  difficulty: 2,
  createdAt: new Date('2027-02-12').toISOString()
},
{
  id: 186,
  page: 186,
  title: "El Código de la Brasa bajo la Nieve",
  content: "El calor más persistente es el que sabe ocultarse para no extinguirse.",
  meaning: "Protege tu pasión de las críticas del mundo exterior.",
  author: "Eisen",
  date: "Invierno del año 1026",
  category: "Sabiduría",
  unlocked: true,
  tags: ["pasión", "cuidado", "resguardo"],
  difficulty: 2,
  createdAt: new Date('2027-02-19').toISOString()
},
{
  id: 187,
  page: 187,
  title: "Hechizo para secar lágrimas rápidamente",
  content: "El consuelo no es borrar el dolor, sino despejar la vista para seguir caminando.",
  meaning: "Ayuda a otros a recuperar la perspectiva tras la tristeza.",
  author: "Heiter",
  date: "Primavera del año 1027",
  category: "Consuelo",
  unlocked: true,
  tags: ["consuelo", "perspectiva", "acompañamiento"],
  difficulty: 1,
  createdAt: new Date('2027-02-26').toISOString()
},
{
  id: 188,
  page: 188,
  title: "La Teoría del Reloj de Arena de Agua",
  content: "El tiempo fluye, no cae; no puedes atraparlo, pero puedes nadar en él.",
  meaning: "Vive el presente como un fluido, no como una cuenta atrás.",
  author: "Flamme",
  date: "Verano del año 1027",
  category: "Tiempo",
  unlocked: true,
  tags: ["presente", "flujo", "conciencia"],
  difficulty: 2,
  createdAt: new Date('2027-03-05').toISOString()
},
{
  id: 189,
  page: 189,
  title: "El Susurro del Caracol en el Muro",
  content: "Llevar tu hogar a cuestas te hace lento, pero te asegura que nunca estarás perdido.",
  meaning: "Tu identidad y valores son tu refugio en cualquier lugar.",
  author: "Stark",
  date: "Otoño del año 1027",
  category: "Autonomía",
  unlocked: true,
  tags: ["identidad", "valores", "refugio"],
  difficulty: 2,
  createdAt: new Date('2027-03-12').toISOString()
},
{
  id: 190,
  page: 190,
  title: "La Balada del Viejo Puente de Piedra",
  content: "Soportar el peso de los siglos es más heroico que ganar una batalla en un día.",
  meaning: "La constancia es la forma más elevada de heroísmo.",
  author: "Eisen",
  date: "Primavera del año 1027",
  category: "Fortaleza",
  unlocked: true,
  tags: ["constancia", "heroísmo", "resistencia"],
  difficulty: 3,
  createdAt: new Date('2027-03-19').toISOString()
},
{
  id: 191,
  page: 191,
  title: "Hechizo para ver a través de la niebla",
  content: "La niebla no oculta el mundo, solo pone a prueba tu memoria del camino.",
  meaning: "Confía en lo que has aprendido cuando las cosas se pongan confusas.",
  author: "Frieren",
  date: "Otoño del año 1028",
  category: "Sabiduría",
  unlocked: true,
  tags: ["memoria", "claridad", "confianza"],
  difficulty: 2,
  createdAt: new Date('2027-03-26').toISOString()
},
{
  id: 192,
  page: 192,
  title: "El Secreto de la Pluma de Escribano",
  content: "La palabra escrita es la única magia que permite hablar con los muertos.",
  meaning: "Lee para aprender de quienes ya no están aquí.",
  notes: "Escrito en un scriptorium antiguo",
  author: "Himmel",
  date: "Invierno del año 1027",
  category: "Memoria",
  unlocked: true,
  tags: ["lectura", "historia", "diálogo"],
  difficulty: 1,
  createdAt: new Date('2027-04-02').toISOString()
},
{
  id: 193,
  page: 193,
  title: "La Oración del Pan con Sal",
  content: "Lo básico es suficiente si se recibe con un corazón agradecido.",
  meaning: "La sencillez es el antídoto contra la codicia.",
  author: "Heiter",
  date: "Primavera del año 1027",
  category: "Esperanza",
  unlocked: true,
  tags: ["sencillez", "gratitud", "moderación"],
  difficulty: 1,
  createdAt: new Date('2027-04-09').toISOString()
},
{
  id: 194,
  page: 194,
  title: "El Código del Relámpago en la Botella",
  content: "Capturar el momento es imposible; lo que guardas es solo su reflejo.",
  meaning: "No intentes revivir el pasado, honra su recuerdo.",
  author: "Fern",
  date: "Verano del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["instante", "recuerdo", "aceptación"],
  difficulty: 2,
  createdAt: new Date('2027-04-16').toISOString()
},
{
  id: 195,
  page: 195,
  title: "La Teoría de la Sombra del Dragón",
  content: "Incluso la criatura más temible proyecta una sombra que no puede morder.",
  meaning: "No dejes que la apariencia del peligro te paralice.",
  author: "Stark",
  date: "Otoño del año 1027",
  category: "Valentía",
  unlocked: true,
  tags: ["percepción", "miedo", "coraje"],
  difficulty: 3,
  createdAt: new Date('2027-04-23').toISOString()
},
{
  id: 196,
  page: 196,
  title: "Hechizo para que las flores huelan a hogar",
  content: "El aroma es el puente más corto hacia los recuerdos de la infancia.",
  meaning: "Crea entornos que te den paz mental y seguridad.",
  author: "Frieren",
  date: "Primavera del año 1028",
  category: "Sanación",
  unlocked: true,
  tags: ["aroma", "hogar", "seguridad"],
  difficulty: 1,
  createdAt: new Date('2027-04-30').toISOString()
},
{
  id: 197,
  page: 197,
  title: "El Susurro de la Hoja de Arce",
  content: "Cambiar de color antes de caer es la forma que tiene la vida de decir adiós.",
  meaning: "Acepta la vejez y los finales con elegancia.",
  author: "Flamme",
  date: "Otoño del año 1027",
  category: "Eterno",
  unlocked: true,
  tags: ["cambio", "despedida", "elegancia"],
  difficulty: 2,
  createdAt: new Date('2027-05-07').toISOString()
},
{
  id: 198,
  page: 198,
  title: "La Balada del Martillo Olvidado",
  content: "Una herramienta sin uso se oxida; un alma sin propósito se apaga.",
  meaning: "Mantente activo y busca siempre algo que aprender.",
  author: "Eisen",
  date: "Verano del año 1027",
  category: "Propósito",
  unlocked: true,
  tags: ["propósito", "actividad", "aprendizaje"],
  difficulty: 2,
  createdAt: new Date('2027-05-14').toISOString()
},
{
  id: 199,
  page: 199,
  title: "El Secreto de la Perla en la Ostra",
  content: "La belleza nace de la irritación; el arte nace de lo que nos incomoda.",
  meaning: "Usa tus dificultades para crear algo valioso.",
  author: "Fern",
  date: "Primavera del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["belleza", "incomodidad", "creación"],
  difficulty: 2,
  createdAt: new Date('2027-05-21').toISOString()
},
{
  id: 200,
  page: 200,
  title: "El Hito de las Dos Millas",
  content: "Si has llegado hasta aquí, ya tienes la fuerza para llegar al final.",
  meaning: "Celebra tus logros intermedios para renovar energías.",
  notes: "Marcado en un mojón de camino",
  author: "Himmel",
  date: "Otoño del año 1027",
  category: "Destino",
  unlocked: true,
  tags: ["logro", "energía", "continuidad"],
  difficulty: 2,
  createdAt: new Date('2027-05-28').toISOString()
},
{
  id: 201,
  page: 201,
  title: "Hechizo para calmar el oleaje",
  content: "La paz no es la ausencia de olas, sino la capacidad de flotar sobre ellas.",
  meaning: "Encuentra la serenidad interna en medio del caos externo.",
  author: "Frieren",
  date: "Verano del año 1028",
  category: "Sanación",
  unlocked: true,
  tags: ["serenidad", "equilibrio", "caos"],
  difficulty: 1,
  createdAt: new Date('2027-06-04').toISOString()
},
{
  id: 202,
  page: 202,
  title: "La Teoría del Eco en el Valle",
  content: "Lo que siembras en palabras, el mundo te lo devuelve en hechos.",
  meaning: "Sé cuidadoso con lo que prometes y lo que dices.",
  author: "Heiter",
  date: "Primavera del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["palabras", "coherencia", "ética"],
  difficulty: 2,
  createdAt: new Date('2027-06-11').toISOString()
},
{
  id: 203,
  page: 203,
  title: "El Código de la Armadura de Cuero",
  content: "A veces la ligereza protege más que el acero si te permite esquivar el golpe.",
  meaning: "La agilidad mental es tan importante como la resistencia física.",
  author: "Stark",
  date: "Verano del año 1027",
  category: "Estrategia",
  unlocked: true,
  tags: ["agilidad", "estrategia", "adaptación"],
  difficulty: 2,
  createdAt: new Date('2027-06-18').toISOString()
},
{
  id: 204,
  page: 204,
  title: "La Oración del Atardecer Rojo",
  content: "Que el sol se oculte no significa que haya dejado de brillar para otros.",
  meaning: "Ten una perspectiva global y menos egoísta del mundo.",
  author: "Himmel",
  date: "Otoño del año 1027",
  category: "Esperanza",
  unlocked: true,
  tags: ["perspectiva", "humildad", "mundo"],
  difficulty: 1,
  createdAt: new Date('2027-06-25').toISOString()
},
{
  id: 205,
  page: 205,
  title: "El Hechizo para Encontrar el Norte en un Bosque Mágico",
  content: "Cuando todos los árboles se mueven, mira hacia la estrella que nunca baila.",
  meaning: "Mantén tus valores fijos cuando todo lo demás sea incierto.",
  notes: "Anotado tras cruzar un bosque cambiante",
  author: "Frieren",
  date: "Primavera del año 1028",
  category: "Sabiduría",
  unlocked: true,
  tags: ["valores", "orientación", "constancia"],
  difficulty: 2,
  createdAt: new Date('2027-07-02').toISOString()
},

{
  id: 206,
  page: 206,
  title: "El Hechizo del Agua Tibia",
  content: "Ni tan fría que hiele el alma, ni tan caliente que queme la piel; el equilibrio es vida.",
  meaning: "Busca el término medio en tus emociones.",
  author: "Frieren",
  date: "Primavera del año 1028",
  category: "Sanación",
  unlocked: true,
  tags: ["equilibrio", "templanza", "cuidado"],
  difficulty: 1,
  createdAt: new Date('2027-07-09').toISOString()
},
{
  id: 207,
  page: 207,
  title: "La Teoría de la Llama Azul",
  content: "El fuego más intenso es el que menos ruido hace al arder.",
  meaning: "La pasión silenciosa suele ser la más duradera y potente.",
  author: "Flamme",
  date: "Otoño del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["pasión", "silencio", "durabilidad"],
  difficulty: 2,
  createdAt: new Date('2027-07-16').toISOString()
},
{
  id: 208,
  page: 208,
  title: "El Código del Escudo Espejo",
  content: "No luches contra el odio; deja que se refleje y regrese a su origen.",
  meaning: "No te dejes contaminar por la negatividad ajena.",
  author: "Fern",
  date: "Verano del año 1027",
  category: "Estrategia",
  unlocked: true,
  tags: ["negatividad", "defensa", "claridad"],
  difficulty: 2,
  createdAt: new Date('2027-07-23').toISOString()
},
{
  id: 209,
  page: 209,
  title: "La Balada del Panadero de Aldea",
  content: "Amasar requiere tiempo; la prisa solo arruina la levadura.",
  meaning: "Hay procesos que no pueden ser acelerados sin dañarlos.",
  author: "Stark",
  date: "Primavera del año 1027",
  category: "Paciencia",
  unlocked: true,
  tags: ["proceso", "paciencia", "cuidado"],
  difficulty: 1,
  createdAt: new Date('2027-07-30').toISOString()
},
{
  id: 210,
  page: 210,
  title: "El Secreto del Manuscrito en Blanco",
  content: "Lo que no está escrito es la parte más importante de cualquier historia.",
  meaning: "Lo que vivimos en silencio es lo que más nos define.",
  author: "Himmel",
  date: "Otoño del año 1027",
  category: "Memoria",
  unlocked: true,
  tags: ["silencio", "identidad", "historia"],
  difficulty: 2,
  createdAt: new Date('2027-08-06').toISOString()
},
{
  id: 211,
  page: 211,
  title: "La Oración de la Raíz Expuesta",
  content: "Ser vulnerable no es debilidad; es tener el valor de mostrar tu origen.",
  meaning: "La honestidad sobre tus miedos te hace más fuerte.",
  notes: "Escrito al pie de un árbol desarraigado",
  author: "Heiter",
  date: "Invierno del año 1027",
  category: "Sanación",
  unlocked: true,
  tags: ["vulnerabilidad", "honestidad", "fortaleza"],
  difficulty: 2,
  createdAt: new Date('2027-08-13').toISOString()
},
{
  id: 212,
  page: 212,
  title: "Hechizo para endulzar el té amargo",
  content: "A veces, un pequeño gesto cambia la perspectiva de todo un día.",
  meaning: "La amabilidad es una magia poderosa y sencilla.",
  author: "Frieren",
  date: "Primavera del año 1028",
  category: "Consuelo",
  unlocked: true,
  tags: ["amabilidad", "gestos", "consuelo"],
  difficulty: 1,
  createdAt: new Date('2027-08-20').toISOString()
},
{
  id: 213,
  page: 213,
  title: "La Teoría de la Sombra del Pino",
  content: "El árbol no sabe que da sombra; simplemente es fiel a su naturaleza.",
  meaning: "Haz el bien por instinto, no por reconocimiento.",
  author: "Eisen",
  date: "Verano del año 1026",
  category: "Sabiduría",
  unlocked: true,
  tags: ["bondad", "naturaleza", "instinto"],
  difficulty: 2,
  createdAt: new Date('2027-08-27').toISOString()
},
{
  id: 214,
  page: 214,
  title: "El Susurro de la Moneda de Cobre",
  content: "En manos de un mendigo, el cobre brilla más que el oro en manos de un rey.",
  meaning: "El valor de las cosas depende de la necesidad del que las recibe.",
  author: "Himmel",
  date: "Primavera del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["valor", "necesidad", "contexto"],
  difficulty: 2,
  createdAt: new Date('2027-09-03').toISOString()
},
{
  id: 215,
  page: 215,
  title: "El Código del Horizonte de Sucesos",
  content: "Mañana es un lugar donde nunca llegas; solo existe el paso que das hoy.",
  meaning: "Deja de postergar tu felicidad para un futuro incierto.",
  author: "Flamme",
  date: "Otoño del año 1027",
  category: "Tiempo",
  unlocked: true,
  tags: ["presente", "postergación", "vida"],
  difficulty: 2,
  createdAt: new Date('2027-09-10').toISOString()
},
{
  id: 216,
  page: 216,
  title: "La Balada de la Capa de Viaje",
  content: "Te protege de la lluvia, pero también guarda el polvo de mil caminos.",
  meaning: "Valora tus experiencias, incluso las que te ensuciaron las manos.",
  author: "Stark",
  date: "Verano del año 1027",
  category: "Fortaleza",
  unlocked: true,
  tags: ["experiencia", "camino", "resistencia"],
  difficulty: 2,
  createdAt: new Date('2027-09-17').toISOString()
},
{
  id: 217,
  page: 217,
  title: "Hechizo para encontrar leña seca",
  content: "La calidez del mañana depende de lo que seas capaz de buscar hoy.",
  meaning: "La prevención es la base de la tranquilidad.",
  author: "Frieren",
  date: "Primavera del año 1028",
  category: "Sabiduría",
  unlocked: true,
  tags: ["prevención", "previsión", "hogar"],
  difficulty: 1,
  createdAt: new Date('2027-09-24').toISOString()
},
{
  id: 218,
  page: 218,
  title: "El Secreto del Pescador de Perlas",
  content: "Hay que aguantar la respiración y bajar al fondo para hallar lo valioso.",
  meaning: "Las grandes verdades requieren esfuerzo y sacrificio.",
  author: "Eisen",
  date: "Verano del año 1026",
  category: "Esfuerzo",
  unlocked: true,
  tags: ["sacrificio", "búsqueda", "verdad"],
  difficulty: 2,
  createdAt: new Date('2027-10-01').toISOString()
},
{
  id: 219,
  page: 219,
  title: "La Oración del Camino de Piedra",
  content: "Si la piedra te hace daño, agradécele por recordarte que estás caminando.",
  meaning: "El dolor es una señal de que sigues vivo y avanzando.",
  author: "Heiter",
  date: "Primavera del año 1027",
  category: "Esperanza",
  unlocked: true,
  tags: ["dolor", "avance", "vida"],
  difficulty: 1,
  createdAt: new Date('2027-10-08').toISOString()
},
{
  id: 220,
  page: 220,
  title: "El Brillo de la Armadura de Desfile",
  content: "Una armadura que nunca ha sido golpeada es solo un disfraz.",
  meaning: "El carácter se prueba en el conflicto, no en la paz cómoda.",
  author: "Stark",
  date: "Otoño del año 1027",
  category: "Valentía",
  unlocked: true,
  tags: ["conflicto", "carácter", "prueba"],
  difficulty: 3,
  createdAt: new Date('2027-10-15').toISOString()
},
{
  id: 221,
  page: 221,
  title: "Hechizo para silenciar los grillos",
  content: "A veces el silencio absoluto es necesario para escuchar el latido del mundo.",
  meaning: "Busca momentos de desconexión total para recalibrar tu alma.",
  author: "Frieren",
  date: "Verano del año 1028",
  category: "Introspección",
  unlocked: true,
  tags: ["silencio", "desconexión", "calibrar"],
  difficulty: 2,
  createdAt: new Date('2027-10-22').toISOString()
},
{
  id: 222,
  page: 222,
  title: "La Teoría del Vuelo del Cuervo",
  content: "El camino más corto no siempre es el más sabio; a veces hay que rodear.",
  meaning: "La eficiencia no debe sacrificar la seguridad o el aprendizaje.",
  author: "Fern",
  date: "Otoño del año 1027",
  category: "Prudencia",
  unlocked: true,
  tags: ["seguridad", "aprendizaje", "eficiencia"],
  difficulty: 2,
  createdAt: new Date('2027-10-29').toISOString()
},
{
  id: 223,
  page: 223,
  title: "El Susurro de la Flor de Cactus",
  content: "Incluso en el lugar más árido, la vida encuentra una forma de ser bella.",
  meaning: "No hay circunstancia tan mala que no permita un acto de bondad.",
  author: "Himmel",
  date: "Primavera del año 1027",
  category: "Esperanza",
  unlocked: true,
  tags: ["bondad", "belleza", "adversidad"],
  difficulty: 1,
  createdAt: new Date('2027-11-05').toISOString()
},
{
  id: 224,
  page: 224,
  title: "El Código de la Espada de Entrenamiento",
  content: "Duele más el golpe de madera porque te enseña lo que la de acero no perdona.",
  meaning: "Los errores pequeños son lecciones baratas que evitan desastres grandes.",
  author: "Stark",
  date: "Verano del año 1027",
  category: "Aprendizaje",
  unlocked: true,
  tags: ["error", "lección", "prevención"],
  difficulty: 2,
  createdAt: new Date('2027-11-12').toISOString()
},
{
  id: 225,
  page: 225,
  title: "La Balada del Viejo Reloj de Torre",
  content: "Aunque sus agujas se detengan, el tiempo sigue fluyendo entre sus engranajes.",
  meaning: "Las leyes del universo son independientes de nuestras herramientas.",
  author: "Eisen",
  date: "Invierno del año 1026",
  category: "Eterno",
  unlocked: true,
  tags: ["tiempo", "leyes", "constancia"],
  difficulty: 2,
  createdAt: new Date('2027-11-19').toISOString()
},
{
  id: 226,
  page: 226,
  title: "Hechizo para que la ropa huela a sol",
  content: "Llevar la luz contigo es la mejor forma de combatir la humedad del invierno.",
  meaning: "Mantén una actitud positiva para protegerte de la depresión.",
  author: "Frieren",
  date: "Primavera del año 1028",
  category: "Sanación",
  unlocked: true,
  tags: ["luz", "actitud", "bienestar"],
  difficulty: 1,
  createdAt: new Date('2027-11-26').toISOString()
},
{
  id: 227,
  page: 227,
  title: "El Secreto del Eco en el Valle",
  content: "Si no te gusta lo que escuchas, cambia lo que estás gritando.",
  meaning: "Eres responsable de las reacciones que provocas en los demás.",
  author: "Heiter",
  date: "Otoño del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["responsabilidad", "eco", "actitud"],
  difficulty: 2,
  createdAt: new Date('2027-12-03').toISOString()
},
{
  id: 228,
  page: 228,
  title: "La Oración de la Barca en el Lago",
  content: "El agua te sostiene, pero tú decides hacia dónde apunta el remo.",
  meaning: "La vida da oportunidades, pero tú pones la dirección.",
  author: "Flamme",
  date: "Primavera del año 1027",
  category: "Destino",
  unlocked: true,
  tags: ["dirección", "decisión", "oportunidad"],
  difficulty: 2,
  createdAt: new Date('2027-12-10').toISOString()
},
{
  id: 229,
  page: 229,
  title: "El Código del Mirlo Solitario",
  content: "Cantar para nadie es la forma más pura de cantar.",
  meaning: "Haz lo que amas por el placer de hacerlo, no por la audiencia.",
  author: "Himmel",
  date: "Verano del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["vocación", "pureza", "placer"],
  difficulty: 2,
  createdAt: new Date('2027-12-17').toISOString()
},
{
  id: 230,
  page: 230,
  title: "La Teoría de la Montaña Rusa",
  content: "Para subir hay que esforzarse; para bajar solo hay que soltarse.",
  meaning: "Es más fácil destruir que construir; elige el camino difícil.",
  author: "Eisen",
  date: "Otoño del año 1027",
  category: "Fortaleza",
  unlocked: true,
  tags: ["esfuerzo", "construcción", "elección"],
  difficulty: 3,
  createdAt: new Date('2027-12-24').toISOString()
},
{
  id: 231,
  page: 231,
  title: "Hechizo para alejar la niebla matutina",
  content: "No puedes forzar el día, pero puedes preparar tu vista para el sol.",
  meaning: "La paciencia activa es mejor que la espera pasiva.",
  author: "Fern",
  date: "Verano del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["paciencia", "preparación", "claridad"],
  difficulty: 2,
  createdAt: new Date('2027-12-31').toISOString()
},
{
  id: 232,
  page: 232,
  title: "El Susurro de la Arena en el Desierto",
  content: "Individualmente somos nada, pero juntos enterramos ciudades.",
  meaning: "No subestimes el poder de la acción colectiva.",
  author: "Flamme",
  date: "Primavera del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["colectivo", "unidad", "impacto"],
  difficulty: 2,
  createdAt: new Date('2028-01-07').toISOString()
},
{
  id: 233,
  page: 233,
  title: "La Balada de la Jarra de Cerveza",
  content: "Se llena para vaciarse; tal como el corazón debe vaciarse para volver a amar.",
  meaning: "No temas perder tus sentimientos; se renovarán.",
  author: "Heiter",
  date: "Otoño del año 1027",
  category: "Consuelo",
  unlocked: true,
  tags: ["corazón", "renovación", "consuelo"],
  difficulty: 1,
  createdAt: new Date('2028-01-14').toISOString()
},
{
  id: 234,
  page: 234,
  title: "El Secreto del Nudo que no se Suelta",
  content: "El nudo más fuerte es el que se hizo con confianza mutua.",
  meaning: "La lealtad es el vínculo más difícil de romper.",
  notes: "Anotado en una cuerda de marinero",
  author: "Himmel",
  date: "Verano del año 1027",
  category: "Amistad",
  unlocked: true,
  tags: ["lealtad", "confianza", "vínculo"],
  difficulty: 2,
  createdAt: new Date('2028-01-21').toISOString()
},
{
  id: 235,
  page: 235,
  title: "Hechizo para que el fuego no chispee",
  content: "La calma en el hogar evita que las palabras pequeñas causen grandes incendios.",
  meaning: "Controla tu temperamento en la intimidad de tus relaciones.",
  author: "Frieren",
  date: "Primavera del año 1028",
  category: "Sanación",
  unlocked: true,
  tags: ["calma", "hogar", "templanza"],
  difficulty: 1,
  createdAt: new Date('2028-01-28').toISOString()
},
{
  id: 236,
  page: 236,
  title: "La Teoría del Peso de la Corona",
  content: "No es el metal lo que pesa, sino la mirada de quienes confían en ti.",
  meaning: "La responsabilidad es la verdadera carga del liderazgo.",
  author: "Eisen",
  date: "Invierno del año 1026",
  category: "Sabiduría",
  unlocked: true,
  tags: ["liderazgo", "responsabilidad", "confianza"],
  difficulty: 2,
  createdAt: new Date('2028-02-04').toISOString()
},
{
  id: 237,
  page: 237,
  title: "El Código de la Pluma en la Tormenta",
  content: "Sé ligero para no romperte, pero mantén tu eje para no perderte.",
  meaning: "La adaptabilidad sin perder la esencia es la clave de la supervivencia.",
  author: "Fern",
  date: "Primavera del año 1027",
  category: "Fortaleza",
  unlocked: true,
  tags: ["adaptabilidad", "esencia", "supervivencia"],
  difficulty: 2,
  createdAt: new Date('2028-02-11').toISOString()
},
{
  id: 238,
  page: 238,
  title: "La Oración del Viajero que Regresa",
  content: "El hogar no es donde empezaste, sino donde alguien se alegra de verte entrar.",
  meaning: "Los vínculos definen nuestro sentido de pertenencia.",
  author: "Himmel",
  date: "Verano del año 1027",
  category: "Recuerdo",
  unlocked: true,
  tags: ["hogar", "pertenencia", "vínculos"],
  difficulty: 1,
  createdAt: new Date('2028-02-18').toISOString()
},
{
  id: 239,
  page: 239,
  title: "El Hechizo para Ver el Color del Viento",
  content: "Para entender el mundo, a veces hay que imaginar lo que es invisible.",
  meaning: "La empatía y la intuición ven lo que los ojos ignoran.",
  author: "Frieren",
  date: "Primavera del año 1028",
  category: "Sabiduría",
  unlocked: true,
  tags: ["empatía", "intuición", "imaginación"],
  difficulty: 2,
  createdAt: new Date('2028-02-25').toISOString()
},
{
  id: 240,
  page: 240,
  title: "El Relato del Fin del Horizonte",
  content: "Cuando llegas al borde del mundo, descubres que el mundo es un círculo.",
  meaning: "Lo que das siempre termina volviendo a ti.",
  notes: "Escrito en un acantilado al atardecer",
  author: "Flamme",
  date: "Otoño del año 1027",
  category: "Eterno",
  unlocked: true,
  tags: ["ciclos", "retorno", "karma"],
  difficulty: 2,
  createdAt: new Date('2028-03-03').toISOString()
},

{
  id: 241,
  page: 241,
  title: "El Hechizo para Germinar Semillas de Invierno",
  content: "Incluso bajo el hielo, la vida está soñando con el sol.",
  meaning: "La esperanza es una fuerza subterránea que nunca se apaga.",
  notes: "Inscrito en un invernadero improvisado",
  author: "Frieren",
  date: "Invierno del año 1028",
  category: "Esperanza",
  unlocked: true,
  tags: ["germinación", "esperanza", "invierno"],
  difficulty: 1,
  createdAt: new Date('2028-03-10').toISOString()
},
{
  id: 242,
  page: 242,
  title: "La Teoría del Peso del Escudo",
  content: "El escudo no es para esconderse, sino para crear un espacio donde otros estén a salvo.",
  meaning: "La protección es un acto de amor, no de cobardía.",
  author: "Eisen",
  date: "Otoño del año 1026",
  category: "Sabiduría",
  unlocked: true,
  tags: ["protección", "amor", "defensa"],
  difficulty: 2,
  createdAt: new Date('2028-03-17').toISOString()
},
{
  id: 243,
  page: 243,
  title: "El Código del Reloj de Sombra",
  content: "No envidies el mediodía ajeno; tu tarde también tendrá su propia luz dorada.",
  meaning: "Cada persona tiene su propio tiempo para brillar.",
  author: "Flamme",
  date: "Primavera del año 1027",
  category: "Tiempo",
  unlocked: true,
  tags: ["tiempo", "brillo", "ciclos"],
  difficulty: 2,
  createdAt: new Date('2028-03-24').toISOString()
},
{
  id: 244,
  page: 244,
  title: "La Balada del Herrero Ciego",
  content: "Se puede dar forma a la realidad sin verla, si conoces el ritmo del golpe.",
  meaning: "La experiencia sustituye a la vista cuando el camino es oscuro.",
  author: "Stark",
  date: "Otoño del año 1027",
  category: "Aprendizaje",
  unlocked: true,
  tags: ["experiencia", "ritmo", "oficio"],
  difficulty: 2,
  createdAt: new Date('2028-03-31').toISOString()
},
{
  id: 245,
  page: 245,
  title: "El Secreto del Agua de Glaciar",
  content: "Cuanto más pura es el agua, más frío debe ser el origen que la forjó.",
  meaning: "La integridad a menudo nace de experiencias austeras.",
  author: "Fern",
  date: "Invierno del año 1026",
  category: "Sabiduría",
  unlocked: true,
  tags: ["pureza", "origen", "integridad"],
  difficulty: 2,
  createdAt: new Date('2028-04-07').toISOString()
},
{
  id: 246,
  page: 246,
  title: "Hechizo para calentar el calzado húmedo",
  content: "Caminar con pies calientes permite que la mente viaje más lejos.",
  meaning: "No descuides tu bienestar físico si quieres alcanzar metas altas.",
  author: "Frieren",
  date: "Invierno del año 1028",
  category: "Sanación",
  unlocked: true,
  tags: ["cuidado", "bienestar", "camino"],
  difficulty: 1,
  createdAt: new Date('2028-04-14').toISOString()
},
{
  id: 247,
  page: 247,
  title: "La Oración de la Montaña que se Desmorona",
  content: "Incluso lo que parece eterno está cambiando; acepta el derrumbe como un renacer.",
  meaning: "No temas a los grandes cambios estructurales en tu vida.",
  author: "Heiter",
  date: "Otoño del año 1027",
  category: "Cambio",
  unlocked: true,
  tags: ["cambio", "renacer", "estructura"],
  difficulty: 2,
  createdAt: new Date('2028-04-21').toISOString()
},
{
  id: 248,
  page: 248,
  title: "El Susurro del Trigo en la Hoz",
  content: "Dar alimento al mundo es la forma más noble de terminar un ciclo.",
  meaning: "El sacrificio con propósito otorga sentido al final de las cosas.",
  author: "Himmel",
  date: "Verano del año 1027",
  category: "Destino",
  unlocked: true,
  tags: ["ciclo", "propósito", "cosecha"],
  difficulty: 2,
  createdAt: new Date('2028-04-28').toISOString()
},
{
  id: 249,
  page: 249,
  title: "La Teoría de la Flecha en el Viento",
  content: "No luches contra la ráfaga; úsala para que tu trayectoria sea más audaz.",
  meaning: "Aprovecha los factores externos, incluso los que parecen obstáculos.",
  author: "Fern",
  date: "Primavera del año 1027",
  category: "Estrategia",
  unlocked: true,
  tags: ["viento", "trayectoria", "aprovechar"],
  difficulty: 2,
  createdAt: new Date('2028-05-05').toISOString()
},
{
  id: 250,
  page: 250,
  title: "El Código de la Brasa Olvidada",
  content: "Una pequeña chispa en la ceniza es suficiente para reconstruir el fuego del hogar.",
  meaning: "Siempre hay un núcleo de fuerza dentro de ti para empezar de nuevo.",
  author: "Stark",
  date: "Invierno del año 1027",
  category: "Fortaleza",
  unlocked: true,
  tags: ["reinicio", "hogar", "fuerza"],
  difficulty: 2,
  createdAt: new Date('2028-05-12').toISOString()
},
{
  id: 251,
  page: 251,
  title: "Hechizo para que las flores de cristal no se rompan",
  content: "La fragilidad es una forma de belleza que exige atención y ternura.",
  meaning: "Cuida tus relaciones más delicadas con esmero constante.",
  author: "Frieren",
  date: "Primavera del año 1028",
  category: "Consuelo",
  unlocked: true,
  tags: ["fragilidad", "ternura", "cuidado"],
  difficulty: 1,
  createdAt: new Date('2028-05-19').toISOString()
},
{
  id: 252,
  page: 252,
  title: "La Balada del Mástil de Roble",
  content: "En alta mar, el árbol recuerda su raíz para no quebrarse ante la ola.",
  meaning: "Tus orígenes son tu ancla cuando la vida se vuelve turbulenta.",
  author: "Eisen",
  date: "Verano del año 1026",
  category: "Sabiduría",
  unlocked: true,
  tags: ["raíces", "temple", "tormenta"],
  difficulty: 2,
  createdAt: new Date('2028-05-26').toISOString()
},
{
  id: 253,
  page: 253,
  title: "El Secreto de la Luciérnaga de Día",
  content: "No brilla porque no la vean, sino porque su luz no compite con el sol.",
  meaning: "Ten confianza en tu valor incluso cuando nadie te preste atención.",
  author: "Himmel",
  date: "Otoño del año 1027",
  category: "Autoestima",
  unlocked: true,
  tags: ["valor", "confianza", "luz"],
  difficulty: 1,
  createdAt: new Date('2028-06-02').toISOString()
},
{
  id: 254,
  page: 254,
  title: "La Invocación del Aire de Montaña",
  content: "Respira la altura para recordar que tus problemas son pequeños desde arriba.",
  meaning: "Busca perspectiva para reducir el peso de tus preocupaciones.",
  notes: "Anotado en un paso de alta montaña",
  author: "Heiter",
  date: "Primavera del año 1027",
  category: "Sanación",
  unlocked: true,
  tags: ["perspectiva", "respiro", "claridad"],
  difficulty: 1,
  createdAt: new Date('2028-06-09').toISOString()
},
{
  id: 255,
  page: 255,
  title: "El Código del Espejo de Agua",
  content: "Si tiras una piedra, el reflejo desaparece; aprende a no perturbar tu propia paz.",
  meaning: "Evita reacciones impulsivas que nublen tu juicio.",
  author: "Flamme",
  date: "Otoño del año 1027",
  category: "Introspección",
  unlocked: true,
  tags: ["paz", "impulso", "claridad"],
  difficulty: 2,
  createdAt: new Date('2028-06-16').toISOString()
},
{
  id: 256,
  page: 256,
  title: "Hechizo para quitar manchas de tinta",
  content: "Los errores del pasado pueden borrarse si tienes el solvente adecuado.",
  meaning: "El perdón es el solvente que limpia las manchas de la historia personal.",
  author: "Frieren",
  date: "Verano del año 1028",
  category: "Sabiduría",
  unlocked: true,
  tags: ["perdón", "errores", "limpieza"],
  difficulty: 2,
  createdAt: new Date('2028-06-23').toISOString()
},
{
  id: 257,
  page: 257,
  title: "La Teoría del Paso del Gigante",
  content: "Lo que para uno es un abismo, para otro es solo un peldaño.",
  meaning: "Tu capacidad depende de cuánto hayas crecido internamente.",
  author: "Eisen",
  date: "Primavera del año 1027",
  category: "Fortaleza",
  unlocked: true,
  tags: ["crecimiento", "perspectiva", "capacidad"],
  difficulty: 2,
  createdAt: new Date('2028-06-30').toISOString()
},
{
  id: 258,
  page: 258,
  title: "El Susurro de la Hoja de Sauce",
  content: "Llorar hacia el río es una forma de devolverle a la tierra lo que te sobra.",
  meaning: "Desahogar las penas es un acto natural y necesario.",
  author: "Himmel",
  date: "Primavera del año 1027",
  category: "Consuelo",
  unlocked: true,
  tags: ["desahogo", "naturaleza", "alivio"],
  difficulty: 1,
  createdAt: new Date('2028-07-07').toISOString()
},
{
  id: 259,
  page: 259,
  title: "La Balada de la Espada de Madera",
  content: "El primer golpe no busca herir, busca que aprendas a no ser golpeado.",
  meaning: "Valora los inicios humildes y las lecciones sin riesgo.",
  author: "Stark",
  date: "Otoño del año 1027",
  category: "Aprendizaje",
  unlocked: true,
  tags: ["principio", "práctica", "seguridad"],
  difficulty: 1,
  createdAt: new Date('2028-07-14').toISOString()
},
{
  id: 260,
  page: 260,
  title: "El Código de la Estrella del Norte",
  content: "No se mueve para que tú puedas encontrar tu camino.",
  meaning: "Sé una persona de principios fijos para que otros puedan confiar en ti.",
  author: "Fern",
  date: "Invierno del año 1026",
  category: "Sabiduría",
  unlocked: true,
  tags: ["principios", "rumbo", "confianza"],
  difficulty: 2,
  createdAt: new Date('2028-07-21').toISOString()
},
{
  id: 261,
  page: 261,
  title: "Hechizo para que la nieve sepa a azúcar",
  content: "La imaginación es la magia que transforma la escasez en banquete.",
  meaning: "Tu actitud mental determina cómo experimentas la realidad.",
  author: "Frieren",
  date: "Invierno del año 1028",
  category: "Esperanza",
  unlocked: true,
  tags: ["imaginación", "abundancia", "actitud"],
  difficulty: 1,
  createdAt: new Date('2028-07-28').toISOString()
},
{
  id: 262,
  page: 262,
  title: "La Oración del Puente de Madera",
  content: "Cruje para advertirte, pero se mantiene firme para que pases.",
  meaning: "Valora a los amigos que te dicen la verdad aunque duela.",
  author: "Heiter",
  date: "Verano del año 1027",
  category: "Amistad",
  unlocked: true,
  tags: ["amigos", "verdad", "apoyo"],
  difficulty: 1,
  createdAt: new Date('2028-08-04').toISOString()
},
{
  id: 263,
  page: 263,
  title: "El Secreto del Nudo que se Desata Solo",
  content: "A veces, dejar de tirar es la única forma de liberar la tensión.",
  meaning: "Deja de forzar situaciones que requieren tiempo y paciencia.",
  author: "Flamme",
  date: "Primavera del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["tensión", "paciencia", "flujo"],
  difficulty: 2,
  createdAt: new Date('2028-08-11').toISOString()
},
{
  id: 264,
  page: 264,
  title: "La Teoría de la Sombra del Dragón",
  content: "El miedo es una proyección; si te acercas, verás que la sombra no tiene dientes.",
  meaning: "Enfrenta tus temores para descubrir que eran menos temibles de lo que creías.",
  author: "Stark",
  date: "Otoño del año 1027",
  category: "Valentía",
  unlocked: true,
  tags: ["miedo", "percepción", "coraje"],
  difficulty: 3,
  createdAt: new Date('2028-08-18').toISOString()
},
{
  id: 265,
  page: 265,
  title: "El Código de la Pluma de Escribano",
  content: "Lo que escribes hoy es el mapa que guiará a alguien dentro de cien años.",
  meaning: "Actúa con la conciencia de que dejas un legado.",
  author: "Himmel",
  date: "Invierno del año 1027",
  category: "Eterno",
  unlocked: true,
  tags: ["legado", "escritura", "futuro"],
  difficulty: 2,
  createdAt: new Date('2028-08-25').toISOString()
},
{
  id: 266,
  page: 266,
  title: "Hechizo para iluminar cuevas profundas",
  content: "La luz no debe ser cegadora, solo lo suficiente para ver el siguiente paso.",
  meaning: "No busques entender todo el futuro, solo el presente inmediato.",
  author: "Frieren",
  date: "Otoño del año 1028",
  category: "Sabiduría",
  unlocked: true,
  tags: ["presente", "luz", "claridad"],
  difficulty: 1,
  createdAt: new Date('2028-09-01').toISOString()
},
{
  id: 267,
  page: 267,
  title: "La Balada del Yunque y el Martillo",
  content: "Uno recibe y el otro da, pero ambos son necesarios para crear la espada.",
  meaning: "En toda relación, el equilibrio de roles es fundamental.",
  author: "Eisen",
  date: "Primavera del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["equilibrio", "roles", "creación"],
  difficulty: 2,
  createdAt: new Date('2028-09-08').toISOString()
},
{
  id: 268,
  page: 268,
  title: "El Susurro del Musgo en la Piedra",
  content: "El tiempo no destruye a la piedra, la viste de verde.",
  meaning: "La vejez no es decadencia, es la acumulación de vida sobre el espíritu.",
  author: "Himmel",
  date: "Invierno del año 1027",
  category: "Tiempo",
  unlocked: true,
  tags: ["vejez", "tiempo", "vida"],
  difficulty: 2,
  createdAt: new Date('2028-09-15').toISOString()
},
{
  id: 269,
  page: 269,
  title: "La Invocación del Silencio del Bosque",
  content: "Escucha lo que los árboles dicen cuando dejas de hablar.",
  meaning: "La sabiduría llega cuando el ego calla.",
  author: "Fern",
  date: "Otoño del año 1027",
  category: "Introspección",
  unlocked: true,
  tags: ["silencio", "ego", "escucha"],
  difficulty: 2,
  createdAt: new Date('2028-09-22').toISOString()
},
{
  id: 270,
  page: 270,
  title: "El Secreto de la Brújula de Cristal",
  content: "Apunta hacia lo que más amas, no hacia donde el viento sopla.",
  meaning: "Deja que tu pasión sea tu guía, no las tendencias del mundo.",
  author: "Flamme",
  date: "Primavera del año 1027",
  category: "Destino",
  unlocked: true,
  tags: ["pasión", "guía", "propósito"],
  difficulty: 2,
  createdAt: new Date('2028-09-29').toISOString()
},
{
  id: 271,
  page: 271,
  title: "Hechizo para remendar redes de pesca",
  content: "Un vínculo roto puede ser más fuerte en el punto donde fue reparado.",
  meaning: "El perdón fortalece las relaciones que superaron una crisis.",
  author: "Frieren",
  date: "Primavera del año 1028",
  category: "Sanación",
  unlocked: true,
  tags: ["perdón", "reparación", "vínculo"],
  difficulty: 1,
  createdAt: new Date('2028-10-06').toISOString()
},
{
  id: 272,
  page: 272,
  title: "La Teoría del Canto del Búho",
  content: "Vigilar en la noche permite que otros sueñen sin miedo.",
  meaning: "El servicio a los demás es una forma silenciosa de heroísmo.",
  author: "Eisen",
  date: "Invierno del año 1026",
  category: "Propósito",
  unlocked: true,
  tags: ["servicio", "cuidado", "heroísmo"],
  difficulty: 2,
  createdAt: new Date('2028-10-13').toISOString()
},
{
  id: 273,
  page: 273,
  title: "La Oración del Camino de Regreso",
  content: "Ningún viaje está completo hasta que compartes tus historias en casa.",
  meaning: "El valor de la experiencia reside en su transmisión a otros.",
  author: "Heiter",
  date: "Verano del año 1027",
  category: "Recuerdo",
  unlocked: true,
  tags: ["hogar", "historias", "experiencia"],
  difficulty: 1,
  createdAt: new Date('2028-10-20').toISOString()
},
{
  id: 274,
  page: 274,
  title: "El Código del Escudo de Bronce",
  content: "Brilla para que el enemigo sepa que no tienes miedo de ser visto.",
  meaning: "La transparencia es una forma de poder.",
  author: "Stark",
  date: "Otoño del año 1027",
  category: "Valentía",
  unlocked: true,
  tags: ["transparencia", "poder", "coraje"],
  difficulty: 3,
  createdAt: new Date('2028-10-27').toISOString()
},
{
  id: 275,
  page: 275,
  title: "El Relato del Árbol de Mil Años",
  content: "He visto pasar imperios, pero mi mayor alegría sigue siendo la lluvia de primavera.",
  meaning: "Mantén la capacidad de asombro ante lo sencillo, sin importar cuánto vivas.",
  notes: "Inscrito en la corteza de un roble milenario",
  author: "Frieren",
  date: "Primavera del año 1028",
  category: "Sabiduría",
  unlocked: true,
  tags: ["asombro", "sencillez", "permanencia"],
  difficulty: 2,
  createdAt: new Date('2028-11-03').toISOString()
},

{
  id: 276,
  page: 276,
  title: "Hechizo para capturar el olor de la lluvia",
  content: "Guardar un aroma es guardar la llave de una tarde que ya no existe.",
  meaning: "Los pequeños detalles sensoriales son los anclas de la memoria.",
  notes: "Destilado en frascos de vidrio bajo un alero",
  author: "Frieren",
  date: "Verano del año 1028",
  category: "Memoria",
  unlocked: true,
  tags: ["aroma", "recuerdo", "llave"],
  difficulty: 1,
  createdAt: new Date('2028-11-10').toISOString()
},
{
  id: 277,
  page: 277,
  title: "La Teoría del Eco en el Pozo",
  content: "Si lanzas una piedra a la profundidad, espera el sonido para saber cuánto caer.",
  meaning: "No actúes sin antes medir las consecuencias de tus palabras.",
  author: "Fern",
  date: "Primavera del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["consecuencias", "medición", "prudencia"],
  difficulty: 2,
  createdAt: new Date('2028-11-17').toISOString()
},
{
  id: 278,
  page: 278,
  title: "El Código del Hierro de Montaña",
  content: "Lo que nace en la presión de la roca no teme el golpe del martillo.",
  meaning: "Los cimientos forjados en la dificultad son los más resistentes.",
  author: "Eisen",
  date: "Invierno del año 1026",
  category: "Fortaleza",
  unlocked: true,
  tags: ["presión", "forja", "resistencia"],
  difficulty: 3,
  createdAt: new Date('2028-11-24').toISOString()
},
{
  id: 279,
  page: 279,
  title: "La Balada de la Vela en la Ventana",
  content: "Alumbrar hacia afuera es avisar que dentro hay un corazón que espera.",
  meaning: "La hospitalidad es una forma de magia que disipa la soledad.",
  notes: "Colocada en el alféizar de una casa de campo",
  author: "Himmel",
  date: "Otoño del año 1027",
  category: "Consuelo",
  unlocked: true,
  tags: ["hospitalidad", "acogida", "luz"],
  difficulty: 1,
  createdAt: new Date('2028-12-01').toISOString()
},
{
  id: 280,
  page: 280,
  title: "El Secreto del Nudo Escurridizo",
  content: "Hay ataduras que se sueltan no con fuerza, sino con un poco de aceite.",
  meaning: "La diplomacia y la suavidad resuelven lo que la violencia no puede.",
  author: "Heiter",
  date: "Verano del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["diplomacia", "suavidad", "resolución"],
  difficulty: 2,
  createdAt: new Date('2028-12-08').toISOString()
},
{
  id: 281,
  page: 281,
  title: "Hechizo para caminar sobre hojas secas sin ruido",
  content: "El respeto por el entorno es el primer paso para volverse parte de él.",
  meaning: "La discreción es una virtud que permite observar la verdad.",
  author: "Frieren",
  date: "Primavera del año 1028",
  category: "Disciplina",
  unlocked: true,
  tags: ["discreción", "respeto", "entorno"],
  difficulty: 2,
  createdAt: new Date('2028-12-15').toISOString()
},
{
  id: 282,
  page: 282,
  title: "La Oración del Puente de Cuerda",
  content: "Confía en cada hebra, pues juntas sostienen el peso del mundo.",
  meaning: "La colaboración es la única forma de cruzar grandes abismos.",
  notes: "Escrito al centro de un viejo puente colgante",
  author: "Flamme",
  date: "Primavera del año 1027",
  category: "Esperanza",
  unlocked: true,
  tags: ["colaboración", "tejido", "confianza"],
  difficulty: 1,
  createdAt: new Date('2028-12-22').toISOString()
},
{
  id: 283,
  page: 283,
  title: "La Teoría del Brillo del Acero",
  content: "Si la hoja está opaca, es porque ha olvidado el roce de la piedra.",
  meaning: "El talento se pierde si no se practica con disciplina constante.",
  author: "Stark",
  date: "Otoño del año 1027",
  category: "Aprendizaje",
  unlocked: true,
  tags: ["práctica", "talento", "disciplina"],
  difficulty: 2,
  createdAt: new Date('2028-12-29').toISOString()
},
{
  id: 284,
  page: 284,
  title: "El Código de la Cumbre Nevada",
  content: "El aire es escaso arriba porque solo los que saben respirar hondo merecen la vista.",
  meaning: "Los grandes logros requieren una preparación espiritual profunda.",
  author: "Fern",
  date: "Invierno del año 1026",
  category: "Sabiduría",
  unlocked: true,
  tags: ["altura", "preparación", "logro"],
  difficulty: 2,
  createdAt: new Date('2029-01-05').toISOString()
},
{
  id: 285,
  page: 285,
  title: "El Susurro del Trigo bajo el Granizo",
  content: "Dóblate hoy para que puedas levantarte cuando el sol vuelva mañana.",
  meaning: "La supervivencia a veces requiere una humillación temporal.",
  author: "Eisen",
  date: "Verano del año 1026",
  category: "Fortaleza",
  unlocked: true,
  tags: ["flexibilidad", "granizo", "supervivencia"],
  difficulty: 2,
  createdAt: new Date('2029-01-12').toISOString()
},
{
  id: 286,
  page: 286,
  title: "Hechizo para convertir el vino en jugo de uva",
  content: "A veces hay que volver a la raíz para recordar cómo empezó todo.",
  meaning: "No pierdas la inocencia mientras adquieres experiencia.",
  author: "Frieren",
  date: "Verano del año 1028",
  category: "Sabiduría",
  unlocked: true,
  tags: ["origen", "inocencia", "recuerdo"],
  difficulty: 1,
  createdAt: new Date('2029-01-19').toISOString()
},
{
  id: 287,
  page: 287,
  title: "La Balada del Sol de Invierno",
  content: "Aunque caliente poco, su luz es el regalo más preciado del día.",
  meaning: "Valora los esfuerzos pequeños cuando los grandes escasean.",
  author: "Himmel",
  date: "Invierno del año 1027",
  category: "Esperanza",
  unlocked: true,
  tags: ["invierno", "luz", "gratitud"],
  difficulty: 1,
  createdAt: new Date('2029-01-26').toISOString()
},
{
  id: 288,
  page: 288,
  title: "El Secreto del Viento que no Empuja",
  content: "Aprende a quedarte quieto cuando el mundo intenta moverte de tu sitio.",
  meaning: "La inmovilidad decidida es una forma de poder.",
  author: "Stark",
  date: "Otoño del año 1027",
  category: "Valentía",
  unlocked: true,
  tags: ["quietud", "poder", "decisión"],
  difficulty: 3,
  createdAt: new Date('2029-02-02').toISOString()
},
{
  id: 289,
  page: 289,
  title: "La Invocación de la Calma en el Espejo",
  content: "Si el agua está turbia, el reflejo miente; espera a que el lodo baje.",
  meaning: "No tomes decisiones importantes mientras estés enojado o confundido.",
  author: "Flamme",
  date: "Primavera del año 1027",
  category: "Introspección",
  unlocked: true,
  tags: ["calma", "claridad", "reflexión"],
  difficulty: 2,
  createdAt: new Date('2029-02-09').toISOString()
},
{
  id: 290,
  page: 290,
  title: "El Código del Carbón y el Diamante",
  content: "Ambos son lo mismo; la diferencia es cuánto tiempo soportaron el peso.",
  meaning: "La excelencia es simplemente carbón que nunca se rindió.",
  author: "Eisen",
  date: "Invierno del año 1026",
  category: "Perseverancia",
  unlocked: true,
  tags: ["peso", "excelencia", "perseverancia"],
  difficulty: 2,
  createdAt: new Date('2029-02-16').toISOString()
},
{
  id: 291,
  page: 291,
  title: "Hechizo para que la fogata nunca se apague del todo",
  content: "Mantener una brasa es más fácil que encender un bosque entero.",
  meaning: "Cuida tus relaciones diarias para no tener que salvarlas del desastre.",
  author: "Frieren",
  date: "Primavera del año 1028",
  category: "Sanación",
  unlocked: true,
  tags: ["brasa", "relaciones", "cuidado"],
  difficulty: 1,
  createdAt: new Date('2029-02-23').toISOString()
},
{
  id: 292,
  page: 292,
  title: "La Oración del Zapato Gastado",
  content: "Bendito el camino que me enseñó que la meta era el propio andar.",
  meaning: "El destino es una excusa para disfrutar del trayecto.",
  author: "Heiter",
  date: "Verano del año 1027",
  category: "Destino",
  unlocked: true,
  tags: ["trayecto", "gozo", "camino"],
  difficulty: 1,
  createdAt: new Date('2029-03-02').toISOString()
},
{
  id: 293,
  page: 293,
  title: "La Teoría de la Sombra del Reloj de Arena",
  content: "Incluso cuando el tiempo cae, la sombra permanece en el mismo sitio.",
  meaning: "Hay partes de tu ser que son inmutables a pesar del paso de los años.",
  author: "Fern",
  date: "Otoño del año 1027",
  category: "Identidad",
  unlocked: true,
  tags: ["identidad", "tiempo", "constante"],
  difficulty: 2,
  createdAt: new Date('2029-03-09').toISOString()
},
{
  id: 294,
  page: 294,
  title: "El Susurro de la Libélula sobre el Estanque",
  content: "Tocar la superficie sin romperla es la maestría de la ligereza.",
  meaning: "Actúa con delicadeza para no dañar los sentimientos ajenos.",
  author: "Himmel",
  date: "Primavera del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["delicadeza", "ligereza", "cuidado"],
  difficulty: 1,
  createdAt: new Date('2029-03-16').toISOString()
},
{
  id: 295,
  page: 295,
  title: "Hechizo para encontrar agua dulce en el mar",
  content: "En medio de la amargura, siempre hay un rastro de dulzura si sabes filtrar.",
  meaning: "Busca lo bueno incluso en las situaciones más difíciles.",
  notes: "Registrado en bitácora de un navegante",
  author: "Frieren",
  date: "Verano del año 1028",
  category: "Consuelo",
  unlocked: true,
  tags: ["filtrar", "dulzura", "esperanza"],
  difficulty: 1,
  createdAt: new Date('2029-03-23').toISOString()
},
{
  id: 296,
  page: 296,
  title: "La Balada del Escudo de Madera Verde",
  content: "Lo que aún está vivo tiene la flexibilidad para no quebrarse.",
  meaning: "Mantén tu mente joven y abierta para absorber los impactos de la vida.",
  author: "Stark",
  date: "Otoño del año 1027",
  category: "Fortaleza",
  unlocked: true,
  tags: ["flexibilidad", "vida", "apertura"],
  difficulty: 2,
  createdAt: new Date('2029-03-30').toISOString()
},
{
  id: 297,
  page: 297,
  title: "El Secreto del Mensaje en la Botella",
  content: "Escribir es un acto de fe en que alguien, en algún lugar, te entenderá.",
  meaning: "La comunicación trasciende el tiempo y el espacio.",
  author: "Flamme",
  date: "Primavera del año 1027",
  category: "Eternidad",
  unlocked: true,
  tags: ["mensaje", "tiempo", "fe"],
  difficulty: 2,
  createdAt: new Date('2029-04-06').toISOString()
},
{
  id: 298,
  page: 298,
  title: "El Código del Horizonte de Oro",
  content: "El sol se pone igual para el rey que para el siervo; la luz no tiene dueño.",
  meaning: "La belleza y la verdad son derechos universales.",
  author: "Himmel",
  date: "Verano del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["verdad", "belleza", "igualdad"],
  difficulty: 2,
  createdAt: new Date('2029-04-13').toISOString()
},
{
  id: 299,
  page: 299,
  title: "La Invocación del Viento que Borra Huellas",
  content: "A veces es necesario que el camino desaparezca para que dejes de mirar atrás.",
  meaning: "El olvido es una herramienta necesaria para empezar de nuevo.",
  author: "Frieren",
  date: "Otoño del año 1028",
  category: "Cambio",
  unlocked: true,
  tags: ["olvido", "renovación", "camino"],
  difficulty: 2,
  createdAt: new Date('2029-04-20').toISOString()
},
{
  id: 300,
  page: 300,
  title: "El Hito de las Tres Millas",
  content: "Tres veces has caído y tres veces te has levantado; ya conoces el truco.",
  meaning: "La resiliencia se convierte en hábito con la práctica.",
  author: "Eisen",
  date: "Invierno del año 1026",
  category: "Perseverancia",
  unlocked: true,
  tags: ["hábito", "levantarse", "fuerza"],
  difficulty: 2,
  createdAt: new Date('2029-04-27').toISOString()
},
{
  id: 301,
  page: 301,
  title: "Hechizo para calmar el llanto de un niño",
  content: "La magia más difícil es la que requiere que tu propio corazón esté en paz.",
  meaning: "Para ayudar a otros, primero debes estar bien tú mismo.",
  author: "Heiter",
  date: "Primavera del año 1027",
  category: "Sanación",
  unlocked: true,
  tags: ["paz", "cuidado", "empatía"],
  difficulty: 2,
  createdAt: new Date('2029-05-04').toISOString()
},
{
  id: 302,
  page: 302,
  title: "La Teoría del Color de la Tarde",
  content: "El cielo se vuelve rojo para despedirse con orgullo del día.",
  meaning: "Termina cada jornada con la satisfacción del deber cumplido.",
  author: "Fern",
  date: "Verano del año 1027",
  category: "Propósito",
  unlocked: true,
  tags: ["cierre", "orgullo", "deber"],
  difficulty: 2,
  createdAt: new Date('2029-05-11').toISOString()
},
{
  id: 303,
  page: 303,
  title: "El Susurro del Pino en la Tormenta",
  content: "Mis ramas se rompen, pero mi raíz está abrazada a la montaña.",
  meaning: "Pierde lo superficial si es necesario, pero mantén tus cimientos.",
  author: "Stark",
  date: "Otoño del año 1027",
  category: "Valentía",
  unlocked: true,
  tags: ["raíces", "tormenta", "fundamentos"],
  difficulty: 3,
  createdAt: new Date('2029-05-18').toISOString()
},
{
  id: 304,
  page: 304,
  title: "La Balada de la Mesa Vacía",
  content: "El espacio que falta es el lugar donde el recuerdo se sienta a cenar.",
  meaning: "Aprende a convivir con la ausencia como una forma de presencia.",
  notes: "Dedicada durante una cena en silencio",
  author: "Himmel",
  date: "Invierno del año 1027",
  category: "Recuerdo",
  unlocked: true,
  tags: ["ausencia", "presencia", "memoria"],
  difficulty: 1,
  createdAt: new Date('2029-05-25').toISOString()
},
{
  id: 305,
  page: 305,
  title: "Hechizo para que las uvas maduren antes",
  content: "La impaciencia solo crea frutos agrios; el tiempo es el mejor alquimista.",
  meaning: "No fuerces los resultados; deja que la vida madure a su ritmo.",
  author: "Frieren",
  date: "Verano del año 1028",
  category: "Paciencia",
  unlocked: true,
  tags: ["madurez", "tiempo", "templanza"],
  difficulty: 1,
  createdAt: new Date('2029-06-01').toISOString()
},
{
  id: 306,
  page: 306,
  title: "El Código del Ancla de Hierro",
  content: "Estar en el fondo no es malo si tu función es dar estabilidad al barco.",
  meaning: "Acepta tu rol, incluso si no es el más visible o glamuroso.",
  author: "Eisen",
  date: "Invierno del año 1026",
  category: "Sabiduría",
  unlocked: true,
  tags: ["rol", "estabilidad", "humildad"],
  difficulty: 2,
  createdAt: new Date('2029-06-08').toISOString()
},
{
  id: 307,
  page: 307,
  title: "La Oración del Alba en el Páramo",
  content: "Incluso donde no hay nada, la luz encuentra algo que iluminar.",
  meaning: "Siempre hay valor en ti, aunque te sientas vacío.",
  author: "Heiter",
  date: "Invierno del año 1027",
  category: "Esperanza",
  unlocked: true,
  tags: ["luz", "vacío", "valor"],
  difficulty: 1,
  createdAt: new Date('2029-06-15').toISOString()
},
{
  id: 308,
  page: 308,
  title: "El Secreto del Vuelo del Halcón",
  content: "Volar alto no es para ver más lejos, sino para sentir menos el ruido de abajo.",
  meaning: "Busca la elevación espiritual para alejarte de las críticas triviales.",
  author: "Flamme",
  date: "Primavera del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["elevación", "espíritu", "ruido"],
  difficulty: 2,
  createdAt: new Date('2029-06-22').toISOString()
},
{
  id: 309,
  page: 309,
  title: "La Teoría de la Gota de Rocío",
  content: "En una esfera de agua cabe todo el reflejo del bosque.",
  meaning: "Todo el universo se encuentra contenido en lo pequeño.",
  author: "Fern",
  date: "Otoño del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["microcosmos", "reflejo", "bosque"],
  difficulty: 2,
  createdAt: new Date('2029-06-29').toISOString()
},
{
  id: 310,
  page: 310,
  title: "El Hechizo del Caminante Silencioso",
  content: "La magia no está en el destino, sino en el rastro de flores que dejas al pasar.",
  meaning: "Tu legado son los actos de bondad que realizas en el camino.",
  notes: "Marcado con pétalos en un sendero de peregrinos",
  author: "Frieren",
  date: "Primavera del año 1028",
  category: "Destino",
  unlocked: true,
  tags: ["legado", "bondad", "camino"],
  difficulty: 1,
  createdAt: new Date('2029-07-06').toISOString()
},

{
  id: 311,
  page: 311,
  title: "El Hechizo de la Flor de Loto de Oro",
  content: "Incluso en el barro más denso, el alma puede construir un trono de luz.",
  meaning: "Tu entorno no dicta la pureza de tu carácter.",
  notes: "Observado en un estanque al amanecer",
  author: "Flamme",
  date: "Primavera del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["pureza", "entorno", "luz"],
  difficulty: 2,
  createdAt: new Date('2029-07-13').toISOString()
},
{
  id: 312,
  page: 312,
  title: "La Teoría del Viento que no Cesa",
  content: "La persistencia es la única magia que puede desgastar una montaña.",
  meaning: "El talento es nada sin la voluntad de continuar.",
  author: "Eisen",
  date: "Invierno del año 1026",
  category: "Perseverancia",
  unlocked: true,
  tags: ["persistencia", "voluntad", "montaña"],
  difficulty: 2,
  createdAt: new Date('2029-07-20').toISOString()
},
{
  id: 313,
  page: 313,
  title: "El Código del Reloj de Agua de Luna",
  content: "El tiempo de los elfos es un mar; el de los humanos, una gota. Aprecia la gota.",
  meaning: "La brevedad de la vida es lo que le otorga su valor infinito.",
  notes: "Inscrito en una clepsidra plateada",
  author: "Frieren",
  date: "Noche de luna, 1028",
  category: "Tiempo",
  unlocked: true,
  tags: ["tiempo", "brevedad", "valor"],
  difficulty: 2,
  createdAt: new Date('2029-07-27').toISOString()
},
{
  id: 314,
  page: 314,
  title: "La Balada del Zapato de Hierro",
  content: "Si el camino es duro, conviértete en algo más duro que el camino.",
  meaning: "Adapta tu resistencia a la magnitud de tu desafío.",
  author: "Stark",
  date: "Otoño del año 1027",
  category: "Fortaleza",
  unlocked: true,
  tags: ["resistencia", "camino", "adaptación"],
  difficulty: 3,
  createdAt: new Date('2029-08-03').toISOString()
},
{
  id: 315,
  page: 315,
  title: "El Secreto del Espejo de Obsidiana",
  content: "Para ver la verdadera luz, a veces hay que mirar a través de lo negro.",
  meaning: "Los momentos de crisis revelan las verdades más brillantes.",
  author: "Fern",
  date: "Invierno del año 1027",
  category: "Introspección",
  unlocked: true,
  tags: ["crisis", "luz", "verdad"],
  difficulty: 2,
  createdAt: new Date('2029-08-10').toISOString()
},
{
  id: 316,
  page: 316,
  title: "Hechizo para invocar una brisa de verano en invierno",
  content: "La memoria es un refugio donde el clima siempre es el que tú decidas.",
  meaning: "Usa tus recuerdos felices para superar los tiempos difíciles.",
  notes: "Recordado junto a una hoguera familiar",
  author: "Frieren",
  date: "Invierno del año 1028",
  category: "Consuelo",
  unlocked: true,
  tags: ["memoria", "refugio", "consuelo"],
  difficulty: 1,
  createdAt: new Date('2029-08-17').toISOString()
},
{
  id: 317,
  page: 317,
  title: "La Oración de la Piedra Angular",
  content: "Sostener el mundo no requiere gloria, requiere humildad.",
  meaning: "Los actos más importantes suelen ser los menos celebrados.",
  notes: "Tallada en el cimiento de un puente",
  author: "Heiter",
  date: "Primavera del año 1027",
  category: "Propósito",
  unlocked: true,
  tags: ["humildad", "soporte", "servicio"],
  difficulty: 2,
  createdAt: new Date('2029-08-24').toISOString()
},
{
  id: 318,
  page: 318,
  title: "El Susurro del Trigo Seco",
  content: "He alimentado a muchos; ahora descanso para ser tierra y volver a empezar.",
  meaning: "No temas al final de tu utilidad; todo es un ciclo.",
  author: "Himmel",
  date: "Verano del año 1027",
  category: "Eterno",
  unlocked: true,
  tags: ["ciclo", "descanso", "renacimiento"],
  difficulty: 2,
  createdAt: new Date('2029-08-31').toISOString()
},
{
  id: 319,
  page: 319,
  title: "La Teoría de la Flecha que nunca falla",
  content: "No apuntas con el ojo, apuntas con la certeza de que ya has llegado.",
  meaning: "La autoconfianza es la mitad del éxito.",
  author: "Fern",
  date: "Otoño del año 1027",
  category: "Destino",
  unlocked: true,
  tags: ["confianza", "destino", "puntería"],
  difficulty: 2,
  createdAt: new Date('2029-09-07').toISOString()
},
{
  id: 320,
  page: 320,
  title: "El Código del Fuego que no Quema",
  content: "La pasión debe dar luz y calor, no destruir lo que toca.",
  meaning: "Controla tus impulsos para que construyan en lugar de arrasar.",
  author: "Flamme",
  date: "Primavera del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["pasión", "control", "creación"],
  difficulty: 2,
  createdAt: new Date('2029-09-14').toISOString()
},
{
  id: 321,
  page: 321,
  title: "Hechizo para que las uvas sepan a victoria",
  content: "El sabor del éxito es más dulce cuando se ha pasado hambre de él.",
  meaning: "Valora el esfuerzo que te costó llegar a la meta.",
  author: "Frieren",
  date: "Verano del año 1028",
  category: "Sabiduría",
  unlocked: true,
  tags: ["esfuerzo", "éxito", "recompensa"],
  difficulty: 1,
  createdAt: new Date('2029-09-21').toISOString()
},
{
  id: 322,
  page: 322,
  title: "La Balada del Puente que se Balancea",
  content: "El miedo a caer es lo que te mantiene agarrado con más fuerza.",
  meaning: "El miedo puede ser una herramienta de supervivencia si se canaliza.",
  notes: "Escrito en tablones que crujen al paso",
  author: "Stark",
  date: "Invierno del año 1027",
  category: "Valentía",
  unlocked: true,
  tags: ["miedo", "agarre", "supervivencia"],
  difficulty: 3,
  createdAt: new Date('2029-09-28').toISOString()
},
{
  id: 323,
  page: 323,
  title: "El Secreto de la Fuente sin Fondo",
  content: "Cuanto más das de ti mismo, más espacio queda para recibir.",
  meaning: "La generosidad no te vacía, te renueva.",
  author: "Heiter",
  date: "Primavera del año 1027",
  category: "Esperanza",
  unlocked: true,
  tags: ["generosidad", "renovación", "flujo"],
  difficulty: 1,
  createdAt: new Date('2029-10-05').toISOString()
},
{
  id: 324,
  page: 324,
  title: "La Invocación del Vuelo de la Alondra",
  content: "Canta porque hay sol, no porque alguien te esté escuchando.",
  meaning: "La verdadera expresión del ser es desinteresada.",
  author: "Himmel",
  date: "Verano del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["expresión", "sol", "desinterés"],
  difficulty: 2,
  createdAt: new Date('2029-10-12').toISOString()
},
{
  id: 325,
  page: 325,
  title: "El Código del Diamante en Bruto",
  content: "La presión no te rompe, te define como algo precioso.",
  meaning: "Los problemas graves son los que crean personalidades valiosas.",
  author: "Eisen",
  date: "Invierno del año 1026",
  category: "Fortaleza",
  unlocked: true,
  tags: ["presión", "valor", "formación"],
  difficulty: 3,
  createdAt: new Date('2029-10-19').toISOString()
},
{
  id: 326,
  page: 326,
  title: "Hechizo para quitar el moho de los libros antiguos",
  content: "Cuidar el conocimiento es la única forma de que los muertos sigan hablando.",
  meaning: "Respeta la historia y las lecciones de quienes te precedieron.",
  notes: "Aplicado en un archivo monástico",
  author: "Frieren",
  date: "Otoño del año 1028",
  category: "Memoria",
  unlocked: true,
  tags: ["conocimiento", "historia", "cuidado"],
  difficulty: 1,
  createdAt: new Date('2029-10-26').toISOString()
},
{
  id: 327,
  page: 327,
  title: "La Teoría de la Sombra del Árbol de la Vida",
  content: "Nadie planta un árbol pensando que se sentará bajo su sombra mañana.",
  meaning: "Trabaja para las generaciones que no llegarás a conocer.",
  author: "Flamme",
  date: "Primavera del año 1027",
  category: "Legado",
  unlocked: true,
  tags: ["futuro", "generaciones", "paciencia"],
  difficulty: 2,
  createdAt: new Date('2029-11-02').toISOString()
},
{
  id: 328,
  page: 328,
  title: "El Susurro de la Arena en el Reloj",
  content: "Cada grano es un momento; no intentes detenerlos, siente cómo fluyen.",
  meaning: "La resistencia al paso del tiempo solo genera angustia.",
  author: "Himmel",
  date: "Invierno del año 1027",
  category: "Tiempo",
  unlocked: true,
  tags: ["momento", "flujo", "aceptación"],
  difficulty: 2,
  createdAt: new Date('2029-11-09').toISOString()
},
{
  id: 329,
  page: 329,
  title: "La Balada del Martillo de Cristal",
  content: "Incluso lo frágil puede dar forma a la realidad si se usa con precisión.",
  meaning: "No subestimes tu poder por el hecho de sentirte vulnerable.",
  author: "Fern",
  date: "Otoño del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["fragilidad", "precisión", "poder"],
  difficulty: 2,
  createdAt: new Date('2029-11-16').toISOString()
},
{
  id: 330,
  page: 330,
  title: "El Secreto de la Puerta sin Llave",
  content: "La mayoría de los muros están en la mente; la puerta siempre estuvo abierta.",
  meaning: "Tus limitaciones son a menudo autoinfligidas.",
  notes: "Escrito en un umbral antiguo",
  author: "Stark",
  date: "Primavera del año 1027",
  category: "Valentía",
  unlocked: true,
  tags: ["limitaciones", "mente", "apertura"],
  difficulty: 3,
  createdAt: new Date('2029-11-23').toISOString()
},
{
  id: 331,
  page: 331,
  title: "Hechizo para que la ropa siempre esté seca",
  content: "Un espíritu seco no permite que la humedad de la tristeza se pegue a la piel.",
  meaning: "Mantén tu alegría interna como una capa protectora.",
  author: "Frieren",
  date: "Verano del año 1028",
  category: "Sanación",
  unlocked: true,
  tags: ["alegría", "protección", "templanza"],
  difficulty: 1,
  createdAt: new Date('2029-11-30').toISOString()
},
{
  id: 332,
  page: 332,
  title: "La Oración del Sol de Medianoche",
  content: "Hay luces que solo se ven cuando todo lo demás se apaga.",
  meaning: "En la desesperación absoluta es donde nace la fe verdadera.",
  author: "Heiter",
  date: "Invierno del año 1027",
  category: "Esperanza",
  unlocked: true,
  tags: ["fe", "oscuridad", "luz"],
  difficulty: 1,
  createdAt: new Date('2029-12-07').toISOString()
},
{
  id: 333,
  page: 333,
  title: "El Código de la Montaña Errante",
  content: "Si cambias tu punto de vista, verás que hasta las montañas se mueven.",
  meaning: "La flexibilidad mental es la clave para entender el mundo.",
  author: "Frieren",
  date: "Otoño del año 1028",
  category: "Sabiduría",
  unlocked: true,
  tags: ["perspectiva", "flexibilidad", "entender"],
  difficulty: 2,
  createdAt: new Date('2029-12-14').toISOString()
},
{
  id: 334,
  page: 334,
  title: "La Teoría del Eco Eterno",
  content: "Una palabra amable hoy puede resonar dentro de mil años.",
  meaning: "Nunca subestimes el impacto a largo plazo de un pequeño gesto.",
  author: "Himmel",
  date: "Primavera del año 1027",
  category: "Legado",
  unlocked: true,
  tags: ["palabras", "eco", "impacto"],
  difficulty: 2,
  createdAt: new Date('2029-12-21').toISOString()
},
{
  id: 335,
  page: 335,
  title: "El Susurro del Hielo al Derretirse",
  content: "Dejo de ser sólido para volver a ser vida que fluye.",
  meaning: "Acepta las transformaciones de tu ser con naturalidad.",
  author: "Eisen",
  date: "Invierno del año 1026",
  category: "Cambio",
  unlocked: true,
  tags: ["transformación", "flujo", "aceptación"],
  difficulty: 2,
  createdAt: new Date('2029-12-28').toISOString()
},
{
  id: 336,
  page: 336,
  title: "Hechizo para ver el pasado en las nubes",
  content: "El cielo recuerda todas las formas que ha tenido.",
  meaning: "El universo guarda el registro de todo lo que ha existido.",
  notes: "Observado desde un risco ventoso",
  author: "Frieren",
  date: "Verano del año 1028",
  category: "Memoria",
  unlocked: true,
  tags: ["cielo", "registro", "formas"],
  difficulty: 1,
  createdAt: new Date('2030-01-04').toISOString()
},
{
  id: 337,
  page: 337,
  title: "La Balada del Escudo de Flores",
  content: "La belleza es la defensa más poderosa contra la desesperación.",
  meaning: "Rodéate de lo estético para proteger tu salud mental.",
  author: "Flamme",
  date: "Primavera del año 1027",
  category: "Consuelo",
  unlocked: true,
  tags: ["belleza", "defensa", "ánimo"],
  difficulty: 1,
  createdAt: new Date('2030-01-11').toISOString()
},
{
  id: 338,
  page: 338,
  title: "El Secreto del Nudo de la Eternidad",
  content: "Donde el principio toca el fin, ahí es donde empieza la magia de verdad.",
  meaning: "Entiende la vida como un círculo, no como una línea.",
  author: "Frieren",
  date: "Otoño del año 1028",
  category: "Eterno",
  unlocked: true,
  tags: ["círculo", "eternidad", "continuidad"],
  difficulty: 2,
  createdAt: new Date('2030-01-18').toISOString()
},
{
  id: 339,
  page: 339,
  title: "La Invocación de la Risa del Niño",
  content: "Es el sonido que espanta a los demonios más oscuros.",
  meaning: "No pierdas nunca tu capacidad de reírte de ti mismo.",
  notes: "Escuchada en una plaza al mediodía",
  author: "Heiter",
  date: "Verano del año 1027",
  category: "Sanación",
  unlocked: true,
  tags: ["risa", "sanación", "alegría"],
  difficulty: 1,
  createdAt: new Date('2030-01-25').toISOString()
},
{
  id: 340,
  page: 340,
  title: "El Código del Caminante sin Mapa",
  content: "Si no sabes a dónde vas, cualquier camino es una aventura.",
  meaning: "Abraza la incertidumbre como una oportunidad de descubrimiento.",
  author: "Himmel",
  date: "Otoño del año 1027",
  category: "Destino",
  unlocked: true,
  tags: ["incertidumbre", "aventura", "descubrimiento"],
  difficulty: 2,
  createdAt: new Date('2030-02-01').toISOString()
},
{
  id: 341,
  page: 341,
  title: "Hechizo para que el té huela a recuerdos felices",
  content: "Un sorbo puede transportarte a la primavera más hermosa de tu vida.",
  meaning: "Los placeres sencillos son portales temporales.",
  author: "Frieren",
  date: "Primavera del año 1028",
  category: "Memoria",
  unlocked: true,
  tags: ["té", "recuerdos", "placer"],
  difficulty: 1,
  createdAt: new Date('2030-02-08').toISOString()
},
{
  id: 342,
  page: 342,
  title: "La Teoría de la Sombra de la Espada",
  content: "La verdadera fuerza es la que no necesita ser demostrada.",
  meaning: "La confianza en uno mismo elimina la necesidad de fanfarronear.",
  author: "Eisen",
  date: "Invierno del año 1026",
  category: "Sabiduría",
  unlocked: true,
  tags: ["fuerza", "confianza", "humildad"],
  difficulty: 2,
  createdAt: new Date('2030-02-15').toISOString()
},
{
  id: 343,
  page: 343,
  title: "El Susurro de la Estrella Caída",
  content: "He dejado el cielo para cumplir el deseo de alguien en la tierra.",
  meaning: "El sacrificio personal por un ideal mayor es lo que nos hace héroes.",
  author: "Himmel",
  date: "Noche de cometas, 1027",
  category: "Valentía",
  unlocked: true,
  tags: ["sacrificio", "deseo", "heroísmo"],
  difficulty: 3,
  createdAt: new Date('2030-02-22').toISOString()
},
{
  id: 344,
  page: 344,
  title: "La Balada del Aprendiz de Mago",
  content: "Tropezar con el maná es la única forma de aprender a cabalgarlo.",
  meaning: "El error es la base fundamental de toda maestría.",
  author: "Fern",
  date: "Primavera del año 1027",
  category: "Aprendizaje",
  unlocked: true,
  tags: ["error", "maestría", "práctica"],
  difficulty: 2,
  createdAt: new Date('2030-03-01').toISOString()
},
{
  id: 345,
  page: 345,
  title: "El Secreto del Reloj de Sol bajo la Lluvia",
  content: "Aunque no veas la sombra, el sol sigue ahí detrás de las nubes.",
  meaning: "La verdad no desaparece solo porque no puedas percibirla.",
  author: "Flamme",
  date: "Otoño del año 1027",
  category: "Esperanza",
  unlocked: true,
  tags: ["sol", "verdad", "percepción"],
  difficulty: 1,
  createdAt: new Date('2030-03-08').toISOString()
},
{
  id: 346,
  page: 346,
  title: "Hechizo para que el pan sepa a banquete",
  content: "El hambre de aventura es el mejor condimento para cualquier comida.",
  meaning: "La actitud con la que vives define tu calidad de vida.",
  author: "Frieren",
  date: "Verano del año 1028",
  category: "Sabiduría",
  unlocked: true,
  tags: ["actitud", "banquete", "vida"],
  difficulty: 1,
  createdAt: new Date('2030-03-15').toISOString()
},
{
  id: 347,
  page: 347,
  title: "La Oración de la Llama que se Despide",
  content: "He dado todo el calor que tenía; ahora me vuelvo luz en tu recuerdo.",
  meaning: "El final de una vida es la culminación de un regalo.",
  notes: "Encendida ante un altar de despedida",
  author: "Heiter",
  date: "Invierno del año 1027",
  category: "Eterno",
  unlocked: true,
  tags: ["despedida", "luz", "memoria"],
  difficulty: 2,
  createdAt: new Date('2030-03-22').toISOString()
},
{
  id: 348,
  page: 348,
  title: "El Código del Horizonte de Plata",
  content: "La meta siempre está un paso más allá de donde crees que vas a rendirte.",
  meaning: "La perseverancia final es la que marca la diferencia.",
  author: "Stark",
  date: "Otoño del año 1027",
  category: "Fortaleza",
  unlocked: true,
  tags: ["perseverancia", "meta", "diferencia"],
  difficulty: 3,
  createdAt: new Date('2030-03-29').toISOString()
},
{
  id: 349,
  page: 349,
  title: "La Teoría del Canto del Grillo Solitario",
  content: "Incluso si nadie responde, mi canto llena el vacío de la noche.",
  meaning: "Tu valor no depende de la validación de los demás.",
  author: "Fern",
  date: "Verano del año 1027",
  category: "Identidad",
  unlocked: true,
  tags: ["valor", "autonomía", "soledad"],
  difficulty: 2,
  createdAt: new Date('2030-04-05').toISOString()
},
{
  id: 350,
  page: 350,
  title: "El Susurro del Musgo en la Tumba",
  content: "Protejo el nombre de quien descansa para que el olvido no gane.",
  meaning: "Honrar a los que se fueron es una tarea noble y necesaria.",
  notes: "Grabado en lápida cubierta de musgo",
  author: "Himmel",
  date: "Invierno del año 1027",
  category: "Recuerdo",
  unlocked: true,
  tags: ["honor", "memoria", "descanso"],
  difficulty: 1,
  createdAt: new Date('2030-04-12').toISOString()
},
{
  id: 351,
  page: 351,
  title: "Hechizo para ver el rastro de maná en las flores",
  content: "La magia está en todas partes, solo hay que saber mirar con el corazón.",
  meaning: "La belleza del mundo es una forma de energía espiritual.",
  author: "Frieren",
  date: "Primavera del año 1028",
  category: "Sabiduría",
  unlocked: true,
  tags: ["magia", "flores", "energía"],
  difficulty: 1,
  createdAt: new Date('2030-04-19').toISOString()
},
{
  id: 352,
  page: 352,
  title: "La Balada de la Capa del Héroe",
  content: "No son los hilos los que la hacen fuerte, sino los abrazos que recibió.",
  meaning: "El amor de los demás es nuestra verdadera protección.",
  author: "Himmel",
  date: "Verano del año 1027",
  category: "Consuelo",
  unlocked: true,
  tags: ["amor", "protección", "cuidado"],
  difficulty: 1,
  createdAt: new Date('2030-04-26').toISOString()
},
{
  id: 353,
  page: 353,
  title: "El Secreto del Pozo Seco",
  content: "A veces hay que vaciarse del todo para poder llenarse de agua nueva.",
  meaning: "Las crisis de identidad son necesarias para la evolución personal.",
  author: "Flamme",
  date: "Otoño del año 1027",
  category: "Cambio",
  unlocked: true,
  tags: ["crisis", "vaciarse", "renovación"],
  difficulty: 2,
  createdAt: new Date('2030-05-03').toISOString()
},
{
  id: 354,
  page: 354,
  title: "La Invocación del Viento de la Esperanza",
  content: "Sopla desde el futuro para decirte que todo estará bien.",
  meaning: "Confía en que el mañana trae sus propias soluciones.",
  author: "Heiter",
  date: "Primavera del año 1027",
  category: "Esperanza",
  unlocked: true,
  tags: ["mañana", "solución", "confianza"],
  difficulty: 1,
  createdAt: new Date('2030-05-10').toISOString()
},
{
  id: 355,
  page: 355,
  title: "El Código del Martillo de Piedra",
  content: "La paciencia de la roca es más fuerte que la prisa del rayo.",
  meaning: "La resistencia a largo plazo siempre vence a la intensidad efímera.",
  author: "Eisen",
  date: "Invierno del año 1026",
  category: "Fortaleza",
  unlocked: true,
  tags: ["paciencia", "resistencia", "tiempo"],
  difficulty: 3,
  createdAt: new Date('2030-05-17').toISOString()
},
{
  id: 356,
  page: 356,
  title: "Hechizo para que las estrellas brillen más fuerte",
  content: "No cambias el cielo, cambias tu capacidad de asombrarte.",
  meaning: "La magia es una cuestión de percepción y gratitud.",
  author: "Frieren",
  date: "Verano del año 1028",
  category: "Sabiduría",
  unlocked: true,
  tags: ["asombro", "gratitud", "percepción"],
  difficulty: 1,
  createdAt: new Date('2030-05-24').toISOString()
},
{
  id: 357,
  page: 357,
  title: "La Teoría de la Sombra del Viajero",
  content: "Tu pasado te sigue para recordarte cuánto has caminado, no para detenerte.",
  meaning: "Usa tu historia como referencia, no como ancla.",
  author: "Stark",
  date: "Otoño del año 1027",
  category: "Destino",
  unlocked: true,
  tags: ["pasado", "camino", "referencia"],
  difficulty: 2,
  createdAt: new Date('2030-05-31').toISOString()
},
{
  id: 358,
  page: 358,
  title: "El Susurro de la Hoja que no Cae",
  content: "Me mantengo firme para que el árbol no se sienta solo en invierno.",
  meaning: "La lealtad en los tiempos difíciles es el mayor de los tesoros.",
  author: "Fern",
  date: "Invierno del año 1027",
  category: "Amistad",
  unlocked: true,
  tags: ["lealtad", "invierno", "compañía"],
  difficulty: 1,
  createdAt: new Date('2030-06-07').toISOString()
},
{
  id: 359,
  page: 359,
  title: "La Balada de la Espada de Plata",
  content: "Reflejo la luz incluso en la batalla más oscura.",
  meaning: "Mantén tus ideales intactos a pesar de la violencia del mundo.",
  author: "Himmel",
  date: "Verano del año 1027",
  category: "Valentía",
  unlocked: true,
  tags: ["luz", "ideales", "batalla"],
  difficulty: 3,
  createdAt: new Date('2030-06-14').toISOString()
},
{
  id: 360,
  page: 360,
  title: "El Secreto del Mapa en Blanco",
  content: "El mejor viaje es aquel que vas dibujando mientras caminas.",
  meaning: "No busques un destino predeterminado; crea tu propia ruta.",
  author: "Frieren",
  date: "Otoño del año 1028",
  category: "Sabiduría",
  unlocked: true,
  tags: ["ruta", "viaje", "creación"],
  difficulty: 2,
  createdAt: new Date('2030-06-21').toISOString()
},
{
  id: 361,
  page: 361,
  title: "Hechizo para encontrar el camino a casa",
  content: "El camino siempre empieza en el lugar donde alguien te ama.",
  meaning: "La pertenencia es la brújula más exacta que existe.",
  author: "Heiter",
  date: "Primavera del año 1027",
  category: "Sanación",
  unlocked: true,
  tags: ["hogar", "pertenencia", "brújula"],
  difficulty: 1,
  createdAt: new Date('2030-06-28').toISOString()
},
{
  id: 362,
  page: 362,
  title: "La Oración del Mar en Calma",
  content: "Acepta la profundidad sin miedo; hay paz en lo que no conocemos.",
  meaning: "La curiosidad debe ser mayor que el temor a lo desconocido.",
  author: "Flamme",
  date: "Verano del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["profundidad", "curiosidad", "paz"],
  difficulty: 2,
  createdAt: new Date('2030-07-05').toISOString()
},
{
  id: 363,
  page: 363,
  title: "El Código del Árbol de Navidad Eterno",
  content: "Brilla para los que vendrán después, aunque tú ya seas ceniza.",
  meaning: "El legado es la forma de vivir para siempre.",
  notes: "Escrito en un ornamento antiguo",
  author: "Himmel",
  date: "Invierno del año 1027",
  category: "Eterno",
  unlocked: true,
  tags: ["legado", "brillo", "memoria"],
  difficulty: 2,
  createdAt: new Date('2030-07-12').toISOString()
},
{
  id: 364,
  page: 364,
  title: "La Teoría de la Gota de Miel",
  content: "Una pizca de dulzura puede salvar un océano de amargura.",
  meaning: "Nunca subestimes el poder de un pequeño acto de amor.",
  author: "Frieren",
  date: "Primavera del año 1028",
  category: "Consuelo",
  unlocked: true,
  tags: ["dulzura", "amor", "amargura"],
  difficulty: 1,
  createdAt: new Date('2030-07-19').toISOString()
},
{
  id: 365,
  page: 365,
  title: "El Susurro del Viento del Norte",
  content: "Traigo el frío para recordarte el valor del fuego y del abrazo.",
  meaning: "La adversidad nos enseña a valorar lo que realmente importa.",
  author: "Eisen",
  date: "Invierno del año 1026",
  category: "Sabiduría",
  unlocked: true,
  tags: ["frío", "abrazo", "valor"],
  difficulty: 2,
  createdAt: new Date('2030-07-26').toISOString()
},
{
  id: 366,
  page: 366,
  title: "La Balada del Sol que Renace",
  content: "Cada mañana es una disculpa del universo por la oscuridad de ayer.",
  meaning: "Cada día es una oportunidad de redención.",
  author: "Heiter",
  date: "Primavera del año 1027",
  category: "Esperanza",
  unlocked: true,
  tags: ["renacer", "mañana", "redención"],
  difficulty: 1,
  createdAt: new Date('2030-08-02').toISOString()
},
{
  id: 367,
  page: 367,
  title: "El Secreto del Último Hechizo",
  content: "La magia más poderosa es simplemente decir 'gracias' por haber existido.",
  meaning: "La gratitud es la culminación de toda sabiduría mágica.",
  notes: "Pronunciado al cierre de un ritual",
  author: "Flamme",
  date: "Otoño del año 1027",
  category: "Sabiduría",
  unlocked: true,
  tags: ["gratitud", "culminación", "magia"],
  difficulty: 2,
  createdAt: new Date('2030-08-09').toISOString()
},
{
  id: 368,
  page: 368,
  title: "El Juramento de Frieren",
  content: "Seguiré caminando para llevar vuestros recuerdos hasta el fin del tiempo.",
  meaning: "La memoria es un acto de amor que trasciende la muerte.",
  notes: "Grabado en una piedra de peregrinaje",
  author: "Frieren",
  date: "Otoño del año 1028",
  category: "Memoria",
  unlocked: true,
  tags: ["juramento", "recuerdo", "travesía"],
  difficulty: 2,
  createdAt: new Date('2030-08-16').toISOString()
},
{
  id: 369,
  page: 369,
  title: "El Epílogo de Himmel",
  content: "No fue un viaje largo ni corto; fue el viaje perfecto porque estuviste tú.",
  meaning: "Lo que da sentido a la vida es con quién la compartes.",
  notes: "Escrito en una carta sellada",
  author: "Himmel",
  date: "Primavera del año 1027",
  category: "Amor",
  unlocked: true,
  tags: ["compañía", "sentido", "vida"],
  difficulty: 1,
  createdAt: new Date('2030-08-23').toISOString()
}

];

// Custom hooks mejorados
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    const updateMatches = () => setMatches(media.matches);
    updateMatches();
    
    const listener = (e) => updateMatches();
    
    if (media.addEventListener) {
      media.addEventListener('change', listener);
    } else {
      media.addListener(listener);
    }
    
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', listener);
      } else {
        media.removeListener(listener);
      }
    };
  }, [query]);

  return matches;
};

const useLocalStorage = (key, initialValue, options = {}) => {
  const { parseJSON = true, validate, syncBetweenTabs = true } = options;
  
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;
      
      const parsed = parseJSON ? JSON.parse(item) : item;
      
      if (validate && !validate(parsed)) {
        console.warn(`Invalid data for key "${key}", using initial value`);
        return initialValue;
      }
      
      return parsed;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      if (validate && !validate(valueToStore)) {
        throw new Error(`Invalid data for key "${key}"`);
      }
      
      setStoredValue(valueToStore);
      
      if (parseJSON) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } else {
        window.localStorage.setItem(key, valueToStore);
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue, parseJSON, validate]);

  useEffect(() => {
    if (!syncBetweenTabs) return;
    
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          const newValue = parseJSON ? JSON.parse(e.newValue) : e.newValue;
          if (validate && !validate(newValue)) return;
          
          setStoredValue(newValue);
        } catch (error) {
          console.warn(`Error syncing localStorage key "${key}":`, error);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, parseJSON, validate, syncBetweenTabs]);

  return [storedValue, setValue];
};

const useAudio = () => {
  const audioContextRef = useRef(null);
  const audioCacheRef = useRef(new Map());
  
  const getOrCreateContext = useCallback(() => {
    if (!audioContextRef.current) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioContextRef.current = new AudioContextClass();
      }
    }
    return audioContextRef.current;
  }, []);
  
  useEffect(() => {
    const precacheSounds = async () => {
      const audioContext = getOrCreateContext();
      if (!audioContext) return;
      
      const sounds = [
        { id: 'bookOpen', freq: 196.00, duration: 0.6, waveType: 'sine' },
        { id: 'pageTurn', freq: 329.63, duration: 0.3, waveType: 'sine' },
        { id: 'magic', freq: [523.25, 659.25, 783.99], duration: 0.8, waveType: 'triangle' },
        { id: 'spellAdd', freq: 880.00, duration: 0.5, waveType: 'sine' },
        { id: 'bookmark', freq: 587.33, duration: 0.2, waveType: 'square' },
        { id: 'themeToggle', freq: 698.46, duration: 0.4, waveType: 'sine' },
        { id: 'error', freq: 220.00, duration: 0.3, waveType: 'sawtooth' }
      ];
      
      sounds.forEach(sound => {
        audioCacheRef.current.set(sound.id, sound);
      });
    };
    
    if (document.readyState === 'complete') {
      precacheSounds();
    } else {
      window.addEventListener('load', precacheSounds);
      return () => window.removeEventListener('load', precacheSounds);
    }
  }, [getOrCreateContext]);
  
  const playSound = useCallback((type, volume = 0.1) => {
    try {
      const audioContext = getOrCreateContext();
      if (!audioContext || audioContext.state === 'suspended') {
        audioContext?.resume();
        return;
      }
      
      const cachedSound = audioCacheRef.current.get(type);
      if (!cachedSound) return;
      
      const { freq, duration, waveType = 'sine' } = cachedSound;
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const now = audioContext.currentTime;
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      if (Array.isArray(freq)) {
        freq.forEach((f, index) => {
          oscillator.frequency.exponentialRampToValueAtTime(
            f, 
            now + (index * duration / freq.length)
          );
        });
      } else {
        oscillator.frequency.setValueAtTime(freq, now);
      }
      
      oscillator.type = waveType;
      
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(volume, now + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.8);
      gainNode.gain.linearRampToValueAtTime(0, now + duration);
      
      oscillator.start(now);
      oscillator.stop(now + duration);
      
      const cleanupTime = duration * 1000 + 50;
      const cleanupTimer = setTimeout(() => {
        try {
          oscillator.disconnect();
          gainNode.disconnect();
        } catch (e) {
          // Ignorar errores de desconexión
        }
      }, cleanupTime);
      
      return () => clearTimeout(cleanupTimer);
    } catch (error) {
      console.warn('Error playing sound:', error);
    }
  }, [getOrCreateContext]);
  
  useEffect(() => {
    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);
  
  return { playSound };
};

const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null);
  
  return useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
    
    return () => clearTimeout(timeoutRef.current);
  }, [callback, delay]);
};

// Lazy loading optimizado con preload
const preloadComponents = () => {
  const BookCover = lazy(() => import('./components/BookCover'));
  const BookPage = lazy(() => import('./components/BookPage'));
  const Navigation = lazy(() => import('./components/Navigation'));
  const MagicalParticles = lazy(() => import('./components/MagicalParticles'));
  const SpellForm = lazy(() => import('./components/SpellForm'));
  
  return { BookCover, BookPage, Navigation, MagicalParticles, SpellForm };
};

// Componente principal optimizado
function App() {
  // Componentes lazy cargados
  const { BookCover, BookPage, Navigation, MagicalParticles, SpellForm } = useMemo(preloadComponents, []);
  
  // Estados principales con validación
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [spells, setSpells] = useLocalStorage('frierenSpells', initialSpells, {
    validate: (data) => Array.isArray(data) && data.every(s => s.id && s.title)
  });
  const [showSpellForm, setShowSpellForm] = useState(false);
  const [theme, setTheme] = useLocalStorage('frierenTheme', 'dusk', { parseJSON: false });
  const [soundEnabled, setSoundEnabled] = useLocalStorage('frierenSound', true);
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarks, setBookmarks] = useLocalStorage('frierenBookmarks', [1, 2, 3, 7, 9, 11, 13, 15], {
    validate: (data) => Array.isArray(data) && data.every(b => typeof b === 'number')
  });
  const [hasInteracted, setHasInteracted] = useState(false);
  
  // Detección de características
  const isMobile = useMediaQuery('(max-width: 768px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const prefersReducedData = useMediaQuery('(prefers-reduced-data: reduce)');
  
  // Refs y hooks
  const lastActionTime = useRef(0);
  const audio = useAudio();
  
  // Datos derivados memoizados
  const { currentSpell, stats } = useMemo(() => {
    const currentSpell = spells[currentPage] || null;
    const unlockedSpells = spells.filter(s => s.unlocked);
    
    return {
      currentSpell,
      stats: {
        totalSpells: spells.length,
        unlockedSpells: unlockedSpells.length,
        bookmarksCount: bookmarks.length,
        totalPages: spells.length,
        completion: spells.length > 0 
          ? Math.round((unlockedSpells.length / spells.length) * 100)
          : 0
      }
    };
  }, [spells, currentPage, bookmarks]);
  
  const isBookmarked = useMemo(() => 
    currentSpell ? bookmarks.includes(currentSpell.id) : false,
    [currentSpell, bookmarks]
  );
  
  // Debounced handlers
  const debouncedPageChange = useDebounce((direction) => {
    const newPage = direction === 'next' 
      ? Math.min(currentPage + 1, spells.length - 1)
      : Math.max(currentPage - 1, 0);
    
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
      setIsLoading(false);
    }
  }, 300);
  
  // Handlers optimizados
  const handleBookOpen = useCallback(() => {
    if (isLoading || isBookOpen) return;
    
    const now = Date.now();
    if (now - lastActionTime.current < 500) return;
    lastActionTime.current = now;
    
    setIsLoading(true);
    
    if (soundEnabled) {
      audio.playSound('bookOpen');
    }
    
    if (spells[0] && !spells[0].unlocked) {
      setSpells(prev => prev.map((spell, idx) => 
        idx === 0 ? { ...spell, unlocked: true } : spell
      ));
    }
    
    setTimeout(() => {
      setIsBookOpen(true);
      setIsLoading(false);
    }, prefersReducedMotion ? 100 : 600);
    
    console.log('📖 Grimorio abierto');
  }, [isLoading, isBookOpen, soundEnabled, audio, spells, setSpells, prefersReducedMotion]);
  
  const handleBookClose = useCallback(() => {
    if (!isBookOpen) return;
    
    const now = Date.now();
    if (now - lastActionTime.current < 500) return;
    lastActionTime.current = now;
    
    if (soundEnabled) {
      audio.playSound('pageTurn');
    }
    
    setIsBookOpen(false);
    setCurrentPage(0);
    
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }, [isBookOpen, soundEnabled, audio, prefersReducedMotion]);
  
  const handlePageChange = useCallback((direction) => {
    if (isLoading || spells.length === 0) return;
    
    const now = Date.now();
    if (now - lastActionTime.current < 300) return;
    lastActionTime.current = now;
    
    setIsLoading(true);
    
    if (soundEnabled) {
      audio.playSound('pageTurn');
    }
    
    const newPage = direction === 'next' 
      ? Math.min(currentPage + 1, spells.length - 1)
      : Math.max(currentPage - 1, 0);
    
    if (spells[newPage] && !spells[newPage].unlocked) {
      setSpells(prev => prev.map((spell, idx) => 
        idx === newPage ? { ...spell, unlocked: true } : spell
      ));
    }
    
    debouncedPageChange(direction);
  }, [currentPage, spells, soundEnabled, audio, isLoading, setSpells, debouncedPageChange]);
  
  const handleRandomSpell = useCallback(() => {
    if (isLoading || spells.length === 0) return;
    
    const now = Date.now();
    if (now - lastActionTime.current < 500) return;
    lastActionTime.current = now;
    
    setIsLoading(true);
    
    if (soundEnabled) {
      audio.playSound('magic');
    }
    
    const unlockedSpells = spells.filter(spell => spell.unlocked);
    if (unlockedSpells.length === 0) {
      setIsLoading(false);
      return;
    }
    
    const weightedSpells = unlockedSpells.flatMap(spell => 
      Array(4 - (spell.difficulty || 1)).fill(spell)
    );
    
    const randomSpell = weightedSpells[Math.floor(Math.random() * weightedSpells.length)];
    const spellIndex = spells.findIndex(spell => spell.id === randomSpell.id);
    
    setTimeout(() => {
      setCurrentPage(spellIndex);
      setIsLoading(false);
    }, prefersReducedMotion ? 100 : 800);
  }, [spells, soundEnabled, audio, isLoading, prefersReducedMotion]);
  
  const handleAddSpell = useCallback((newSpell) => {
    const spellWithMeta = {
      ...newSpell,
      id: spells.length > 0 ? Math.max(...spells.map(s => s.id)) + 1 : 1,
      page: spells.length + 1,
      unlocked: true,
      date: new Date().toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      createdAt: new Date().toISOString(),
      tags: Array.isArray(newSpell.tags) ? newSpell.tags : [],
      difficulty: Math.min(Math.max(newSpell.difficulty || 1, 1), 3)
    };
    
    setSpells(prev => [...prev, spellWithMeta]);
    setShowSpellForm(false);
    setCurrentPage(spells.length);
    
    if (soundEnabled) {
      audio.playSound('spellAdd');
    }
    
    console.log('✨ Nuevo hechizo agregado:', spellWithMeta.title);
  }, [spells, setSpells, soundEnabled, audio]);
  
  const handleToggleBookmark = useCallback((spellId) => {
    setBookmarks(prev => {
      const newBookmarks = prev.includes(spellId)
        ? prev.filter(id => id !== spellId)
        : [...prev, spellId];
      
      return newBookmarks.slice(-10);
    });
    
    if (soundEnabled) {
      audio.playSound('bookmark');
    }
  }, [soundEnabled, audio, setBookmarks]);
  
  const handleToggleTheme = useCallback(() => {
    const newTheme = theme === 'dusk' ? 'night' : 'dusk';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    
    if (soundEnabled) {
      audio.playSound('themeToggle');
    }
  }, [theme, soundEnabled, audio, setTheme]);
  
  const handleToggleSound = useCallback(() => {
    const newValue = !soundEnabled;
    setSoundEnabled(newValue);
    
    if (newValue) {
      audio.playSound('magic', 0.05);
    }
  }, [soundEnabled, setSoundEnabled, audio]);
  
  // Atajos de teclado optimizados
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.matches('input, textarea, [contenteditable="true"]')) {
        return;
      }
      
      const { key, ctrlKey, altKey, metaKey } = e;
      const isModifier = ctrlKey || altKey || metaKey;
      const keyLower = key.toLowerCase();
      
      const preventIfHandled = () => e.preventDefault();
      
      switch (true) {
        case keyLower === 'arrowright' || keyLower === 'd':
          if (currentPage < spells.length - 1) {
            preventIfHandled();
            handlePageChange('next');
          }
          break;
          
        case keyLower === 'arrowleft' || keyLower === 'a':
          if (currentPage > 0) {
            preventIfHandled();
            handlePageChange('prev');
          }
          break;
          
        case keyLower === 'r' && !isModifier:
          preventIfHandled();
          handleRandomSpell();
          break;
          
        case (ctrlKey || metaKey) && keyLower === 'n':
          preventIfHandled();
          setShowSpellForm(true);
          break;
          
        case keyLower === 't' && !isModifier:
          preventIfHandled();
          handleToggleTheme();
          break;
          
        case keyLower === 's' && !isModifier:
          preventIfHandled();
          handleToggleSound();
          break;
          
        case keyLower === 'b' || keyLower === 'm':
          if (currentSpell && !isModifier) {
            preventIfHandled();
            handleToggleBookmark(currentSpell.id);
          }
          break;
          
        case /^[1-9]$/.test(keyLower):
          const pageNum = parseInt(keyLower) - 1;
          if (pageNum < spells.length) {
            preventIfHandled();
            setCurrentPage(pageNum);
          }
          break;
          
        case /^[0-9]{2}$/.test(keyLower) && keyLower.length === 2:
          const pageNumTwoDigit = parseInt(keyLower) - 1;
          if (pageNumTwoDigit < spells.length) {
            preventIfHandled();
            setCurrentPage(pageNumTwoDigit);
          }
          break;
          
        case keyLower === 'escape':
          if (showSpellForm) {
            preventIfHandled();
            setShowSpellForm(false);
          } else if (isBookOpen) {
            preventIfHandled();
            handleBookClose();
          }
          break;
          
        case altKey && keyLower === 'h':
          preventIfHandled();
          if (isBookOpen) handleBookClose();
          else handleBookOpen();
          break;
          
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    currentPage, spells.length, showSpellForm, isBookOpen, currentSpell,
    handlePageChange, handleRandomSpell, handleToggleTheme, handleToggleSound,
    handleToggleBookmark, handleBookClose, handleBookOpen
  ]);
  
  // Efecto para aplicar tema y restablecer scroll
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    
    if (!isBookOpen) {
      const savedScroll = localStorage.getItem('frierenScroll');
      if (savedScroll) {
        requestAnimationFrame(() => {
          window.scrollTo(0, parseInt(savedScroll, 10) || 0);
        });
      }
    }
  }, [theme, isBookOpen]);
  
  // Guardar scroll position
  useEffect(() => {
    const handleScroll = () => {
      localStorage.setItem('frierenScroll', window.scrollY.toString());
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Registrar primera interacción
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        if (soundEnabled) {
          audio.playSound('magic', 0.05);
        }
      }
    };
    
    const options = { once: true, passive: true };
    document.addEventListener('click', handleFirstInteraction, options);
    document.addEventListener('keydown', handleFirstInteraction, options);
    
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [hasInteracted, soundEnabled, audio]);
  
  // Limpiar localStorage si hay una versión antigua con menos hechizos
  useEffect(() => {
    const storedSpells = localStorage.getItem('frierenSpells');
    if (storedSpells) {
      const parsed = JSON.parse(storedSpells);
      if (parsed.length < initialSpells.length) {
        // Reemplazar con la lista completa
        localStorage.setItem('frierenSpells', JSON.stringify(initialSpells));
        setSpells(initialSpells);
      }
    }
  }, [setSpells]);
  
  // Renderizado condicional optimizado
  const renderBookView = useCallback(() => {
    const prevSpell = currentPage > 0 ? spells[currentPage - 1] : null;
    const nextSpell = currentPage < spells.length - 1 ? spells[currentPage + 1] : null;
    
    const SkeletonFallback = () => (
      <div className="book-page-skeleton" role="status" aria-label="Cargando página..." />
    );
    
    return (
      <div className="book-view">
        <div className="book-container">
          {!isMobile && (
            <>
              <div className="book-left" aria-hidden={!prevSpell}>
                <Suspense fallback={<SkeletonFallback />}>
                  <BookPage 
                    spell={prevSpell}
                    side="left"
                    isActive={false}
                    theme={theme}
                  />
                </Suspense>
              </div>
              
              <div className="book-center">
                <Suspense fallback={<SkeletonFallback />}>
                  <BookPage 
                    spell={currentSpell}
                    side="center"
                    isActive={true}
                    theme={theme}
                  />
                </Suspense>
                
                {currentSpell && (
                  <div className="page-controls">
                    <button 
                      className={`bookmark-button ${isBookmarked ? 'bookmarked' : ''}`}
                      onClick={() => handleToggleBookmark(currentSpell.id)}
                      title={isBookmarked ? "Quitar marcador (B)" : "Marcar página (B)"}
                      aria-label={isBookmarked ? "Quitar marcador" : "Marcar página"}
                      disabled={isLoading}
                      aria-pressed={isBookmarked}
                    >
                      <span className="bookmark-icon" aria-hidden="true">
                        {isBookmarked ? '🔖' : '📑'}
                      </span>
                    </button>
                    
                    <div className="spell-info" role="status">
                      <div className="spell-category">
                        {currentSpell.category || "Hechizo de consuelo"}
                      </div>
                      <div className="spell-page-number">
                        Página {currentPage + 1} de {stats.totalPages}
                      </div>
                      <div className="spell-status">
                        {currentSpell.unlocked ? "Desbloqueado" : "Por descubrir"}
                        {currentSpell.difficulty && (
                          <span className="spell-difficulty" aria-label={`Dificultad: ${currentSpell.difficulty}`}>
                            {' · '.repeat(currentSpell.difficulty)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="book-right" aria-hidden={!nextSpell}>
                <Suspense fallback={<SkeletonFallback />}>
                  <BookPage 
                    spell={nextSpell}
                    side="right"
                    isActive={false}
                    theme={theme}
                  />
                </Suspense>
              </div>
            </>
          )}
          
          {isMobile && (
            <div className="book-center">
              <Suspense fallback={<SkeletonFallback />}>
                <BookPage 
                  spell={currentSpell}
                  side="center"
                  isActive={true}
                  theme={theme}
                  isMobile={true}
                />
              </Suspense>
              
              {currentSpell && (
                <div className="page-controls">
                  <button 
                    className={`bookmark-button ${isBookmarked ? 'bookmarked' : ''}`}
                    onClick={() => handleToggleBookmark(currentSpell.id)}
                    title={isBookmarked ? "Quitar marcador" : "Marcar página"}
                    aria-label={isBookmarked ? "Quitar marcador" : "Marcar página"}
                    disabled={isLoading}
                    aria-pressed={isBookmarked}
                  >
                    <span className="bookmark-icon" aria-hidden="true">
                      {isBookmarked ? '🔖' : '📑'}
                    </span>
                  </button>
                  
                  <div className="spell-info" role="status">
                    <div className="spell-category">
                      {currentSpell.category || "Hechizo de consuelo"}
                    </div>
                    <div className="spell-page-number">
                      Página {currentPage + 1} de {stats.totalPages}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="navigation-wrapper">
          <Suspense fallback={<div className="navigation-skeleton" />}>
            <Navigation 
              currentPage={currentPage}
              totalPages={stats.totalPages}
              onNext={() => handlePageChange('next')}
              onPrev={() => handlePageChange('prev')}
              onRandomSpell={handleRandomSpell}
              onAddSpell={() => setShowSpellForm(true)}
              onToggleTheme={handleToggleTheme}
              onToggleSound={handleToggleSound}
              soundEnabled={soundEnabled}
              theme={theme}
              isLoading={isLoading}
              isMobile={isMobile}
            />
          </Suspense>
        </div>
      </div>
    );
  }, [
    currentPage, spells, currentSpell, isBookmarked, isLoading,
    isMobile, theme, handleToggleBookmark, handlePageChange,
    handleRandomSpell, handleToggleTheme, handleToggleSound, stats.totalPages
  ]);
  
  const renderCoverView = useCallback(() => (
    <div className="cover-view">
      <Suspense fallback={<div className="book-cover-skeleton" />}>
        <BookCover 
          onOpen={handleBookOpen}
          isLoading={isLoading}
          theme={theme}
          isInteractive={hasInteracted}
        />
      </Suspense>
      
      <div className="cover-message" role="region" aria-label="Mensaje de bienvenida">
        <blockquote className="message-quote">
          "La verdadera magia no está en los hechizos, sino en las conexiones que creamos en el camino."
        </blockquote>
      </div>
    </div>
  ), [handleBookOpen, isLoading, theme, hasInteracted]);
  
  return (
    <div className={`app ${theme} ${isBookOpen ? 'book-open' : 'book-closed'}`}>
      {!prefersReducedData && (
        <Suspense fallback={null}>
          <MagicalParticles 
            isActive={isBookOpen && hasInteracted}
            intensity={soundEnabled ? 1 : 0.5}
            theme={theme}
            maxParticles={isMobile ? 20 : 50}
          />
        </Suspense>
      )}
      
      {isLoading && (
        <div className="loading-overlay" role="alert" aria-busy="true" aria-label="Cargando">
          <div className="loading-spinner">
            <div className="spinner-book" aria-hidden="true">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className="book-page-spinner"
                  style={{ animationDelay: `${i * 0.3}s` }}
                />
              ))}
            </div>
            <p aria-live="polite">Cargando magia...</p>
          </div>
        </div>
      )}
      
      <header className="app-header" role="banner">
        <div className="header-content">
          <h1 className="header-title">
            <span className="title-magical">Grimorio</span>
            <span className="title-divider" aria-hidden="true">·</span>
            <span className="title-frieren">de Frieren</span>
          </h1>
          <div className="header-subtitle" aria-label="Susurros para el alma en días de tormenta">
            Susurros para el alma en días de tormenta
          </div>
        </div>
        
        <div className="header-controls" role="toolbar" aria-label="Controles principales">
          <button 
            className="header-button theme-button"
            onClick={handleToggleTheme}
            title={`Cambiar a tema ${theme === 'dusk' ? 'nocturno' : 'crepuscular'} (T)`}
            aria-label={`Cambiar a tema ${theme === 'dusk' ? 'nocturno' : 'crepuscular'}`}
            disabled={isLoading}
            aria-pressed={theme === 'night'}
          >
            <span className="button-icon" aria-hidden="true">
              {theme === 'dusk' ? '🌙' : '☀️'}
            </span>
            <span className="button-text sr-only">
              Tema {theme === 'dusk' ? 'nocturno' : 'crepuscular'}
            </span>
          </button>
          
          <button 
            className={`header-button sound-button ${soundEnabled ? 'enabled' : 'disabled'}`}
            onClick={handleToggleSound}
            title={soundEnabled ? "Desactivar sonidos (S)" : "Activar sonidos (S)"}
            aria-label={soundEnabled ? "Desactivar sonidos" : "Activar sonidos"}
            disabled={isLoading}
            aria-pressed={soundEnabled}
          >
            <span className="button-icon" aria-hidden="true">
              {soundEnabled ? '🔊' : '🔇'}
            </span>
            <span className="button-text sr-only">
              {soundEnabled ? "Sonido activado" : "Sonido desactivado"}
            </span>
          </button>
        </div>
      </header>
      
      <main className="app-main" role="main">
        {!isBookOpen ? renderCoverView() : renderBookView()}
      </main>
      
      {showSpellForm && (
        <Suspense fallback={<div className="spell-form-skeleton" />}>
          <SpellForm 
            onAddSpell={handleAddSpell}
            onClose={() => setShowSpellForm(false)}
            soundEnabled={soundEnabled}
            theme={theme}
            prefersReducedMotion={prefersReducedMotion}
          />
        </Suspense>
      )}
      
      <footer className="app-footer" role="contentinfo">
        <div className="footer-content">
          <div className="footer-stats" role="list" aria-label="Estadísticas del grimorio">
            {Object.entries(stats).map(([key, value]) => (
              <div key={key} className="stat-item" role="listitem">
                <span className="stat-value">{value}</span>
                <span className="stat-label">
                  {key === 'totalSpells' && 'Hechizos'}
                  {key === 'unlockedSpells' && 'Desbloqueados'}
                  {key === 'bookmarksCount' && 'Marcadores'}
                  {key === 'completion' && 'Completado'}
                </span>
              </div>
            ))}
          </div>
          
          <div className="footer-credits">
            <p className="credits-text">
              Grimorio de Frieren · Inspirado en "Frieren: Beyond Journey's End"
            </p>
            <p className="credits-hint">
              Usa las flechas para navegar, R para hechizo aleatorio, Ctrl+N para nuevo hechizo
            </p>
          </div>
          
          <div className="footer-symbols" aria-hidden="true">
            <span>✦</span>
            <span>✧</span>
            <span>❁</span>
            <span>✧</span>
            <span>✦</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default React.memo(App);