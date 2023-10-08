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
    if (!Array.isArray(array)) {
      throw new Error('Data is not an array');
    };
    return array;
  }

  const setArray = async (key, array) => {
    const jsonString = JSON.stringify(array);
    if (jsonString.length > CHAR_LIMIT) throw new Error('Sorry, cloud storage limit for this key was reached');
    await setItem(key, jsonString);
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
    if (typeof filterCb !== 'function') {
      throw new Error('You should provide a callback function to filter the array');
    }
    const previousArray = await getArray(key);

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
    await setArray(key, newArray);
  }

  // Removes only one item that matches the filter callback
  const removeArrayItem = async (key, filterCb) => {
    if (typeof filterCb !== 'function') {
      throw new Error('You should provide a callback function to filter the array');
    }
    
    const previousArray = await getArray(key);

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
    await setArray(key, newArray);
  }

  // Removes all items that match the filter callback
  const removeMultipleArrayItems = async (key, filterCb) => {
    if (typeof filterCb !== 'function') {
      throw new Error('You should provide a callback function to filter the array');
    }

    const previousArray = await getArray(key);

    const newArray = previousArray.filter(item => !filterCb(item));
    await setArray(key, newArray);
  }
    
  return {
    getItem,
    getItems,
    getArray,
    setItem,
    setArray,
    removeItem,
    removeItems,
    pushItem,
    updateArrayItem,
    removeArrayItem,
    removeMultipleArrayItems,
  };
}

export default useCloudStorage;