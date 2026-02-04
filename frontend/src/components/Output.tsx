import { useEffect, useState } from "react";
import { getHello, saveSavings } from "../utils/api"; // Import API calls
import type { SavingsData } from "../utils/api";

type OutputProps = {
  data: SavingsData;
  setData: React.Dispatch<React.SetStateAction<SavingsData>>;
};

type SavingsResponse = {
  final: string;
  timeline: TimelinePoint[];
};

type TimelinePoint = {
  year: number;
  total: number;
};

export default function Output({ data, setData }: OutputProps) {
  const [msg2, setMsg2] = useState("");
  // const [msg, setMsg] = useState("");
  const [timeline, setTimeline] = useState<TimelinePoint[]>([]);

  // handle button click to get data
  const handleSubmit = async () => {
    try {
      const reqData = await saveSavings(data);
      setMsg2(reqData.message);
    } catch (err) {
      setMsg2("Error saving data"); // Error msg to user
      console.log(err); // Log the error
    }
  };

  return (
    <div className="openSans400">
      <button
        onClick={handleSubmit}
        className="border rounded bg-blue-400 p-2 text-white"
      >
        Calculate
      </button>
      <div className="flex p-6">{msg2}</div>
    </div>
  );
}
