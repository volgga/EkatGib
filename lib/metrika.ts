export const YANDEX_METRIKA_ID = 109184395;

declare global {
  interface Window {
    ym?: (
      counterId: number,
      method: "reachGoal",
      goal: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}

export function reachGoal(goal: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.ym !== "function") {
    return;
  }

  window.ym(YANDEX_METRIKA_ID, "reachGoal", goal, params);
}
