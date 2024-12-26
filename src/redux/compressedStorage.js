import LZString from 'lz-string';

const compressedStorage = {
  getItem: (key) => {
    return new Promise((resolve, reject) => {
      try {
        const compressed = localStorage.getItem(key);
        const decompressed = compressed ? LZString.decompress(compressed) : null;
        resolve(decompressed);
      } catch (error) {
        reject(error);
      }
    });
  },
  setItem: (key, value) => {
    return new Promise((resolve, reject) => {
      try {
        const compressed = LZString.compress(value);
        localStorage.setItem(key, compressed);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  },
  removeItem: (key) => {
    return new Promise((resolve, reject) => {
      try {
        localStorage.removeItem(key);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  },
};

export default compressedStorage;
