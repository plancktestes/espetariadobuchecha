import { useState } from "react";
import { Download, Share, SquarePlus, Check, Copy, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useInstall } from "@/hooks/use-install";
import { toast } from "sonner";

const SUB = "Acesso rápido ao cardápio, direto da sua tela inicial";

function useInstallFlow() {
  const inst = useInstall();
  const [aberto, setAberto] = useState(false);
  const clicar = async () => {
    if (inst.plataforma === "nativo" && (await inst.promptNativo())) return;
    setAberto(true);
  };
  return { inst, aberto, setAberto, clicar };
}

function Instrucoes({ plataforma }: { plataforma: string }) {
  if (plataforma === "ios")
    return (
      <ol className="space-y-4">
        {[
          [Share, "Toque em Compartilhar na barra do Safari"],
          [SquarePlus, "Escolha “Adicionar à Tela de Início”"],
          [Check, "Toque em “Adicionar”"],
        ].map(([Icon, t], i) => {
          const I = Icon as typeof Share;
          return (
            <li key={i} className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground"><I className="h-5 w-5" /></span>
              <span>{i + 1}) {t as string}</span>
            </li>
          );
        })}
      </ol>
    );
  if (plataforma === "inapp")
    return (
      <div className="space-y-3">
        <p>Abra no seu navegador para instalar (toque nos três pontinhos e escolha “Abrir no navegador”).</p>
        <Button onClick={async () => {
          try { await navigator.clipboard.writeText(location.origin); toast.success("Link copiado!"); }
          catch { toast.error("Não deu pra copiar"); }
        }}><Copy className="h-4 w-4" /> Copiar link</Button>
      </div>
    );
  return <p>No menu do navegador, toque em <b>Instalar app</b> ou <b>Adicionar à tela inicial</b>.</p>;
}

function InstallSheet({ aberto, setAberto, plataforma }: { aberto: boolean; setAberto: (b: boolean) => void; plataforma: string }) {
  return (
    <Sheet open={aberto} onOpenChange={setAberto}>
      <SheetContent side="bottom" className="rounded-t-2xl">
        <SheetHeader>
          <SheetTitle className="font-display text-3xl uppercase">Instalar aplicativo</SheetTitle>
          <SheetDescription>{SUB}</SheetDescription>
        </SheetHeader>
        <div className="px-4 pb-6"><Instrucoes plataforma={plataforma} /></div>
      </SheetContent>
    </Sheet>
  );
}

export function InstallHeaderButton() {
  const { inst, aberto, setAberto, clicar } = useInstallFlow();
  if (!inst.pronto || inst.instalado) return null;
  return (
    <>
      <button onClick={clicar} aria-label="Instalar aplicativo (opcional)" title={SUB}
        className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground">
        <Download className="h-4 w-4" /><span className="hidden sm:inline">Instalar aplicativo (opcional)</span>
      </button>
      <InstallSheet aberto={aberto} setAberto={setAberto} plataforma={inst.plataforma} />
    </>
  );
}

export function InstallCard() {
  const { inst, aberto, setAberto, clicar } = useInstallFlow();
  if (!inst.pronto || inst.instalado || inst.dispensado) return null;
  return (
    <div className="relative mx-auto mt-8 flex max-w-md items-center gap-3 rounded-xl border border-border bg-card/80 p-3 text-left backdrop-blur">
      <Download className="h-6 w-6 shrink-0 text-secondary" />
      <div className="flex-1">
        <p className="text-sm font-semibold">Instalar aplicativo (opcional)</p>
        <p className="text-xs text-muted-foreground">{SUB}</p>
      </div>
      <Button size="sm" onClick={clicar}>Instalar</Button>
      <button onClick={inst.dispensar} aria-label="Dispensar" className="absolute -right-2 -top-2 rounded-full bg-muted p-1"><X className="h-3 w-3" /></button>
      <InstallSheet aberto={aberto} setAberto={setAberto} plataforma={inst.plataforma} />
    </div>
  );
}
