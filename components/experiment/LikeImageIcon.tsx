import { useState } from "react";
import { ThumbsUpIcon } from "lucide-react";

type LikeImageIconProps = {
  selected: boolean;
  setSelected: (selected: boolean) => void;
};

export default function LikeImageIcon({ selected, setSelected }: LikeImageIconProps) {
  const [hover, setHover] = useState<boolean>(false);

  const getOutlineColor = () => {
    if (selected && hover) {
      return "black";
    } else if (selected && !hover) {
      return "black";
    } else if (!selected && hover) {
      return "#03a9f4";
    } else {
      return "black";
    }
  }

  const getFillColor = () => {
    if (selected || hover) {
      return "#03a9f4";
    }
    return "none";
  }
  
  return (
    <ThumbsUpIcon className="cursor-pointer" size={24} color={getOutlineColor()} fill={getFillColor()} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => setSelected(!selected)}/>
  );
}
