import { Dijkstra, IAdjacencyList, toAdjacencyList } from '../../dijkstra';
import { FieldType } from '../field';

describe('dijkstra algo', () => {
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
      expect(toAdjacencyList([[{ type: FieldType.grass }]])).toEqual({ '00': [] });
    });

    it('should return 2 adjacency list nodes', () => {
      expect(toAdjacencyList([[{ type: FieldType.grass }, { type: FieldType.swamp }]])).toEqual({ '10': [{ node: '00', weight: 1 }], '00': [{ node: '10', weight: 2 }] });
    });

    it('should return 3 walkable adjacency list nodes on 2x2 matrix where 1 field is mountain', () => {
      expect(
        toAdjacencyList([
          [{ type: FieldType.grass }, { type: FieldType.swamp }],
          [{ type: FieldType.mountain }, { type: FieldType.mud }],
        ]),
      ).toEqual({
        '10': [
          { node: '00', weight: 1 },
          { node: '11', weight: 1 },
        ],
        '11': [
          { node: '10', weight: 2 },
          { node: '00', weight: 1 },
        ],
        '00': [
          { node: '10', weight: 2 },
          { node: '11', weight: 1 },
        ],
      });
    });

    it('should return 8 walkable adjacency list nodes on 3x3 matrix where 1 field is mountain', () => {
      expect(toAdjacencyList(mapMock)).toEqual({
        '10': [
          { node: '00', weight: 1 },
          { node: '20', weight: 1 },
          { node: '11', weight: 1 },
          { node: '21', weight: 2 },
        ],
        '11': [
          { node: '21', weight: 2 },
          { node: '10', weight: 2 },
          { node: '12', weight: 1 },
          { node: '00', weight: 1 },
          { node: '02', weight: 1 },
          { node: '22', weight: 2 },
          { node: '20', weight: 1 },
        ],
        '12': [
          { node: '02', weight: 1 },
          { node: '22', weight: 2 },
          { node: '11', weight: 1 },
          { node: '21', weight: 2 },
        ],
        '20': [
          { node: '10', weight: 2 },
          { node: '21', weight: 2 },
          { node: '11', weight: 1 },
        ],
        '21': [
          { node: '11', weight: 1 },
          { node: '20', weight: 1 },
          { node: '22', weight: 2 },
          { node: '10', weight: 2 },
          { node: '12', weight: 1 },
        ],
        '22': [
          { node: '12', weight: 1 },
          { node: '21', weight: 2 },
          { node: '11', weight: 1 },
        ],
        '00': [
          { node: '10', weight: 2 },
          { node: '11', weight: 1 },
        ],
        '02': [
          { node: '12', weight: 1 },
          { node: '11', weight: 1 },
        ],
      });
    });
  });

  describe('dijkstra algo', () => {
    it('should not find path when empty path sent', () => {
      const graph = new Dijkstra({});

      expect(graph.dijkstra('A', 'E')).toEqual([]);
    });

    it('should not find path when trying to find path on non existent nodes', () => {
      const graph = new Dijkstra({
        A: [{ node: 'A', weight: 4 }],
        B: [{ node: 'B', weight: 4 }],
      });

      expect(graph.dijkstra('A', 'X')).toEqual([]);
      expect(graph.dijkstra('X', 'B')).toEqual([]);
      expect(graph.dijkstra('X', 'Y')).toEqual([]);
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
      expect(new Dijkstra(adjacencyList).dijkstra('A', 'E')).toEqual(['A', 'C', 'D', 'F', 'E']);
    });

    it('should find shortest path on transformed map to adjacency list', () => {
      const list = toAdjacencyList(mapMock);
      expect(new Dijkstra(list).dijkstra('00', '22')).toEqual(['00', '11', '22']);
    });

    it('should find shortest path on big map', () => {
      const map = [
        [{ type: FieldType.grass }, { type: FieldType.mountain }, { type: FieldType.grass }, { type: FieldType.grass }, { type: FieldType.grass }],
        [{ type: FieldType.grass }, { type: FieldType.mountain }, { type: FieldType.grass }, { type: FieldType.mountain }, { type: FieldType.grass }],
        [{ type: FieldType.grass }, { type: FieldType.mountain }, { type: FieldType.grass }, { type: FieldType.mountain }, { type: FieldType.grass }],
        [{ type: FieldType.grass }, { type: FieldType.mountain }, { type: FieldType.grass }, { type: FieldType.mountain }, { type: FieldType.grass }],
        [{ type: FieldType.grass }, { type: FieldType.grass }, { type: FieldType.grass }, { type: FieldType.mountain }, { type: FieldType.grass }],
      ];

      expect(new Dijkstra(toAdjacencyList(map)).dijkstra('00', '44')).toEqual(['00', '01', '02', '03', '14', '23', '22', '21', '30', '41', '42', '43', '44']);
    });
  });
});
