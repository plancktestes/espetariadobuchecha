import { useEffect, useState } from "react";
import { ShoppingBag, Minus, Plus, MessageCircle, ArrowLeft, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/lib/cart";
import { brl } from "@/data/cardapio";
import { negocio, whatsappLink } from "@/data/negocio";
import { useAberto, horaAbertura } from "@/lib/horario";
import { cn } from "@/lib/utils";

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
  const { count, setAberto } = useCart();
  return (
    <button onClick={() => setAberto(true)} aria-label={`Abrir pedido (${count} itens)`}
      className="relative grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground">
      <ShoppingBag className="h-5 w-5" />
      {count > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1 text-xs font-bold text-secondary-foreground">{count}</span>}
    </button>
  );
}

type Tipo = "Entrega" | "Retirada" | "Consumo no local";
const TIPOS: Tipo[] = ["Entrega", "Retirada", "Consumo no local"];

function Chips<T extends string>({ valores, valor, onChange, label }: { valores: readonly T[]; valor: T | ""; onChange: (v: T) => void; label: string }) {
  return (
    <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label={label}>
      {valores.map((v) => (
        <button key={v} type="button" role="radio" aria-checked={valor === v} onClick={() => onChange(v)}
          className={cn("min-h-11 rounded-2xl border px-3 text-sm font-semibold", valor === v ? "border-primary bg-primary/15" : "border-border text-muted-foreground")}>
          {v}
        </button>
      ))}
    </div>
  );
}

function Campo({ label, erro, children }: { label: string; erro?: string | undefined; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-semibold">{label}</span>
      {children}
      {erro && <span className="block text-sm text-primary">{erro}</span>}
    </label>
  );
}

export function CartSheet() {
  const { linhas, subtotal, setQtd, setObs, clear, aberto, setAberto } = useCart();
  const online = useOnline();
  const estaAberto = useAberto();
  const [etapa, setEtapa] = useState<"itens" | "dados">("itens");
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState<Tipo | "">("");
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [referencia, setReferencia] = useState("");
  const [pagamento, setPagamento] = useState<string>("");
  const [troco, setTroco] = useState("");
  const [obsGeral, setObsGeral] = useState("");
  const [erros, setErros] = useState<Record<string, string>>({});

  useEffect(() => { if (!aberto) setEtapa("itens"); }, [aberto]);

  const embalagem = tipo === "Entrega" || tipo === "Retirada" ? negocio.embalagem : 0;
  const taxa = tipo === "Entrega" ? negocio.taxaEntrega : 0;
  const total = subtotal + embalagem + (taxa ?? 0);

  const enviar = () => {
    const e: Record<string, string> = {};
    if (!linhas.length) e.itens = "Adicione pelo menos um item.";
    if (nome.trim().length < 2) e.nome = "Informe seu nome.";
    if (!tipo) e.tipo = "Escolha como quer receber.";
    if (tipo === "Entrega") {
      if (endereco.trim().length < 5) e.endereco = "Informe o endereço com número.";
      if (bairro.trim().length < 2) e.bairro = "Informe o bairro.";
    }
    if (!pagamento) e.pagamento = "Escolha a forma de pagamento.";
    setErros(e);
    if (Object.keys(e).length) return;

    const itens = linhas.map((l) =>
      `- ${l.qtd}x ${l.nome}${l.opcao ? ` (${l.opcao})` : ""} — ${brl(l.preco * l.qtd)}${l.obs ? ` (obs: ${l.obs})` : ""}`).join("\n");
    const end = tipo === "Entrega" ? `${endereco.trim()}, ${bairro.trim()}${referencia.trim() ? ` (ref.: ${referencia.trim()})` : ""}` : "—";
    const pag = pagamento === "Dinheiro" && troco.trim() ? `Dinheiro (troco para ${troco.trim()})` : pagamento;
    const msg = [
      `*Novo pedido — ${negocio.nome}*`, "", itens, "",
      `*Subtotal:* ${brl(subtotal)}`,
      `*Embalagem:* ${embalagem ? brl(embalagem) : "—"}`,
      `*Entrega:* ${tipo === "Entrega" ? (taxa === null ? "a combinar" : brl(taxa)) : "—"}`,
      `*Total:* ${brl(total)}${tipo === "Entrega" && taxa === null ? " + entrega" : ""}`, "",
      `*Cliente:* ${nome.trim()}`,
      `*Tipo:* ${tipo}`,
      `*Endereço:* ${end}`,
      `*Pagamento:* ${pag}`,
      `*Observações:* ${obsGeral.trim() || "—"}`,
    ].join("\n");
    window.open(whatsappLink(msg), "_blank");
    clear();
    setAberto(false);
  };

  return (
    <Sheet open={aberto} onOpenChange={setAberto}>
      <SheetContent side="bottom" className="mx-auto flex h-[90dvh] max-w-[480px] flex-col gap-0 rounded-t-3xl p-0">
        <SheetHeader className="border-b border-border p-4 text-center">
          <div className="flex items-center justify-center gap-2">
            {etapa === "dados" && (
              <button onClick={() => setEtapa("itens")} aria-label="Voltar aos itens" className="absolute left-3 top-3 grid h-11 w-11 place-items-center rounded-full hover:bg-muted"><ArrowLeft className="h-5 w-5" /></button>
            )}
            <SheetTitle className="font-display text-3xl uppercase">{etapa === "itens" ? "Seu pedido" : "Seus dados"}</SheetTitle>
          </div>
          <SheetDescription className="text-center">{etapa === "itens" ? "Confira os itens e a quantidade." : "Só o necessário pra gente preparar."}</SheetDescription>
        </SheetHeader>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
          {estaAberto === false && (
            <p className="rounded-2xl border border-border bg-muted/50 p-3 text-center text-sm">Estamos fechados agora, abrimos às {horaAbertura()}. Você pode montar o pedido e enviar.</p>
          )}
          {etapa === "itens" ? (
            linhas.length === 0 ? (
              <p className="py-10 text-center text-muted-foreground">Nada por aqui ainda. Bora de espetinho?</p>
            ) : (
              linhas.map((l) => (
                <div key={l.key} className="space-y-2 rounded-2xl border border-border bg-card p-3">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
                    <div className="min-w-0">
                      <p className="font-semibold">{l.nome}{l.opcao && <span className="text-muted-foreground"> · {l.opcao}</span>}</p>
                      <p className="text-sm text-primary">{brl(l.preco * l.qtd)}</p>
                    </div>
                    <button onClick={() => setQtd(l.key, 0)} aria-label={`Remover ${l.nome}`} className="grid h-11 w-11 place-items-center rounded-full text-muted-foreground hover:bg-muted"><Trash2 className="h-4 w-4" /></button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="outline" className="h-11 w-11" onClick={() => setQtd(l.key, l.qtd - 1)} aria-label="Diminuir"><Minus className="h-4 w-4" /></Button>
                    <span className="w-8 text-center text-lg font-bold">{l.qtd}</span>
                    <Button size="icon" variant="outline" className="h-11 w-11" onClick={() => setQtd(l.key, l.qtd + 1)} aria-label="Aumentar"><Plus className="h-4 w-4" /></Button>
                  </div>
                  <Input placeholder="Observação (ex.: ao ponto)" value={l.obs} onChange={(e) => setObs(l.key, e.target.value)} maxLength={140} aria-label={`Observação para ${l.nome}`} />
                </div>
              ))
            )
          ) : (
            <div className="space-y-4">
              <Campo label="Seu nome" erro={erros.nome}><Input value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="name" /></Campo>
              <Campo label="Como quer receber?" erro={erros.tipo}><Chips label="Tipo de pedido" valores={TIPOS} valor={tipo} onChange={setTipo} /></Campo>
              {tipo === "Entrega" && (
                <>
                  <Campo label="Endereço e número" erro={erros.endereco}><Input value={endereco} onChange={(e) => setEndereco(e.target.value)} autoComplete="street-address" /></Campo>
                  <Campo label="Bairro" erro={erros.bairro}><Input value={bairro} onChange={(e) => setBairro(e.target.value)} /></Campo>
                  <Campo label="Ponto de referência (opcional)"><Input value={referencia} onChange={(e) => setReferencia(e.target.value)} /></Campo>
                </>
              )}
              <Campo label="Pagamento" erro={erros.pagamento}><Chips label="Pagamento" valores={negocio.pagamentos} valor={pagamento} onChange={setPagamento} /></Campo>
              {pagamento === "Dinheiro" && <Campo label="Troco para quanto? (opcional)"><Input inputMode="decimal" placeholder="Ex.: R$ 100" value={troco} onChange={(e) => setTroco(e.target.value)} /></Campo>}
              <Campo label="Observações gerais (opcional)"><Textarea value={obsGeral} onChange={(e) => setObsGeral(e.target.value)} maxLength={300} /></Campo>
              {erros.itens && <p className="text-sm text-primary">{erros.itens}</p>}
            </div>
          )}
        </div>

        <div className="space-y-2 border-t border-border bg-background p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <div className="space-y-1 text-sm text-muted-foreground">
            <div className="flex justify-between"><span>Subtotal</span><span>{brl(subtotal)}</span></div>
            {embalagem > 0 && <div className="flex justify-between"><span>Embalagem</span><span>{brl(embalagem)}</span></div>}
            {tipo === "Entrega" && <div className="flex justify-between"><span>Entrega</span><span>{taxa === null ? "a combinar" : brl(taxa ?? 0)}</span></div>}
          </div>
          <div className="flex justify-between font-display text-2xl"><span>Total</span><span className="text-primary">{brl(total)}</span></div>
          {!online && <p className="text-sm text-secondary">Você está offline — conecte-se para enviar o pedido.</p>}
          {etapa === "itens" ? (
            <Button className="min-h-12 w-full" size="lg" disabled={!linhas.length} onClick={() => setEtapa("dados")}>Continuar</Button>
          ) : (
            <Button className="min-h-12 w-full" size="lg" disabled={!linhas.length || !online} onClick={enviar}>
              <MessageCircle className="h-5 w-5" /> Enviar pedido pelo WhatsApp
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
