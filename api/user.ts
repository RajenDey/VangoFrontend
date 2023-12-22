import { BASE_URL } from "./base_url";
import User from "@/models/User";

const USER_BASE_URL = `${BASE_URL}/user`;

export async function getUser(userId: string): Promise<User> {
    const response = await fetch(`${USER_BASE_URL}/${userId}`, {credentials: "include"});
    const user = await response.json();
    return User.fromObject(user);
}

export async function getUsernames(userIds: string[]): Promise<string[]> {
    const response = await fetch(`${USER_BASE_URL}/usernames`, {credentials: "include", method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({user_ids: userIds})});
    const usernames = await response.json();
    return usernames;
}
