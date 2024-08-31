export const fetchInstance = async (method, path, body) => {
    try {
        if (body) {
            return await fetch(`https://show-time-murex.vercel.app${path}`, {
                method: method,
                body: JSON.stringify(body),
                headers: {
                    withCredentials: true,
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            });
        } else {
            return await fetch(`https://show-time-murex.vercel.app${path}`, {
                method: method,
                headers: {
                    withCredentials: true,
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            });
        }
    } catch (err) {
        console.log(err)
    }
}