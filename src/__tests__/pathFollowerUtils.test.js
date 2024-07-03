
import { getNextDirection, getNextPosition } from "../utils/pathFollower";

describe("pathFollowerUtils", () => {
  describe("getNextPosition", () => {
    it("calculates the next position correctly", () => {
      const currentPosition = [0, 0];
      const direction = [1, 0]; // Move right

      const nextPosition = getNextPosition(currentPosition, direction);

      expect(nextPosition).toEqual([1, 0]);
    });

  });

  describe('getNextDirection', () => {
    it('calculates the next direction correctly based on the map', () => {
      const map = [
        ['@', '-', '-', 'A', '-', '-', '-', '+', '|', 'C', '|', '+', '-', '-', '+'],
        ['|', '-', '-', '-', 'B', '-', '-', '+', '|', '+', '-', '-', 'C', '-', 'x']
      ];
      const currentPosition = [0, 0];
      const currentDirection = [0, 1]; // Heading right initially

      const nextDirection = getNextDirection(map, currentPosition, currentDirection);
      // Expecting to turn right at the intersection
      expect(nextDirection).toEqual([0, 1]);
    });
  });
});
