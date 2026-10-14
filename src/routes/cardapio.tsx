import { createFileRoute } from "@tanstack/react-router";
import { MenuItemCard } from "@/components/site/MenuItemCard";
import { cardapio } from "@/data/cardapio";

export const Route = createFileRoute("/cardapio")({
  head: () => ({
    meta: [
      { title: "Cardápio — Espetaria do Buchecha" },
      { name: "description", content: "Espetos, jantinha, porções, caldos e bebidas. Monte seu pedido e envie pelo WhatsApp." },
      { property: "og:title", content: "Cardápio da Espetaria do Buchecha" },
      { property: "og:description", content: "Espetos, jantinha, porções, caldos e bebidas geladas em Uberlândia." },
    ],
  }),
  component: Cardapio,
});

function Cardapio() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="font-hand text-xl text-secondary">Escolhe aí</p>
      <h1 className="font-display text-6xl uppercase">Cardápio</h1>
      <nav className="sticky top-[60px] z-30 -mx-4 mt-6 flex gap-2 overflow-x-auto bg-background/90 px-4 py-3 backdrop-blur">
        {cardapio.map((c) => (
          <a key={c.id} href={`#${c.id}`} className="shrink-0 rounded-full border border-border px-4 py-1.5 text-sm hover:border-primary hover:text-primary">{c.nome}</a>
        ))}
      </nav>
      {cardapio.map((c) => (
        <section key={c.id} id={c.id} className="scroll-mt-32 py-8">
          <h2 className="mb-4 font-display text-4xl uppercase text-primary">{c.nome}</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {c.itens.map((i) => <MenuItemCard key={i.slug} item={i} />)}
          </div>
        </section>
      ))}
    </div>
  );
}
