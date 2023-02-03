export type AdjacencyListEdge = { node: string; weight: number };

export interface IAdjacencyList {
  [key: string]: AdjacencyListEdge[];
}

export interface IRawPath {
  path: string[];
  weight: number;
}
