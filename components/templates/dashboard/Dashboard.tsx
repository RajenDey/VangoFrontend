import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { listFiles, createFile } from "@/api/file";
import VangoUIFile from "@/models/VangoUIFile";
import FilesTable from "./FilesTable";

export default function DashboardPage() {
  const [files, setFiles] = useState<VangoUIFile[]>([]);
  
  const updateFiles = async () => {
    const files = await listFiles();
    files.sort((a, b) => b.lastEdited.getTime() - a.lastEdited.getTime());
    setFiles(files);
  }

  const onCreateClick = async () => {
    const newWindow = window.open('about:blank', '_blank');
  
    const newFile = await createFile();
    updateFiles();
  
    if (newWindow !== null) {
      newWindow.location.href = `/file/${newFile.fileId}`;
    }
  }

  useEffect(() => {
    updateFiles();
  }, []);

  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Recent
          </h2>
          <div className="flex items-center space-x-2">
            <Button onClick={onCreateClick}>+ New</Button>
          </div>
        </div>
        <FilesTable files={files} updateFiles={updateFiles}/>
      </div>
    </div>
  );
}
