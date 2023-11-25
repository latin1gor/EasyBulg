import { FC } from "react";
import SectionLogo from "../assets/section_logo.jpeg";
const Description: FC = () => {
  return (
    <div
      className={"flex h-60 w-full bg-white items-center justify-center my-10 "}
    >
      <img src={SectionLogo} alt={"section-logo"} className={"h-60 w-60"} />

      <div>
        <h1 className={"text-2xl font-bold p-3"}>
          Structure your Bulgarian dictionary!
        </h1>
        <h3 className={"font-normal text-zinc-700 w-96 p-3"}>
          Input your docx document with bulgarian list of words and our service
          will count all words in alphabet order!
        </h3>
      </div>
    </div>
  );
};
export default Description;
