import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/Logo";
import { negocio } from "@/data/negocio";

export const Route = createFileRoute("/plaquinha")({
  head: () => ({
    meta: [
      { title: "Plaquinha de mesa — Espetaria do Buchecha" },
      { name: "description", content: "Plaquinha com QR Code para imprimir e colocar nas mesas." },
      { property: "og:title", content: "Plaquinha de mesa — Espetaria do Buchecha" },
      { property: "og:description", content: "Escaneie, escolha e peça pelo WhatsApp." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Plaquinha,
});

function Plaquinha() {
  const [tam, setTam] = useState<"A5" | "A4">("A5");
  const url = `${negocio.siteUrl}/?utm_source=qr`;
  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <style>{`@media print { @page { size: ${tam} portrait; } }`}</style>
      <div className="no-print flex gap-2">
        {(["A5", "A4"] as const).map((t) => (
          <Button key={t} variant={tam === t ? "default" : "outline"} onClick={() => setTam(t)}>{t}</Button>
        ))}
        <Button variant="secondary" onClick={() => window.print()}><Printer className="h-4 w-4" /> Imprimir</Button>
      </div>
      <div className="flex flex-col items-center justify-between bg-coal p-[8mm] text-center"
        style={{ width: tam === "A5" ? "148mm" : "210mm", height: tam === "A5" ? "210mm" : "297mm" }}>
        <Logo className="w-[55%]" />
        <div className="rounded-2xl bg-foreground p-4"><QRCodeSVG value={url} size={tam === "A5" ? 200 : 300} bgColor="transparent" fgColor="#0D0D0D" /></div>
        <div>
          <p className="font-display text-4xl uppercase leading-none">Escaneie, escolha e <span className="text-primary">peça pelo WhatsApp</span></p>
          <p className="mt-3 font-hand text-2xl text-secondary">{negocio.nome}</p>
        </div>
      </div>
    </div>
  );
}
