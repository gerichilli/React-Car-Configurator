import { useEffect, useState } from "react"

function UseLocalStorage(key, defaultData = null) {
    const getInitialData = () => JSON.parse(localStorage.getItem(key)) ?? defaultData;
    const [data, setData] = useState(getInitialData);

    useEffect(() => {
        const storeData = () => { 
            localStorage.setItem(key, JSON.stringify(data));
        }

        storeData();
    }, [data, key])

    return { data, setData }
}

export default UseLocalStorage
