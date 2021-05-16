import findKey from 'lodash/findKey';

export function getPropertyKeyCaseInsensitive(obj: any, name: string) {
    const realName = findKey(obj, (value, key) => key.toLowerCase() === name.toLowerCase())!;
    return obj[realName];
}

export function containsCaseInsensitiveInArray(arrayList: any, itemInArray: string) {
    if (itemInArray || itemInArray === '') {
        return arrayList.findIndex((item: any) => itemInArray.toLowerCase() === item.toLowerCase()) >= 0;
    }
    return false;
}

export function returnsCaseSensitiveOutArray(arrayList: any, itemInArray: string) {
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
