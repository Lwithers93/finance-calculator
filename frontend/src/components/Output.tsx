import { useEffect, useState } from "react";
import { getHello, saveSavings } from "../utils/api"; // Import API calls
import type { SavingsData } from "../utils/api";

type OutputProps = {
  data: SavingsData;
  setData: React.Dispatch<React.SetStateAction<SavingsData>>;
};

type SavingsResponse = {
  final: number;
  timeline: TimelinePoint[];
};

type TimelinePoint = {
  year: number;
  total: number;
};

export default function Output({ data, setData }: OutputProps) {
  const [resData, setResData] = useState<SavingsResponse | null>(null);
  // const [msg, setMsg] = useState("");
  const [timeline, setTimeline] = useState<TimelinePoint[]>([]);

  // handle button click to get data
  const handleSubmit = async () => {
    try {
      const reqData = await saveSavings(data);
      setResData(reqData);
    } catch (err) {
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
      <div className="flex flex-col p-6">
        <div>You will save: £{resData && resData.final.toFixed(2)}</div>
        <div className="flex flex-col gap-2 p-6">
          <p>Savings Timeline:</p>

          <div className="grid grid-cols-2 border">
            <div className="grid grid-cols-2 col-span-2 border-b">
              <div>Year</div>
              <div>Total</div>
            </div>
            {resData &&
              resData.timeline.map((t, i) => {
                if (i < 11) {
                  return (
                    <div
                      className="grid grid-cols-2 col-span-2 border-b"
                      key={i}
                    >
                      <div className="px-1 border-r">{t.year}</div>
                      <div className="px-1">£{t.total.toFixed(2)}</div>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
