import { ILocation } from '../player/interfaces';
import { FieldType, IField, WorldMap } from '../map/interfaces';
import { AdjacencyListEdge, IAdjacencyList, IRawPath } from './interfaces';
import { isObstacleField } from '../map/utils';

interface IQueueNode {
  value: string;
  weight: number;
}

interface IQueue {
  enqueue: (queueNode: IQueueNode) => void;
  dequeue: () => IQueueNode | undefined;
  values: IQueueNode[];
}

interface IPrevious {
  [key: string]: string | null;
}

interface IDistances {
  [key: string]: number;
}

const isEmptyObject = (object: object): boolean => Object.keys(object).length === 0;
const isNotUndefined = <T>(value: T | undefined): value is T => value !== undefined;
const filter = <T>(array: Array<T | undefined>): T[] => array.filter(isNotUndefined);
export const coordinatesToString = (location: ILocation): string => `${location.x},${location.y}`;
export const getStepCoordinates = (step: string): string[] => step.split(',');

const getFieldWeight = (field: IField): number | undefined => {
  switch (field.type) {
    case FieldType.grass:
    case FieldType.mud:
      return 1;
    case FieldType.desert:
    case FieldType.swamp:
      return 2;
    default:
      return undefined;
  }
};

const getNeighbour =
  (map: WorldMap, row: IField[]) =>
  (x: number, y: number): IField | undefined => {
    if (x < 0 || y < 0) return undefined;
    if (x > row.length - 1 || y > map.length - 1) return undefined;
    return map[y][x];
  };

const getAdjacencyNode =
  (getNeighbourFn: (x: number, y: number) => IField | undefined) =>
  (x: number, y: number): AdjacencyListEdge | undefined => {
    const neighbour = getNeighbourFn(x, y);

    if (!neighbour) {
      return undefined;
    }

    const weight = getFieldWeight(neighbour);

    return weight ? { node: coordinatesToString({ x, y }), weight } : undefined;
  };

const getNeighbours = (x: number, y: number, map: WorldMap, row: IField[]): AdjacencyListEdge[] => {
  const adjacencyNode = getAdjacencyNode(getNeighbour(map, row));

  return filter([
    adjacencyNode(x - 1, y),
    adjacencyNode(x + 1, y),
    adjacencyNode(x, y - 1),
    adjacencyNode(x, y + 1),
    adjacencyNode(x - 1, y - 1),
    adjacencyNode(x - 1, y + 1),
    adjacencyNode(x + 1, y + 1),
    adjacencyNode(x + 1, y - 1),
  ]);
};

/**
 * From map to adjacency list used in Dijkstra`s algorithm to find shortest path between 2 nodes
 * @param {WorldMap} map
 * @return IAdjacencyList
 */
export const toAdjacencyList = (map: WorldMap): IAdjacencyList => {
  const result: IAdjacencyList = {};
  map.forEach((row, y) => {
    row.forEach((col, x) => {
      if (!isObstacleField(col)) {
        result[coordinatesToString({ x, y })] = getNeighbours(x, y, map, row);
      }
    });
  });
  return result;
};

// TODO - replace queue by binary heap for better Big O
const queue = (initialValues: IQueueNode[] = []): IQueue => {
  const values = initialValues;

  const sort = (): void => {
    values.sort((a, b) => a.weight - b.weight);
  };

  return {
    values,
    enqueue: (queueNode) => {
      values.push(queueNode);
      sort();
    },
    dequeue: () => values.shift(),
  };
};

export class ShortestPath {
  constructor(private adjacencyList: IAdjacencyList = {}) {}

  init(previous: IPrevious, nodes: IQueue, startVertex: string): IDistances {
    return Object.keys(this.adjacencyList).reduce((acc, key) => {
      const priority = key === startVertex ? 0 : Infinity;
      nodes.enqueue({ value: key, weight: priority });
      previous[key] = null;

      return { ...acc, [key]: priority };
    }, {});
  }

  get(startVertex: string, finishVertex: string): IRawPath {
    if (isEmptyObject(this.adjacencyList)) return { path: [], weight: 0 };

    if (!this.adjacencyList[startVertex] || !this.adjacencyList[finishVertex]) return { path: [], weight: 0 };

    const nodes = queue();
    const previous: IPrevious = {};
    let smallest: any; // TODO - string | undefined
    const path: string[] = [];
    let pathWeight = 0;

    // build initial state
    const distances: IDistances = this.init(previous, nodes, startVertex);

    while (nodes.values.length) {
      smallest = nodes.dequeue()?.value;

      if (smallest && smallest === finishVertex) {
        // reconstruct result path
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
          pathWeight = distances[path[0]];
        }
        break;
      }

      if (smallest || distances[smallest] !== Infinity) {
        for (const neighbor in this.adjacencyList[smallest]) {
          // find neighbouring node
          const nextNode = this.adjacencyList[smallest][neighbor];

          // calculate distance to neighboring node
          const candidate = distances[smallest] + nextNode.weight;
          const nextNeighbor = nextNode.node;

          if (candidate < distances[nextNeighbor]) {
            // updating new smallest distance to neighbor
            distances[nextNeighbor] = candidate;
            // updating previous - how we got to neighbor
            previous[nextNeighbor] = smallest;
            // enqueue in priority queue with new priority
            nodes.enqueue({ value: nextNeighbor, weight: candidate });
          }
        }
      }
    }

    return { path: path.concat(smallest).reverse(), weight: pathWeight };
  }
}
