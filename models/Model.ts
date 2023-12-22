type Model = {
    model_id: string;
    name: string;
    type: "Checkpoint" | "Lora";
    owner_id: string;
    s3_url: string;
    last_edited: string;
}

export type { Model };
