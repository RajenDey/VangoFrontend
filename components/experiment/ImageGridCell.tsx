import { useEffect, useState } from "react";

type ImageGridCellProps = {
  s3Url: string;
};

const GRAY_IMAGE_URL = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Square_gray.svg/1200px-Square_gray.svg.png";

export default function ImageGridCell({ s3Url }: ImageGridCellProps) {
  const [imageUrl, setImageUrl] = useState<string>(GRAY_IMAGE_URL);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(s3Url, { method: 'HEAD' });
        console.log("response", response)
        if (response.ok) {
          setImageUrl(s3Url);
          clearInterval(intervalId);
        }
      } catch (error) {
        console.log("error", error)
      }
    };

    setImageUrl(GRAY_IMAGE_URL);
    fetchImage();
    const intervalId = setInterval(fetchImage, 10000);
  
    return () => {
      clearInterval(intervalId);
    };
  }, [s3Url]);  

  return (
    <img src={imageUrl} className="max-w-full max-h-full object-cover" />
  );
}
