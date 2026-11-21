/**
 * Careers page content. Roles are PLACEHOLDERS — replace with real openings (or leave
 * the list empty: the page then shows a "no openings right now, send your CV anyway" note).
 */
export type Role = {
  title: string;
  team: string;
  type: "Full-time" | "Internship" | "Contract";
  location: string;
  summary: string;
};

export const roles: Role[] = [
  { title: "[Full-stack Developer (Next.js / Node)]", team: "Engineering", type: "Full-time", location: "Hyderabad · On-site / Hybrid", summary: "[Build websites, dashboards and APIs for our clients with a modern JavaScript stack.]" },
  { title: "[Flutter Developer]", team: "Mobile", type: "Full-time", location: "Hyderabad · On-site", summary: "[Ship Android and iOS apps from a single codebase.]" },
  { title: "[Digital Marketing Executive]", team: "Marketing (with Capture Media)", type: "Full-time", location: "Hyderabad · On-site", summary: "[Run Meta and Google ad campaigns, SEO and social calendars for clients.]" },
  { title: "[Software Development Intern]", team: "Engineering", type: "Internship", location: "Hyderabad · On-site", summary: "[Learn by shipping real client work alongside senior developers.]" },
];

export const perks: [title: string, text: string][] = [
  ["Real projects from week one", "You'll work on live client products, not practice tasks."],
  ["Learn across the stack", "Web, mobile, AI and marketing under one roof — move between them."],
  ["Small team, big ownership", "Your ideas reach the client. Your name is on the work."],
  ["Grow with mentoring", "Code reviews, pairing and a clear path from intern to lead."],
];

export const hiringSteps: [step: string, text: string][] = [
  ["Apply", "Send your CV and a link to your work."],
  ["Short call", "A 20-minute chat about you and the role."],
  ["Practical task", "A small task close to the real work — no trick puzzles."],
  ["Offer", "Meet the team and get a clear offer."],
];
