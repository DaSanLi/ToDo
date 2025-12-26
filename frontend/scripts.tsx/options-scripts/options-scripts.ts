import { fetchApi, URLBASE } from "../general-scripts/scripts";

const changePassword = async (password: string): Promise<unknown> => {
    const URL: string = `${URLBASE}/user`
    const res = await fetchApi(URL, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
    });
    console.log(res);
    return res;
}

export { changePassword };