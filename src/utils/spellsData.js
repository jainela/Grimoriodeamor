export const getSpells = () => [
  {
    id: 1,
    page: 1,
    title: "Hechizo del Amanecer",
    content: "Incluso la noche más oscura termina con el amanecer. Cada nuevo día trae consigo la oportunidad de comenzar de nuevo, de sanar lo que duele y de encontrar belleza en lo simple.",
    author: "Frieren",
    date: "Primera Luna del Año 1023",
    meaning: "Sientes que la oscuridad nunca terminará.",
    notes: "Recuerda mirar el cielo cada mañana, aunque sea por un momento."
  },
  {
    id: 2,
    page: 2,
    title: "Encantamiento de la Paciencia",
    content: "Los bosques más antiguos crecieron lentamente, un día a la vez. Tu camino también se construye paso a paso, sin prisa pero sin pausa.",
    author: "Heiter",
    date: "Luna de la Cosecha",
    meaning: "Sientes que no avanzas o que todo lleva demasiado tiempo.",
    notes: "Los grandes árboles comenzaron como pequeñas semillas."
  },
  {
    id: 3,
    page: 3,
    title: "Conjuro del Recuerdo Dulce",
    content: "Guarda en tu corazón los momentos de luz, por breves que sean. En los días grises, estos destellos te recordarán que la alegría existe y volverá.",
    author: "Himmel",
    date: "Invierno del Año 1015",
    meaning: "Sientes que solo hay tristeza a tu alrededor.",
    notes: "Escribe tres cosas buenas que pasaron hoy, por pequeñas que sean."
  },
  {
    id: 4,
    page: 4,
    title: "Sortilegio del Viajero Cansado",
    content: "Está permitido detenerse. Está permitido descansar. El camino seguirá allí mañana, y tú estarás más fuerte para recorrerlo.",
    author: "Eisen",
    date: "Año del Largo Viaje",
    meaning: "Sientes que no puedes más, que el cansancio te vence.",
    notes: "Descansar no es perder el tiempo; es prepararse para continuar."
  },
  {
    id: 5,
    page: 5,
    title: "Invocación de la Lluvia Limpiadora",
    content: "Deja que las lágrimas caigan como la lluvia que lava el polvo del camino. Después de la tormenta, el aire está más claro y la tierra, más fértil.",
    author: "Frieren",
    date: "Estación de las Lloviznas",
    meaning: "Sientes ganas de llorar pero te contienes.",
    notes: "Llorar no es signo de debilidad, sino de humanidad."
  },
  {
    id: 6,
    page: 6,
    title: "Runa de la Presencia Silenciosa",
    content: "No siempre se necesitan palabras. A veces, el mayor consuelo es la compañía silenciosa de alguien que simplemente está allí, compartiendo el espacio y el tiempo.",
    author: "Heiter",
    date: "Noche del Solsticio",
    meaning: "Sientes una soledad profunda.",
    notes: "A veces, tu propia presencia es suficiente."
  },
  {
    id: 7,
    page: 7,
    title: "Sigilo de las Pequeñas Maravillas",
    content: "Fíjate en el musgo en la piedra, en el patrón de las hojas, en el sonido del viento entre los árboles. La magia no solo está en los grandes hechizos, sino en los detalles del mundo.",
    author: "Frieren",
    date: "Primavera Eterna",
    meaning: "Sientes que la magia ha abandonado tu vida.",
    notes: "Busca un detalle hermoso cada día y anótalo."
  },
  {
    id: 8,
    page: 8,
    title: "Fórmula del Tiempo Amable",
    content: "El tiempo no cura todas las heridas, pero las transforma. Lo que hoy duele intensamente, mañana será un recuerdo que ya no sangra, sino que enseña.",
    author: "Himmel",
    date: "Años Después del Viaje",
    meaning: "Sientes que el dolor nunca sanará.",
    notes: "Date tiempo. Todo cambia, incluso el dolor."
  },
  {
    id: 9,
    page: 9,
    title: "Encantamiento del Único Paso",
    content: "No tienes que ver todo el camino, solo el siguiente paso. Da ese paso, y luego el siguiente. Así se recorren mil millas.",
    author: "Eisen",
    date: "Camino de las Montañas",
    meaning: "Sientes abrumado por lo que tienes por delante.",
    notes: "Haz una lista pequeña: solo lo que harás hoy."
  },
  {
    id: 10,
    page: 10,
    title: "Conjuro Final: Regreso a Casa",
    content: "El hogar no es siempre un lugar físico. A veces es un recuerdo, una persona, una sensación dentro de ti. Siempre puedes volver a ese lugar interior donde eres aceptado completamente.",
    author: "Frieren",
    date: "Al Final del Viaje",
    meaning: "Sientes que no perteneces a ningún lugar.",
    notes: "Cierra los ojos y recuerda un momento en que te sentiste completamente en paz. Ese lugar sigue dentro de ti."
  }
];

export const getRandomSpell = () => {
  const spells = getSpells();
  return spells[Math.floor(Math.random() * spells.length)];
};