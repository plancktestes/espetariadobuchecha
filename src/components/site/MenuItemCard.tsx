import { useState } from "react";
import { Plus, MessageCircle, Minus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { ItemImage } from "./ItemImage";
import { brl, type Item } from "@/data/cardapio";
import { imagensItens } from "@/data/imagens";
import { whatsappLink } from "@/data/negocio";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

function precoTexto(item: Item) {
  if (item.opcoes) return `${brl(item.opcoes.meia)} · ${brl(item.opcoes.inteira)}`;
  return item.preco === null ? "Consulte" : brl(item.preco);
}

export function MenuItemCard({ item }: { item: Item }) {
  const [aberto, setAberto] = useState(false);
  const consulte = item.preco === null && !item.opcoes;
  const mais = item.tags.includes("Mais pedido");
  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_8px_24px_-12px_oklch(0.59_0.23_27/35%)]">
      <button type="button" onClick={() => !consulte && setAberto(true)} className="relative block text-left" aria-label={`Ver ${item.nome}`} disabled={consulte}>
        <ItemImage src={imagensItens[item.slug]} alt={`${item.nome} — ${item.descricao}`} />
        {mais && <span className="absolute left-2 top-2 rounded-full bg-secondary px-2 py-0.5 text-[11px] font-bold uppercase text-secondary-foreground">Mais pedido</span>}
      </button>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 p-3">
        <h3 className="text-pretty font-display text-lg uppercase leading-tight">{item.nome}</h3>
        <p className="line-clamp-2 flex-1 text-xs text-muted-foreground">{item.descricao}</p>
        {item.opcoes ? (
          <p className="text-xs text-muted-foreground">
            Meia <b className="text-primary">{brl(item.opcoes.meia)}</b> · Inteira <b className="text-primary">{brl(item.opcoes.inteira)}</b>
          </p>
        ) : (
          <p className="font-display text-xl text-primary">{precoTexto(item)}</p>
        )}
        {consulte ? (
          <Button asChild variant="secondary" className="h-auto min-h-11 w-full whitespace-normal py-2 text-center text-sm leading-tight">
            <a href={whatsappLink(`Olá! Tem ${item.nome} hoje? Qual o valor?`)} target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4 shrink-0" /> Perguntar no WhatsApp
            </a>
          </Button>
        ) : (
          <Button className="min-h-11 w-full" onClick={() => setAberto(true)} aria-label={`Adicionar ${item.nome}`}>
            <Plus className="h-4 w-4" /> Adicionar
          </Button>
        )}
      </div>
      {!consulte && <ItemSheet item={item} aberto={aberto} setAberto={setAberto} />}
    </article>
  );
}

function ItemSheet({ item, aberto, setAberto }: { item: Item; aberto: boolean; setAberto: (b: boolean) => void }) {
  const { add } = useCart();
  const [opcao, setOpcao] = useState<"meia" | "inteira">("inteira");
  const [qtd, setQtd] = useState(1);
  const [obs, setObs] = useState("");
  const unit = item.opcoes ? item.opcoes[opcao] : (item.preco ?? 0);
  const confirmar = () => {
    add({ slug: item.slug, nome: item.nome, opcao: item.opcoes ? (opcao === "meia" ? "Meia" : "Inteira") : undefined, preco: unit, qtd, obs: obs.trim() });
    toast.success(`${qtd}x ${item.nome} no pedido!`);
    setAberto(false); setQtd(1); setObs("");
  };
  return (
    <Sheet open={aberto} onOpenChange={setAberto}>
      <SheetContent side="bottom" className="mx-auto max-h-[90dvh] max-w-[480px] overflow-y-auto rounded-t-3xl p-0 pb-[env(safe-area-inset-bottom)]">
        <ItemImage src={imagensItens[item.slug]} alt={item.nome} ratio="video" />
        <div className="space-y-4 p-4">
          <SheetHeader className="p-0 text-center">
            <SheetTitle className="text-balance text-center font-display text-3xl uppercase">{item.nome}</SheetTitle>
            <SheetDescription className="text-pretty text-center">{item.descricao}</SheetDescription>
          </SheetHeader>
          {item.opcoes && (
            <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Tamanho">
              {(["meia", "inteira"] as const).map((o) => (
                <button key={o} type="button" role="radio" aria-checked={opcao === o} onClick={() => setOpcao(o)}
                  className={cn("min-h-12 rounded-2xl border px-3 py-2 text-sm font-semibold", opcao === o ? "border-primary bg-primary/15 text-foreground" : "border-border text-muted-foreground")}>
                  {o === "meia" ? "Meia" : "Inteira"} · {brl(item.opcoes![o])}
                </button>
              ))}
            </div>
          )}
          <Textarea placeholder="Observação (ex.: ao ponto, sem cebola)" value={obs} onChange={(e) => setObs(e.target.value)} maxLength={140} />
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Button size="icon" variant="outline" className="h-11 w-11" onClick={() => setQtd((q) => Math.max(1, q - 1))} aria-label="Diminuir quantidade"><Minus className="h-4 w-4" /></Button>
              <span className="w-6 text-center text-lg font-bold" aria-live="polite">{qtd}</span>
              <Button size="icon" variant="outline" className="h-11 w-11" onClick={() => setQtd((q) => Math.min(99, q + 1))} aria-label="Aumentar quantidade"><Plus className="h-4 w-4" /></Button>
            </div>
            <Button className="min-h-12 flex-1" onClick={confirmar}>Adicionar · {brl(unit * qtd)}</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
