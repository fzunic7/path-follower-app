export const DIRECTIONS = {
  UP: [-1, 0],
  DOWN: [1, 0],
  LEFT: [0, -1],
  RIGHT: [0, 1],
};

export const isValidCharacter = (char) => /[@A-Z\-|+x]/.test(char);

export const findStartPosition = (map) => {
  let startPosition = null;
  map.forEach((row, rowIndex) => {
    row.forEach((char, colIndex) => {
      if (char === '@') {
        if (startPosition) {
          throw new Error('Multiple start characters found.');
        }
        startPosition = [rowIndex, colIndex];
      }
    });
  });
  if (!startPosition) {
    throw new Error('Start character not found.');
  }
  return startPosition;
};

export const findEndPosition = (map) => {
  let endPosition = null;
  map.forEach((row, rowIndex) => {
    row.forEach((char, colIndex) => {
      if (char === 'x') {
        if (endPosition) {
          throw new Error('Multiple end characters found.');
        }
        endPosition = [rowIndex, colIndex];
      }
    });
  });
  if (!endPosition) {
    throw new Error('End character not found.');
  }
  return endPosition;
};

export const getNextPosition = (position, direction) => {
  return [position[0] + direction[0], position[1] + direction[1]];
};

export const getNextDirection = (map, position, currentDirection) => {
  const possibleDirections = [DIRECTIONS.UP, DIRECTIONS.DOWN, DIRECTIONS.LEFT, DIRECTIONS.RIGHT];
  for (let newDirection of possibleDirections) {
    const newPosition = getNextPosition(position, newDirection);
    const [newRow, newCol] = newPosition;
    if (
      newRow >= 0 && newRow < map.length &&
      newCol >= 0 && newCol < map[newRow].length &&
      isValidCharacter(map[newRow][newCol]) &&
      (newDirection[0] !== -currentDirection[0] || newDirection[1] !== -currentDirection[1])
    ) {
      return newDirection;
    }
  }
  throw new Error('Invalid map: No valid next step.');
};

export const followPath = (map) => {
  let collectedLetters = '';
  let path = '';
  const startPosition = findStartPosition(map);
  const endPosition = findEndPosition(map);

  let position = startPosition;
  let direction = null;

  const visited = new Set();
  visited.add(position.toString());

  while (true) {
    const [row, col] = position;
    const currentChar = map[row][col];
    path += currentChar;

    if (/[A-Z]/.test(currentChar) && !collectedLetters.includes(currentChar)) {
      collectedLetters += currentChar;
    }

    if (position.toString() === endPosition.toString()) {
      break;
    }

    if (currentChar === '+' || direction === null) {
      direction = getNextDirection(map, position, direction || DIRECTIONS.RIGHT);
    }

    const nextPosition = getNextPosition(position, direction);

    if (
      nextPosition[0] < 0 || nextPosition[0] >= map.length ||
      nextPosition[1] < 0 || nextPosition[1] >= map[nextPosition[0]].length ||
      !isValidCharacter(map[nextPosition[0]][nextPosition[1]]) ||
      visited.has(nextPosition.toString())
    ) {
      throw new Error('Invalid map: Broken path.');
    }

    visited.add(nextPosition.toString());
    position = nextPosition;
  }

  return { collectedLetters, path };
};
