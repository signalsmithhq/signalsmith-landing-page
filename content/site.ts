export const ecosystem = [
  { name: "Casebook", mode: "Learn", status: "Explore", description: "Real-world business problems solved end-to-end.", href: "/casebook", available: true },
  { name: "Gems", mode: "Learn", status: "Being forged", description: "Small pieces of high-value reusable knowledge.", href: "/gems", available: false },
  { name: "Blueprints", mode: "Learn", status: "Being forged", description: "Concrete designs for systems, models, and analytical solutions.", href: "/blueprints", available: false },
  { name: "Craft", mode: "Learn", status: "Being forged", description: "Reusable methods for solving problems well.", href: "/craft", available: false },
  { name: "Workshop", mode: "Learn", status: "Future", description: "Learn by building and applying the SignalSmith method.", href: "/workshop", available: false },
  { name: "Foundry", mode: "Explore", status: "Coming soon", description: "A public laboratory for real-world business problems.", href: "/foundry", available: false },
  { name: "Guild", mode: "Community", status: "Future", description: "The people who practice the SignalSmith way of thinking.", href: "/guild", available: false },
  { name: "Advisory", mode: "Apply", status: "Future", description: "Private application of the SignalSmith method.", href: "/advisory", available: false },
] as const;

export const method = [
  ["01", "Frame", "Name the actual business problem."],
  ["02", "Measure", "Decide what is worth measuring."],
  ["03", "Model", "Represent the problem clearly."],
  ["04", "Engineer", "Make the solution reliable."],
  ["05", "Signal", "Find what is decision-relevant."],
  ["06", "Act", "Change what should change."],
] as const;

export const casebookTopics = [
  ["01", "Marketing attribution", "Trace the path from attention to action without confusing correlation for impact."],
  ["02", "Product activation", "Find the behaviors that signal a user is on a path to value."],
  ["03", "Inventory yield", "Turn demand, constraints, and timing into a decision system."],
] as const;

export const socialLinks = [
  { name: "Instagram", platform: "instagram", href: "https://www.instagram.com/signalsmith.online/" },
  { name: "LinkedIn", platform: "linkedin", href: "https://www.linkedin.com/company/signalsmith-online" },
] as const;
