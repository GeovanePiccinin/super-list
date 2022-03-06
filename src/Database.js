import AsyncStorage from '@react-native-async-storage/async-storage';

async function getItems(list) {
    return AsyncStorage.getItem(list)
        .then(response => {
            if (response) {
                console.log('response', JSON.stringify(response))
                return Promise.resolve(JSON.parse(response));
            }                
            else
                return Promise.resolve([]);
        })
}
async function getItem(list, id) {
    const savedItems = await getItems(list);
    return savedItems.find(item => item.id === id);
}

async function saveItem(list, listItem, id) {
    listItem.id = id ? id : new Date().getTime()
    const savedItems = await getItems(list);

    console.log('savedItems', JSON.stringify(savedItems))

    if (id) {
        const index = await savedItems.findIndex(item => item.id === id);
        savedItems[index] = listItem;
    }
    else
        savedItems.push(listItem);

    console.log('new savedItems', JSON.stringify(savedItems))

    return AsyncStorage.setItem(list, JSON.stringify(savedItems));
}

async function deleteItem(list, id){
    let savedItems = await getItems(list);
    const index = await savedItems.findIndex(item => item.id === id);
    savedItems.splice(index, 1);
    return AsyncStorage.setItem(list, JSON.stringify(savedItems));
}

module.exports = {
    saveItem,
    getItems,
    getItem,
    deleteItem
}