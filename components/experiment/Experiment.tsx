import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { startExperimentRun, saveExperiment, renameExperiment, createExperimentRun, getExperimentRun } from "@/api/experiment";
import { ExperimentCell, Experiment as VangoExperiment, ExperimentParameters as VangoExperimentParameters, GridSliceCell, ExperimentRun, experimentParametersDefault } from "@/models/Experiment";
import ExperimentParameters from "./ExperimentParameters";
import GridSlice from "./GridSlice";
import { CheckCircle, Edit2Icon } from "lucide-react";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { Drawer } from "@mui/material";
import { CrossCircledIcon } from "@radix-ui/react-icons";

type ExperimentProps = {
  experiment: VangoExperiment;
  syncExperiment: () => void;
};

export default function Experiment({ experiment, syncExperiment }: ExperimentProps) {
  console.log(experiment)
  const [name, setName] = useState<string>("");
  const [runs, setRuns] = useState<ExperimentRun[]>([]);
  const [runSuccessPopup, setRunSuccessPopup] = useState<boolean>(false);
  const [runErrorPopup, setRunErrorPopup] = useState<boolean>(false);
  const [loopbackTrainPopup, setLoopbackTrainPopup] = useState<boolean>(false);

  const saveParametersAndRun = async (name: string, experimentParameters: VangoExperimentParameters) => {
    const anyEmpty = Object.values(experimentParameters).some(arr => arr.length < 1);
    const anyNaN = Object.values(experimentParameters).some(arr => arr.some((val: any) => typeof val === 'number' && isNaN(val)));
    if (anyEmpty || anyNaN) {
      setRunErrorPopup(true);
      setTimeout(() => setRunErrorPopup(false), 3000);      
    } else {
      const run = await createExperimentRun(experiment.experiment_id, name, experimentParameters);
      syncExperiment();
      startExperimentRun(run.run_id);
      setRunSuccessPopup(true);
      setTimeout(() => setRunSuccessPopup(false), 3000);
    }
  }

  const saveCell = async (cell: ExperimentCell, cellNumber: number) => {
    const updatedExperiment = {...experiment}
    updatedExperiment.cells[cellNumber] = cell;
    await saveExperiment(updatedExperiment);
    syncExperiment();
  }

  const onFinishedEditingName = async (e: EventTarget) => {
    (e as HTMLInputElement).blur();
    await renameExperiment(experiment.experiment_id, name);
    syncExperiment();
  }

  const onLoopbackTrainClick = () => {
    setLoopbackTrainPopup(true);
    setTimeout(() => setLoopbackTrainPopup(false), 3000);
  }

  useEffect(() => {
    const getRuns = async () => {
      const runs = await Promise.all(experiment.run_ids.map(run_id => getExperimentRun(run_id)));
      setRuns(runs);
    }
    setName(experiment.name);
    getRuns();
  }, [experiment]);

  return (
    <div>
      <Drawer
        PaperProps={{style: {marginTop: '20px', height: '50px', width: '200px', padding: '10px', borderRadius: '4px 0px 0px 4px', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: '2px 0px 2px 2px', borderColor: 'green', borderStyle: 'solid'}}}
        ModalProps={{BackdropProps: {style: {backgroundColor: 'rgba(0, 0, 0, 0.2)'}}}}
        open={runSuccessPopup}
        anchor="right"
        onClose={() => setRunSuccessPopup(false)}
        disableScrollLock={true}
        disableRestoreFocus={true}
      >
        <CheckCircle height={20} color="green"/>
        <p className="ml-2">Run created!</p>
      </Drawer>
      <Drawer
        PaperProps={{style: {marginTop: '20px', height: '50px', width: '200px', padding: '10px', borderRadius: '4px 0px 0px 4px', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: '2px 0px 2px 2px', borderColor: 'red', borderStyle: 'solid'}}}
        ModalProps={{BackdropProps: {style: {backgroundColor: 'rgba(0, 0, 0, 0.2)'}}}}
        open={runErrorPopup}
        anchor="right"
        onClose={() => setRunErrorPopup(false)}
        disableScrollLock={true}
        disableRestoreFocus={true}
      >
        <CrossCircledIcon height={20} color="red"/>
        <p className="ml-2">Error in parameters!</p>
      </Drawer>
      <Drawer
        PaperProps={{style: {marginTop: '20px', height: '50px', width: '300px', padding: '10px', borderRadius: '4px 0px 0px 4px', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: '2px 0px 2px 2px', borderColor: 'green', borderStyle: 'solid'}}}
        ModalProps={{BackdropProps: {style: {backgroundColor: 'rgba(0, 0, 0, 0.2)'}}}}
        open={loopbackTrainPopup}
        anchor="right"
        onClose={() => setLoopbackTrainPopup(false)}
        disableScrollLock={true}
        disableRestoreFocus={true}
      >
        <CheckCircle height={20} color="green"/>
        <p className="ml-2">Loopback training started!</p>
      </Drawer>
      <div className="flex flex-row h-screen w-full">
        <div className="flex-col md:flex flex-grow">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center space-x-2">
              <Edit2Icon height={20}/>
              <input className="text-4xl font-bold tracking-tight border-2 border-transparent hover:border-1 hover:border-black rounded-sm p-2"  type="text" value={name} onChange={(e) => setName(e.target.value)} onBlur={(e) => onFinishedEditingName(e.target)} onKeyDown={(e) => {if (e.key === 'Enter') {onFinishedEditingName(e.target)}}} onClick={(e) => (e.target as HTMLInputElement).select()} />
            </div>
            <div className="flex-col md:flex bg-white p-4 rounded shadow">
              {
                runs.length > 0 ?
                  <ExperimentParameters experimentParameters={runs[runs.length - 1].parameters} runNumber={runs.length + 1} runExperiment={saveParametersAndRun}/>
                :
                  <ExperimentParameters experimentParameters={{...experimentParametersDefault}} runNumber={1} runExperiment={saveParametersAndRun}/>
              }
            </div>
            <div className="flex-col md:flex bg-white p-4 rounded shadow">
              {
                experiment.cells.map((cell, index) => (
                  cell.type === 'GridSlice' ?
                  runs.length > 0 ?
                      <GridSlice key={index} cell={cell as GridSliceCell} runs={runs} save={(cell: ExperimentCell) => saveCell(cell, index)} openTrainPopup={onLoopbackTrainClick}/>
                      :
                      <GridSlice key={index} cell={cell as GridSliceCell} runs={[]} save={(cell: ExperimentCell) => saveCell(cell, index)} openTrainPopup={onLoopbackTrainClick}/>
                    :
                    null
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
