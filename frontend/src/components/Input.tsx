import { useEffect, useState } from "react";
import type { SavingsFrequency } from "@/types/frequency";
import Dropdown from "./Dropdown";
import type { SavingsData } from "@/utils/api";

type InputProps = {
  data: SavingsData;
  setData: React.Dispatch<React.SetStateAction<SavingsData>>;
};

export default function Input({ data, setData }: InputProps) {
  const [startAmount, setStartAmount] = useState<number>(data.amount);
  const [deposits, setDeposits] = useState<number>(data.deposits);
  const [rate, setRate] = useState<number>(data.rate);
  const [frequency, setFrequency] = useState<SavingsFrequency>(data.frequency);
  const [time, setTime] = useState<number>(data.time);

  // Update data any time any of the states change
  useEffect(() => {
    setData({
      amount: startAmount,
      deposits: deposits,
      rate: rate,
      frequency: frequency,
      time: time,
    });
  }, [startAmount, deposits, rate, frequency, time]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, valueAsNumber } = e.target;
    const rounded: number = Math.floor(parseFloat(value) * 100) / 100;
    if (name === "starting") setStartAmount(rounded);
    if (name === "deposits") setDeposits(rounded);
    if (name === "rate") setRate(rounded);
    if (name === "time") setTime(Math.floor(valueAsNumber));
  };

  // const handleDecimal = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const val = e.target.value;
  //   const rounded: number = Math.floor(parseFloat(val) * 100) / 100;
  // };

  return (
    <div className="flex flex-col items-center w-full openSans400 p-2 gap-2">
      <h2>Please enter your savings details</h2>
      <p>Enter months, amounts, frequency, interest rate, etc</p>
      <div className=" grid grid-cols-2 w-1/2 min-w-[300px] p-2 gap-2">
        <label className=" p-2 text-lg">Initial deposit: </label>
        <input
          name="starting"
          type="number"
          step="0.01"
          min="0"
          placeholder="starting amount"
          onChange={handleChangeInput}
          value={startAmount}
          className="border rounded p-2 text-lg text-end"
        />

        <label className=" p-2 text-lg">Amount per deposit:</label>
        <input
          name="deposits"
          type="number"
          step="0.01"
          min="0"
          placeholder="deposits"
          onChange={handleChangeInput}
          value={deposits}
          className="border rounded p-2 text-lg text-end"
        />
        <label className=" p-2 text-lg">Deposit how often:</label>
        <Dropdown state={frequency} setter={setFrequency} />

        <label className=" p-2 text-lg">For how many years:</label>
        <input
          name="time"
          type="number"
          step="1"
          min="0"
          placeholder="years"
          onChange={handleChangeInput}
          value={time}
          className="border rounded p-2 text-lg text-end"
        />
        <label className=" p-2 text-lg">Yearly interest rate:</label>
        <input
          name="rate"
          type="number"
          placeholder="interest rate per year"
          onChange={handleChangeInput}
          value={rate}
          className="border rounded p-2 text-lg text-end"
        />
      </div>
    </div>
  );
}
