import { generateShortId, generateUUID } from '../uuid';

describe('generateShortId', () => {
  it('should generate a string of length 6', () => {
    const uuid = generateShortId();
    expect(uuid).toHaveLength(6);
  });

  it('should generate a string containing only alphanumeric characters', () => {
    const uuid = generateShortId();
    expect(uuid).toMatch(/^[a-z0-9]+$/);
  });

  it('should generate unique UUIDs', () => {
    const uuids = new Set();
    for (let i = 0; i < 1000; i++) {
      uuids.add(generateShortId());
    }
    expect(uuids.size).toBe(1000);
  });
});
describe('generateUUID', () => {
  it('should generate a string of length 36', () => {
    const uuid = generateUUID();
    expect(uuid).toHaveLength(36);
  });

  it('should generate a string in the format of a UUID v4', () => {
    const uuid = generateUUID();
    expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });

  it('should generate unique UUIDs', () => {
    const uuids = new Set();
    for (let i = 0; i < 100000; i++) {
      uuids.add(generateUUID());
    }
    expect(uuids.size).toBe(100000);
  });

  it('should generate a UUID with the correct version number', () => {
    const uuid = generateUUID();
    const version = parseInt(uuid.charAt(14), 16);
    expect(version).toBe(4);
  });

});
