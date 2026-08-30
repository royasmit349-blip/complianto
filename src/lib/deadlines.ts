/**
 * Deadline computation over the indicative DUE_DATES dataset.
 * Dates are indicative — always shown with the guidance disclaimer.
 */
import { DUE_DATES, type DueItem, type EntityType } from "../data/site";

export type DatedItem = { item: DueItem; date: Date };

const pad = (n: number): string => String(n).padStart(2, "0");

export const formatDate = (d: Date): string =>
  d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

/** Financial years available (Apr–Mar). */
export function fyOptions(): { id: string; startYear: number }[] {
  const now = new Date();
  const base = now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1;
  return [
    { id: `FY ${base - 1}–${String(base).slice(2)}`, startYear: base - 1 },
    { id: `FY ${base}–${String(base + 1).slice(2)}`, startYear: base },
    { id: `FY ${base + 1}–${String(base + 2).slice(2)}`, startYear: base + 1 },
  ];
}

export function defaultFy(): { id: string; startYear: number } {
  return fyOptions()[1];
}

/** All occurrences of a due item within a financial year (Apr → Mar). */
export function occurrencesInFy(item: DueItem, startYear: number): Date[] {
  const out: Date[] = [];
  if (item.frequency === "Monthly" && item.day) {
    for (let m = 3; m < 15; m++) {
      const d = new Date(startYear, m, item.day);
      if (d.getFullYear() === startYear || d.getFullYear() === startYear + 1) out.push(d);
    }
  } else if (item.months && item.day) {
    for (const mo of item.months) {
      const year = mo >= 4 ? startYear : startYear + 1;
      out.push(new Date(year, mo - 1, item.day));
    }
  }
  return out;
}

/** Next occurrence of an item on/after `from`. */
function nextAfter(item: DueItem, from: Date): Date {
  const y = from.getFullYear();
  if (item.frequency === "Monthly" && item.day) {
    for (let m = from.getMonth(); m < from.getMonth() + 13; m++) {
      const d = new Date(y, m, item.day);
      if (d >= from) return d;
    }
  } else if (item.months && item.day) {
    for (let yy = y; yy <= y + 1; yy++) {
      for (const mo of [...item.months].sort((a, b) => a - b)) {
        const d = new Date(yy, mo - 1, item.day);
        if (d >= from) return d;
      }
    }
  }
  return new Date(y, 11, 31);
}

/** The next `count` upcoming deadlines for an entity type, soonest first. */
export function upcomingFor(entity: EntityType, count = 6, from: Date = new Date()): DatedItem[] {
  const items = DUE_DATES.filter((d) => d.applies.includes(entity));
  const rows: DatedItem[] = items.map((item) => ({ item, date: nextAfter(item, from) }));
  rows.sort((a, b) => a.date.getTime() - b.date.getTime());
  return rows.slice(0, count);
}

/** Every filing for an entity in an FY, sorted by date. */
export function fySchedule(entity: EntityType, startYear: number): DatedItem[] {
  const rows: DatedItem[] = [];
  for (const item of DUE_DATES.filter((d) => d.applies.includes(entity))) {
    for (const date of occurrencesInFy(item, startYear)) rows.push({ item, date });
  }
  rows.sort((a, b) => a.date.getTime() - b.date.getTime());
  return rows;
}

/** Build an iCalendar (.ics) payload for the given rows. */
export function buildICS(rows: DatedItem[]): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Complianto//Compliance Calendar//EN",
    "CALSCALE:GREGORIAN",
  ];
  for (const { item, date } of rows) {
    const d = `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;
    lines.push(
      "BEGIN:VEVENT",
      `UID:${d}-${item.name.replace(/\s+/g, "-").toLowerCase()}@complianto.in`,
      `DTSTART;VALUE=DATE:${d}`,
      `SUMMARY:${item.name} — ${item.category} (Complianto)`,
      `DESCRIPTION:Indicative due date from the Complianto compliance calendar. ${item.note ?? ""}`,
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

export function downloadICS(filename: string, ics: string): void {
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
