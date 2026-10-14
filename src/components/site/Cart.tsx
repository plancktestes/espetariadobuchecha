import { useEffect, useState } from "react";
import { ShoppingBag, Minus, Plus, MessageCircle } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/lib/cart";
import { brl } from "@/data/cardapio";
import { whatsappLink } from "@/data/negocio";

export function useOnline() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    setOn(navigator.onLine);
    const a = () => setOn(true), b = () => setOn(false);
    addEventListener("online", a); addEventListener("offline", b);
    return () => { removeEventListener("online", a); removeEventListener("offline", b); };
  }, []);
  return on;
}

export function CartButton() {
  const { linhas, count, total, add, dec, clear } = useCart();
  const [aberto, setAberto] = useState(false);
  const [obs, setObs] = useState("");
  const online = useOnline();

  const enviar = () => {
    const corpo = linhas.map((l) => `• ${l.qtd}x ${l.item.nome} — ${brl((l.item.price ?? 0) * l.qtd)}`).join("\n");
    const msg = `Olá! Quero fazer um pedido:\n\n${corpo}\n\nTotal: ${brl(total)}${obs ? `\n\nObs.: ${obs}` : ""}`;
    window.open(whatsappLink(msg), "_blank");
    clear();
    setAberto(false);
  };

  return (
    <>
      <button onClick={() => setAberto(true)} aria-label={`Abrir pedido (${count} itens)`}
        className="relative inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">
        <ShoppingBag className="h-4 w-4" /> <span className="hidden sm:inline">Pedido</span>
        {count > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1 text-xs text-secondary-foreground">{count}</span>}
      </button>
      <Sheet open={aberto} onOpenChange={setAberto}>
        <SheetContent className="flex flex-col">
          <SheetHeader>
            <SheetTitle className="font-display text-3xl uppercase">Seu pedido</SheetTitle>
            <SheetDescription>Monte aqui e envie pelo WhatsApp.</SheetDescription>
          </SheetHeader>
          <div className="flex-1 space-y-3 overflow-y-auto px-4">
            {linhas.length === 0 && <p className="text-muted-foreground">Nada por aqui ainda. Bora de espetinho?</p>}
            {linhas.map((l) => (
              <div key={l.item.slug} className="flex items-center justify-between gap-2 border-b border-border pb-2">
                <div><p className="font-medium">{l.item.nome}</p><p className="text-sm text-primary">{brl((l.item.price ?? 0) * l.qtd)}</p></div>
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="outline" onClick={() => dec(l.item.slug)} aria-label="Remover um"><Minus className="h-4 w-4" /></Button>
                  <span className="w-5 text-center">{l.qtd}</span>
                  <Button size="icon" variant="outline" onClick={() => add(l.item)} aria-label="Adicionar um"><Plus className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
            {linhas.length > 0 && <Textarea placeholder="Observações (ponto da carne, retirar no drive-through...)" value={obs} onChange={(e) => setObs(e.target.value)} />}
          </div>
          <div className="space-y-2 border-t border-border p-4">
            <div className="flex justify-between font-display text-2xl"><span>Total</span><span className="text-primary">{brl(total)}</span></div>
            {!online && <p className="text-sm text-secondary">Você está offline — conecte-se para enviar o pedido.</p>}
            <Button className="w-full" size="lg" disabled={!linhas.length || !online} onClick={enviar}>
              <MessageCircle className="h-5 w-5" /> Enviar pelo WhatsApp
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
