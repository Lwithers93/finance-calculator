import { useState, type Dispatch, type SetStateAction } from "react";
import { FREQ_OPTIONS, type SavingsFrequency } from "@/types/frequency";

type DropdownProps = {
  state: SavingsFrequency;
  setter: React.Dispatch<React.SetStateAction<SavingsFrequency>>;
};

export default function Dropdown({ state, setter }: DropdownProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  //   const [select, setSelect] = useState<Cost>(cost);

  return (
    <div
      className="w-full relative grid grid-cols-10 bg-slate-50 text-gray-800 text-lg p-2 cursor-pointer rounded shadow focus:outline-none focus:ring-2 focus:ring-green-500"
      onClick={() => setDropdownOpen((dropdownOpen) => !dropdownOpen)}
    >
      <span className="col-span-1"></span>
      <span className="col-span-8">{state}</span>
      <ul
        className={
          "absolute left-0 right-0 mt-12 p-2 bg-slate-100 rounded overflow-hidden transition-all duration-500 ease-in-out " +
          (dropdownOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0")
        }
      >
        {FREQ_OPTIONS.map((i) => {
          return (
            <li
              key={i}
              onClick={(e) => {
                setDropdownOpen((dropdownOpen) => !dropdownOpen);
                setter(i);
                e.stopPropagation();
              }}
              className="hover:bg-slate-200 p-2 text-lg cursor-pointer border-b"
            >
              {i}
            </li>
          );
        })}
      </ul>
      <span className="col-span-1">{dropdownOpen ? "^" : "V"}</span>
    </div>
  );
}
