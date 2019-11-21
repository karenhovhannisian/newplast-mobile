import {Cache, MemoryStore} from "react-native-cache";
import {AsyncStorage} from "react-native";

const cache = new Cache({
    namespace: "cacheApp",
    policy: {
        maxEntries: 50000
    },
    backend: AsyncStorage
});

export default cache
