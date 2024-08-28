import { eventPromise, waitUntil } from '../helpers';

describe('helpers', () => {
  describe('waitUntil', () => {
    it('should resolve immediately if the condition is already met', async () => {
      const condition = jest.fn().mockReturnValue(true);
      await waitUntil(condition);

      expect(condition).toHaveBeenCalledTimes(1);
    });

    it('should wait and resolve when the condition becomes true', async () => {
      let count = 0;
      const condition = jest.fn(() => {
        count++;
        return count === 3;
      });
      await waitUntil(condition);

      expect(condition).toHaveBeenCalledTimes(3);
    });
  });

  describe('eventPromise', () => {
    it('should resolve with the event data when the specified event is emitted', async () => {
      const eventEmitter = {
        addEventListener: jest.fn((_, callback) => {
          setTimeout(() => {
            callback('test event data');
          }, 100);
        }),
      };
      const result = await eventPromise(eventEmitter, 'testEvent');
      expect(result).toBe('test event data');
      expect(eventEmitter.addEventListener).toHaveBeenCalledWith('testEvent', expect.any(Function));
    });
  });
});
