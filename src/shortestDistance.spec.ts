import { FieldType } from './map/field';

const N = 4;
const M = 4;

interface IItem {
  row: number;
  col: number;
  dist: number;
}

const createItem = (row: number, col: number, dist: number): IItem => ({ row, col, dist });

function minDistance(grid: string[][]) {
  const player = createItem(0, 0, 0);

  // To keep track of visited QItems. Marking
  // blocked cells as visited.
  const visited = Array.from(Array(N), () => Array(M).fill(0));
  console.log(visited);
  grid.forEach((row, i) => {
    row.forEach((_field, j) => {
      if (grid[i][j] === '0') {
        visited[i][j] = true;
      } else {
        visited[i][j] = false;
      }

      // Finding source
      if (grid[i][j] === 's') {
        player.row = i;
        player.col = j;
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
    if (grid[first.row][first.col] === 'd') {
      return first.dist;
    }

    // moving up
    if (first.row - 1 >= 0 && visited[first.row - 1][first.col] === false) {
      fields.push(createItem(first.row - 1, first.col, first.dist + 1));
      visited[first.row - 1][first.col] = true;
    }

    // moving down
    if (first.row + 1 < N && visited[first.row + 1][first.col] === false) {
      fields.push(createItem(first.row + 1, first.col, first.dist + 1));
      visited[first.row + 1][first.col] = true;
    }

    // moving left
    if (first.col - 1 >= 0 && visited[first.row][first.col - 1] === false) {
      fields.push(createItem(first.row, first.col - 1, first.dist + 1));
      visited[first.row][first.col - 1] = true;
    }

    // moving right
    if (first.col + 1 < M && visited[first.row][first.col + 1] === false) {
      fields.push(createItem(first.row, first.col + 1, first.dist + 1));
      visited[first.row][first.col + 1] = true;
    }
  }
  return -1;
}

const grid = [
  ['*', '*', '*', '0'],
  ['s', '0', '*', '*'],
  ['0', '0', '0', '*'],
  ['d', '*', '*', '*'],
];

const map = [
  [{ type: FieldType.forest }, { type: FieldType.mountain }],
  [{ type: FieldType.grass }, { type: FieldType.mud }],
];

describe('shortestDistance', () => {
  it('should return -1 when path does not exist', () => {
    expect(
      minDistance([
        ['0', '*', '0', '0'],
        ['0', '*', '0', '0'],
        ['s', '*', '0', '0'],
        ['0', '0', '0', 'd'],
      ]),
    ).toEqual(-1);
  });

  it('should work', () => {
    expect(minDistance(grid)).toEqual(10);
  });
});
