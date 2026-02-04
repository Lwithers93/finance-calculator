import { useState } from "react";
import "./App.css";
import Input from "./components/Input";
import Output from "./components/Output";
import type { SavingsData } from "./utils/api";

function App() {
  const dummy: SavingsData = {
    frequency: "monthly",
    amount: 2000,
    deposits: 200,
    rate: 4.5,
    time: 1,
  };
  const [myData, setMyData] = useState<SavingsData>(dummy);
  return (
    <div className="flex flex-col text-center items-center w-full mx-auto p-2 gap-6">
      <h1 className="textGradient poppinsFont400 text-4xl p-6">
        Savings Calculator
      </h1>
      <Input data={myData} setData={setMyData} />
      <Output data={myData} setData={setMyData} />
    </div>
  );
}

export default App;
