import { cutHead } from '../tools';

describe('utils', () => {
  describe('cutHead', () => {
    it('should return [] on empty array', () => {
      expect(cutHead([])).toEqual([]);
    });

    it('should return 1st element when array of length 1', () => {
      expect(cutHead([1])).toEqual([1]);
    });

    it('should return rest from array', () => {
      expect(cutHead([1, undefined, null])).toEqual([undefined, null]);
    });
  });
});
