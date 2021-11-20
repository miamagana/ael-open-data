const fs = require("fs");

const measureTypes = {
  "TEMPERATURA_MAR (ºC)": () => getRandomNumber(5, 28),
  "TEMPERATURA_AMBIENTAL (ºC)": () => getRandomNumber(10, 38),
  "VELOCIDAD_VIENTO (km/h)": () => getRandomNumber(0, 40),
  "ESTADO_DEL_MAR (Douglas)": () => getRandomNumber(0, 11, true),
  PRESENCIA_DE_MEDUSAS: () => getRandomNumber(1, 4, true),
  ESPECIES_DE_MEDUSAS: () => getRandomMedusaSpecies(),
  "LLUVIA (mm/hora)": () => getRandomNumber(0, 120),
};

function getRandomMedusaSpecies() {
  const medusaSpecies = [
    "Aguamala",
    "Gran Medusa de Huevo Frito",
    "Medusa Comestible",
    "Medusa Común",
    "Medusa de puntos blancos",
    "Medusa Luminiscente",
    "Medusa Mosaico",
  ];
  const alreadyAdded = new Set();
  const numberOfSpecies = getRandomNumber(
    0,
    Math.floor(medusaSpecies.length / 2),
    true
  );
  const result = [];
  let counter = 0;
  while (counter < numberOfSpecies) {
    let medusaSpecieIndex = getRandomNumber(0, medusaSpecies.length, true);
    while (alreadyAdded.has(medusaSpecieIndex)) {
      medusaSpecieIndex = getRandomNumber(0, medusaSpecies.length, true);
    }
    alreadyAdded.add(medusaSpecieIndex);
    result.push(medusaSpecies[medusaSpecieIndex]);
    counter++;
  }
  return result.join(",");
}

function getRandomNumber(min, max, int = false) {
  const result = Math.random() * (max - min) + min;
  return int ? Math.floor(result) : result;
}

function generateHeader() {
  return `TIMESTAMP;${Object.keys(measureTypes).join(";")}\n`;
}

function getNextDate(input) {
  input.setTime(input.getTime() + 1 * 60 * 60 * 1000);
  if (input.getHours() === 1) {
    input.setTime(input.getTime() + 7 * 60 * 60 * 1000);
  }
  return input;
}

function generateHourlyMeasures() {
  let from = new Date("2021-06-01T06:00:00Z");
  const to = new Date("2021-09-30T22:00:00Z");
  const result = [];
  while (from <= to) {
    const lineList = [from.toISOString()];
    Object.values(measureTypes).forEach((func) => {
      lineList.push(func());
    });
    const line = `${lineList.join(";")}`;
    result.push(line);
    from = getNextDate(from);
  }
  return result;
}

function main() {
  const filePathName = "../src/assets/data.csv";
  const header = generateHeader();
  const generatedData = generateHourlyMeasures().join("\n");
  fs.writeFileSync(filePathName, header);
  fs.appendFileSync(filePathName, generatedData);
}

main();
