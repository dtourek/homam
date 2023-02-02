import { IPath } from './usePath';

export const getPathField = (path: IPath[], x: number, y: number): IPath | undefined => path.find(({ location }) => location.x === x && location.y === y);
