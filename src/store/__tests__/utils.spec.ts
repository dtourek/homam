import {FieldType, isObstacleField} from "../utils";
import {getField} from "../../init";

describe('utils', () => {
  describe('isObstacleField', () => {
    it('should return true on water field', () => {
      expect(isObstacleField({ type: FieldType.water })).toEqual(true);
    });

    it('should return true on mountain field', () => {
      expect(isObstacleField({ type: FieldType.mountain })).toEqual(true);
    });

    it('should return true on forest field', () => {
      expect(isObstacleField({ type: FieldType.forest })).toEqual(true);
    });

    it('should return false on grass field', () => {
      expect(isObstacleField({ type: FieldType.grass })).toEqual(false);
    });

    it('should return false on mud field', () => {
      expect(isObstacleField({ type: FieldType.mud })).toEqual(false);
    });
  });

  describe('getField', () => {
    it('should return forest field', () => {
      expect(getField(FieldType.forest)).toEqual({ type: 'forest' });
    });

    it('should return water field', () => {
      expect(getField(FieldType.water)).toEqual({ type: 'water' });
    });

    it('should return mountain field', () => {
      expect(getField(FieldType.mountain)).toEqual({ type: 'mountain' });
    });
  });
});
