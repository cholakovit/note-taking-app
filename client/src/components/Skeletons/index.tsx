import { FC } from "react";

// MUI Elements
import { Skeleton } from "@mui/material";
import { SkeletonBox } from "./index.styles";

const Skeletons: FC<SkeletonProps> = ({ width, height, number }) => {
  return (
    <>
      {Array.from({ length: number }, (_, index) => ( // direct mapping(no additional iteration), flexability(array and array like objects that have length)
        <SkeletonBox key={index} data-testid="skeletons">
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={width}
            height={height}
          />
        </SkeletonBox>
      ))}
    </>
  );
};

export default Skeletons;