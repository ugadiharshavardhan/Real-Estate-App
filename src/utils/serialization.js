/**
 * Global utility to serialize MongoDB documents to plain JavaScript objects (POJOs).
 * This is significantly more efficient than JSON.parse(JSON.stringify(doc))
 * and ensures that ObjectIds and Dates are correctly converted to strings/ISOs.
 */
export function serialize(data) {
    if (data === null || data === undefined) return data;

    // Handle arrays
    if (Array.isArray(data)) {
        return data.map(item => serialize(item));
    }

    // Handle Mongoose documents
    const obj = typeof data.toObject === 'function' ? data.toObject() : data;

    // Handle lean objects or regular objects
    const serialized = { ...obj };

    // Common MongoDB/Mongoose fields
    if (serialized._id) serialized._id = serialized._id.toString();
    if (serialized.projectId && typeof serialized.projectId === 'object') {
        serialized.projectId = serialized.projectId.toString();
    }

    // Date conversions
    if (serialized.createdAt instanceof Date) serialized.createdAt = serialized.createdAt.toISOString();
    if (serialized.updatedAt instanceof Date) serialized.updatedAt = serialized.updatedAt.toISOString();
    if (serialized.date instanceof Date) serialized.date = serialized.date.toISOString();

    // Recursively handle nested objects if necessary (e.g. customer arrays)
    for (const key in serialized) {
        const val = serialized[key];
        if (Array.isArray(val)) {
            serialized[key] = val.map(item =>
                (typeof item === 'object' && item !== null && !(item instanceof Date)) ? serialize(item) : item
            );
        } else if (val instanceof Date) {
            serialized[key] = val.toISOString();
        } else if (typeof val === 'object' && val !== null) {
            // Safe check for ObjectId or other special MongoDB types without crashing
            if (val.constructor && val.constructor.name === 'ObjectId') {
                serialized[key] = val.toString();
            } else if (val.toString && val.toString() !== '[object Object]') {
                // If it has a custom toString (like ObjectId but maybe from a different version)
                serialized[key] = val.toString();
            }
        }
    }

    return serialized;
}
