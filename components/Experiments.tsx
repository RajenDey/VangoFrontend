import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { listExperiments, createExperiment } from "@/api/experiment";
import { Experiment } from "@/models/Experiment";
import ExperimentsTable from "./experiment/ExperimentsTable";

export default function Experiments() {
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  
  const updateExperiments = async () => {
    const experiments = await listExperiments();
    const sortedExperiments = experiments.sort((a, b) => new Date(b.last_edited).getTime() - new Date(a.last_edited).getTime());
    setExperiments(sortedExperiments);
  }

  const onCreateClick = async () => {
    const newWindow = window.open('about:blank', '_blank');
  
    const newExperiment = await createExperiment();
    updateExperiments();
  
    if (newWindow !== null) {
      newWindow.location.href = `/experiment/${newExperiment.experiment_id}`;
    }
  }

  useEffect(() => {
    updateExperiments();
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
        <ExperimentsTable experiments={experiments} updateExperiments={updateExperiments}/>
      </div>
    </div>
  );
}
