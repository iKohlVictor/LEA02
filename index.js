const fs = require("fs");
const path = require("path");

const afdJson = {
  language: " Aceita qualquer palavra que termina em 1",
  alphabet: ["0", "1"],
  states: ["q0", "q1"],
  q0: {
    start: true,
    end: false,
    path: ["q0", "q1"],
  },
  q1: {
    start: false,
    end: true,
    path: ["q0", "q1"],
  },
};

const wordData = [
  "0001000111",
  "00010001110001000111",
  "001",
  "1",
  "00",
  "01",
  "0010",
  "0101",
  "0010101",
  "00000001",
  "11111110",
  "00000010",
  "0",
  "01",
  "01110",
  "01010101010101010",
  "0101111111000001",
  "1010111010",
  "101010001",
  "1000000",
];

const getWord = async (pathWord) => {
  try {
    const data = fs.readFileSync(pathWord, "utf-8");
    return data;
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
};

const getAfd = async (pathJson) => {
  try {
    const data = fs.readFileSync(pathJson, "utf-8");
    return data;
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
};

const main = async () => {
  // const pathWord = process.argv[2];
  // const pathJson = process.argv[3];
  // const wordData = await getWord(pathWord);
  // const afdData = await getAfd(pathJson);

  for (const word of wordData) {
    const letters = word.split("");
    const lastLetter = letters[letters.length - 1];
    const states = afdJson.states;
    console.log(afdJson.language + ":");
    console.log(word);
    let state;
    for (const letter of letters) {
      if(afdJson.alphabet[0] === letter){
        
      }
      console.log("-> ", letter, "-> ");
    }
  }
};
main();
