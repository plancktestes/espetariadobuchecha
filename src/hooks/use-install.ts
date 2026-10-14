import { useEffect, useState } from "react";

type BIPEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };
export type Plataforma = "nativo" | "ios" | "inapp" | "outro";

let deferred: BIPEvent | null = null;
const listeners = new Set<() => void>();
if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferred = e as BIPEvent;
    listeners.forEach((l) => l());
  });
  window.addEventListener("appinstalled", () => {
    deferred = null;
    try { localStorage.setItem("buchecha-instalado", "1"); } catch {}
    listeners.forEach((l) => l());
  });
}

const DISMISS_KEY = "buchecha-install-dismiss";
const DIAS14 = 14 * 24 * 60 * 60 * 1000;

export function useInstall() {
  const [, force] = useState(0);
  const [pronto, setPronto] = useState(false);
  const [instalado, setInstalado] = useState(false);
  const [plataforma, setPlataforma] = useState<Plataforma>("outro");
  const [dispensado, setDispensado] = useState(true);

  useEffect(() => {
    const ua = navigator.userAgent;
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as unknown as { standalone?: boolean }).standalone === true;
    setInstalado(standalone);
    const inapp = /Instagram|FBAN|FBAV|WhatsApp|Line\//i.test(ua);
    const ios = /iPad|iPhone|iPod/.test(ua) || (ua.includes("Mac") && "ontouchend" in document);
    setPlataforma(inapp ? "inapp" : ios ? "ios" : "outro");
    try {
      const t = Number(localStorage.getItem(DISMISS_KEY) || 0);
      setDispensado(Date.now() - t < DIAS14);
    } catch { setDispensado(false); }
    setPronto(true);
    const l = () => force((n) => n + 1);
    listeners.add(l);
    return () => { listeners.delete(l); };
  }, []);

  const plat: Plataforma = deferred && plataforma === "outro" ? "nativo" : plataforma;

  return {
    pronto,
    instalado,
    plataforma: plat,
    dispensado,
    dispensar: () => {
      try { localStorage.setItem(DISMISS_KEY, String(Date.now())); } catch {}
      setDispensado(true);
    },
    promptNativo: async () => {
      if (!deferred) return false;
      await deferred.prompt();
      const r = await deferred.userChoice;
      if (r.outcome === "accepted") setInstalado(true);
      deferred = null;
      return true;
    },
  };
}
