import React, { useEffect, useState } from "react";
import { ExperimentParameters, ExperimentParametersFixed } from "@/models/Experiment";
import ImageGridCell from "./ImageGridCell"
import Select from 'react-select';
import LikeImageIcon from "./LikeImageIcon";
import { listModels } from "@/api/model";

type ImageGridProps = {
  runId: string;
  experimentParameters: ExperimentParameters;
  experimentParametersFixed: ExperimentParametersFixed;
  xAxis: string;
  yAxis: string;
  modelNames: string[];
  likedImages: string[];
  addLikedImage: (url: string) => void;
  removeLikedImage: (url: string) => void;
  setXAxis: (xAxis: string) => void;
  setYAxis: (yAxis: string) => void;
};

export default function ImageGrid({ runId, experimentParameters, experimentParametersFixed, xAxis, yAxis, modelNames, likedImages, addLikedImage, removeLikedImage, setXAxis, setYAxis }: ImageGridProps) {
  const xParams: Array<string | number> = (experimentParameters as any)[xAxis];
  const yParams: Array<string | number> = (experimentParameters as any)[yAxis];

  const getS3Url = (x: number, y: number) => {
    const parameters = {
      ...experimentParametersFixed,
      [xAxis]: x,
      [yAxis]: y,
    };
    const sortedKeys = Object.keys(parameters).sort();
    const parametersString = sortedKeys.map(key => `${(parameters as any)[key]}`).join('_');
    return `https://vango-logos.s3-us-west-2.amazonaws.com/run/${runId}/${parametersString}.png`;
  }

  const isLiked = (x: number, y: number) => {
    const url = getS3Url(x, y);
    return likedImages.includes(url);
  }

  const setLiked = (x: number, y: number, liked: boolean) => {
    const url = getS3Url(x, y);
    if (liked) {
      addLikedImage(url);
    } else {
      removeLikedImage(url);
    }
  }

  const getAxisOptions = () => {
    return Object.keys(experimentParametersFixed).map((value) => ({ value, label: value }));
  }

  const getXAxisValue = () => {
    return { value: xAxis, label: xAxis };
  }

  const getYAxisValue = () => {
    return { value: yAxis, label: yAxis };
  }

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-center pr-4 font-bold w-1/6">
        <div className="w-[150px]">
          <Select options={getAxisOptions()} value={getYAxisValue()} onChange={(e) => setYAxis(e?.value || "")}/>
        </div>
      </div>
      <div className="w-5/6">
        <div className="flex justify-center items-center font-bold pt-4 pb-4">
          <div className="w-[150px]">
            <Select options={getAxisOptions()} value={getXAxisValue()} onChange={(e) => setXAxis(e?.value || "")}/>
          </div>
        </div>
        <div className='grid gap-4 w-full' style={{gridTemplateColumns: `0.3fr repeat(${xParams.length}, 1fr)`, gridTemplateRows: `2vh repeat(${yParams.length}, ${75 / yParams.length}vh)`}}>
          <div></div> {/* Corner empty cell */}
          {Array.from({ length: xParams.length }, (_, x) => (
            <div key={x} className="flex justify-center items-center">{xAxis === 'models' ? modelNames[x] : xParams[x]}</div>
          ))}

          {Array.from({ length: yParams.length }, (_, y) => (
            <React.Fragment key={y}>
              <div className="flex justify-center items-center break-words">{yAxis === 'models' ? modelNames[y] : yParams[y]}</div>
              {Array.from({ length: xParams.length }, (_, x) => (
                <div key={x} className="flex flex-col justify-center items-center space-y-2">
                  <ImageGridCell s3Url={getS3Url(x, y)} />
                  <LikeImageIcon selected={isLiked(x, y)} setSelected={() => setLiked(x, y, !isLiked(x, y))}/>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
