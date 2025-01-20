import { MMKV } from "react-native-mmkv";

export const storage = new MMKV({
    id: 'user_storage',
    encryptionKey: 'some-secret-key'
});

export const mmkvStorage = {
    setItem: (key: string, value: any) => {
        storage.set(key, value);
    },
    getItem: (key: string) => {
        const value = storage.getString(key);
        return value ?? null;
    },
    removeItem: (key: string) => {
        storage.delete(key);
    },
}



// MMKV is an efficient, small mobile key-value storage framework.
// Get and set strings, booleans, numbers and ArrayBuffers.
// Fully synchronous calls, no async/await, no Promises, no Bridge.
// Encryption support (secure storage).
// Multiple instances support (separate user-data with global data).
// Customizable storage location.
// High performance because everything is written in C++.
// ~30x faster than AsyncStorage.