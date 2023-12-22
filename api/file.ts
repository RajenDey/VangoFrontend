import { BASE_URL } from "./base_url";
import VangoUIFile from "@/models/VangoUIFile";

const FILE_BASE_URL = `${BASE_URL}/file`;

export async function listFiles(): Promise<VangoUIFile[]> {
    const response = await fetch(`${FILE_BASE_URL}/list`, {credentials: "include"});
    const files = await response.json();
    return await Promise.all(files.map(VangoUIFile.fromObject));
}

export async function createFile(): Promise<VangoUIFile> {
    const response = await fetch(`${FILE_BASE_URL}/create`, {method: 'POST', credentials: "include"});
    const file = await response.json();
    return await VangoUIFile.fromObject(file);
}

export async function getFile(fileId: string): Promise<VangoUIFile> {
    const response = await fetch(`${FILE_BASE_URL}/${fileId}`, {credentials: "include"});
    const file = await response.json();
    return await VangoUIFile.fromObject(file);
}

export async function getFileContent(fileId: string): Promise<string> {
    const response = await fetch(`${FILE_BASE_URL}/${fileId}/content`, {credentials: "include"});
    const content = await response.text();
    return content;
}

export async function renameFile(fileId: string, newName: string): Promise<VangoUIFile> {
    const response = await fetch(`${FILE_BASE_URL}/${fileId}/rename`, {method: 'POST', credentials: "include", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({"file_name": newName})});
    const file = await response.json();
    return await VangoUIFile.fromObject(file);
}

export async function saveFile(fileId: string, content: string): Promise<void> {
    await fetch(`${FILE_BASE_URL}/${fileId}/save`, {method: 'POST', credentials: "include", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({"content": content})});
}

export async function copyFile(fileId: string): Promise<VangoUIFile> {
    const response = await fetch(`${FILE_BASE_URL}/${fileId}/copy`, {method: 'POST', credentials: "include"});
    const file = await response.json();
    return await VangoUIFile.fromObject(file);
}
