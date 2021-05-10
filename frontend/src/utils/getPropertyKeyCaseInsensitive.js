import findKey from 'lodash/findKey';

export function getPropertyKeyCaseInsensitive(obj, name) {
  const realName = findKey(obj, (value, key) => key.toLowerCase() === name.toLowerCase());
  return obj[realName];
}

export function containsCaseInsensitiveInArray(arrayList, itemInArray) {
  if (itemInArray || itemInArray === '') {
    return (arrayList.findIndex((item) => itemInArray.toLowerCase() === item.toLowerCase()) >= 0);
  }
  return false;
}

export function returnsCaseSensitiveOutArray(arrayList, itemInArray) {
  let foundItem; // undefined
  if (Array.isArray(arrayList)) {
    arrayList.forEach((item) => {
      if (itemInArray.toLowerCase() === item.toLowerCase()) {
        foundItem = item;
      }
    });
  }

  return foundItem;
}
