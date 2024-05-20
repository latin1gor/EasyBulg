import React, { FC, useCallback, useState } from "react";
import mammoth from "mammoth";
import { saveAs } from "file-saver";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button.tsx";
import { CheckCircle2, Download } from "lucide-react";
import Confetti from "react-confetti";
import clsx from "clsx";
const Dropzone: FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [content, setContent] = useState<string>("");
  const [confetti, setConfetti] = useState<boolean>(false);
  const makeAlphabetCount = (content: string) => {
    const words = content.split("\n").filter(Boolean);
    const wordCounts: Record<string, number> = {};

    words.map((word) => {
      const lowercaseWord = word
        .toLowerCase()
        .trim()
        .replace(/^[.,!]+|[.,!]+$/g, "");
      if (wordCounts[lowercaseWord]) {
        wordCounts[lowercaseWord]++;
      } else {
        wordCounts[lowercaseWord] = 1;
      }
    });

    const sortedWords = Object.keys(wordCounts).sort();

    const newContent = sortedWords
      .map((word) => {
        console.log("word", word);
        return `${word} (${wordCounts[word]})`;
      })
      .join("\n");
    console.log("newcontent", newContent);
    return newContent;
  };
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = async (e: ProgressEvent<FileReader>) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      const result = await mammoth.extractRawText({ arrayBuffer });
      setContent(result.value);
    };

    reader.readAsArrayBuffer(selectedFile);
  }, []);

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setConfetti(true);
    const modifiedContent = makeAlphabetCount(content);

    const blob = new Blob([modifiedContent], {
      type: "text/plain;charset=utf-8",
    });

    saveAs(blob, `modified_${file?.name}`);
    setFile(null);
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    onDrop,
  });
  return (
    <div className={"flex flex-col"}>
      <div
        className={
          "flex bg-slate-100 flex-col justify-center transition duration-300 items-center text-center p-30 w-[310px] h-[420px]  sm:min-w-[410px] sm:min-h-[270px]  md:min-w-[610px] md:min-h-[350px] lg:min-h-[450px] lg:min-w-[740px] border-4 border-dashed border-slate-800 rounded-2xl"
        }
        {...getRootProps()}
      >
        <div>
          <input {...getInputProps()} />
          <label className="flex flex-col items-center cursor-pointer">
            {file ? (
              <CheckCircle2 size={64} className={"text-green-500 mb-2"} />
            ) : (
              <Download size={64} className={"text-zinc-700 mb-2"} />
            )}
            {file ? (
              <></>
            ) : (
              <span className="mt-2 text-base leading-normal">
                Drag & drop or upload a Word file
              </span>
            )}
            <div>
              {" "}
              {file ? (
                <span className={"font-semibold"}> {file.name} is ready</span>
              ) : (
                <Button className={"mt-2 md:mt-4"}>Browse</Button>
              )}
            </div>
          </label>
        </div>
      </div>
      <Button
        className={clsx(
          "mt-3 rounded-xl transition duration-300 bg-slate-950",
          {
            "opacity-0": !file,
            "opacity-100": file,
          },
        )}
        onClick={(e) => handleSave(e)}
      >
        Save
      </Button>
      {confetti && (
        <Confetti
          width={1300}
          height={1200}
          numberOfPieces={700}
          recycle={false}
        />
      )}
    </div>
  );
};

export default Dropzone;
