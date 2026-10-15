import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Flame, Utensils, Drumstick, Soup, Salad, Beer, Martini, CupSoda, GlassWater, Search, LayoutGrid, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { MenuItemCard } from "@/components/site/MenuItemCard";
import { cardapio, todosItens, normalizar } from "@/data/cardapio";

export const Route = createFileRoute("/cardapio")({
  head: () => ({
    meta: [
      { title: "Cardápio — Espetaria do Buchecha, Uberlândia" },
      { name: "description", content: "Espetos a R$ 11, jantinha, porções, caldos e bebidas geladas. Monte seu pedido e envie pelo WhatsApp." },
      { property: "og:title", content: "Cardápio da Espetaria do Buchecha" },
      { property: "og:description", content: "Espetos, jantinha, porções, caldos e bebidas em Uberlândia/MG." },
    ],
  }),
  component: Cardapio,
});

const ICONES = { flame: Flame, utensils: Utensils, drumstick: Drumstick, soup: Soup, salad: Salad, beer: Beer, martini: Martini, cup: CupSoda, glass: GlassWater } as const;

const irPara = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

function Cardapio() {
  const [q, setQ] = useState("");
  const [atual, setAtual] = useState(cardapio[0]!.nome);
  const [mostrarBarra, setMostrarBarra] = useState(false);
  const [lista, setLista] = useState(false);
  const gradeRef = useRef<HTMLDivElement>(null);
  const buscaRef = useRef<HTMLInputElement>(null);

  const resultados = useMemo(() => {
    const t = normalizar(q.trim());
    return t ? todosItens.filter((i) => normalizar(`${i.nome} ${i.descricao}`).includes(t)) : null;
  }, [q]);

  useEffect(() => {
    const g = gradeRef.current;
    const o1 = new IntersectionObserver(([e]) => setMostrarBarra(!e!.isIntersecting), { rootMargin: "-56px 0px 0px 0px" });
    if (g) o1.observe(g);
    const o2 = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) setAtual(e.target.getAttribute("data-nome") ?? ""); });
    }, { rootMargin: "-120px 0px -65% 0px" });
    document.querySelectorAll("section[data-nome]").forEach((s) => o2.observe(s));
    return () => { o1.disconnect(); o2.disconnect(); };
  }, [resultados]);

  return (
    <div className="px-4 pb-8 pt-8">
      <div className="text-center">
        <p className="font-hand text-xl text-secondary">Escolhe aí</p>
        <h1 className="font-display text-6xl uppercase leading-none">Cardápio</h1>
      </div>

      <div className="relative mt-6">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input ref={buscaRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar no cardápio" aria-label="Buscar no cardápio" className="h-12 rounded-2xl pl-9 pr-11" />
        {q && <button onClick={() => setQ("")} aria-label="Limpar busca" className="absolute right-1 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center"><X className="h-4 w-4" /></button>}
      </div>

      {mostrarBarra && !resultados && (
        <div className="sticky top-14 z-30 -mx-4 mt-2 grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 border-b border-border bg-background/95 px-4 py-1.5 backdrop-blur">
          <span className="truncate font-display text-lg uppercase text-primary">{atual}</span>
          <button onClick={() => setLista(true)} className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border px-3 text-sm font-semibold"><LayoutGrid className="h-4 w-4" />Categorias</button>
          <button onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setTimeout(() => buscaRef.current?.focus(), 400); }} aria-label="Buscar" className="grid h-11 w-11 place-items-center rounded-full border border-border"><Search className="h-4 w-4" /></button>
        </div>
      )}

      {resultados ? (
        <section className="py-6">
          <h2 className="mb-4 text-center font-display text-3xl uppercase">{resultados.length} resultado{resultados.length === 1 ? "" : "s"}</h2>
          {resultados.length === 0 ? <p className="text-center text-muted-foreground">Nada encontrado. Tente outro nome.</p> : (
            <div className="grid grid-cols-2 gap-3">{resultados.map((i) => <MenuItemCard key={i.slug} item={i} />)}</div>
          )}
        </section>
      ) : (
        <>
          <div ref={gradeRef} className="mt-5 grid grid-cols-2 gap-2">
            {cardapio.map((c) => {
              const I = ICONES[c.icone as keyof typeof ICONES] ?? Flame;
              return (
                <button key={c.id} onClick={() => irPara(c.id)} className="flex min-h-12 min-w-0 items-center gap-2 rounded-2xl border border-primary/60 bg-card px-3 py-2 text-left text-sm font-semibold">
                  <I className="h-5 w-5 shrink-0 text-primary" /><span className="min-w-0 leading-tight">{c.nome}</span>
                </button>
              );
            })}
          </div>
          {cardapio.map((c) => (
            <section key={c.id} id={c.id} data-nome={c.nome} className="scroll-mt-32 pt-10">
              <h2 className="mb-4 text-center font-display text-4xl uppercase text-primary">{c.nome}</h2>
              <div className="grid grid-cols-2 gap-3">{c.itens.map((i) => <MenuItemCard key={i.slug} item={i} />)}</div>
            </section>
          ))}
        </>
      )}

      <Sheet open={lista} onOpenChange={setLista}>
        <SheetContent side="bottom" className="mx-auto max-h-[80dvh] max-w-[480px] overflow-y-auto rounded-t-3xl pb-[env(safe-area-inset-bottom)]">
          <SheetHeader><SheetTitle className="text-center font-display text-3xl uppercase">Categorias</SheetTitle><SheetDescription className="text-center">Toque para ir direto.</SheetDescription></SheetHeader>
          <ul className="grid gap-1 px-4 pb-4">
            {cardapio.map((c) => (
              <li key={c.id}>
                <button onClick={() => { setLista(false); setTimeout(() => irPara(c.id), 250); }} className="flex min-h-12 w-full items-center justify-between rounded-xl px-3 text-left font-semibold hover:bg-muted">
                  {c.nome}<span className="text-sm text-muted-foreground">{c.itens.length}</span>
                </button>
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
}
