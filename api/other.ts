import { BASE_URL } from "./base_url";
import VangoUIFile from "@/models/VangoUIFile";

const OTHER_BASE_URL = `${BASE_URL}/other`;

export async function getImages(): Promise<string[]> {
    const response = await fetch(`${OTHER_BASE_URL}/images`, {credentials: "include"});
    const images = await response.json();
    return images;
}
