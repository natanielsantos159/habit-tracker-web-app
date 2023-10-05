import { useTelegramWebApp } from "../context/TelegramWebAppContext";

function useCloudStorage() {
  const webApp = useTelegramWebApp();
  const cloudStorage = webApp.CloudStorage;

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

  const pushItem = async (key, item) => {
    const previousArray = await getItem(key);
    if (!Array.isArray(previousArray)) {
      throw new Error('You should provide a key that points to an array');
    }
    
    const newArray = [...previousArray, item];
    await setItem(key, newArray);
  }

  // This method will update the first item that matches the filter callback
  const updateArrayItem = async (key, newValue, filterCb) => {
    const previousArray = await getItem(key);
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
    await setItem(key, newArray);
  }

  const removeArrayItem = async (key, filterCb) => {
    if (typeof filterCb !== 'function') {
      throw new Error('You should provide a callback function to filter the array');
    }
  
    const previousArray = await getItem(key);
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
    await setItem(key, newArray);
  }

  return {
    getItem,
    getItems,
    setItem,
    removeItem,
    removeItems,
    pushItem,
    updateArrayItem,
    removeArrayItem,
  };
}

export default useCloudStorage;