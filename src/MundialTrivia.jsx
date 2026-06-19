import React, { useState, useEffect, useMemo, useRef } from "react";

/* ------------------------------------------------------------------ */
/*  BANCO DE PREGUNTAS — Mundial 2026 (datos verificados, jun 2026)    */
/*  cat: categoría · q: pregunta · opts: 4 opciones · a: índice correcto*/
/*  lvl: 1 = Fácil · 2 = Media · 3 = Difícil                            */
/* ------------------------------------------------------------------ */
const BANK = [
  /* ----------------------- FÁCIL (lvl 1) ----------------------- */
  { lvl: 1, cat: "Formato", q: "¿Cuántas selecciones juegan el Mundial 2026?", opts: ["32", "40", "48", "64"], a: 2 },
  { lvl: 1, cat: "Sedes", q: "¿Qué tres países organizan el Mundial 2026?", opts: ["EE.UU., México y Canadá", "EE.UU., México y Brasil", "Canadá, México y Costa Rica", "EE.UU., Canadá y Argentina"], a: 0 },
  { lvl: 1, cat: "Historia", q: "¿Qué país ha ganado más Copas del Mundo?", opts: ["Alemania", "Brasil", "Italia", "Argentina"], a: 1 },
  { lvl: 1, cat: "Mundial 2026", q: "¿Qué selección es la campeona vigente del mundo?", opts: ["Francia", "Argentina", "Alemania", "Brasil"], a: 1 },
  { lvl: 1, cat: "Jugadores", q: "¿Con qué selección juega Lionel Messi?", opts: ["Brasil", "Argentina", "Uruguay", "España"], a: 1 },
  { lvl: 1, cat: "Jugadores", q: "¿De qué país es Kylian Mbappé?", opts: ["Bélgica", "Francia", "Portugal", "Inglaterra"], a: 1 },
  { lvl: 1, cat: "Historia", q: "¿Quién ganó el Mundial de Qatar 2022?", opts: ["Francia", "Argentina", "Brasil", "Croacia"], a: 1 },
  { lvl: 1, cat: "Sedes", q: "¿En qué continente se juega el Mundial 2026?", opts: ["Europa", "América del Norte", "Asia", "África"], a: 1 },
  { lvl: 1, cat: "Historia", q: "¿Cada cuántos años se juega la Copa del Mundo?", opts: ["2 años", "3 años", "4 años", "5 años"], a: 2 },
  { lvl: 1, cat: "Jugadores", q: "¿De qué país es Cristiano Ronaldo?", opts: ["España", "Brasil", "Portugal", "Argentina"], a: 2 },
  { lvl: 1, cat: "Formato", q: "¿Cuántos equipos hay en cada grupo del Mundial 2026?", opts: ["3", "4", "5", "6"], a: 1 },
  { lvl: 1, cat: "Trofeos", q: "El premio al máximo goleador del Mundial se llama…", opts: ["Balón de Oro", "Bota de Oro", "Guante de Oro", "Bota de Plata"], a: 1 },
  { lvl: 1, cat: "Historia", q: "¿En qué país se jugó el Mundial de 2022?", opts: ["Catar", "Rusia", "Brasil", "Sudáfrica"], a: 0 },
  { lvl: 1, cat: "Jugadores", q: "¿Con qué selección juega Erling Haaland?", opts: ["Suecia", "Dinamarca", "Noruega", "Países Bajos"], a: 2 },
  { lvl: 1, cat: "Formato", q: "El Mundial 2026 es el primero de la historia con…", opts: ["24 equipos", "32 equipos", "48 equipos", "64 equipos"], a: 2 },
  { lvl: 1, cat: "Sedes", q: "¿Cuál de estos países NO es anfitrión del Mundial 2026?", opts: ["EE.UU.", "México", "Brasil", "Canadá"], a: 2 },
  { lvl: 1, cat: "Historia", q: "¿Qué selección sudamericana ganó el Mundial 2002?", opts: ["Argentina", "Brasil", "Uruguay", "Chile"], a: 1 },
  { lvl: 1, cat: "Jugadores", q: "¿Quién ganó el Balón de Oro (mejor jugador) del Mundial 2022?", opts: ["Mbappé", "Messi", "Neymar", "Modrić"], a: 1 },
  { lvl: 1, cat: "Mundial 2026", q: "¿Qué selección jugó el partido inaugural como local?", opts: ["EE.UU.", "México", "Canadá", "Brasil"], a: 1 },
  { lvl: 1, cat: "Historia", q: "¿Qué país ganó el Mundial de 2018 en Rusia?", opts: ["Croacia", "Francia", "Alemania", "Brasil"], a: 1 },
  { lvl: 1, cat: "Récords", q: "¿Cuántas veces ha ganado Brasil la Copa del Mundo?", opts: ["3", "4", "5", "6"], a: 2 },
  { lvl: 1, cat: "Jugadores", q: "Diego Maradona fue una leyenda de la selección de…", opts: ["Brasil", "Argentina", "México", "Uruguay"], a: 1 },
  { lvl: 1, cat: "Formato", q: "¿Qué color de tarjeta significa expulsión directa?", opts: ["Amarilla", "Roja", "Verde", "Azul"], a: 1 },
  { lvl: 1, cat: "Sedes", q: "Además de EE.UU. y México, ¿qué país es anfitrión en 2026?", opts: ["Costa Rica", "Canadá", "Cuba", "Colombia"], a: 1 },

  /* ----------------------- MEDIA (lvl 2) ----------------------- */
  { lvl: 2, cat: "Formato", q: "¿En cuántos grupos se divide el Mundial 2026?", opts: ["8", "10", "12", "16"], a: 2 },
  { lvl: 2, cat: "Formato", q: "¿Cuántos partidos se juegan en total en el Mundial 2026?", opts: ["64", "80", "104", "128"], a: 2 },
  { lvl: 2, cat: "Sedes", q: "¿En qué estadio se juega la final del Mundial 2026?", opts: ["Azteca", "MetLife (NY/NJ)", "SoFi", "Hard Rock"], a: 1 },
  { lvl: 2, cat: "Sedes", q: "¿En qué estadio fue el partido inaugural del Mundial 2026?", opts: ["MetLife", "Estadio Azteca", "Akron", "BC Place"], a: 1 },
  { lvl: 2, cat: "Historia", q: "¿Quién ganó el Mundial de 2014 en Brasil?", opts: ["Argentina", "Alemania", "Brasil", "Países Bajos"], a: 1 },
  { lvl: 2, cat: "Historia", q: "¿En qué país se jugó el primer Mundial, en 1930?", opts: ["Brasil", "Uruguay", "Italia", "Argentina"], a: 1 },
  { lvl: 2, cat: "Historia", q: "¿Qué selección ganó el Mundial de 2010 en Sudáfrica?", opts: ["Países Bajos", "España", "Alemania", "Uruguay"], a: 1 },
  { lvl: 2, cat: "Récords", q: "¿Cuántos Mundiales ganó Argentina hasta 2022?", opts: ["1", "2", "3", "4"], a: 2 },
  { lvl: 2, cat: "Jugadores", q: "¿Qué jugador anotó tres goles en la final del Mundial 2022?", opts: ["Messi", "Mbappé", "Di María", "Giroud"], a: 1 },
  { lvl: 2, cat: "Récords", q: "Además de Brasil, ¿cuántos Mundiales han ganado Alemania e Italia (cada una)?", opts: ["3", "4", "5", "6"], a: 1 },
  { lvl: 2, cat: "Sedes", q: "¿Cuántas ciudades sede tiene el Mundial 2026?", opts: ["10", "12", "16", "20"], a: 2 },
  { lvl: 2, cat: "Mundial 2026", q: "El partido inaugural fue México contra…", opts: ["Corea del Sur", "Chequia", "Sudáfrica", "Paraguay"], a: 2 },
  { lvl: 2, cat: "Historia", q: "¿Qué país ganó el Mundial de 2006 en Alemania?", opts: ["Francia", "Italia", "Alemania", "Brasil"], a: 1 },
  { lvl: 2, cat: "Formato", q: "Tras la fase de grupos, ¿cuál es la primera ronda eliminatoria en 2026?", opts: ["Octavos de final", "Dieciseisavos de final", "Cuartos de final", "Repechaje"], a: 1 },
  { lvl: 2, cat: "Jugadores", q: "¿Quién es el único futbolista que ha ganado 3 Copas del Mundo?", opts: ["Maradona", "Pelé", "Beckenbauer", "Cafú"], a: 1 },
  { lvl: 2, cat: "Récords", q: "¿Cuántas veces ha sido México país anfitrión de un Mundial (incluido 2026)?", opts: ["1", "2", "3", "4"], a: 2 },
  { lvl: 2, cat: "Sedes", q: "¿En qué ciudad se juega el partido por el tercer puesto en 2026?", opts: ["Dallas", "Miami", "Atlanta", "Seattle"], a: 1 },
  { lvl: 2, cat: "Historia", q: "¿Contra qué selección ganó Francia la final de 2018?", opts: ["Bélgica", "Croacia", "Inglaterra", "Brasil"], a: 1 },
  { lvl: 2, cat: "Jugadores", q: "La «Mano de Dios» de Maradona, en 1986, fue contra…", opts: ["Alemania", "Inglaterra", "Bélgica", "Italia"], a: 1 },
  { lvl: 2, cat: "Trofeos", q: "¿Cómo se llama el premio al mejor jugador del Mundial?", opts: ["Bota de Oro", "Balón de Oro", "Guante de Oro", "Trofeo FIFA"], a: 1 },
  { lvl: 2, cat: "Mundial 2026", q: "¿Qué estadio será el primero en albergar TRES Copas del Mundo?", opts: ["Maracaná", "Estadio Azteca", "Wembley", "MetLife"], a: 1 },
  { lvl: 2, cat: "Historia", q: "¿En qué Mundial ganó Inglaterra su único título?", opts: ["1962", "1966", "1970", "1990"], a: 1 },
  { lvl: 2, cat: "Formato", q: "Además de los dos primeros de cada grupo, ¿cuántos mejores terceros avanzan en 2026?", opts: ["4", "6", "8", "12"], a: 2 },
  { lvl: 2, cat: "Jugadores", q: "Ronaldo «el Fenómeno», máximo goleador de 2002, jugaba para…", opts: ["Portugal", "Brasil", "España", "Italia"], a: 1 },

  /* ----------------------- DIFÍCIL (lvl 3) ----------------------- */
  { lvl: 3, cat: "Récords", q: "¿Quién es el máximo goleador histórico de los Mundiales?", opts: ["Ronaldo", "Miroslav Klose", "Pelé", "Messi"], a: 1 },
  { lvl: 3, cat: "Récords", q: "¿Cuántos goles tiene Klose, máximo goleador histórico de Mundiales?", opts: ["12", "14", "16", "18"], a: 2 },
  { lvl: 3, cat: "Récords", q: "¿Quién marcó más goles en una sola Copa del Mundo (13 en 1958)?", opts: ["Pelé", "Just Fontaine", "Gerd Müller", "Ronaldo"], a: 1 },
  { lvl: 3, cat: "Mundial 2026", q: "¿En qué ciudad se realizó el sorteo de grupos en diciembre de 2025?", opts: ["Nueva York", "Washington D.C.", "Los Ángeles", "Ciudad de México"], a: 1 },
  { lvl: 3, cat: "Mundial 2026", q: "¿Qué selección debuta por primera vez en un Mundial en 2026?", opts: ["Paraguay", "Túnez", "Uzbekistán", "Ecuador"], a: 2 },
  { lvl: 3, cat: "Historia", q: "¿Quién anotó el gol del título para Alemania en la final de 2014?", opts: ["Müller", "Mario Götze", "Klose", "Schürrle"], a: 1 },
  { lvl: 3, cat: "Trofeos", q: "¿Cómo se llamaba el trofeo del Mundial antes del actual (desde 1974)?", opts: ["Copa Henri Delaunay", "Copa Jules Rimet", "Copa Gazzaniga", "Trofeo Mundial"], a: 1 },
  { lvl: 3, cat: "Récords", q: "¿Qué país conservó la Copa Jules Rimet de forma permanente al ganar su tercer título?", opts: ["Italia", "Brasil", "Alemania", "Uruguay"], a: 1 },
  { lvl: 3, cat: "Historia", q: "En el «Maracanazo» de 1950, ¿qué selección venció a Brasil en su casa?", opts: ["Argentina", "Uruguay", "Suecia", "Italia"], a: 1 },
  { lvl: 3, cat: "Historia", q: "¿En qué Mundial se decidió una final por primera vez en los penales?", opts: ["1986", "1990", "1994", "1998"], a: 2 },
  { lvl: 3, cat: "Mundial 2026", q: "¿Cuántas de las 16 sedes del Mundial 2026 están en Estados Unidos?", opts: ["9", "11", "13", "16"], a: 1 },
  { lvl: 3, cat: "Historia", q: "El primer Mundial en Asia (2002) fue en Japón y…", opts: ["China", "Corea del Sur", "Catar", "Tailandia"], a: 1 },
  { lvl: 3, cat: "Jugadores", q: "¿Quién ganó el Balón de Oro del Mundial 2018?", opts: ["Mbappé", "Luka Modrić", "Hazard", "Griezmann"], a: 1 },
  { lvl: 3, cat: "Récords", q: "¿Quién tiene el récord de más partidos jugados en Mundiales (tras 2022)?", opts: ["Lothar Matthäus", "Lionel Messi", "Paolo Maldini", "Miroslav Klose"], a: 1 },
  { lvl: 3, cat: "Historia", q: "¿Con qué resultado venció Alemania a Brasil en la semifinal de 2014?", opts: ["5-0", "7-1", "4-0", "6-2"], a: 1 },
  { lvl: 3, cat: "Mundial 2026", q: "A partir de 2026, las tarjetas amarillas se borran después de…", opts: ["los octavos", "la fase de grupos y los cuartos", "la final", "no se borran"], a: 1 },
  { lvl: 3, cat: "Historia", q: "¿Qué jugador francés fue expulsado por un cabezazo en la final de 2006?", opts: ["Henry", "Zinedine Zidane", "Vieira", "Ribéry"], a: 1 },
  { lvl: 3, cat: "Mundial 2026", q: "¿Cuál es el único estadio que repetirá como sede mundialista en 2026?", opts: ["Maracaná", "Estadio Azteca", "Rose Bowl", "Wembley"], a: 1 },
  { lvl: 3, cat: "Formato", q: "¿Cuántos partidos debe jugar un finalista para ser campeón en 2026?", opts: ["6", "7", "8", "9"], a: 2 },
  { lvl: 3, cat: "Historia", q: "¿Qué selección ganó el Mundial de 1998 venciendo 3-0 a Brasil?", opts: ["Italia", "Francia", "Alemania", "España"], a: 1 },
  { lvl: 3, cat: "Mundial 2026", q: "¿Qué selección es cabeza de serie del Grupo C del Mundial 2026?", opts: ["Argentina", "Brasil", "Alemania", "España"], a: 1 },
  { lvl: 3, cat: "Récords", q: "¿Cuántos días dura el Mundial 2026 (del 11 de junio al 19 de julio)?", opts: ["30", "35", "39", "45"], a: 2 },
];

/* ------------------------------------------------------------------ */
/*  CULTURA GENERAL — lo que un español "debería" saber                */
/* ------------------------------------------------------------------ */
const CULTURA = [
  { cat: "Historia", q: "¿En qué año comenzó la Guerra Civil Española?", opts: ["1931", "1936", "1939", "1945"], a: 1 },
  { cat: "Literatura", q: "¿Quién escribió «Don Quijote de la Mancha»?", opts: ["Lope de Vega", "Quevedo", "Miguel de Cervantes", "Góngora"], a: 2 },
  { cat: "Geografía", q: "¿Cuál es el río más largo de la Península Ibérica?", opts: ["Ebro", "Tajo", "Duero", "Guadalquivir"], a: 1 },
  { cat: "Política", q: "¿Cuántas comunidades autónomas tiene España?", opts: ["15", "17", "19", "20"], a: 1 },
  { cat: "Arte", q: "¿Quién pintó el «Guernica»?", opts: ["Dalí", "Picasso", "Velázquez", "Goya"], a: 1 },
  { cat: "Arte", q: "¿En qué ciudad está la Sagrada Familia?", opts: ["Madrid", "Valencia", "Barcelona", "Sevilla"], a: 2 },
  { cat: "Historia", q: "¿En qué año llegó Colón a América?", opts: ["1492", "1480", "1500", "1512"], a: 0 },
  { cat: "Fiestas", q: "¿Qué se celebra en España el 12 de octubre?", opts: ["Día de la Constitución", "Fiesta Nacional (Hispanidad)", "Día del Trabajo", "Día de Andalucía"], a: 1 },
  { cat: "Historia", q: "¿Quién fue el dictador de España hasta 1975?", opts: ["Primo de Rivera", "Francisco Franco", "Adolfo Suárez", "Carrero Blanco"], a: 1 },
  { cat: "Arte", q: "¿Quién pintó «Las Meninas»?", opts: ["Velázquez", "Goya", "El Greco", "Murillo"], a: 0 },
  { cat: "Política", q: "¿En qué año se aprobó la Constitución española vigente?", opts: ["1975", "1978", "1981", "1982"], a: 1 },
  { cat: "Geografía", q: "¿Cuál es el pico más alto de España?", opts: ["Mulhacén", "Teide", "Aneto", "Veleta"], a: 1 },
  { cat: "Literatura", q: "¿Quién escribió «La casa de Bernarda Alba»?", opts: ["Antonio Machado", "Federico García Lorca", "Rafael Alberti", "Juan Ramón Jiménez"], a: 1 },
  { cat: "Historia", q: "¿Qué moneda se usaba en España antes del euro?", opts: ["Peseta", "Real", "Duro", "Escudo"], a: 0 },
  { cat: "Gastronomía", q: "¿De qué región es típica la paella?", opts: ["Andalucía", "Comunidad Valenciana", "Galicia", "Asturias"], a: 1 },
  { cat: "Fiestas", q: "¿En qué comunidad se celebran «Las Fallas»?", opts: ["Cataluña", "Comunidad Valenciana", "Andalucía", "Galicia"], a: 1 },
  { cat: "Arte", q: "¿Qué pintor surrealista español tenía un famoso bigote?", opts: ["Miró", "Dalí", "Picasso", "Tàpies"], a: 1 },
  { cat: "Geografía", q: "¿Qué estrecho separa España de África?", opts: ["Gibraltar", "Bósforo", "Magallanes", "Ormuz"], a: 0 },
  { cat: "Refranes", q: "«En boca cerrada…»", opts: ["…no entran moscas", "…no hay verdad", "…todo calla", "…nada se pierde"], a: 0 },
  { cat: "Literatura", q: "¿Quién escribió «La Regenta»?", opts: ["Clarín (Leopoldo Alas)", "Pérez Galdós", "Unamuno", "Pío Baroja"], a: 0 },
  { cat: "Monarquía", q: "¿Qué rey reina en España actualmente?", opts: ["Juan Carlos I", "Felipe VI", "Felipe V", "Alfonso XIII"], a: 1 },
  { cat: "Símbolos", q: "¿Qué animal aparece en las famosas siluetas de Osborne en las carreteras?", opts: ["Toro", "Caballo", "León", "Águila"], a: 0 },
  { cat: "Fiestas", q: "¿En qué ciudad se celebran los Sanfermines?", opts: ["Pamplona", "Bilbao", "Logroño", "Burgos"], a: 0 },
  { cat: "Deporte", q: "¿Qué tenista español ha ganado más veces Roland Garros?", opts: ["David Ferrer", "Rafael Nadal", "Carlos Alcaraz", "Carlos Moyà"], a: 1 },
  { cat: "Gastronomía", q: "¿De qué región es típica la fabada?", opts: ["Asturias", "Galicia", "Cantabria", "País Vasco"], a: 0 },
  { cat: "Política", q: "¿Quién fue el primer presidente del Gobierno de la democracia?", opts: ["Felipe González", "Adolfo Suárez", "Leopoldo Calvo-Sotelo", "José María Aznar"], a: 1 },
  { cat: "Tradiciones", q: "¿Qué se come a las 12 campanadas de Nochevieja?", opts: ["Uvas", "Aceitunas", "Almendras", "Cerezas"], a: 0 },
  { cat: "Geografía", q: "¿Cuál es la capital de España?", opts: ["Barcelona", "Madrid", "Sevilla", "Valencia"], a: 1 },
  { cat: "Tradiciones", q: "Según la tradición, ¿dónde están los restos del apóstol Santiago?", opts: ["Toledo", "Santiago de Compostela", "Oviedo", "Zaragoza"], a: 1 },
  { cat: "Refranes", q: "«A caballo regalado…»", opts: ["…no le mires el diente", "…dale de comer", "…móntalo deprisa", "…cuídalo bien"], a: 0 },
];

/* Castigos aleatorios para quien falle (de leve a fuerte, todo en broma) */
const CASTIGOS = [
  "Bebe un trago 🍺",
  "Bebe dos tragos 🍷",
  "Imita a un animal hasta tu próximo turno 🐒",
  "Cuenta una anécdota vergonzosa al grupo 🙈",
  "Habla con acento extranjero hasta tu próximo turno 🗣️",
  "Haz 10 sentadillas 🏋️",
  "Baila sin música durante 20 segundos 💃",
  "El grupo te pone un mote por el resto de la partida 😈",
  "Brinda y bebe a la salud del jugador de tu derecha 🥂",
  "No puedes decir «sí» ni «no» durante una ronda 🤐",
  "Canta el estribillo de una canción que elija el grupo 🎤",
  "Bebe cada vez que alguien ría en la próxima ronda 😂",
  "Ponte de pie y aguanta una pose de superhéroe 30 segundos 🦸",
  "Cede tu bebida al jugador de tu izquierda 🍹",
  "Habla solo en susurros hasta tu próximo turno 🤫",
  "Cuenta un chiste; si nadie ríe, bebe otra vez 🃏",
  "Intercambia un zapato con quien tengas al lado 👟",
  "Haces de camarero del grupo hasta tu próximo turno 🍽️",
  "Bebe con el meñique levantado el resto de la partida ☝️",
  "Deja que el de tu izquierda te haga una pregunta y respóndela con sinceridad 🤐",
];
function randomCastigo() { return CASTIGOS[Math.floor(Math.random() * CASTIGOS.length)]; }

const PNP_ROUND_OPTIONS = [3, 5, 7, 10];
const MD_ROUND_OPTIONS = [5, 10, 15];
const LEVELS = [{ k: 1, l: "Fácil" }, { k: 2, l: "Media" }, { k: 3, l: "Difícil" }, { k: "mix", l: "Mezcla" }];
const TIMES = [{ k: 10, l: "10s" }, { k: 20, l: "20s" }, { k: 30, l: "30s" }, { k: 0, l: "Sin límite" }];
const MAX_PLAYERS = 6;
const ACCENTS = ["#56F0A6", "#FFCB3D", "#FF6B6B", "#7FB3FF", "#C792EA", "#FF9F45"];
const POLL_MS = 3000;

const STORAGE_OK = typeof window !== "undefined" && !!(window.storage && typeof window.storage.set === "function");

function levelMeta(lvl) {
  if (lvl === 1) return { label: "Fácil", color: "#56F0A6" };
  if (lvl === 2) return { label: "Media", color: "#FFCB3D" };
  return { label: "Difícil", color: "#FF6B6B" };
}
function poolFor(level) {
  return level === "mix" ? BANK : BANK.filter((q) => q.lvl === level);
}
function poolIdx(level) {
  return BANK.map((_, i) => i).filter((i) => level === "mix" || BANK[i].lvl === level);
}

/* ---- shared-storage helpers (best-effort, all wrapped) ---- */
async function sget(key) { try { const r = await window.storage.get(key, true); return r ? JSON.parse(r.value) : null; } catch { return null; } }
async function sset(key, val) { try { const r = await window.storage.set(key, JSON.stringify(val), true); return !!r; } catch { return false; } }
async function slist(prefix) { try { const r = await window.storage.list(prefix, true); return r && r.keys ? r.keys : []; } catch { return []; } }

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function genCode() { const c = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; let s = ""; for (let i = 0; i < 4; i++) s += c[Math.floor(Math.random() * c.length)]; return s; }
function genPid() { return Math.random().toString(36).slice(2, 9); }

const PitchLine = ({ style }) => (
  <div className="m26-pitchline" style={style} aria-hidden="true"><span className="m26-pitchline-circle" /></div>
);

function Timer({ left, total }) {
  if (left == null || !total) return null;
  const pct = Math.max(0, Math.min(100, (left / total) * 100));
  const color = left <= 5 ? "#FF6B6B" : left <= 10 ? "#FFCB3D" : "#56F0A6";
  return (
    <div className="m26-timer">
      <div className="m26-timer-num" style={{ color }}>{left}s</div>
      <div className="m26-timer-bar"><span style={{ width: `${pct}%`, background: color }} /></div>
    </div>
  );
}

function LevelBadge({ lvl }) {
  const m = levelMeta(lvl);
  return <span className="m26-lvl" style={{ color: m.color, border: `1px solid ${m.color}55`, background: `${m.color}1f` }}>{m.label}</span>;
}

function MiniBoard({ roster, myPid }) {
  const sorted = [...(roster || [])].sort((a, b) => (b.score || 0) - (a.score || 0));
  if (!sorted.length) return null;
  return (
    <div className="m26-scorestrip" style={{ marginBottom: 6 }}>
      {sorted.map((p, i) => (
        <div className={"m26-mini" + (p.pid === myPid ? " is-active" : "")} key={p.pid || i} style={{ "--c": ACCENTS[i % ACCENTS.length] }}>
          <span className="m26-mini-name">{p.name}{p.pid === myPid ? " (tú)" : ""}</span>
          <span className="m26-mini-score">{p.score || 0}</span>
        </div>
      ))}
    </div>
  );
}

export default function MundialTrivia() {
  const [screen, setScreen] = useState("home"); // home | pnp-setup | pnp-play | pnp-results | cg-setup | cg-play | cg-done | md

  /* ---------------- pass & play state ---------------- */
  const [players, setPlayers] = useState([{ name: "Jugador 1" }, { name: "Jugador 2" }]);
  const [scores, setScores] = useState([]);
  const [prize, setPrize] = useState("");
  const [rounds, setRounds] = useState(5);
  const [level, setLevel] = useState("mix");
  const [timeLimit, setTimeLimit] = useState(20);
  const [nameInput, setNameInput] = useState("");
  const [deck, setDeck] = useState([]);
  const [turn, setTurn] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const inputRef = useRef(null);

  /* ---------------- cultura general (castigos) state ---------------- */
  const [cgPlayers, setCgPlayers] = useState([{ name: "Jugador 1" }, { name: "Jugador 2" }]);
  const [cgNameInput, setCgNameInput] = useState("");
  const [cgRounds, setCgRounds] = useState(5);
  const [cgDeck, setCgDeck] = useState([]);
  const [cgTurn, setCgTurn] = useState(0);
  const [cgSelected, setCgSelected] = useState(null);
  const [cgRevealed, setCgRevealed] = useState(false);
  const [cgPunish, setCgPunish] = useState(null);
  const [cgPenalties, setCgPenalties] = useState([]);
  const cgInputRef = useRef(null);

  /* ---------------- multi-device state ---------------- */
  const [mdRole, setMdRole] = useState(null);
  const [code, setCode] = useState("");
  const [pid, setPid] = useState("");
  const [myName, setMyName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [mdRounds, setMdRounds] = useState(10);
  const [mdLevel, setMdLevel] = useState("mix");
  const [mdTime, setMdTime] = useState(20);
  const [mdPrize, setMdPrize] = useState("");
  const [room, setRoom] = useState(null);
  const [mdSelected, setMdSelected] = useState(null);
  const [mdError, setMdError] = useState("");
  const [busy, setBusy] = useState(false);
  const [now, setNow] = useState(Date.now());

  const roomRef = useRef(null);
  const prevQRef = useRef(-1);
  const scoredQRef = useRef(-1);
  const mdSelectedRef = useRef(null);
  const setSel = (v) => { mdSelectedRef.current = v; setMdSelected(v); };

  const reducedMotion = useMemo(
    () => (typeof window !== "undefined" && window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false),
    []
  );

  /* ---------------- PNP setup helpers ---------------- */
  const pnpPool = useMemo(() => poolFor(level), [level]);
  const maxRounds = Math.floor(pnpPool.length / Math.max(1, players.length));
  const roundChoices = (() => { const c = PNP_ROUND_OPTIONS.filter((r) => r <= maxRounds); return c.length ? c : [Math.max(1, maxRounds)]; })();
  useEffect(() => {
    if (!roundChoices.includes(rounds)) setRounds(roundChoices[roundChoices.length - 1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players.length, level]);

  function addPlayer() {
    const n = nameInput.trim();
    if (players.length >= MAX_PLAYERS) return;
    setPlayers([...players, { name: (n || `Jugador ${players.length + 1}`).slice(0, 18) }]);
    setNameInput(""); if (inputRef.current) inputRef.current.focus();
  }
  function removePlayer(i) { setPlayers(players.filter((_, idx) => idx !== i)); }
  function pnpStart() {
    if (players.length < 2) return;
    setDeck(shuffle(pnpPool).slice(0, rounds * players.length));
    setScores(players.map(() => 0));
    setTurn(0); setSelected(null); setRevealed(false); setTimeLeft(timeLimit);
    setScreen("pnp-play");
  }
  const pnpTotal = deck.length;
  const playerIdx = players.length ? turn % players.length : 0;
  const roundNum = players.length ? Math.floor(turn / players.length) + 1 : 1;
  const question = deck[turn];
  function pnpChoose(i) {
    if (revealed) return;
    setSelected(i); setRevealed(true);
    if (question && i === question.a) setScores((s) => s.map((v, idx) => (idx === playerIdx ? v + 1 : v)));
  }
  function pnpNext() {
    if (turn + 1 >= pnpTotal) setScreen("pnp-results");
    else { setTurn(turn + 1); setSelected(null); setRevealed(false); setTimeLeft(timeLimit); }
  }
  // PNP countdown
  useEffect(() => {
    if (screen !== "pnp-play" || revealed || timeLimit <= 0) return;
    if (timeLeft <= 0) { setSelected(null); setRevealed(true); return; }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [screen, revealed, timeLeft, timeLimit]);

  const pnpRanking = useMemo(
    () => players.map((p, i) => ({ name: p.name, score: scores[i] ?? 0, color: ACCENTS[i % ACCENTS.length] })).sort((a, b) => b.score - a.score),
    [players, scores]
  );
  const pnpTop = pnpRanking.length ? pnpRanking[0].score : 0;
  const pnpWinners = pnpRanking.filter((r) => r.score === pnpTop);
  function pnpRematch() {
    setDeck(shuffle(pnpPool).slice(0, rounds * players.length));
    setScores(players.map(() => 0));
    setTurn(0); setSelected(null); setRevealed(false); setTimeLeft(timeLimit);
    setScreen("pnp-play");
  }

  /* ---------------- CULTURA GENERAL (castigos) ---------------- */
  const cgMaxRounds = Math.floor(CULTURA.length / Math.max(1, cgPlayers.length));
  const cgRoundChoices = (() => { const c = PNP_ROUND_OPTIONS.filter((r) => r <= cgMaxRounds); return c.length ? c : [Math.max(1, cgMaxRounds)]; })();
  useEffect(() => {
    if (!cgRoundChoices.includes(cgRounds)) setCgRounds(cgRoundChoices[cgRoundChoices.length - 1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cgPlayers.length]);

  function cgAddPlayer() {
    const n = cgNameInput.trim();
    if (cgPlayers.length >= MAX_PLAYERS) return;
    setCgPlayers([...cgPlayers, { name: (n || `Jugador ${cgPlayers.length + 1}`).slice(0, 18) }]);
    setCgNameInput(""); if (cgInputRef.current) cgInputRef.current.focus();
  }
  function cgRemovePlayer(i) { setCgPlayers(cgPlayers.filter((_, idx) => idx !== i)); }
  function cgStart() {
    if (cgPlayers.length < 1) return;
    setCgDeck(shuffle(CULTURA).slice(0, cgRounds * cgPlayers.length));
    setCgPenalties(cgPlayers.map(() => 0));
    setCgTurn(0); setCgSelected(null); setCgRevealed(false); setCgPunish(null);
    setScreen("cg-play");
  }
  const cgTotal = cgDeck.length;
  const cgPlayerIdx = cgPlayers.length ? cgTurn % cgPlayers.length : 0;
  const cgRoundNum = cgPlayers.length ? Math.floor(cgTurn / cgPlayers.length) + 1 : 1;
  const cgQuestion = cgDeck[cgTurn];
  function cgChoose(i) {
    if (cgRevealed || !cgQuestion) return;
    setCgSelected(i); setCgRevealed(true);
    if (i !== cgQuestion.a) {
      setCgPunish(randomCastigo());
      setCgPenalties((p) => p.map((v, idx) => (idx === cgPlayerIdx ? v + 1 : v)));
    } else {
      setCgPunish(null);
    }
  }
  function cgNext() {
    if (cgTurn + 1 >= cgTotal) setScreen("cg-done");
    else { setCgTurn(cgTurn + 1); setCgSelected(null); setCgRevealed(false); setCgPunish(null); }
  }
  function cgRematch() {
    setCgDeck(shuffle(CULTURA).slice(0, cgRounds * cgPlayers.length));
    setCgPenalties(cgPlayers.map(() => 0));
    setCgTurn(0); setCgSelected(null); setCgRevealed(false); setCgPunish(null);
    setScreen("cg-play");
  }
  const cgRanking = useMemo(
    () => cgPlayers.map((p, i) => ({ name: p.name, pen: cgPenalties[i] ?? 0, color: ACCENTS[i % ACCENTS.length] })).sort((a, b) => a.pen - b.pen),
    [cgPlayers, cgPenalties]
  );

  /* ---------------- MULTI-DEVICE: derived ---------------- */
  const mdPool = useMemo(() => poolIdx(mdLevel), [mdLevel]);
  const mdRoundChoices = MD_ROUND_OPTIONS.filter((r) => r <= mdPool.length);
  useEffect(() => {
    if (mdRoundChoices.length && !mdRoundChoices.includes(mdRounds)) setMdRounds(mdRoundChoices[mdRoundChoices.length - 1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mdLevel]);

  const mdQuestion = room && room.deck ? BANK[room.deck[room.qIdx]] : null;
  const mdTimeLeft = (room && room.phase === "question" && room.timeLimit > 0 && room.qStart)
    ? Math.max(0, room.timeLimit - Math.floor((now - room.qStart) / 1000)) : null;
  const mdRevealNow = !!(room && (room.phase === "reveal" || (room.phase === "question" && room.timeLimit > 0 && mdTimeLeft === 0)));
  const mdRanking = room ? [...(room.roster || [])].sort((a, b) => (b.score || 0) - (a.score || 0)) : [];
  const mdTop = mdRanking.length ? (mdRanking[0].score || 0) : 0;
  const mdWinners = mdRanking.filter((r) => (r.score || 0) === mdTop);
  const answeredCount = room ? (room.roster || []).filter((p) => p.answered).length : 0;

  /* ---------------- MULTI-DEVICE: polling ---------------- */
  useEffect(() => {
    if (screen !== "md" || !mdRole || !code) return;
    let cancelled = false; let timer;
    const run = async () => {
      if (cancelled) return;
      try {
        let st = null;
        if (mdRole === "host") {
          const keys = await slist(`g:${code}:p:`);
          const arr = [];
          for (const k of keys) { const pd = await sget(k); if (pd) arr.push(pd); }
          arr.sort((a, b) => (a.joinedAt || 0) - (b.joinedAt || 0));
          const r = roomRef.current || {};
          const roster = arr.map((p) => ({ pid: p.pid, name: p.name, score: p.score || 0, answered: p.ansQ === r.qIdx }));
          st = { ...r, roster }; roomRef.current = st;
          if (!cancelled) setRoom(st);
          await sset(`g:${code}:state`, st);
        } else {
          const got = await sget(`g:${code}:state`);
          if (got) { st = got; if (!cancelled) setRoom(got); }
        }
        if (st && st.qIdx !== prevQRef.current) { prevQRef.current = st.qIdx; scoredQRef.current = -1; if (!cancelled) setSel(null); }
      } catch { /* ignore */ }
      if (!cancelled) timer = setTimeout(run, POLL_MS);
    };
    run();
    return () => { cancelled = true; clearTimeout(timer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, mdRole, code, pid]);

  /* MULTI-DEVICE: per-second clock + host auto-reveal */
  useEffect(() => {
    if (screen !== "md" || !room || room.phase !== "question" || !room.timeLimit) return;
    const id = setInterval(() => {
      setNow(Date.now());
      if (mdRole === "host") {
        const r = roomRef.current;
        if (r && r.phase === "question" && r.timeLimit > 0 && r.qStart) {
          const left = r.timeLimit - Math.floor((Date.now() - r.qStart) / 1000);
          const all = (r.roster || []).length > 0 && (r.roster || []).every((p) => p.answered);
          if (left <= 0 || all) mdReveal();
        }
      }
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, room, mdRole]);

  /* MULTI-DEVICE: score own answer once when revealed (time-up or host) */
  useEffect(() => {
    if (screen !== "md" || !room || !room.deck) return;
    if (mdRevealNow && scoredQRef.current !== room.qIdx) {
      scoredQRef.current = room.qIdx;
      const sel = mdSelectedRef.current;
      if (sel != null) {
        const q = BANK[room.deck[room.qIdx]];
        const correct = sel === q.a;
        (async () => {
          const key = `g:${code}:p:${pid}`;
          const cur = await sget(key);
          if (cur && cur.scoredQ !== room.qIdx) await sset(key, { ...cur, score: (cur.score || 0) + (correct ? 1 : 0), scoredQ: room.qIdx });
        })();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, room, mdRevealNow, code, pid]);

  /* ---------------- MULTI-DEVICE: actions ---------------- */
  async function createRoom() {
    if (!STORAGE_OK) { setMdError("Este modo necesita el almacenamiento del artefacto, que no está disponible aquí. Usa el modo de un solo teléfono."); return; }
    setMdError(""); setBusy(true);
    const c = genCode();
    const d = shuffle(poolIdx(mdLevel)).slice(0, mdRounds);
    const r = { phase: "lobby", qIdx: 0, deck: d, totalQ: mdRounds, level: mdLevel, timeLimit: mdTime, qStart: 0, prize: mdPrize.trim(), rev: 1, roster: [] };
    const p = genPid(); roomRef.current = r;
    const ok1 = await sset(`g:${c}:state`, r);
    const ok2 = await sset(`g:${c}:p:${p}`, { pid: p, name: (myName.trim() || "Anfitrión").slice(0, 18), score: 0, ansQ: -1, ansIdx: -1, joinedAt: Date.now() });
    setBusy(false);
    if (!ok1 || !ok2) { setMdError("No se pudo crear la sala. Inténtalo otra vez."); return; }
    prevQRef.current = 0; scoredQRef.current = -1; setSel(null);
    setCode(c); setPid(p); setMdRole("host"); setRoom(r);
  }
  async function joinRoom() {
    if (!STORAGE_OK) { setMdError("Este modo necesita el almacenamiento del artefacto, que no está disponible aquí. Usa el modo de un solo teléfono."); return; }
    const c = joinCode.trim().toUpperCase();
    if (c.length < 4) { setMdError("Escribe el código de 4 caracteres."); return; }
    setMdError(""); setBusy(true);
    const st = await sget(`g:${c}:state`);
    if (!st) { setBusy(false); setMdError("No encontramos esa sala. Revisa el código."); return; }
    const p = genPid();
    const ok = await sset(`g:${c}:p:${p}`, { pid: p, name: (myName.trim() || "Jugador").slice(0, 18), score: 0, ansQ: -1, ansIdx: -1, joinedAt: Date.now() });
    setBusy(false);
    if (!ok) { setMdError("No se pudo unir. Inténtalo otra vez."); return; }
    prevQRef.current = st.qIdx; scoredQRef.current = -1; setSel(null);
    setCode(c); setPid(p); setMdRole("player"); setRoom(st);
  }
  async function mdStart() {
    const r = { ...roomRef.current, phase: "question", qIdx: 0, qStart: Date.now(), rev: (roomRef.current.rev || 0) + 1 };
    roomRef.current = r; setRoom(r); prevQRef.current = 0; scoredQRef.current = -1; setSel(null); setNow(Date.now());
    await sset(`g:${code}:state`, r);
  }
  async function mdAnswer(i) {
    if (mdSelectedRef.current !== null || mdRevealNow) return;
    const r = room; if (!r || r.phase !== "question") return;
    setSel(i);
    const key = `g:${code}:p:${pid}`;
    try {
      const cur = (await sget(key)) || { pid, name: (myName.trim() || "Jugador").slice(0, 18), score: 0, joinedAt: Date.now() };
      await sset(key, { ...cur, ansQ: r.qIdx, ansIdx: i });
    } catch { /* ignore */ }
  }
  async function mdReveal() {
    const r = { ...roomRef.current, phase: "reveal", rev: (roomRef.current.rev || 0) + 1 };
    roomRef.current = r; setRoom(r);
    await sset(`g:${code}:state`, r);
  }
  async function mdNext() {
    const r0 = roomRef.current; const ni = r0.qIdx + 1;
    const r = ni >= r0.totalQ
      ? { ...r0, phase: "results", rev: (r0.rev || 0) + 1 }
      : { ...r0, phase: "question", qIdx: ni, qStart: Date.now(), rev: (r0.rev || 0) + 1 };
    roomRef.current = r; setRoom(r); prevQRef.current = r.qIdx; scoredQRef.current = -1; setSel(null); setNow(Date.now());
    await sset(`g:${code}:state`, r);
  }
  async function mdRematch() {
    const keys = await slist(`g:${code}:p:`);
    for (const k of keys) { const pd = await sget(k); if (pd) await sset(k, { ...pd, score: 0, ansQ: -1, ansIdx: -1, scoredQ: -1 }); }
    const d = shuffle(poolIdx(roomRef.current.level || "mix")).slice(0, roomRef.current.totalQ);
    const r = { ...roomRef.current, phase: "lobby", qIdx: 0, deck: d, qStart: 0, rev: (roomRef.current.rev || 0) + 1, roster: (roomRef.current.roster || []).map((x) => ({ ...x, score: 0, answered: false })) };
    roomRef.current = r; setRoom(r); prevQRef.current = 0; scoredQRef.current = -1; setSel(null);
    await sset(`g:${code}:state`, r);
  }
  function mdLeave() {
    setMdRole(null); setCode(""); setPid(""); setRoom(null); setMdError("");
    roomRef.current = null; prevQRef.current = -1; scoredQRef.current = -1; setSel(null);
    setScreen("home");
  }

  /* ---------------- confetti ---------------- */
  const confetti = useMemo(() => {
    if (reducedMotion) return [];
    return Array.from({ length: 46 }, (_, i) => ({
      id: i, left: Math.random() * 100, delay: Math.random() * 2.5, dur: 2.6 + Math.random() * 2.4,
      size: 6 + Math.random() * 8, rot: Math.random() * 360, color: ["#56F0A6", "#FFCB3D", "#FF6B6B", "#EAF4EF", "#7FB3FF"][i % 5], round: Math.random() > 0.6,
    }));
  }, [reducedMotion]);
  const Confetti = () => confetti.length === 0 ? null : (
    <div className="m26-confetti" aria-hidden="true">
      {confetti.map((c) => (
        <span key={c.id} style={{ left: `${c.left}%`, width: c.size, height: c.size, background: c.color, borderRadius: c.round ? "50%" : "2px", animationDelay: `${c.delay}s`, animationDuration: `${c.dur}s`, transform: `rotate(${c.rot}deg)` }} />
      ))}
    </div>
  );

  const Pills = ({ items, value, onPick, wide }) => (
    <div className="m26-pills">
      {items.map((it) => (
        <button key={String(it.k)} className={"m26-pill" + (wide ? " m26-pill-wide" : "") + (value === it.k ? " is-on" : "")} onClick={() => onPick(it.k)}>{it.l}</button>
      ))}
    </div>
  );

  /* ============================ RENDER ============================ */
  return (
    <div className="m26">
      <style>{CSS}</style>

      {/* ----------------------- HOME ----------------------- */}
      {screen === "home" && (
        <div className="m26-card">
          <div className="m26-kicker"><span className="m26-ball">⚽</span> Trivia · Copa del Mundo</div>
          <h1 className="m26-title">Mundial <span className="m26-gold">2026</span></h1>
          <p className="m26-sub">Responde contrarreloj, suma puntos y quien más acierte se lleva el premio. Elige tu nivel.</p>
          <PitchLine style={{ margin: "22px 0 22px" }} />
          <div className="m26-label">Elige cómo jugar</div>
          <div className="m26-modes">
            <button className="m26-mode" onClick={() => setScreen("pnp-setup")}>
              <span className="m26-mode-emoji">📱</span>
              <span className="m26-mode-main">
                <span className="m26-mode-title">En un mismo teléfono</span>
                <span className="m26-mode-desc">Se turnan el dispositivo, uno responde y lo pasa al siguiente. Funciona sin internet.</span>
              </span>
              <span className="m26-mode-arrow">→</span>
            </button>
            <button className="m26-mode" onClick={() => { setMdRole(null); setMdError(""); setScreen("md"); }}>
              <span className="m26-mode-emoji">🏟️</span>
              <span className="m26-mode-main">
                <span className="m26-mode-title">Cada quien con su teléfono</span>
                <span className="m26-mode-desc">Estilo Kahoot: alguien crea una sala y los demás entran con un código desde su propio móvil.</span>
              </span>
              <span className="m26-mode-arrow">→</span>
            </button>
            <button className="m26-mode" onClick={() => setScreen("cg-setup")}>
              <span className="m26-mode-emoji">🍺</span>
              <span className="m26-mode-main">
                <span className="m26-mode-title">Cultura general «a la española»</span>
                <span className="m26-mode-desc">Preguntas que todo español debería saber. ¿Fallas? Castigo aleatorio: beber, retos y movidas raras.</span>
              </span>
              <span className="m26-mode-arrow">→</span>
            </button>
          </div>
        </div>
      )}

      {/* ----------------------- PNP SETUP ----------------------- */}
      {screen === "pnp-setup" && (
        <div className="m26-card">
          <button className="m26-exit" onClick={() => setScreen("home")}>← Volver</button>
          <h1 className="m26-title m26-title-sm">Un mismo <span className="m26-gold">teléfono</span></h1>
          <p className="m26-sub">Agrega a los jugadores. En cada turno aparece de quién es y se pasan el dispositivo.</p>
          <PitchLine style={{ margin: "20px 0 22px" }} />

          <div className="m26-label">Jugadores <span className="m26-count">{players.length} / {MAX_PLAYERS}</span></div>
          <div className="m26-addrow">
            <input ref={inputRef} className="m26-input" value={nameInput} maxLength={18}
              placeholder={`Nombre del jugador ${players.length + 1}`} onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") addPlayer(); }} aria-label="Nombre del jugador" />
            <button className="m26-add" onClick={addPlayer} disabled={players.length >= MAX_PLAYERS}>Añadir</button>
          </div>
          <div className="m26-players">
            {players.map((p, i) => (
              <div className="m26-chip" key={i} style={{ "--c": ACCENTS[i % ACCENTS.length] }}>
                <span className="m26-dot" /><span className="m26-chip-name">{p.name}</span>
                <button className="m26-x" onClick={() => removePlayer(i)} aria-label={`Quitar a ${p.name}`}>×</button>
              </div>
            ))}
          </div>

          <div className="m26-label" style={{ marginTop: 26 }}>Nivel</div>
          <Pills items={LEVELS} value={level} onPick={setLevel} wide />

          <div className="m26-label" style={{ marginTop: 22 }}>Tiempo por pregunta</div>
          <Pills items={TIMES} value={timeLimit} onPick={setTimeLimit} wide />

          <div className="m26-label" style={{ marginTop: 22 }}>Rondas</div>
          <Pills items={roundChoices.map((r) => ({ k: r, l: String(r) }))} value={rounds} onPick={setRounds} />
          <p className="m26-hint">Cada ronda = 1 pregunta para cada jugador · {rounds * players.length} preguntas en total</p>

          <div className="m26-label" style={{ marginTop: 24 }}>Premio <span className="m26-count">opcional</span></div>
          <input className="m26-input m26-input-full" value={prize} maxLength={40}
            placeholder="p. ej. una pizza, no lavar los platos, gloria eterna…" onChange={(e) => setPrize(e.target.value)} aria-label="Premio" />

          <button className="m26-start" onClick={pnpStart} disabled={players.length < 2}>Comenzar el partido</button>
          {players.length < 2 && <p className="m26-hint m26-warn">Añade al menos 2 jugadores para empezar.</p>}
        </div>
      )}

      {/* ----------------------- PNP PLAY ----------------------- */}
      {screen === "pnp-play" && question && (
        <div className="m26-card">
          <div className="m26-topbar">
            <div className="m26-round">Ronda <b>{roundNum}</b> / {rounds}</div>
            <div className="m26-scorestrip">
              {players.map((p, i) => (
                <div className={"m26-mini" + (i === playerIdx ? " is-active" : "")} key={i} style={{ "--c": ACCENTS[i % ACCENTS.length] }}>
                  <span className="m26-mini-name">{p.name}</span><span className="m26-mini-score">{scores[i]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="m26-progress"><span style={{ width: `${(turn / pnpTotal) * 100}%` }} /></div>
          <div className="m26-turn">
            <div className="m26-turn-eyebrow">Turno de</div>
            <div className="m26-turn-name" style={{ color: ACCENTS[playerIdx % ACCENTS.length] }}>{players[playerIdx].name}</div>
          </div>
          {!revealed && timeLimit > 0 && <Timer left={timeLeft} total={timeLimit} />}
          <div className="m26-chiprow"><span className="m26-cat">{question.cat}</span><LevelBadge lvl={question.lvl} /></div>
          <h2 className="m26-q">{question.q}</h2>
          <div className="m26-opts">
            {question.opts.map((opt, i) => {
              let cls = "m26-opt";
              if (revealed) { if (i === question.a) cls += " is-correct"; else if (i === selected) cls += " is-wrong"; else cls += " is-dim"; }
              return (
                <button key={i} className={cls} onClick={() => pnpChoose(i)} disabled={revealed}>
                  <span className="m26-letter">{String.fromCharCode(65 + i)}</span>
                  <span className="m26-opt-text">{opt}</span>
                  {revealed && i === question.a && <span className="m26-mark">✓</span>}
                  {revealed && i === selected && i !== question.a && <span className="m26-mark">✕</span>}
                </button>
              );
            })}
          </div>
          {revealed && (
            <div className={"m26-feedback " + (selected === question.a ? "ok" : "no")}>
              {selected === question.a
                ? <><b>¡Correcto!</b> +1 punto para {players[playerIdx].name}.</>
                : selected == null
                  ? <><b>¡Se acabó el tiempo!</b> La respuesta era <b>{question.opts[question.a]}</b>.</>
                  : <><b>Casi.</b> La respuesta era <b>{question.opts[question.a]}</b>.</>}
            </div>
          )}
          {revealed && <button className="m26-start" onClick={pnpNext}>{turn + 1 >= pnpTotal ? "Ver resultados" : "Siguiente jugador →"}</button>}
        </div>
      )}

      {/* ----------------------- PNP RESULTS ----------------------- */}
      {screen === "pnp-results" && (
        <div className="m26-card m26-results">
          <Confetti />
          <div className="m26-trophy">🏆</div>
          {pnpWinners.length > 1 ? (
            <><h1 className="m26-win-title">¡Empate en la cima!</h1>
              <p className="m26-win-sub">{pnpWinners.map((w) => w.name).join(" y ")} comparten el título con {pnpTop} {pnpTop === 1 ? "punto" : "puntos"}.</p></>
          ) : (
            <><h1 className="m26-win-title">¡{pnpWinners[0].name} gana!</h1>
              <p className="m26-win-sub">{pnpTop} de {rounds} {pnpTop === 1 ? "respuesta" : "respuestas"} correctas.</p></>
          )}
          {prize.trim() && <div className="m26-prize">Premio: <b>{prize.trim()}</b></div>}
          <PitchLine style={{ margin: "26px 0 22px" }} />
          <div className="m26-board">
            {pnpRanking.map((r, i) => {
              const isWin = r.score === pnpTop; const w = rounds > 0 ? (r.score / rounds) * 100 : 0;
              return (
                <div className={"m26-row" + (isWin ? " is-win" : "")} key={i}>
                  <div className="m26-pos">{i + 1}</div>
                  <div className="m26-row-main">
                    <div className="m26-row-name">{r.name}{isWin && <span className="m26-medal"> 🏅</span>}</div>
                    <div className="m26-bar"><span style={{ width: `${w}%`, background: isWin ? "#FFCB3D" : r.color }} /></div>
                  </div>
                  <div className="m26-row-score" style={{ color: isWin ? "#FFCB3D" : "#EAF4EF" }}>{r.score}</div>
                </div>
              );
            })}
          </div>
          <div className="m26-actions">
            <button className="m26-start" onClick={pnpRematch}>Revancha (mismos jugadores)</button>
            <button className="m26-ghost" onClick={() => setScreen("home")}>Volver al inicio</button>
          </div>
        </div>
      )}

      {/* ----------------------- CULTURA GENERAL: SETUP ----------------------- */}
      {screen === "cg-setup" && (
        <div className="m26-card">
          <button className="m26-exit" onClick={() => setScreen("home")}>← Volver</button>
          <h1 className="m26-title m26-title-sm">Cultura <span className="m26-gold">española</span></h1>
          <p className="m26-sub">Os turnáis el teléfono. Si fallas la pregunta, te toca un castigo aleatorio. Apto para mayores de 18.</p>
          <PitchLine style={{ margin: "20px 0 22px" }} />

          <div className="m26-label">Jugadores <span className="m26-count">{cgPlayers.length} / {MAX_PLAYERS}</span></div>
          <div className="m26-addrow">
            <input ref={cgInputRef} className="m26-input" value={cgNameInput} maxLength={18}
              placeholder={`Nombre del jugador ${cgPlayers.length + 1}`} onChange={(e) => setCgNameInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") cgAddPlayer(); }} aria-label="Nombre del jugador" />
            <button className="m26-add" onClick={cgAddPlayer} disabled={cgPlayers.length >= MAX_PLAYERS}>Añadir</button>
          </div>
          <div className="m26-players">
            {cgPlayers.map((p, i) => (
              <div className="m26-chip" key={i} style={{ "--c": ACCENTS[i % ACCENTS.length] }}>
                <span className="m26-dot" /><span className="m26-chip-name">{p.name}</span>
                <button className="m26-x" onClick={() => cgRemovePlayer(i)} aria-label={`Quitar a ${p.name}`}>×</button>
              </div>
            ))}
          </div>

          <div className="m26-label" style={{ marginTop: 26 }}>Rondas</div>
          <Pills items={cgRoundChoices.map((r) => ({ k: r, l: String(r) }))} value={cgRounds} onPick={setCgRounds} />
          <p className="m26-hint">Cada ronda = 1 pregunta para cada jugador · {cgRounds * cgPlayers.length} preguntas en total</p>

          <button className="m26-start" onClick={cgStart} disabled={cgPlayers.length < 1}>Empezar (¡y a beber!)</button>
          {cgPlayers.length < 1 && <p className="m26-hint m26-warn">Añade al menos 1 jugador.</p>}
        </div>
      )}

      {/* ----------------------- CULTURA GENERAL: PLAY ----------------------- */}
      {screen === "cg-play" && cgQuestion && (
        <div className="m26-card">
          <div className="m26-topbar">
            <div className="m26-round">Ronda <b>{cgRoundNum}</b> / {cgRounds}</div>
            <div className="m26-scorestrip">
              {cgPlayers.map((p, i) => (
                <div className={"m26-mini" + (i === cgPlayerIdx ? " is-active" : "")} key={i} style={{ "--c": ACCENTS[i % ACCENTS.length] }}>
                  <span className="m26-mini-name">{p.name}</span><span className="m26-mini-score">{(cgPenalties[i] ?? 0) > 0 ? "🍺".repeat(Math.min(3, cgPenalties[i])) : "–"}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="m26-progress"><span style={{ width: `${(cgTurn / cgTotal) * 100}%` }} /></div>
          <div className="m26-turn">
            <div className="m26-turn-eyebrow">Responde</div>
            <div className="m26-turn-name" style={{ color: ACCENTS[cgPlayerIdx % ACCENTS.length] }}>{cgPlayers[cgPlayerIdx].name}</div>
          </div>
          <div className="m26-chiprow"><span className="m26-cat">{cgQuestion.cat}</span></div>
          <h2 className="m26-q">{cgQuestion.q}</h2>
          <div className="m26-opts">
            {cgQuestion.opts.map((opt, i) => {
              let cls = "m26-opt";
              if (cgRevealed) { if (i === cgQuestion.a) cls += " is-correct"; else if (i === cgSelected) cls += " is-wrong"; else cls += " is-dim"; }
              return (
                <button key={i} className={cls} onClick={() => cgChoose(i)} disabled={cgRevealed}>
                  <span className="m26-letter">{String.fromCharCode(65 + i)}</span>
                  <span className="m26-opt-text">{opt}</span>
                  {cgRevealed && i === cgQuestion.a && <span className="m26-mark">✓</span>}
                  {cgRevealed && i === cgSelected && i !== cgQuestion.a && <span className="m26-mark">✕</span>}
                </button>
              );
            })}
          </div>
          {cgRevealed && (
            cgSelected === cgQuestion.a ? (
              <div className="m26-feedback ok"><b>¡Correcto!</b> Te libras del castigo… por ahora.</div>
            ) : (
              <div className="m26-castigo">
                <div className="m26-castigo-eyebrow">¡Fallaste! La respuesta era <b>{cgQuestion.opts[cgQuestion.a]}</b></div>
                <div className="m26-castigo-label">Castigo</div>
                <div className="m26-castigo-text">{cgPunish}</div>
              </div>
            )
          )}
          {cgRevealed && <button className="m26-start" onClick={cgNext}>{cgTurn + 1 >= cgTotal ? "Ver resumen" : "Siguiente jugador →"}</button>}
        </div>
      )}

      {/* ----------------------- CULTURA GENERAL: DONE ----------------------- */}
      {screen === "cg-done" && (
        <div className="m26-card m26-results">
          <Confetti />
          <div className="m26-trophy">🍻</div>
          <h1 className="m26-win-title">¡Se acabó!</h1>
          <p className="m26-win-sub">
            {cgRanking.length > 0 && cgRanking[0].pen === 0
              ? <>{cgRanking[0].name} no falló ni una. ¡Toda una enciclopedia!</>
              : cgRanking.length > 0
                ? <>El más sobrio: <b>{cgRanking[0].name}</b>. El más castigado: <b>{cgRanking[cgRanking.length - 1].name}</b>.</>
                : null}
          </p>
          <PitchLine style={{ margin: "26px 0 22px" }} />
          <div className="m26-board">
            {cgRanking.map((r, i) => (
              <div className={"m26-row" + (i === 0 && r.pen === cgRanking[0].pen ? " is-win" : "")} key={i}>
                <div className="m26-pos">{i + 1}</div>
                <div className="m26-row-main">
                  <div className="m26-row-name">{r.name}</div>
                  <div className="m26-castigo-count">{r.pen === 0 ? "Sin castigos 😇" : `${r.pen} ${r.pen === 1 ? "castigo" : "castigos"} ${"🍺".repeat(Math.min(6, r.pen))}`}</div>
                </div>
                <div className="m26-row-score" style={{ color: r.pen === 0 ? "#56F0A6" : "#FF6B6B" }}>{r.pen}</div>
              </div>
            ))}
          </div>
          <div className="m26-actions">
            <button className="m26-start" onClick={cgRematch}>Otra ronda (mismos jugadores)</button>
            <button className="m26-ghost" onClick={() => setScreen("home")}>Volver al inicio</button>
          </div>
        </div>
      )}

      {/* ===================== MULTI-DEVICE ===================== */}
      {screen === "md" && (
        <div className="m26-card">

          {/* --- entry --- */}
          {!mdRole && (
            <>
              <button className="m26-exit" onClick={() => setScreen("home")}>← Volver</button>
              <h1 className="m26-title m26-title-sm">Cada quien su <span className="m26-gold">móvil</span></h1>
              <p className="m26-sub">Una persona crea la sala y comparte el código. Los demás se unen desde su teléfono y juegan a la vez.</p>
              {!STORAGE_OK && (
                <div className="m26-err" style={{ marginTop: 18 }}>
                  Este modo necesita el almacenamiento compartido del artefacto y no está disponible en esta vista. Prueba el modo de un solo teléfono, que siempre funciona.
                </div>
              )}
              <PitchLine style={{ margin: "20px 0 22px" }} />

              <div className="m26-label">Tu nombre</div>
              <input className="m26-input m26-input-full" value={myName} maxLength={18} placeholder="¿Cómo te llamas?" onChange={(e) => setMyName(e.target.value)} aria-label="Tu nombre" />

              <div className="m26-label" style={{ marginTop: 24 }}>Crear una sala</div>
              <div className="m26-sublabel">Nivel</div>
              <Pills items={LEVELS} value={mdLevel} onPick={setMdLevel} wide />
              <div className="m26-sublabel" style={{ marginTop: 14 }}>Tiempo por pregunta</div>
              <Pills items={TIMES} value={mdTime} onPick={setMdTime} wide />
              <div className="m26-sublabel" style={{ marginTop: 14 }}>Número de preguntas</div>
              <Pills items={mdRoundChoices.map((r) => ({ k: r, l: String(r) }))} value={mdRounds} onPick={setMdRounds} wide />
              <input className="m26-input m26-input-full" style={{ marginTop: 14 }} value={mdPrize} maxLength={40} placeholder="Premio (opcional): una pizza, gloria eterna…" onChange={(e) => setMdPrize(e.target.value)} aria-label="Premio" />
              <button className="m26-start" onClick={createRoom} disabled={!STORAGE_OK || busy}>{busy ? "Creando…" : "Crear sala y obtener código"}</button>

              <div className="m26-or">o únete a una</div>
              <div className="m26-joinrow">
                <input className="m26-input m26-codeinput" value={joinCode} maxLength={4} placeholder="CÓDIGO"
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())} onKeyDown={(e) => { if (e.key === "Enter") joinRoom(); }} aria-label="Código de sala" />
                <button className="m26-add" onClick={joinRoom} disabled={!STORAGE_OK || busy}>Unirse</button>
              </div>
              {mdError && <div className="m26-err">{mdError}</div>}
            </>
          )}

          {/* --- lobby --- */}
          {mdRole && room && room.phase === "lobby" && (
            <>
              <button className="m26-exit" onClick={mdLeave}>← Salir de la sala</button>
              {mdRole === "host" ? (
                <>
                  <h1 className="m26-title m26-title-sm">Sala <span className="m26-gold">lista</span></h1>
                  <div className="m26-codebox"><div className="m26-code-label">Comparte este código</div><div className="m26-code">{code}</div></div>
                  <p className="m26-hint" style={{ marginTop: 0 }}>Todos deben abrir <b>este mismo artefacto</b>, entrar a «Cada quien con su teléfono» → «Unirse» y escribir el código.</p>
                  <p className="m26-hint" style={{ marginTop: 6 }}>Nivel: <b>{(LEVELS.find((l) => l.k === room.level) || {}).l}</b> · {room.timeLimit ? `${room.timeLimit}s por pregunta` : "sin cronómetro"} · {room.totalQ} preguntas.</p>
                </>
              ) : (
                <>
                  <h1 className="m26-title m26-title-sm">¡Estás <span className="m26-gold">dentro!</span></h1>
                  <p className="m26-sub">Sala <b>{code}</b>. Espera a que el anfitrión comience el partido.</p>
                </>
              )}
              <div className="m26-label" style={{ marginTop: 22 }}>Jugadores <span className="m26-count">{(room.roster || []).length}</span></div>
              <div className="m26-lobby">
                {(room.roster || []).length === 0 && <div className="m26-wait">Esperando jugadores…</div>}
                {(room.roster || []).map((p, i) => (
                  <div className="m26-lobby-item" key={p.pid || i}>
                    <span className="m26-lobby-num">{i + 1}</span>
                    <span className="m26-dot" style={{ background: ACCENTS[i % ACCENTS.length], boxShadow: `0 0 8px ${ACCENTS[i % ACCENTS.length]}` }} />
                    <span>{p.name}{p.pid === pid ? " (tú)" : ""}</span>
                  </div>
                ))}
              </div>
              {mdRole === "host" ? (
                <>
                  <button className="m26-start" onClick={mdStart} disabled={(room.roster || []).length < 2}>Empezar el partido</button>
                  {(room.roster || []).length < 2 && <p className="m26-hint m26-warn">Necesitas al menos 2 jugadores conectados.</p>}
                </>
              ) : (
                <div className="m26-wait" style={{ marginTop: 20 }}>Esperando a que el anfitrión empiece…</div>
              )}
            </>
          )}

          {/* --- question / reveal --- */}
          {mdRole && room && (room.phase === "question" || room.phase === "reveal") && mdQuestion && (
            <>
              <div className="m26-topbar"><div className="m26-round">Pregunta <b>{room.qIdx + 1}</b> / {room.totalQ}</div></div>
              <div className="m26-progress"><span style={{ width: `${(room.qIdx / room.totalQ) * 100}%` }} /></div>
              <MiniBoard roster={room.roster} myPid={pid} />
              {!mdRevealNow && room.timeLimit > 0 && <Timer left={mdTimeLeft} total={room.timeLimit} />}
              <div className="m26-chiprow"><span className="m26-cat">{mdQuestion.cat}</span><LevelBadge lvl={mdQuestion.lvl} /></div>
              <h2 className="m26-q">{mdQuestion.q}</h2>
              <div className="m26-opts">
                {mdQuestion.opts.map((opt, i) => {
                  let cls = "m26-opt";
                  if (mdRevealNow) { if (i === mdQuestion.a) cls += " is-correct"; else if (i === mdSelected) cls += " is-wrong"; else cls += " is-dim"; }
                  else if (mdSelected === i) cls += " is-pick";
                  const locked = mdRevealNow || mdSelected !== null;
                  return (
                    <button key={i} className={cls} onClick={() => mdAnswer(i)} disabled={locked}>
                      <span className="m26-letter">{String.fromCharCode(65 + i)}</span>
                      <span className="m26-opt-text">{opt}</span>
                      {mdRevealNow && i === mdQuestion.a && <span className="m26-mark">✓</span>}
                      {mdRevealNow && i === mdSelected && i !== mdQuestion.a && <span className="m26-mark">✕</span>}
                    </button>
                  );
                })}
              </div>

              {mdRevealNow ? (
                <div className={"m26-feedback " + (mdSelected === mdQuestion.a ? "ok" : "no")}>
                  {mdSelected == null
                    ? <>No respondiste a tiempo. La respuesta era <b>{mdQuestion.opts[mdQuestion.a]}</b>.</>
                    : mdSelected === mdQuestion.a
                      ? <><b>¡Correcto!</b> +1 punto.</>
                      : <><b>Casi.</b> La respuesta era <b>{mdQuestion.opts[mdQuestion.a]}</b>.</>}
                </div>
              ) : (
                mdSelected !== null && <div className="m26-wait">Respuesta enviada ✓ · esperando a los demás…</div>
              )}

              {mdRole === "host" && !mdRevealNow && (
                <>
                  <div className="m26-answered">Respondieron <b>{answeredCount}</b> de <b>{(room.roster || []).length}</b></div>
                  <button className="m26-start" onClick={mdReveal}>Revelar respuesta</button>
                </>
              )}
              {mdRole === "host" && mdRevealNow && (
                <button className="m26-start" onClick={mdNext}>{room.qIdx + 1 >= room.totalQ ? "Ver resultados" : "Siguiente pregunta →"}</button>
              )}
              {mdRole === "player" && mdRevealNow && <div className="m26-wait" style={{ marginTop: 18 }}>Esperando la siguiente pregunta…</div>}
            </>
          )}

          {/* --- results --- */}
          {mdRole && room && room.phase === "results" && (
            <div className="m26-results">
              <Confetti />
              <div className="m26-trophy">🏆</div>
              {mdWinners.length > 1 ? (
                <><h1 className="m26-win-title">¡Empate en la cima!</h1>
                  <p className="m26-win-sub">{mdWinners.map((w) => w.name).join(" y ")} comparten el título con {mdTop} {mdTop === 1 ? "punto" : "puntos"}.</p></>
              ) : mdWinners.length === 1 ? (
                <><h1 className="m26-win-title">¡{mdWinners[0].name} gana!</h1>
                  <p className="m26-win-sub">{mdTop} de {room.totalQ} {mdTop === 1 ? "respuesta" : "respuestas"} correctas.</p></>
              ) : null}
              {room.prize && room.prize.trim() && <div className="m26-prize">Premio: <b>{room.prize.trim()}</b></div>}
              <PitchLine style={{ margin: "26px 0 22px" }} />
              <div className="m26-board">
                {mdRanking.map((r, i) => {
                  const isWin = (r.score || 0) === mdTop; const w = room.totalQ > 0 ? ((r.score || 0) / room.totalQ) * 100 : 0;
                  return (
                    <div className={"m26-row" + (isWin ? " is-win" : "")} key={r.pid || i}>
                      <div className="m26-pos">{i + 1}</div>
                      <div className="m26-row-main">
                        <div className="m26-row-name">{r.name}{r.pid === pid ? " (tú)" : ""}{isWin && <span className="m26-medal"> 🏅</span>}</div>
                        <div className="m26-bar"><span style={{ width: `${w}%`, background: isWin ? "#FFCB3D" : ACCENTS[i % ACCENTS.length] }} /></div>
                      </div>
                      <div className="m26-row-score" style={{ color: isWin ? "#FFCB3D" : "#EAF4EF" }}>{r.score || 0}</div>
                    </div>
                  );
                })}
              </div>
              <div className="m26-actions">
                {mdRole === "host" ? <button className="m26-start" onClick={mdRematch}>Revancha (mismos jugadores)</button>
                  : <div className="m26-wait">Esperando al anfitrión para la revancha…</div>}
                <button className="m26-ghost" onClick={mdLeave}>Salir de la sala</button>
              </div>
            </div>
          )}

          {mdRole && !room && <div className="m26-wait" style={{ marginTop: 10 }}>Conectando…</div>}
        </div>
      )}
    </div>
  );
}

/* ============================== STYLES ============================== */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700;800;900&display=swap');
.m26 *{box-sizing:border-box;margin:0;padding:0}
.m26{
  --pitch-deep:#06201A; --pitch:#0B362C; --panel:#0E4034; --panel2:#0B2F26;
  --line:#1F6450; --lime:#56F0A6; --gold:#FFCB3D; --coral:#FF6B6B; --chalk:#EAF4EF; --dim:#84A89B;
  font-family:'Inter',system-ui,-apple-system,Segoe UI,Roboto,sans-serif; color:var(--chalk); min-height:100vh; width:100%;
  display:flex; align-items:flex-start; justify-content:center; padding:28px 16px 64px;
  background-color:var(--pitch-deep);
  background-image:repeating-linear-gradient(90deg, rgba(255,255,255,.018) 0 64px, transparent 64px 128px), radial-gradient(150% 95% at 50% -25%, rgba(86,240,166,.12), transparent 58%);
  -webkit-font-smoothing:antialiased;
}
.m26-card{width:100%; max-width:540px; background:linear-gradient(180deg, rgba(14,64,52,.92), rgba(8,42,34,.96)); border:1px solid var(--line); border-radius:24px; padding:30px 26px 30px; box-shadow:0 30px 80px -30px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,.05); position:relative}
.m26-title, .m26-turn-name, .m26-win-title, .m26-row-score, .m26-mini-score, .m26-pos, .m26-trophy, .m26-code, .m26-timer-num{font-family:'Anton','Arial Narrow',Impact,sans-serif; font-weight:400}

.m26-kicker{display:inline-flex; align-items:center; gap:8px; font-size:12.5px; font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:var(--lime); margin-bottom:14px}
.m26-ball{font-size:15px}
.m26-title{font-size:clamp(46px,13vw,68px); line-height:.92; text-transform:uppercase; letter-spacing:.005em; color:var(--chalk)}
.m26-title-sm{font-size:clamp(34px,9vw,46px)}
.m26-gold{color:var(--gold)}
.m26-sub{margin-top:14px; color:var(--dim); font-size:14.5px; line-height:1.55; max-width:46ch}

.m26-pitchline{position:relative; height:1px; background:linear-gradient(90deg, transparent, var(--line) 12%, var(--line) 88%, transparent)}
.m26-pitchline-circle{position:absolute; left:50%; top:50%; width:34px; height:34px; transform:translate(-50%,-50%); border:1px solid var(--line); border-radius:50%}

.m26-label{font-size:12px; font-weight:800; letter-spacing:.14em; text-transform:uppercase; color:var(--chalk); display:flex; align-items:center; gap:10px; margin-bottom:12px}
.m26-sublabel{font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--dim); margin-bottom:9px}
.m26-count{font-weight:600; letter-spacing:.04em; color:var(--dim); text-transform:none; font-size:11.5px}

.m26-addrow{display:flex; gap:10px}
.m26-input{flex:1; min-width:0; background:var(--panel2); border:1px solid var(--line); color:var(--chalk); border-radius:12px; padding:13px 14px; font-size:15px; font-family:inherit; outline:none; transition:border-color .15s, box-shadow .15s}
.m26-input::placeholder{color:#5d8074}
.m26-input:focus-visible{border-color:var(--lime); box-shadow:0 0 0 3px rgba(86,240,166,.18)}
.m26-input-full{width:100%}
.m26-add{background:var(--panel); border:1px solid var(--line); color:var(--chalk); border-radius:12px; padding:0 18px; font-weight:700; font-size:14px; cursor:pointer; font-family:inherit; transition:background .15s, border-color .15s}
.m26-add:hover:not(:disabled){background:#125444; border-color:var(--lime)}
.m26-add:disabled{opacity:.4; cursor:not-allowed}

.m26-players{display:flex; flex-wrap:wrap; gap:8px; margin-top:12px}
.m26-chip{display:inline-flex; align-items:center; gap:8px; background:var(--panel2); border:1px solid var(--line); border-left:3px solid var(--c); border-radius:11px; padding:7px 9px 7px 11px}
.m26-dot{width:8px; height:8px; border-radius:50%; background:var(--c); box-shadow:0 0 8px var(--c)}
.m26-chip-name{font-size:13.5px; font-weight:600; max-width:140px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap}
.m26-x{background:none; border:none; color:var(--dim); font-size:18px; line-height:1; cursor:pointer; padding:0 2px; transition:color .15s}
.m26-x:hover{color:var(--coral)}

.m26-pills{display:flex; gap:8px; flex-wrap:wrap}
.m26-pill{width:54px; height:46px; border-radius:12px; border:1px solid var(--line); background:var(--panel2); color:var(--chalk); font-size:15px; font-weight:800; cursor:pointer; font-family:inherit; transition:all .15s}
.m26-pill-wide{flex:1; min-width:64px; width:auto}
.m26-pill:hover{border-color:var(--lime)}
.m26-pill.is-on{background:var(--gold); color:#1c1402; border-color:var(--gold); box-shadow:0 8px 22px -8px rgba(255,203,61,.6)}
.m26-hint{margin-top:11px; font-size:12.5px; color:var(--dim); line-height:1.5}
.m26-warn{color:var(--gold)}

.m26-start{width:100%; margin-top:24px; padding:17px; border:none; border-radius:14px; cursor:pointer; background:var(--lime); color:#05231a; font-family:'Inter',sans-serif; font-size:16px; font-weight:800; letter-spacing:.01em; box-shadow:0 14px 30px -12px rgba(86,240,166,.7); transition:transform .12s, box-shadow .15s, opacity .15s}
.m26-start:hover:not(:disabled){transform:translateY(-1px); box-shadow:0 18px 36px -12px rgba(86,240,166,.8)}
.m26-start:active:not(:disabled){transform:translateY(0)}
.m26-start:disabled{opacity:.4; cursor:not-allowed; box-shadow:none}
.m26-ghost{width:100%; margin-top:10px; padding:14px; border:1px solid var(--line); border-radius:14px; cursor:pointer; background:transparent; color:var(--dim); font-family:inherit; font-size:14.5px; font-weight:600; transition:color .15s, border-color .15s}
.m26-ghost:hover{color:var(--chalk); border-color:var(--dim)}
.m26-exit{display:inline-flex; align-items:center; gap:6px; background:none; border:none; color:var(--dim); font-family:inherit; font-size:13px; cursor:pointer; padding:0 0 14px; transition:color .15s}
.m26-exit:hover{color:var(--chalk)}

.m26-modes{display:flex; flex-direction:column; gap:12px; margin-top:6px}
.m26-mode{display:flex; align-items:center; gap:14px; text-align:left; width:100%; background:var(--panel2); border:1px solid var(--line); border-radius:16px; padding:18px; cursor:pointer; color:var(--chalk); font-family:inherit; transition:border-color .15s, transform .1s, background .15s}
.m26-mode:hover{border-color:var(--lime); background:#0d3e32}
.m26-mode:active{transform:scale(.99)}
.m26-mode-emoji{font-size:26px; flex:0 0 auto; width:48px; height:48px; display:grid; place-items:center; background:rgba(255,255,255,.05); border-radius:13px; border:1px solid var(--line)}
.m26-mode-main{flex:1; display:flex; flex-direction:column}
.m26-mode-title{font-size:16px; font-weight:800; margin-bottom:4px}
.m26-mode-desc{font-size:13px; color:var(--dim); line-height:1.45}
.m26-mode-arrow{color:var(--dim); font-size:20px; flex:0 0 auto}

.m26-codebox{text-align:center; background:var(--panel2); border:1px dashed var(--line); border-radius:16px; padding:20px; margin:16px 0 14px}
.m26-code-label{font-size:11.5px; letter-spacing:.16em; text-transform:uppercase; color:var(--dim); margin-bottom:8px}
.m26-code{font-size:clamp(42px,15vw,62px); letter-spacing:.14em; color:var(--gold); line-height:1}
.m26-or{display:flex; align-items:center; gap:12px; color:var(--dim); font-size:11.5px; letter-spacing:.12em; text-transform:uppercase; margin:22px 0}
.m26-or::before,.m26-or::after{content:""; flex:1; height:1px; background:var(--line)}
.m26-joinrow{display:flex; gap:10px}
.m26-codeinput{text-transform:uppercase; letter-spacing:.18em; font-weight:800; text-align:center}
.m26-err{margin-top:16px; padding:12px 14px; border-radius:11px; background:rgba(255,107,107,.1); border:1px solid rgba(255,107,107,.32); color:#ffe3e3; font-size:13.5px; line-height:1.45}
.m26-lobby{display:flex; flex-direction:column; gap:8px}
.m26-lobby-item{display:flex; align-items:center; gap:10px; background:var(--panel2); border:1px solid var(--line); border-radius:11px; padding:11px 13px; font-size:14.5px; font-weight:600}
.m26-lobby-num{color:var(--dim); font-size:13px; width:18px}
.m26-wait{text-align:center; color:var(--dim); font-size:14px; padding:14px; border:1px dashed var(--line); border-radius:12px}
.m26-answered{text-align:center; font-size:13.5px; color:var(--gold); margin-top:20px}
.m26-answered b{font-weight:800}

.m26-topbar{display:flex; align-items:center; gap:12px; justify-content:space-between; margin-bottom:16px}
.m26-round{font-size:13px; color:var(--dim); white-space:nowrap}
.m26-round b{color:var(--chalk); font-weight:800}
.m26-scorestrip{display:flex; gap:6px; overflow-x:auto; padding-bottom:2px; -ms-overflow-style:none; scrollbar-width:none}
.m26-scorestrip::-webkit-scrollbar{display:none}
.m26-mini{display:flex; align-items:center; gap:6px; flex:0 0 auto; background:var(--panel2); border:1px solid var(--line); border-radius:9px; padding:5px 9px; opacity:.72; transition:opacity .2s, border-color .2s}
.m26-mini.is-active{opacity:1; border-color:var(--c); box-shadow:0 0 0 1px var(--c)}
.m26-mini-name{font-size:11.5px; color:var(--dim); max-width:88px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap}
.m26-mini.is-active .m26-mini-name{color:var(--chalk)}
.m26-mini-score{font-size:15px; color:var(--c)}

.m26-progress{height:4px; background:var(--panel2); border-radius:4px; overflow:hidden; margin-bottom:18px}
.m26-progress span{display:block; height:100%; background:linear-gradient(90deg,var(--lime),var(--gold)); transition:width .35s ease}

.m26-timer{display:flex; align-items:center; gap:12px; margin-bottom:18px}
.m26-timer-num{font-size:22px; min-width:44px; text-align:center; line-height:1}
.m26-timer-bar{flex:1; height:9px; background:var(--panel2); border:1px solid var(--line); border-radius:7px; overflow:hidden}
.m26-timer-bar span{display:block; height:100%; border-radius:7px; transition:width 1s linear}

.m26-turn{margin-bottom:16px}
.m26-turn-eyebrow{font-size:11.5px; font-weight:800; letter-spacing:.18em; text-transform:uppercase; color:var(--dim)}
.m26-turn-name{font-size:clamp(30px,9vw,42px); line-height:1; text-transform:uppercase; margin-top:4px}

.m26-chiprow{display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:14px}
.m26-cat{display:inline-block; font-size:11px; font-weight:800; letter-spacing:.12em; text-transform:uppercase; color:var(--gold); background:rgba(255,203,61,.1); border:1px solid rgba(255,203,61,.3); padding:5px 10px; border-radius:999px}
.m26-lvl{display:inline-block; font-size:10.5px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; padding:5px 9px; border-radius:999px}
.m26-q{font-size:clamp(19px,5.2vw,23px); line-height:1.32; font-weight:700; margin-bottom:22px}

.m26-opts{display:flex; flex-direction:column; gap:10px}
.m26-opt{display:flex; align-items:center; gap:13px; width:100%; text-align:left; background:var(--panel2); border:1px solid var(--line); border-radius:13px; padding:15px 15px; color:var(--chalk); font-family:inherit; font-size:15.5px; cursor:pointer; min-height:56px; transition:border-color .15s, background .15s, transform .1s}
.m26-opt:hover:not(:disabled){border-color:var(--lime); background:#0d3e32}
.m26-opt:active:not(:disabled){transform:scale(.99)}
.m26-opt:disabled{cursor:default}
.m26-letter{flex:0 0 auto; width:28px; height:28px; display:grid; place-items:center; border-radius:8px; background:rgba(255,255,255,.06); border:1px solid var(--line); font-weight:800; font-size:13px; color:var(--dim)}
.m26-opt-text{flex:1}
.m26-mark{font-weight:800; font-size:16px}
.m26-opt.is-pick{border-color:var(--gold); background:rgba(255,203,61,.12)}
.m26-opt.is-pick .m26-letter{background:var(--gold); color:#1c1402; border-color:var(--gold)}
.m26-opt.is-correct{border-color:var(--lime); background:rgba(86,240,166,.14); color:#dffff0}
.m26-opt.is-correct .m26-letter{background:var(--lime); color:#05231a; border-color:var(--lime)}
.m26-opt.is-correct .m26-mark{color:var(--lime)}
.m26-opt.is-wrong{border-color:var(--coral); background:rgba(255,107,107,.13)}
.m26-opt.is-wrong .m26-letter{background:var(--coral); color:#2a0606; border-color:var(--coral)}
.m26-opt.is-wrong .m26-mark{color:var(--coral)}
.m26-opt.is-dim{opacity:.5}

.m26-feedback{margin-top:18px; padding:14px 16px; border-radius:12px; font-size:14.5px; line-height:1.45}
.m26-feedback.ok{background:rgba(86,240,166,.1); border:1px solid rgba(86,240,166,.32); color:#dffff0}
.m26-feedback.no{background:rgba(255,107,107,.08); border:1px solid rgba(255,107,107,.3); color:#ffe3e3}

.m26-castigo{margin-top:18px; padding:18px 18px 20px; border-radius:14px; background:linear-gradient(180deg, rgba(255,107,107,.16), rgba(255,203,61,.08)); border:1px solid rgba(255,107,107,.4); text-align:center; animation:m26-pop .35s ease}
.m26-castigo-eyebrow{font-size:13px; color:#ffe3e3; line-height:1.45; margin-bottom:14px}
.m26-castigo-eyebrow b{color:#fff}
.m26-castigo-label{font-size:11px; font-weight:800; letter-spacing:.18em; text-transform:uppercase; color:var(--gold); margin-bottom:8px}
.m26-castigo-text{font-size:clamp(19px,5vw,24px); font-weight:800; line-height:1.3; color:#fff}
.m26-castigo-count{font-size:13px; color:var(--dim); margin-top:2px}
@keyframes m26-pop{0%{transform:scale(.92); opacity:0} 100%{transform:scale(1); opacity:1}}

.m26-results{text-align:center; overflow:hidden}
.m26-trophy{font-size:60px; line-height:1; margin-bottom:6px}
.m26-win-title{font-size:clamp(34px,9vw,48px); line-height:1; text-transform:uppercase; color:var(--gold); margin-top:4px}
.m26-win-sub{margin-top:12px; color:var(--dim); font-size:14.5px}
.m26-prize{margin-top:14px; display:inline-block; background:rgba(255,203,61,.1); border:1px solid rgba(255,203,61,.34); color:var(--gold); padding:9px 16px; border-radius:999px; font-size:14px}
.m26-prize b{color:#fff}
.m26-board{display:flex; flex-direction:column; gap:9px; text-align:left}
.m26-row{display:flex; align-items:center; gap:13px; background:var(--panel2); border:1px solid var(--line); border-radius:13px; padding:12px 14px}
.m26-row.is-win{border-color:var(--gold); background:rgba(255,203,61,.07); box-shadow:0 0 0 1px rgba(255,203,61,.25)}
.m26-pos{font-size:20px; color:var(--dim); width:22px; text-align:center; flex:0 0 auto}
.m26-row.is-win .m26-pos{color:var(--gold)}
.m26-row-main{flex:1; min-width:0}
.m26-row-name{font-size:15px; font-weight:700; margin-bottom:7px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap}
.m26-medal{font-size:13px}
.m26-bar{height:7px; background:rgba(255,255,255,.06); border-radius:6px; overflow:hidden}
.m26-bar span{display:block; height:100%; border-radius:6px; transition:width .6s ease}
.m26-row-score{font-size:24px; flex:0 0 auto; min-width:26px; text-align:right}
.m26-actions{margin-top:6px}

.m26-confetti{position:absolute; inset:0; pointer-events:none; overflow:hidden; border-radius:24px}
.m26-confetti span{position:absolute; top:-12%; display:block; animation-name:m26-fall; animation-timing-function:linear; animation-iteration-count:infinite}
@keyframes m26-fall{0%{transform:translateY(-12%) rotate(0deg); opacity:0} 10%{opacity:1} 100%{transform:translateY(680px) rotate(540deg); opacity:.9}}
@media (prefers-reduced-motion: reduce){
  .m26-confetti{display:none}
  .m26-start, .m26-opt, .m26-progress span, .m26-bar span, .m26-mode, .m26-timer-bar span{transition:none}
}
@media (max-width:420px){
  .m26-card{padding:24px 18px}
  .m26-pill{flex:1; width:auto}
}
`;
