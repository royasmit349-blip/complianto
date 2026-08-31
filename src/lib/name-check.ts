/**
 * Company name availability — data source abstracted behind checkName().
 * Currently backed by a seeded local dataset. To swap in the client's
 * existing endpoint or an MCA lookup later, replace the body of
 * checkName() — the UI contract stays identical.
 *
 * HONESTY RULE: if no data source is configured, return an empty result;
 * never fabricate availability.
 */

export type NameMatch = {
  name: string;
  status: "Active" | "Struck off";
  place: string;
};

export const NAME_CHECK_SOURCE: "seed" | "client-endpoint" | "mca" = "seed";

const SEED: NameMatch[] = [
  { name: "Sunrise Technologies Private Limited", status: "Active", place: "Delhi" },
  { name: "BlueLotus Textiles LLP", status: "Active", place: "Mumbai" },
  { name: "GreenField Agro Ventures Private Limited", status: "Active", place: "Pune" },
  { name: "Acme Engineering Works LLP", status: "Active", place: "Ludhiana" },
  { name: "Reliant Foods Private Limited", status: "Active", place: "Noida" },
  { name: "Zenith Hospitality Private Limited", status: "Active", place: "Jaipur" },
  { name: "Truvalve Engineering Private Limited", status: "Active", place: "Faridabad" },
  { name: "Kavya Foods & Beverages LLP", status: "Active", place: "Bengaluru" },
  { name: "Northwind Retail Private Limited", status: "Active", place: "Gurugram" },
  { name: "Arcline Design Studio LLP", status: "Active", place: "Noida" },
  { name: "Meraki Labs Private Limited", status: "Active", place: "Hyderabad" },
  { name: "Sattva Wellness Private Limited", status: "Active", place: "Rishikesh" },
  { name: "Brightpath Education Services LLP", status: "Active", place: "Lucknow" },
  { name: "Zephyr Logistics Private Limited", status: "Active", place: "Chennai" },
  { name: "Orbitsoft Solutions Private Limited", status: "Active", place: "Indore" },
  { name: "Himalayan Organics LLP", status: "Struck off", place: "Dehradun" },
  { name: "Crestline Buildtech Private Limited", status: "Active", place: "Noida" },
  { name: "SilverOak Hospitality LLP", status: "Active", place: "Udaipur" },
  { name: "Quantum Analytics Private Limited", status: "Active", place: "Bengaluru" },
  { name: "Everest Trading Company LLP", status: "Struck off", place: "Kolkata" },
  { name: "Lumina Healthcare Private Limited", status: "Active", place: "Ahmedabad" },
  { name: "Redwood Interiors LLP", status: "Active", place: "Mumbai" },
  { name: "Vanguard Fintech Private Limited", status: "Active", place: "Gurugram" },
  { name: "Maple Leaf Exports Private Limited", status: "Active", place: "Tiruppur" },
  { name: "IronBridge Infrastructure LLP", status: "Active", place: "Nagpur" },
  { name: "CloudNine Software Private Limited", status: "Active", place: "Hyderabad" },
  { name: "Terracotta Crafts LLP", status: "Active", place: "Jaipur" },
  { name: "BlueWhale Media Private Limited", status: "Active", place: "Mumbai" },
  { name: "Sunflower Renewables Private Limited", status: "Active", place: "Ahmedabad" },
  { name: "Cornerstone Legal Services LLP", status: "Active", place: "Delhi" },
];

const LATENCY_MS = 420;

export async function checkName(query: string): Promise<{ q: string; matches: NameMatch[] }> {
  await new Promise((r) => setTimeout(r, LATENCY_MS));
  if (NAME_CHECK_SOURCE !== "seed") {
    // Wire the client endpoint / MCA lookup here. Until then, stay honest:
    return { q: query, matches: [] };
  }
  const q = query.trim().toLowerCase();
  const matches = SEED.filter((m) => m.name.toLowerCase().includes(q)).slice(0, 8);
  return { q: query.trim(), matches };
}
