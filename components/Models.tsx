import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { listModels } from "@/api/model";
import { Model } from "@/models/Model";
import ModelsTable from "./model/ModelsTable";

export default function Experiments() {
  const [models, setModels] = useState<Model[]>([]);
  
  const updateModels = async () => {
    const models = await listModels();
    const sortedModels = models.sort((a, b) => new Date(b.last_edited).getTime() - new Date(a.last_edited).getTime());
    setModels(sortedModels);
  }

  const onUploadClick = async () => {
    window.open('/model/upload', '_blank');
  }

  useEffect(() => {
    updateModels();
  }, []);

  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Recent
          </h2>
          <div className="flex items-center space-x-2">
            <Button onClick={onUploadClick}>+ Upload</Button>
          </div>
        </div>
        <ModelsTable models={models} updateModels={updateModels} />
      </div>
    </div>
  );
}
