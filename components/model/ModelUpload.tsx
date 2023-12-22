import { useState } from "react";
import { Button } from "@/components/ui/button";
import { upload } from "@/api/model";
import { LinearProgress } from "@mui/material";

const ModelUpload = () => {
    const [modelName, setModelName] = useState<string>("");
    const [modelFile, setModelFile] = useState<File>();
    const [uploadProgress, setUploadProgress] = useState<number>(0);

    return (
        <div className="flex flex-col space-y-6 pt-10 pl-10 w-1/2">
            <h2 className="text-3xl font-bold tracking-tight">
                Upload Model Checkpoint (.safetensors)
            </h2>
            <input
                type="text"
                placeholder="Model Name"
                className="w-full p-2 border rounded focus:ring focus:ring-opacity-50 focus:ring-blue-500"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
            />
            <input
                type="file"
                accept=".safetensors"
                className="w-full p-2 border rounded focus:ring focus:ring-opacity-50 focus:ring-blue-500"
                onChange={(e) => {
                    if (e.target.files) {
                        setModelFile(e.target.files[0]);
                    }
                }}
            />
            <div className="flex space-x-4 items-center">
                <Button
                    className="w-1/4"
                    onClick={() => {
                        if (modelFile) {
                            upload(modelName, modelFile, 'Checkpoint', setUploadProgress);
                        }
                    }}
                >
                    Upload
                </Button>
                <div className="flex flex-col w-3/4">
                    Upload Progress {uploadProgress}%
                    <LinearProgress className="w-full" variant="determinate" value={uploadProgress} />
                </div>
            </div>
        </div>
    )
}

export default ModelUpload;
