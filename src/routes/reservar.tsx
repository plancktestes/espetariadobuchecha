import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Minus, Plus, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { whatsappLink } from "@/data/negocio";
import { agoraSP } from "@/lib/horario";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/reservar")({
  head: () => ({
    meta: [
      { title: "Reservar mesa — Espetaria do Buchecha" },
      { name: "description", content: "Solicite sua reserva de mesa na Espetaria do Buchecha, em Uberlândia, direto pelo WhatsApp." },
      { property: "og:title", content: "Reservar mesa na Espetaria do Buchecha" },
      { property: "og:description", content: "Aniversário ou resenha? Peça sua mesa pelo WhatsApp." },
    ],
  }),
  component: Reservar,
});

const HORARIOS = Array.from({ length: 12 }, (_, i) => `${String(18 + Math.floor(i / 2))}:${i % 2 ? "30" : "00"}`);
const OCASIOES = ["Aniversário", "Confraternização", "Outro"];

const somaDias = (iso: string, d: number) => {
  const t = new Date(`${iso}T12:00:00Z`); t.setUTCDate(t.getUTCDate() + d);
  return t.toISOString().slice(0, 10);
};
const br = (iso: string) => iso.split("-").reverse().join("/");

function Reservar() {
  const [nome, setNome] = useState("");
  const [pessoas, setPessoas] = useState(2);
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [ocasiao, setOcasiao] = useState("");
  const [obs, setObs] = useState("");
  const [lim, setLim] = useState({ min: "", max: "" });
  const [erros, setErros] = useState<Record<string, string>>({});

  useEffect(() => { const h = agoraSP().iso; setLim({ min: h, max: somaDias(h, 30) }); }, []);

  const enviar = () => {
    const e: Record<string, string> = {};
    if (nome.trim().length < 2) e.nome = "Informe seu nome.";
    if (!data || (lim.min && (data < lim.min || data > lim.max))) e.data = "Escolha uma data nos próximos 30 dias.";
    if (!hora) e.hora = "Escolha um horário.";
    setErros(e);
    if (Object.keys(e).length) return;
    const msg = `Olá! Gostaria de solicitar uma reserva:\n*Nome:* ${nome.trim()}\n*Data:* ${br(data)}\n*Horário:* ${hora}\n*Pessoas:* ${pessoas}\n*Ocasião:* ${ocasiao || "—"}\n*Observações:* ${obs.trim() || "—"}\nAguardo a confirmação.`;
    window.open(whatsappLink(msg), "_blank");
  };

  return (
    <div className="px-4 py-8">
      <div className="mx-auto max-w-[20rem] text-center">
        <p className="font-hand text-xl text-secondary">Guarda um lugar pra gente</p>
        <h1 className="font-display text-5xl uppercase leading-none">Reservar mesa</h1>
        <p className="mt-2 text-sm text-muted-foreground">Reserva sujeita à confirmação do estabelecimento.</p>
      </div>
      <div className="mt-8 space-y-5">
        <label className="block space-y-1.5"><span className="text-sm font-semibold">Seu nome</span>
          <Input value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="name" className="h-12" />
          {erros.nome && <span className="text-sm text-primary">{erros.nome}</span>}
        </label>
        <div className="space-y-1.5">
          <span className="text-sm font-semibold">Quantas pessoas?</span>
          <div className="flex items-center justify-center gap-4">
            <Button size="icon" variant="outline" className="h-12 w-12" onClick={() => setPessoas((p) => Math.max(1, p - 1))} aria-label="Menos pessoas"><Minus className="h-5 w-5" /></Button>
            <span className="w-12 text-center font-display text-4xl" aria-live="polite">{pessoas}</span>
            <Button size="icon" variant="outline" className="h-12 w-12" onClick={() => setPessoas((p) => Math.min(20, p + 1))} aria-label="Mais pessoas"><Plus className="h-5 w-5" /></Button>
          </div>
        </div>
        <label className="block space-y-1.5"><span className="text-sm font-semibold">Data</span>
          <Input type="date" value={data} min={lim.min || undefined} max={lim.max || undefined} onChange={(e) => setData(e.target.value)} className="h-12" />
          {erros.data && <span className="text-sm text-primary">{erros.data}</span>}
        </label>
        <div className="space-y-1.5">
          <span className="text-sm font-semibold">Horário</span>
          <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Horário">
            {HORARIOS.map((h) => (
              <button key={h} type="button" role="radio" aria-checked={hora === h} onClick={() => setHora(h)}
                className={cn("min-h-11 rounded-xl border text-sm font-semibold", hora === h ? "border-primary bg-primary/15" : "border-border text-muted-foreground")}>{h}</button>
            ))}
          </div>
          {erros.hora && <span className="text-sm text-primary">{erros.hora}</span>}
        </div>
        <div className="space-y-1.5">
          <span className="text-sm font-semibold">Ocasião (opcional)</span>
          <div className="grid grid-cols-3 gap-2">
            {OCASIOES.map((o) => (
              <button key={o} type="button" aria-pressed={ocasiao === o} onClick={() => setOcasiao(ocasiao === o ? "" : o)}
                className={cn("min-h-11 rounded-xl border px-1 text-xs font-semibold", ocasiao === o ? "border-primary bg-primary/15" : "border-border text-muted-foreground")}>{o}</button>
            ))}
          </div>
        </div>
        <label className="block space-y-1.5"><span className="text-sm font-semibold">Observações (opcional)</span>
          <Textarea value={obs} onChange={(e) => setObs(e.target.value)} maxLength={300} />
        </label>
        <Button size="lg" className="min-h-12 w-full" onClick={enviar}><MessageCircle className="h-5 w-5" /> Solicitar pelo WhatsApp</Button>
        <p className="text-center text-xs text-muted-foreground">Reserva sujeita à confirmação do estabelecimento.</p>
      </div>
    </div>
  );
}
