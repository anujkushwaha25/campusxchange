import API_BASE_URL from "../config/config";

export async function adminLogin(email, password) {

    const response = await fetch(
        `${API_BASE_URL}/admin/login`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            credentials: "include",

            body: JSON.stringify({
                email: email.trim(),
                password: password,
            }),
        }
    );

    return await response.json();
}