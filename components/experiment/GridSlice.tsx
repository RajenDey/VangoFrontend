import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { GridSliceCell, ExperimentRun, ExperimentCell, ExperimentParameters, experimentParametersDefault } from "@/models/Experiment";
import Select from 'react-select';
import ImageGrid from "./ImageGrid"
import { listModels, trainDreambooth } from "@/api/model";

type GridSliceProps = {
  cell: GridSliceCell;
  runs: ExperimentRun[];
  save: (cell: ExperimentCell) => void;
  openTrainPopup: () => void;
};

export default function GridSlice({ cell, runs, save, openTrainPopup }: GridSliceProps) {
  const run = runs.find((run) => run.run_id === cell.run_id);

  const [modelNames, setModelNames] = useState<string[]>([]);
  const [likedImages, setLikedImages] = useState<string[]>([]);
  const [tunedModelName, setTunedModelName] = useState<string>("");

  const getRunOptions = () => {
    return runs.map((run) => ({ value: run.run_id, label: run.name })).reverse();
  }

  const getRunValue = () => {
    if (run) {
      return { value: run.run_id, label: run.name };
    }
    return null;
  }

  const onRunChange = (runId: string) => {
    if (runId) {
      cell.run_id = runId;
      save(cell);
    }
  }

  const getParameterOptions = (parameter: string) => {
    if (run) {
      return (run.parameters as any)[parameter].map((value: any, index: number) => {
        if (parameter === "models") {
          return { value, label: modelNames[index] };
        }
        return { value, label: value }
      });
    }
    return [];
  }

  const getParameterValue = (parameter: string) => {
    if (run) {
      const index = (cell.fixed_parameters as any)[parameter];
      const value = (run.parameters as any)[parameter][index];
      if (parameter === "models") {
        return { value: value, label: modelNames[index] };
      }
      return { value: value, label: value };
    }
    return null;
  }

  const onParameterChange = (parameter: string, value: string) => {
    const index = (run?.parameters as any)[parameter].indexOf(value);
    (cell.fixed_parameters as any)[parameter] = index;
    save(cell);
  }

  const setXAxis = (xAxis: string) => {
    if (xAxis) {
      if (xAxis === cell.y_axis) {
        cell.y_axis = cell.x_axis;
      }
      cell.x_axis = xAxis;
      save(cell);
    }
  }

  const setYAxis = (yAxis: string) => {
    if (yAxis) {
      if (yAxis === cell.x_axis) {
        cell.x_axis = cell.y_axis;
      }
      cell.y_axis = yAxis;
      save(cell);
    }
  }

  const addLikedImage = (url: string) => {
    setLikedImages([...likedImages, url]);
  }

  const removeLikedImage = (url: string) => {
    setLikedImages(likedImages.filter((image) => image !== url));
  }

  const loopbackTrain = () => {
    trainDreambooth(tunedModelName, run?.parameters.prompts[0] || "", likedImages);
    openTrainPopup();
  }

  useEffect(() => {
    const getModelNames = async () => {
      const allModels = await listModels();
      const modelNames = run?.parameters.models.map(model_id => {
        const model = allModels.find(model => model.model_id === model_id);
        return model?.name || "";
      });
      setModelNames(modelNames || []);
    }
    getModelNames();
  }, [cell]);

  return (
    <div className="flex flex-col justify-between items-center space-x-20">
      <div className="flex justify-between items-center space-x-20">
        <div className="w-1/5 min-w-[300px]">
          <div className="flex-col">
            <div className="flex justify-between items-center space-x-8 px-4 py-2 tracking-tight bg-gray-700 rounded shadow">
              <h1 className="text-xl font-bold w-1/2 text-white">Choose Run</h1>
              <Select className="w-1/2" options={getRunOptions()} value={getRunValue()} onChange={(e) => onRunChange(e?.value || "")} />
            </div>
            {
              Object.keys(cell.fixed_parameters).filter((key) => key !== cell.x_axis && key !== cell.y_axis).map((key, index) => (
                <div key={index} className="flex justify-between items-center space-x-8 shadow px-4 my-4">
                  <label className="block text-sm my-4"><span className="font-mono bg-gray-800 text-white p-1 rounded">{key.slice(0, -1)}</span></label>
                  <div className="w-[150px]">
                    <Select options={getParameterOptions(key)} value={getParameterValue(key)} onChange={(e) => onParameterChange(key, e?.value)} />
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className="w-4/5">
          <ImageGrid runId={run?.run_id || ""} experimentParameters={run?.parameters || {...experimentParametersDefault}} experimentParametersFixed={cell.fixed_parameters} xAxis={cell.x_axis} yAxis={cell.y_axis} modelNames={modelNames} likedImages={likedImages} addLikedImage={addLikedImage} removeLikedImage={removeLikedImage} setXAxis={setXAxis} setYAxis={setYAxis} />
        </div>
      </div>
      <div className="flex justify-center items-center space-x-2 h-8 mt-12 mb-4">
        <input className="border border-black h-full px-2 w-[140px] rounded" placeholder="Model name" type="text" value={tunedModelName} onChange={(e) => setTunedModelName(e.target.value)}/>
        <Button className="px-8 h-full" onClick={loopbackTrain}>Loopback Train</Button>
        <Button className="px-8 h-full" onClick={() => setLikedImages([])}>Clear Liked Images</Button>
      </div>
    </div>
  );
}
