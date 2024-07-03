import { DIRECTIONS } from "../components/constants";

export const isValidCharacter = (char) => /[@A-Z\-|+x]/.test(char);

export const findStartPosition = (map) => {
  let startPosition = null;
  map.forEach((row, rowIndex) => {
    row.forEach((char, colIndex) => {
      if (char === '@') {
        if (startPosition) throw new Error('Multiple start characters found.');
        startPosition = [rowIndex, colIndex];
      }
    });
  });
  if (!startPosition) throw new Error('Start character not found.');
  return startPosition;
};

export const findEndPosition = (map) => {
  let endPosition = null;
  map.forEach((row, rowIndex) => {
    row.forEach((char, colIndex) => {
      if (char === 'x') {
        if (endPosition) throw new Error('Multiple end characters found.');
        endPosition = [rowIndex, colIndex];
      }
    });
  });
  if (!endPosition) throw new Error('End character not found.');
  return endPosition;
};

export const getNextPosition = (position, direction) => {
  return [position[0] + direction[0], position[1] + direction[1]];
};

export const getNextDirection = (map, position, currentDirection) => {
  const possibleDirections = [DIRECTIONS.LEFT, DIRECTIONS.RIGHT, DIRECTIONS.UP, DIRECTIONS.DOWN];
  const [row, col] = position;

  const isValidMove = ([newRow, newCol]) => (
    newRow >= 0 && newRow < map.length &&
    newCol >= 0 && newCol < map[newRow].length &&
    isValidCharacter(map[newRow][newCol])
  );

  if (currentDirection === null) {
    // If currentDirection is null, we are at the starting point (@)
    for (let newDirection of possibleDirections) {
      const [nextRow, nextCol] = getNextPosition(position, newDirection);
      if (isValidMove([nextRow, nextCol])) {
        return newDirection;
      }
    }
  } else {
    // If we are at a '+' character, consider left or right first before other directions
    const currentChar = map[row][col];
    if (currentChar === '+') {
      const leftDirection = DIRECTIONS.LEFT;
      const rightDirection = DIRECTIONS.RIGHT;

      const directionsToCheck = [leftDirection, rightDirection, ...possibleDirections.filter(dir => dir !== leftDirection && dir !== rightDirection)];

      for (let newDirection of directionsToCheck) {
        const [dx, dy] = newDirection;
        const [nextRow, nextCol] = [row + dx, col + dy];
        if (isValidMove([nextRow, nextCol]) && !(dx === -currentDirection[0] && dy === -currentDirection[1])) {
          return newDirection;
        }
      }
    } else {
      // Continue in the current direction if valid
      const [dx, dy] = currentDirection;
      const [nextRow, nextCol] = [row + dx, col + dy];
      if (isValidMove([nextRow, nextCol])) {
        return currentDirection;
      }

      // If no valid move in the current direction, consider other directions
      for (let newDirection of possibleDirections) {
        const [newRow, newCol] = getNextPosition(position, newDirection);
        if (isValidMove([newRow, newCol]) && !(newRow === row && newCol === col)) {
          return newDirection;
        }
      }
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

  // Track positions from which each letter was collected
  const collectedFromPositions = {};

  while (true) {
    const [row, col] = position;
    const currentChar = map[row][col];
    path += currentChar;

    // Check if we collected a letter
    if (/[A-Z]/.test(currentChar)) {
      if (!collectedFromPositions[currentChar]) {
        collectedFromPositions[currentChar] = [];
      }
      const positionStr = `${row},${col}`;
      if (!collectedFromPositions[currentChar].includes(positionStr)) {
        collectedFromPositions[currentChar].push(positionStr);
        collectedLetters += currentChar;
      }
      // Reset visited set when collecting a character
      visited.clear();
    }

    if (position.toString() === endPosition.toString()) break;

    direction = getNextDirection(map, position, direction);

    const nextPosition = getNextPosition(position, direction);

    if (
      nextPosition[0] < 0 || nextPosition[0] >= map.length ||
      nextPosition[1] < 0 || nextPosition[1] >= map[nextPosition[0]].length ||
      !isValidCharacter(map[nextPosition[0]][nextPosition[1]]) ||
      visited.has(nextPosition.toString())
    ) {
      throw new Error(`Invalid map: Broken path. Path up to error: ${path}, current character: ${currentChar}`);
    }

    visited.add(nextPosition.toString());
    position = nextPosition;
  }

  return { collectedLetters, path };
};

