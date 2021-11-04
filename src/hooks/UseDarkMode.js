import { useEffect, useState } from 'react'

const UseDarkMode = () => {
    const [dark, setDark] = useState(true);

    useEffect(() => {
        if(dark) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode")
        }
    }, [dark]);

    return {dark, setDark}
}

export default UseDarkMode
