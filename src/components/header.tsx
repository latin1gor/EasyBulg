import { FC } from "react";
import Logo from ".././assets/bulgarian_flag.png";
const Header: FC = () => {
  return (
    <div
      className={
        "w-full items-center pl-10 justify-start text-white flex h-16 bg-slate-950"
      }
    >
      <img
        src={Logo}
        alt={"bulgarian flag"}
        className={"h-9 w-9 rounded-full"}
      />
      <h1 className={"font-bold px-3"}>EasyBulg</h1>
    </div>
  );
};
export default Header;
