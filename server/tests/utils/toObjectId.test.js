import { ObjectId } from 'mongodb';
import { toObjectId } from '../../src/utils/toObjectId.js';

describe('toObjectId helper', () => {
    test('chuyển đổi string hợp lệ sang ObjectId', () => {
        const hex = '507f1f77bcf86cd799439011'; // 24 hex chars
        const objId = toObjectId(hex);

        expect(objId).toBeInstanceOf(ObjectId);
        expect(objId.toHexString()).toBe(hex);
    });

    test('ném lỗi khi id rỗng', () => {
        expect(() => toObjectId('')).toThrow('Invalid id: empty');
    });

    test('ném lỗi khi id không hợp lệ (sai hex)', () => {
        expect(() => toObjectId('abc123')).toThrow(/Invalid ObjectId/);
    });

    test('ném lỗi khi id dài nhưng không hợp lệ', () => {
        const invalid = 'x'.repeat(24);
        expect(() => toObjectId(invalid)).toThrow(/Invalid ObjectId/);
    });
});
