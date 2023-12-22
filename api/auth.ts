import { BASE_URL } from "./base_url"

const AUTH_BASE_URL = `${BASE_URL}/auth`;

export async function googleLogin(redirectAfterLogin: string) {
    window.location.href = `${AUTH_BASE_URL}/google/login?redirect_after_login=${redirectAfterLogin}`;
}

export async function logout() {
    window.location.href = `${AUTH_BASE_URL}/logout`;
}

export async function isLoggedIn() {
    const response = await fetch(`${AUTH_BASE_URL}/check`, {credentials: "include"});
    return response.status === 200
}
