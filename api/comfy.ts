import { BASE_URL } from "./base_url";

const COMFY_BASE_URL = `${BASE_URL}/comfy`;

export async function getServerUrls(): Promise<{api_url: string, ws_url: string}> {
    const response = await fetch(`${COMFY_BASE_URL}/server`, {credentials: "include"});
    const server = await response.json();
    return server;
}

export async function uploadCheckpoint(file: File): Promise<void> {
    const formData = new FormData();
    formData.append("file", file);
    await fetch(`${COMFY_BASE_URL}/upload/checkpoint`, {
        method: "POST",
        body: formData,
        credentials: "include",
    });
}

export async function uploadLora(file: File): Promise<void> {
    const formData = new FormData();
    formData.append("file", file);
    await fetch(`${COMFY_BASE_URL}/upload/lora`, {
        method: "POST",
        body: formData,
        credentials: "include",
    });
}
