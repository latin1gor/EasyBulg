import { FC } from "react";
import Container from "@/components/container.tsx";
import Header from "@/components/header.tsx";
import Description from "@/components/description.tsx";

const App: FC = () => {
  return (
    <div className="overflow-hidden">
      <header>
        <Header />
      </header>
      <section>
        <Description />
      </section>
      <Container />
      <div></div>
    </div>
  );
};

export default App;
