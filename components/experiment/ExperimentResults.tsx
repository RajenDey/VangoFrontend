import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
// import { LinearProgress, Typography } from '@mui/material'
import { getImages } from "@/api/other";
import { Experiment } from "@/models/Experiment";

type ExperimentResultsProps = {
  experiment: Experiment;
};

export default function ExperimentResults({ experiment }: ExperimentResultsProps) {
  const xLength = (experiment.parameters as any)[experiment.grid.xAxis].length;
  const yLength = (experiment.parameters as any)[experiment.grid.yAxis].length;
  const zLength = (experiment.parameters as any)[experiment.grid.zAxis].length;

  const [activeSheet, setActiveSheet] = useState(0);
  const [images, setImages] = useState<string[][][]>(new Array(xLength).fill("").map(() => new Array(yLength).fill("").map(() => new Array(zLength).fill(""))));

  const getImageSrc = (x: number, y: number, z: number) => {
    if (images[x][y][z]) {
      return images[x][y][z];
    }
    return "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Square_gray.svg/1200px-Square_gray.svg.png"
  }

  const checkImageExists = async (id: string, runs: number, x: number, y: number, z: number) => {
    const url = `https://vango-logos.s3-us-west-2.amazonaws.com/experiment/${id}/${runs}/${x}_${y}_${z}.png`;
    try {
      const response = await fetch(url, { method: 'HEAD' });
      if (response.ok) {
        return url;
      }
      return null;
    } catch (error) {
      console.log("error", error);
      return null;
    }
  };

  useEffect(() => {
    const pollForImages = () => {
      const checkNextImage = async (x: number, y: number, z: number) => {
        const url = await checkImageExists(experiment.experimentId, experiment.runs, x, y, z);
        if (url) {
          setImages((images) => {
            const newImages = [...images];
            newImages[x][y][z] = url;
            return newImages;
          });
  
          let nextX = x, nextY = y, nextZ = z;
          nextX++;
          if (nextX >= images.length) {
            nextX = 0;
            nextY++;
            if (nextY >= images[0].length) {
              nextY = 0;
              nextZ++;
              if (nextZ >= images[0][0].length) {
                clearInterval(intervalId);
                return;
              }
            }
          }
          checkNextImage(nextX, nextY, nextZ);
        }
      };
  
      // Initialize
      checkNextImage(0, 0, 0);
  
      const intervalId = setInterval(() => {
        checkNextImage(0, 0, 0);
      }, 5000);
  
      return () => clearInterval(intervalId); // Cleanup on unmount
    };
  
    pollForImages();
  }, [experiment]);

  useEffect(() => {
    setImages(new Array(xLength).fill("").map(() => new Array(yLength).fill("").map(() => new Array(zLength).fill(""))));
  }, [experiment]);
  
  return (
    <div className="flex-col md:flex bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center z-10 py-2">
        <h2 className="text-2xl font-bold tracking-tight">Results</h2>
        {
          experiment.grid.zAxis &&
          <div className="flex">
            <div className="flex justify-center items-center font-bold pr-4">
              {experiment.grid.zAxis}
            </div>
            <div className="space-x-2">
              {Array.from({ length: zLength }, (_, index) => (
                <button 
                  className={`px-3 py-1 rounded ${activeSheet === index ? 'bg-blue-600 text-white' : 'border'}`} 
                  key={index} 
                  onClick={() => setActiveSheet(index)}
                >
                  {(experiment.parameters as any)[experiment.grid.zAxis][index]}
                </button>
              ))}
            </div>
          </div>
        }
      </div>

      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-center pr-4 font-bold">
          <div>{experiment.grid.yAxis}</div>
        </div>
        <div>
          <div className="flex justify-center items-center font-bold pt-4 pb-4">
            <div>{experiment.grid.xAxis}</div>
          </div>
          <div className='grid gap-4 w-full' style={{gridTemplateColumns: `0.3fr repeat(${xLength}, 1fr)`, gridTemplateRows: `2vh repeat(${yLength}, ${75 / yLength}vh)`}}>
            <div></div> {/* Corner empty cell */}
            {Array.from({ length: xLength }, (_, x) => (
              <div key={x} className="flex justify-center items-center">{(experiment.parameters as any)[experiment.grid.xAxis][x]}</div>
            ))}

            {Array.from({ length: yLength }, (_, y) => (
              <>
                <div key={y} className="flex justify-center items-center break-words">{(experiment.parameters as any)[experiment.grid.yAxis][y]}</div>
                {Array.from({ length: xLength }, (_, x) => (
                  <div key={x} className="flex justify-center items-center border">
                    <img src={getImageSrc(x, y, activeSheet)} alt="Random" className="max-w-full max-h-full object-cover"/>
                  </div>
                ))}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
