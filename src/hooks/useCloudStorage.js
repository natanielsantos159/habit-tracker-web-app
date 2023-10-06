import { useTelegramWebApp } from "../context/TelegramWebAppContext";

function useCloudStorage() {
  const { webApp } = useTelegramWebApp();
  const cloudStorage = webApp.CloudStorage;
  const CHAR_LIMIT = 4096;

  const getItem = (key) => {
    return new Promise((resolve, reject) => {
      cloudStorage.getItem(key, (error, value) => {
        if (error) reject(error);
        resolve(value);
      });
    });
  }

  const getItems = (keys) => {
    return new Promise((resolve, reject) => {
      cloudStorage.getItems(keys, (error, values) => {
        if (error) reject(error);
        resolve(values);
      });
    });
  }

  const setItem = (key, value) => {
    return new Promise((resolve, reject) => {
      cloudStorage.setItem(key, value, (error, success) => {
        if (error) reject(error);
        if (success) resolve(); else reject();
      });
    });
  }

  const removeItem = (key) => {
    return new Promise((resolve, reject) => {
      cloudStorage.removeItem(key, (error, success) => {
        if (error) reject(error);
        if (success) resolve(); else reject();
      });
    });
  }

  const removeItems = (keys) => {
    return new Promise((resolve, reject) => {
      cloudStorage.removeItems(keys, (error, success) => {
        if (error) reject(error);
        if (success) resolve(); else reject();
      });
    });
  }

  const getArray = async (key) => {
    const data = await getItem(key);
    if (!data) return [];
    const array = JSON.parse(data);
    if (!Array.isArray(array)) return [];
    return array;
  }

  const pushItem = async (key, item) => {
    let previousData = await getItem(key);
    let newArray, previousArray;
    if (!previousData) {
      newArray = [item];
    } else {
      previousArray = JSON.parse(previousData);
      if (!Array.isArray(previousArray)) {
        newArray = [item];
      } else {
        newArray = [...previousArray, item];
      }
    }
    
    const jsonString = JSON.stringify(newArray);
    if (jsonString.length > CHAR_LIMIT) throw new Error('Sorry, cloud storage limit for this key was reached');
    await setItem(key, jsonString);
  }

  // This method will update the first item that matches the filter callback
  const updateArrayItem = async (key, newValue, filterCb) => {
    const previousData = await getItem(key);
    if (!previousData) throw new Error('No data found for the key you provided');
    const previousArray = JSON.parse(previousData);
    if (!Array.isArray(previousArray)) {
      throw new Error('You should provide a key that points to an array');
    }

    if (typeof filterCb !== 'function') {
      throw new Error('You should provide a callback function to filter the array');
    }

    const foundItems = previousArray.filter(filterCb);
    if (foundItems.length === 0) {
      throw new Error('No items found with the callback you provided');
    }
    if (foundItems.length > 1) {
      throw new Error('More than one item found with the callback you provided');
    }

    const foundItemIndex = previousArray.findIndex(filterCb);
    const newArray = [...previousArray];
    newArray[foundItemIndex] = newValue;
    const jsonString = JSON.stringify(newArray);
    if (jsonString.length > CHAR_LIMIT) throw new Error('Sorry, cloud storage limit for this key was reached');
    await setItem(key, jsonString);
  }

  const removeArrayItem = async (key, filterCb) => {
    if (typeof filterCb !== 'function') {
      throw new Error('You should provide a callback function to filter the array');
    }
    
    const previousData = await getItem(key);
    if (!previousData) throw new Error('No data found for the key you provided');
    const previousArray = JSON.parse(previousData);
    if (!Array.isArray(previousArray)) {
      throw new Error('You should provide a key that points to an array');
    }

    const foundItems = previousArray.filter(filterCb);
    if (foundItems.length === 0) {
      throw new Error('No items found with the callback you provided');
    }
    if (foundItems.length > 1) {
      throw new Error('More than one item found with the callback you provided');
    }

    const foundItemIndex = previousArray.findIndex(filterCb);
    const newArray = [...previousArray];
    newArray.splice(foundItemIndex, 1);
    const jsonString = JSON.stringify(newArray);
    await setItem(key, jsonString);
  }

  return {
    getItem,
    getItems,
    getArray,
    setItem,
    removeItem,
    removeItems,
    pushItem,
    updateArrayItem,
    removeArrayItem,
  };
}

export default useCloudStorage;