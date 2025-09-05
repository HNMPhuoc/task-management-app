import { ObjectId } from 'mongodb';

/**
 * Convert string id sang ObjectId an toàn
 * @param {string} id - MongoDB id dạng hex string
 * @returns {ObjectId}
 */
export const toObjectId = (id) => {
    if (!id) {
        throw new Error('Invalid id: empty');
    }
    try {
        return ObjectId.createFromHexString(id);
    } catch (err) {
        throw new Error(`Invalid ObjectId: ${id}`);
    }
};
