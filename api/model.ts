import { Model } from "@/models/Model";
import { BASE_URL } from "./base_url";

const MODEL_BASE_URL = `${BASE_URL}/model`;

export async function listModels(): Promise<Model[]> {
    const response = await fetch(`${MODEL_BASE_URL}/list`, {credentials: "include"});
    const models = await response.json();
    return models;
}

export async function upload(name: string, file: File, type: 'Checkpoint' | 'Lora', callback: (progress_percent: number) => void): Promise<Model> {
    const partSize = 1024 * 1024 * 50; // 50 MB
    const numParts = Math.ceil(file.size / partSize);
    const parts = [];
  
    // Fetch pre-signed URLs from the backend
    const response = await fetch(`${MODEL_BASE_URL}/upload/start`, { credentials: "include", method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ num_parts: numParts }) });
    const { model_id, upload_id, presigned_urls } = await response.json();
  
    // Upload each part using the pre-signed URLs
    for (let i = 0; i < numParts; i++) {
        const start = i * partSize;
        const end = start + partSize;
        const part = file.slice(start, end);

        const uploadResponse = await fetch(presigned_urls[i], {
            method: 'PUT',
            body: part
        });
        if (uploadResponse.status === 200) {
            parts.push({ ETag: uploadResponse.headers.get('ETag'), PartNumber: i + 1 });
        } else {
            throw new Error(`Upload failed with status ${uploadResponse.status}`);
        }
        callback(Math.round((i + 1) / numParts * 100));
    }

    // Complete the upload
    const completeResponse = await fetch(`${MODEL_BASE_URL}/upload/complete`, { credentials: "include", method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model_id: model_id, name: name, type: type, upload_id: upload_id, parts: parts }) });
    const model = await completeResponse.json();
    return model;
}

export async function trainDreambooth(modelName: string, instancePrompt: string, likedImages: string[]) {
    const response = await fetch(`${MODEL_BASE_URL}/train/dreambooth/start`, { credentials: "include", method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model_name: modelName, instance_prompt: instancePrompt, liked_images: likedImages }) });
}
