// Post user data to mongoDB
 export async function saveUser(user1) {
    const url = "http://127.0.0.1:3003/users";
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user1),
        });

        const json = await response.json();
        return json;
        // console.log(json);
    } catch (error) {
        // console.error(error);
    }
}