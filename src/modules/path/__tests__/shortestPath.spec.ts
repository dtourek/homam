import { ShortestPath, toAdjacencyList } from '../shortestPath';
import { FieldType } from '../../map/interfaces';
import { IAdjacencyList } from '../interfaces';

describe('shortestPath', () => {
  const mapMock = [
    [{ type: FieldType.grass }, { type: FieldType.swamp }, { type: FieldType.mud }],
    [{ type: FieldType.mountain }, { type: FieldType.mud }, { type: FieldType.desert }],
    [{ type: FieldType.grass }, { type: FieldType.grass }, { type: FieldType.desert }],
  ];

  describe('toAdjacencyList', () => {
    it('should return {}', () => {
      expect(toAdjacencyList([[]])).toEqual({});
    });

    it('should return 1 adjacency list node without any neighbour', () => {
      expect(toAdjacencyList([[{ type: FieldType.grass }]])).toEqual({ '0,0': [] });
    });

    it('should return 2 adjacency list nodes', () => {
      expect(toAdjacencyList([[{ type: FieldType.grass }, { type: FieldType.swamp }]])).toEqual({ '1,0': [{ node: '0,0', weight: 1 }], '0,0': [{ node: '1,0', weight: 2 }] });
    });

    it('should return 3 walkable adjacency list nodes on 2x2 matrix where 1 field is mountain', () => {
      expect(
        toAdjacencyList([
          [{ type: FieldType.grass }, { type: FieldType.swamp }],
          [{ type: FieldType.mountain }, { type: FieldType.mud }],
        ]),
      ).toEqual({
        '1,0': [
          { node: '0,0', weight: 1 },
          { node: '1,1', weight: 1 },
        ],
        '1,1': [
          { node: '1,0', weight: 2 },
          { node: '0,0', weight: 1 },
        ],
        '0,0': [
          { node: '1,0', weight: 2 },
          { node: '1,1', weight: 1 },
        ],
      });
    });

    it('should return 8 walkable adjacency list nodes on 3x3 matrix where 1 field is mountain', () => {
      expect(toAdjacencyList(mapMock)).toEqual({
        '1,0': [
          { node: '0,0', weight: 1 },
          { node: '2,0', weight: 1 },
          { node: '1,1', weight: 1 },
          { node: '2,1', weight: 2 },
        ],
        '1,1': [
          { node: '2,1', weight: 2 },
          { node: '1,0', weight: 2 },
          { node: '1,2', weight: 1 },
          { node: '0,0', weight: 1 },
          { node: '0,2', weight: 1 },
          { node: '2,2', weight: 2 },
          { node: '2,0', weight: 1 },
        ],
        '1,2': [
          { node: '0,2', weight: 1 },
          { node: '2,2', weight: 2 },
          { node: '1,1', weight: 1 },
          { node: '2,1', weight: 2 },
        ],
        '2,0': [
          { node: '1,0', weight: 2 },
          { node: '2,1', weight: 2 },
          { node: '1,1', weight: 1 },
        ],
        '2,1': [
          { node: '1,1', weight: 1 },
          { node: '2,0', weight: 1 },
          { node: '2,2', weight: 2 },
          { node: '1,0', weight: 2 },
          { node: '1,2', weight: 1 },
        ],
        '2,2': [
          { node: '1,2', weight: 1 },
          { node: '2,1', weight: 2 },
          { node: '1,1', weight: 1 },
        ],
        '0,0': [
          { node: '1,0', weight: 2 },
          { node: '1,1', weight: 1 },
        ],
        '0,2': [
          { node: '1,2', weight: 1 },
          { node: '1,1', weight: 1 },
        ],
      });
    });
  });

  describe('dijkstra algo', () => {
    it('should not find path when empty path sent', () => {
      const graph = new ShortestPath({});

      expect(graph.get('A', 'E')).toEqual({ path: [], weight: 0 });
    });

    it('should not find path when trying to find path on non existent nodes', () => {
      const graph = new ShortestPath({
        A: [{ node: 'A', weight: 4 }],
        B: [{ node: 'B', weight: 4 }],
      });

      expect(graph.get('A', 'X')).toEqual({ path: [], weight: 0 });
      expect(graph.get('X', 'B')).toEqual({ path: [], weight: 0 });
      expect(graph.get('X', 'Y')).toEqual({ path: [], weight: 0 });
    });

    it('should find shortest path', () => {
      const adjacencyList: IAdjacencyList = {
        A: [
          { node: 'B', weight: 4 },
          { node: 'C', weight: 2 },
        ],
        B: [
          { node: 'A', weight: 4 },
          { node: 'E', weight: 3 },
        ],
        C: [
          { node: 'D', weight: 2 },
          { node: 'F', weight: 4 },
        ],
        D: [
          { node: 'E', weight: 3 },
          { node: 'F', weight: 1 },
        ],
        E: [
          { node: 'D', weight: 3 },
          { node: 'F', weight: 1 },
        ],
        F: [
          { node: 'C', weight: 4 },
          { node: 'E', weight: 1 },
          { node: 'D', weight: 1 },
        ],
      };
      expect(new ShortestPath(adjacencyList).get('A', 'E')).toEqual({ path: ['A', 'C', 'D', 'F', 'E'], weight: 6 });
    });

    it('should find shortest path on transformed map to adjacency list', () => {
      const list = toAdjacencyList(mapMock);
      expect(new ShortestPath(list).get('0,0', '2,2')).toEqual({ path: ['0,0', '1,1', '2,2'], weight: 3 });
    });

    it('should find shortest path on big map', () => {
      const map = [
        [{ type: FieldType.grass }, { type: FieldType.mountain }, { type: FieldType.grass }, { type: FieldType.grass }, { type: FieldType.grass }],
        [{ type: FieldType.grass }, { type: FieldType.mountain }, { type: FieldType.grass }, { type: FieldType.mountain }, { type: FieldType.grass }],
        [{ type: FieldType.grass }, { type: FieldType.mountain }, { type: FieldType.grass }, { type: FieldType.mountain }, { type: FieldType.grass }],
        [{ type: FieldType.grass }, { type: FieldType.mountain }, { type: FieldType.grass }, { type: FieldType.mountain }, { type: FieldType.grass }],
        [{ type: FieldType.grass }, { type: FieldType.grass }, { type: FieldType.grass }, { type: FieldType.mountain }, { type: FieldType.grass }],
      ];

      expect(new ShortestPath(toAdjacencyList(map)).get('0,0', '4,4')).toEqual({
        path: ['0,0', '0,1', '0,2', '0,3', '1,4', '2,3', '2,2', '2,1', '3,0', '4,1', '4,2', '4,3', '4,4'],
        weight: 12,
      });
    });
  });
});
