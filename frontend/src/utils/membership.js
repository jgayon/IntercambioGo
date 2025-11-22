export function getMembershipLevel(points) {
  if (points >= 500) return "🔥 Premium";
  if (points >= 250) return "🟡 Oro";
  if (points >= 100) return "🔵 Plata";
  return "🟢 Básico";
}

export function getNextLevel(points) {
  if (points < 100) return { next: "🔵 Plata", remaining: 100 - points };
  if (points < 250) return { next: "🟡 Oro", remaining: 250 - points };
  if (points < 500) return { next: "🔥 Premium", remaining: 500 - points };
  return { next: "🔥 Premium", remaining: 0 };
}
