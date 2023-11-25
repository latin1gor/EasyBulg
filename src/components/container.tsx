import { FC } from "react";
import Dropzone from "@/components/dropzone.tsx";

const Container: FC = () => {
  return (
    <div className={"flex justify-center py-40 bg-slate-200  "}>
      <Dropzone />
    </div>
  );
};

export default Container;
