import "./index.css";

const bootstrap = async (): Promise<void> => {
  if (import.meta.env.DEV) {
    // Keep react-scan enabled on desktop only; its overlay/tooltips overflow
    // on narrow mobile viewports and obscures the composer/send button.
    const isMobile =
      window.matchMedia("(max-width: 640px)").matches ||
      "ontouchstart" in window;
    if (!isMobile) {
      try {
        const { scan } = await import("react-scan");
        scan({ enabled: true });
      } catch {
        // react-scan not available, skip
      }
    }
  }

  await import("./bootstrap");
};

bootstrap().catch((error: unknown) => {
  console.error("[main] bootstrap failed:", error);
});
