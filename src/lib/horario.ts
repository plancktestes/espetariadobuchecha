import { useEffect, useState } from "react";
import { negocio } from "@/data/negocio";

const min = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
};

export function agoraSP() {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Sao_Paulo", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false,
      year: "numeric", month: "2-digit", day: "2-digit",
    }).formatToParts(new Date()).map((x) => [x.type, x.value]),
  );
  const dias = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return {
    dia: dias.indexOf(p.weekday ?? "Sun"),
    minutos: (Number(p.hour) % 24) * 60 + Number(p.minute),
    iso: `${p.year}-${p.month}-${p.day}`,
  };
}

export function estaAberto() {
  const { dia, minutos } = agoraSP();
  const { dias, abre, fecha } = negocio.horario;
  const a = min(abre), f = min(fecha) || 24 * 60;
  if (f > a) return dias.includes(dia) && minutos >= a && minutos < f;
  // atravessa a meia-noite
  const ontem = (dia + 6) % 7;
  return (dias.includes(dia) && minutos >= a) || (dias.includes(ontem) && minutos < f);
}

export const horaAbertura = () => negocio.horario.abre.replace(":00", "h");

/** null até hidratar, para não divergir do servidor. */
export function useAberto() {
  const [aberto, setAberto] = useState<boolean | null>(null);
  useEffect(() => {
    const t = () => setAberto(estaAberto());
    t();
    const i = setInterval(t, 60_000);
    return () => clearInterval(i);
  }, []);
  return aberto;
}
