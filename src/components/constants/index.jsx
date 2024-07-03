export const DIRECTIONS = {
  UP: [-1, 0],
  DOWN: [1, 0],
  LEFT: [0, -1],
  RIGHT: [0, 1],
};

export const VALID_MAPS = {
  BASIC_EXAMPLE: {
    map: [
      ["@", "-", "-", "-", "A", "-", "-", "-", "+"],
      [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
      ["x", "-", "B", "-", "+", " ", " ", " ", "C"],
      [" ", " ", " ", " ", "|", " ", " ", " ", "|"],
      [" ", " ", " ", " ", "+", "-", "-", "-", "+"],
    ],
    expectedLetters: "ACB",
    expectedPath: "@---A---+|C|+---+|+-B-x",
  },
  INTERSECTIONS: {
    map: [
      ["@"],
      ["|", " ", "+", "-", "C", "-", "-", "+"],
      ["A", " ", "|", " ", " ", " ", " ", "|"],
      ["+", "-", "-", "-", "B", "-", "-", "+"],
      [" ", " ", "|", " ", " ", " ", " ", " ", " ", "x"],
      [" ", " ", "|", " ", " ", " ", " ", " ", " ", "|"],
      [" ", " ", "+", "-", "-", "-", "D", "-", "-", "+"],
    ],
    expectedLetters: "ABCD",
    expectedPath: "@|A+---B--+|+--C-+|-||+---D--+|x",
  },
  LETTERS_ON_TURNS: {
    map: [
      ["@", "-", "-", "-", "A", "-", "-", "-", "+"],
      [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
      ["x", "-", "B", "-", "+", " ", " ", " ", "|"],
      [" ", " ", " ", " ", "|", " ", " ", " ", "|"],
      [" ", " ", " ", " ", "+", "-", "-", "-", "C"],
    ],
    expectedLetters: "ACB",
    expectedPath: "@---A---+|||C---+|+-B-x",
  },
  NO_DUPLICATE_LETTERS: {
    map: [
      [" ", " ", " ", " ", "+", "-", "O", "-", "N", "-", "+", " ", " "],
      [" ", " ", " ", " ", "|", " ", " ", " ", " ", " ", "|", " ", " "],
      [" ", " ", " ", " ", "|", " ", " ", " ", "+", "-", "I", "-", "+"],
      ["@", "-", "G", "-", "O", "-", "+", " ", "|", " ", "|", " ", "|"],
      [" ", " ", " ", " ", "|", " ", "|", " ", "+", "-", "+", " ", "E"],
      [" ", " ", " ", " ", "+", "-", "+", " ", " ", " ", " ", " ", "S"],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "x"],
    ],
    expectedLetters: "GOONIES",
    expectedPath: "@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x",
  },
  COMPACT_SPACE: {
    map: [
      [" ", "+", "-", "L", "-", "+"],
      [" ", "|", " ", " ", "+", "A", "-", "+"],
      ["@", "B", "+", " ", "+", "+", " ", "H"],
      [" ", "+", "+", " ", " ", " ", " ", "x"],
    ],
    expectedLetters: "BLAH",
    expectedPath: "@B+++B|+-L-+A+++A-+Hx",
  },
  IGNORE_AFTER_END: {
    map: [
      ["@", "-", "A", "-", "-", "+"],
      [" ", " ", " ", " ", " ", "|"],
      [" ", " ", " ", " ", " ", "+", "-", "B", "-", "-", "x", "-", "C", "-", "-", "D"],
    ],
    expectedLetters: "AB",
    expectedPath: "@-A--+|+-B--x",
  },
};


export const INVALID_MAPS = {
  MISSING_START_CHARACTER: {
    map: [
      [" ", " ", " ", "-", "A", "-", "-", "-", "+"],
      [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
      ["x", "-", "-", "+", " ", " ", " ", " ", "C"],
      [" ", " ", " ", "|", " ", " ", " ", " ", "|"],
      [" ", " ", " ", "+", "-", "-", "-", "-", "+"],
    ],
  },
  MISSING_END_CHARACTER: {
    map: [
      ["@", "-", "-", "A", "-", "-", "-", "+"],
      [" ", " ", " ", " ", " ", " ", " ", "|"],
      ["B", "-", "+", " ", " ", " ", " ", "C"],
      [" ", " ", "|", " ", " ", " ", " ", "|"],
      [" ", " ", "+", "-", "-", "-", "-", "+"],
    ],
  },
  MULTIPLE_STARTS: {
    map: [
      [" ","@", "-", "-", "A", "@", "-", "+"],
      [" ", " ", " ", " ", " ", " ", " ", "|"],
      ["x", "B", "-", "+", " ", " ", " ", "C"],
      [" ", " ", "|", " ", " ", " ", " ", "|"],
      [" ", " ", "+", "-", "-", "-", "-", "+"],
    ],
  },
  FORK_IN_PATH: {
    map: [
      ["@", "-", "-", "A", "-", "+"],
      [" ", " ", " ", " ", " ", "|"],
      [" ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", "B", "-", "x"],
    ],
  },
  MULTIPLE_STARTING_PATHS: {
    map: [
      ["x", "-", "B", "-", "@", "-", "x"]
    ],
  },
  FAKE_TURN: {
    map: [
      ["@", "-", "A", "-", "+", "B", "-", "x"]
    ],
  },
};
