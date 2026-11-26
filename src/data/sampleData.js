
/** Idiomas disponibles. */
export const langs = ["Español", "Catalán", "Inglés", "Alemán", "Italiano", "Francés", "Portugués", "Japonés", "Árabe", "Chino"];
/** Niveles. */
export const levels = ["A1", "A2", "B1", "B2", "C1", "C2", "Nativo"];
/** Modalidades del intercambio. */
export const types = ["Presencial", "En línia"];
/** "Oferta": el usuario enseña su idioma | "Petición": el usuario quiere aprenderlo. */
export const services = ["Oferta", "Petición"];

/** Usuarios de ejemplo. */
export const users = [
    { name: "Dafler", email: "dafler@dafler.com", password: "1234", nativeLang: "Catalán", city: "Barcelona" },
    { name: "Florian", email: "florian@dafler.com", password: "1234", nativeLang: "Español", city: "Barcelona" },
    { name: "Daniel", email: "daniel@dafler.com", password: "1234", nativeLang: "Español", city: "Girona" },
    { name: "Erik", email: "erik@dafler.com", password: "1234", nativeLang: "Catalán", city: "Tarragona" }
];

/** Intercambios de ejemplo (ofertas y peticiones). */
export const exchanges = [
    { service: "Oferta", lang: "Catalán", level: "Nativo", type: "Presencial", user: "Daniel", title: "Ofrezco catalán solo por la mañana", description: "Quedariamos en la biblioteca cerca de la universidad de Girona para hacer clases de 1h.", date: "18-10-26" },
    { service: "Oferta", lang: "Español", level: "Nativo", type: "En línia", user: "Florian", title: "Ofrezco español 1h de 10h a 14h", description: "Las clases durarían una hora y serían a través de google meet.", date: "19-10-26" },
    { service: "Oferta", lang: "Inglés", level: "B2", type: "Presencial", user: "Erik", title: "Ofrezco inglés de lunes a viernes todas las tardes.", description: "Quedariamos en la biblioteca cerca de la universidad de Tarragona para hacer clases de 1h.", date: "18-10-26" },
    { service: "Petición", lang: "Italiano", level: "B1", type: "En línia", user: "Erik", title: "Tengo un examen de italiano", description: "Necesito aprender italiano en un B2 para poder presentarme al examen, puedo todas las tardes de 16h a 20h.", date: "18-10-26" }
];
