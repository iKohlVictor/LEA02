const fs = require("fs");
const path = require("path");
const filePath = [process.argv[2], process.argv[3]];

const readFile = async (filePath) => {
  const ext = path.extname(filePath);
  try {
    const data = fs.readFileSync(filePath, "utf8");
    if (ext == ".json") {
      return JSON.parse(data);
    }
    if (ext == ".txt") {
      return formatTxtArray(data);
    }
  } catch (err) {
    console.error(err);
  }
};

const formatTxtArray = async (txtArray) => {
  let data = [];
  let lines = txtArray.split("\n");
  let array = [];
  lines.forEach((l) => {
    array.push(l.replace(",", ""));
  });

  data = array;
  return data;
};

const main = async () => {
  let afdJson;
  let wordData;

  if (filePath) {
    afdJson = await readFile(filePath[0]);
    wordData = await readFile(filePath[1]);
  } else {
    return "Dont have path";
  }

  let output;
  let outputs = [];
  const { states, initialState, endState, trapState } = await getStates(
    afdJson
  );

  let cont = 0;
  for (const word of wordData) {
    const letters = word.toString().split("");
    let state = initialState;
    for (const letter of letters) {
      state = await checkingState(afdJson, letter, state);
    }
    if (state === endState) {
      output = "[" + cont + "] " + word + " -> " + "accept ";
    } else {
      output = "[" + cont + "] " + word + " -> " + "reject ";
    }

    cont++;
    outputs.push(output);
  }
  outputs.splice(0, 0, afdJson.language + ":");

  await createOutput(outputs);
};

const getStates = async (afdJson) => {
  const states = afdJson["states"];
  let objStates = {
    states: [],
    initialState: "",
    endState: "",
    trapState: "",
  };

  objStates.states = states;
  for (const state of states) {
    if (afdJson[state]["start"] === true) {
      objStates.initialState = state;
    }
    if (afdJson[state]["end"] === true) {
      objStates.endState = state;
    }
    if (afdJson[state]["start"] === false && afdJson[state]["end"] === false) {
      objStates.trapState = state;
    }
  }
  return objStates;
};

const checkingState = (afdJson, value, state) => {
  const newState = afdJson[state]["path"][Number(value)];
  return newState;
};

const createOutput = async (outputs) => {
  const outputPath = "output.txt";

  let data = "";
  for (const output of outputs) {
    data += output + "\n";
  }
  let buffer = new Buffer.from(data);

  fs.open(outputPath, "a", function (err, fd) {
    if (err) {
      console.log("Cant open file");
    } else {
      fs.write(
        fd,
        buffer,
        0,
        buffer.length,
        null,
        function (err, writtenbytes) {
          if (err) {
            console.log("Cant write to file");
          } else {
            console.log(writtenbytes + "characters added to file");
          }
        }
      );
    }
  });
};
main();
