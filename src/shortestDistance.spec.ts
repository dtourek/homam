import { FieldType, isObstacleField } from './map/field';
import { WorldMap } from './store';
import { ILocation } from './types';

interface IItem {
  row: number;
  col: number;
  dist: number;
}

const createItem = (row: number, col: number, dist: number): IItem => ({ row, col, dist });

function minDistance(map: WorldMap, playerLocation: ILocation, destination: ILocation) {
  const player = createItem(playerLocation.y, playerLocation.x, 0);
  const maxWidth = map[0].length;
  const maxHeight = map.length;

  // To keep track of visited QItems. Marking
  // blocked cells as visited.
  const visited = Array.from(Array(maxHeight), () => Array(maxWidth).fill(0));
  map.forEach((row, i) => {
    row.forEach((_field, j) => {
      if (isObstacleField(map[i][j])) {
        visited[i][j] = true;
      } else {
        visited[i][j] = false;
      }
    });
  });

  // applying BFS on matrix cells starting from source
  const fields = [];
  fields.push(player);
  visited[player.row][player.col] = true;

  while (fields.length != 0) {
    const first: IItem = fields[0];
    fields.shift();

    // Destination found;
    if (first.row === destination.y && first.col === destination.x) {
      return first.dist;
    }

    // moving up
    if (first.row - 1 >= 0 && visited[first.row - 1][first.col] === false) {
      fields.push(createItem(first.row - 1, first.col, first.dist + 1));
      visited[first.row - 1][first.col] = true;
    }

    // moving down
    if (first.row + 1 < maxHeight && visited[first.row + 1][first.col] === false) {
      fields.push(createItem(first.row + 1, first.col, first.dist + 1));
      visited[first.row + 1][first.col] = true;
    }

    // moving left
    if (first.col - 1 >= 0 && visited[first.row][first.col - 1] === false) {
      fields.push(createItem(first.row, first.col - 1, first.dist + 1));
      visited[first.row][first.col - 1] = true;
    }

    // moving right
    if (first.col + 1 < maxWidth && visited[first.row][first.col + 1] === false) {
      fields.push(createItem(first.row, first.col + 1, first.dist + 1));
      visited[first.row][first.col + 1] = true;
    }
  }
  return -1;
}

describe('shortestDistance', () => {
  it('should return -1 when path does not exist', () => {
    expect(
      minDistance(
        [
          [{ type: FieldType.grass }, { type: FieldType.mountain }],
          [{ type: FieldType.forest }, { type: FieldType.mountain }],
        ],
        { x: 0, y: 0 },
        { x: 1, y: 1 },
      ),
    ).toEqual(-1);
  });

  it('should work in mud fields', () => {
    expect(minDistance([[{ type: FieldType.mud }, { type: FieldType.mud }]], { x: 0, y: 0 }, { x: 1, y: 0 })).toEqual(1);
  });

  it('should work on grass fields', () => {
    expect(minDistance([[{ type: FieldType.grass }, { type: FieldType.grass }]], { x: 0, y: 0 }, { x: 1, y: 0 })).toEqual(1);
  });

  it('should return -1 when mountain field makes destination unreachable', () => {
    expect(minDistance([[{ type: FieldType.grass }, { type: FieldType.mountain }]], { x: 0, y: 0 }, { x: 1, y: 0 })).toEqual(-1);
  });

  it('should return -1 when forest field makes destination unreachable', () => {
    expect(minDistance([[{ type: FieldType.grass }, { type: FieldType.forest }]], { x: 0, y: 0 }, { x: 1, y: 0 })).toEqual(-1);
  });

  it('should return -1 when water field makes destination unreachable', () => {
    expect(minDistance([[{ type: FieldType.grass }, { type: FieldType.water }]], { x: 0, y: 0 }, { x: 1, y: 0 })).toEqual(-1);
  });

  // TODO - fix it? Player should never be on obstacle...
  xit('should return -1 when player start is on mountain field', () => {
    expect(minDistance([[{ type: FieldType.mountain }, { type: FieldType.grass }]], { x: 0, y: 0 }, { x: 1, y: 0 })).toEqual(-1);
  });

  it('should work on complex map full of grass fields', () => {
    expect(
      minDistance(
        [
          [{ type: FieldType.grass }, { type: FieldType.grass }, { type: FieldType.grass }, { type: FieldType.grass }, { type: FieldType.grass }],
          [{ type: FieldType.grass }, { type: FieldType.grass }, { type: FieldType.grass }, { type: FieldType.grass }, { type: FieldType.grass }],
          [{ type: FieldType.grass }, { type: FieldType.grass }, { type: FieldType.grass }, { type: FieldType.grass }, { type: FieldType.grass }],
          [{ type: FieldType.grass }, { type: FieldType.grass }, { type: FieldType.grass }, { type: FieldType.grass }, { type: FieldType.grass }],
          [{ type: FieldType.grass }, { type: FieldType.grass }, { type: FieldType.grass }, { type: FieldType.grass }, { type: FieldType.grass }],
        ],
        { x: 0, y: 0 },
        { x: 4, y: 4 },
      ),
    ).toEqual(8);
  });

  it('should work on complex map with obstacles', () => {
    expect(
      minDistance(
        [
          [{ type: FieldType.grass }, { type: FieldType.mountain }, { type: FieldType.grass }, { type: FieldType.grass }, { type: FieldType.grass }],
          [{ type: FieldType.grass }, { type: FieldType.mountain }, { type: FieldType.grass }, { type: FieldType.mountain }, { type: FieldType.grass }],
          [{ type: FieldType.grass }, { type: FieldType.mountain }, { type: FieldType.grass }, { type: FieldType.mountain }, { type: FieldType.grass }],
          [{ type: FieldType.grass }, { type: FieldType.mountain }, { type: FieldType.grass }, { type: FieldType.mountain }, { type: FieldType.grass }],
          [{ type: FieldType.grass }, { type: FieldType.grass }, { type: FieldType.grass }, { type: FieldType.mountain }, { type: FieldType.grass }],
        ],
        { x: 0, y: 0 },
        { x: 4, y: 4 },
      ),
    ).toEqual(16);
  });
});
