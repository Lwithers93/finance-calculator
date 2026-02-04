import type { SavingsFrequency } from "@/types/frequency";

export type SavingsData = {
  frequency: SavingsFrequency;
  amount: number;
  deposits: number;
  rate: number;
  time: number;
};

export async function saveSavings(data: SavingsData) {
  console.log(window.location.origin);
  const res = await fetch("http://localhost:8000/api/save_savings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    return res.json();
  }
  console.error(res);
}

export async function getHello() {
  const res = await fetch("http://localhost:8000/api/hello");
  return res.json();
}
