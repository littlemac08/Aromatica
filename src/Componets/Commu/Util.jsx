import { ref, get } from 'firebase/database';
import { database } from './Sdk';

export const fetchDataForComponent = async (componentPath) => {
    const dataRef = ref(database, componentPath);

    try {
        const snapshot = await get(dataRef);

        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log("No data available");
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};

