
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

//使用全局缓存
var storage = new Storage({
    // maximum capacity, default 1000 
    size: 1000,

    // Use AsyncStorage for RN, or window.localStorage for web.
    // If not set, data would be lost after reload.
    storageBackend: AsyncStorage,

    // expire time, default 1 day(1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    defaultExpires: 1000 * 3600 * 24,

    // cache data in the memory. default is true.
    enableCache: true,

    // if data was not found in storage or expired,
    // the corresponding sync method will be invoked and return 
    // the latest data.
    sync: {
        // we'll talk about the details later.
    }
})
global.storage = storage;


// examples
//see all config https://github.com/sunnylqm/react-native-storage
// Save something with key only. 
// Something more unique, and constantly being used.
// They are permanently stored unless you remove.

/*storage.save({
    key: 'loginState',   // Note: Do not use underscore("_") in key!
    data: {
        from: 'some other site',
        userid: 'some userid',
        token: 'some token'
    },

    // if not specified, the defaultExpires will be applied instead.
    // if set to null, then it will never expire.
    expires: 1000 * 3600
});*/

// load
/*storage.load({
    key: 'loginState',

    // autoSync(default true) means if data not found or expired,
    // then invoke the corresponding sync method
    autoSync: true,

    // syncInBackground(default true) means if data expired,
    // return the outdated data first while invoke the sync method.
    // It can be set to false to always return data provided by sync method when expired.(Of course it's slower)
    syncInBackground: true,

    // you can pass extra params to sync method
    // see sync example below for example
    syncParams: {
        extraFetchOptions: {
            // blahblah
        },
        someFlag: true,
    },
}).then(ret => {
    // found data go to then()
    console.log(ret.userid);
}).catch(err => {
    // any exception including data not found 
    // goes to catch()
    console.warn(err.message);
    switch (err.name) {
        case 'NotFoundError':
            // TODO;
            break;
        case 'ExpiredError':
            // TODO
            break;
    }
})*/

// remove a single record
/*storage.remove({
	key: 'lastPage'
});*/

// !! clear map and remove all "key-id" data but keep the "key-only" data
//storage.clearMap();