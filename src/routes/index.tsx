import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, MapPin, Clock, Wallet, Instagram, MessageCircle, Car, Utensils, CalendarDays, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ItemImage } from "@/components/site/ItemImage";
import { MenuItemCard } from "@/components/site/MenuItemCard";
import { InstallCard } from "@/components/site/Install";
import { todosItens, destaquesSlugs, combos, brl } from "@/data/cardapio";
import { imagensHero, imagensItens } from "@/data/imagens";
import { negocio, enderecoCompleto, comoChegarUrl, whatsappLink, instagramUrl } from "@/data/negocio";
import { useAberto, horaAbertura } from "@/lib/horario";
import { useCart } from "@/lib/cart";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: negocio.nome,
  servesCuisine: ["Churrasco", "Espetinhos", "Brasileira"],
  priceRange: "R$ 20-40",
  url: negocio.siteUrl,
  telephone: `+${negocio.whatsapp}`,
  sameAs: [instagramUrl],
  hasMenu: `${negocio.siteUrl}/cardapio`,
  acceptsReservations: true,
  paymentAccepted: negocio.pagamentos.join(", "),
  address: {
    "@type": "PostalAddress",
    streetAddress: negocio.endereco.rua,
    addressLocality: negocio.endereco.cidade,
    addressRegion: negocio.endereco.uf,
    postalCode: negocio.endereco.cep,
    addressCountry: "BR",
  },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Espetaria do Buchecha — Espetos e cerveja gelada em Uberlândia" },
      { name: "description", content: "Espetos grelhados na hora, jantinha e cerveja gelada no Copacabana, Uberlândia/MG. Veja o cardápio e peça pelo WhatsApp." },
      { property: "og:title", content: "Espetaria do Buchecha — Uberlândia/MG" },
      { property: "og:description", content: "Espetos grelhados na hora, cerveja gelada e gente boa. Peça pelo WhatsApp." },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  component: Index,
});

function Titulo({ rotulo, titulo, sub }: { rotulo?: string; titulo: string; sub?: string }) {
  return (
    <div className="mx-auto mb-6 max-w-[20rem] text-center">
      {rotulo && <p className="font-hand text-lg text-secondary">{rotulo}</p>}
      <h2 className="text-balance font-display text-4xl uppercase leading-none">{titulo}</h2>
      {sub && <p className="mt-2 text-pretty text-sm text-muted-foreground">{sub}</p>}
    </div>
  );
}

function StatusSelo() {
  const aberto = useAberto();
  if (aberto === null) return <span className="selo"><Clock className="h-3.5 w-3.5 text-primary" />{negocio.funcionamentoResumo}</span>;
  return aberto
    ? <span className="selo border-emerald-500/50 text-emerald-400"><span className="h-2 w-2 rounded-full bg-emerald-400" />Aberto agora · até 00h</span>
    : <span className="selo text-muted-foreground"><Clock className="h-3.5 w-3.5" />Fechado · abre às {horaAbertura()}</span>;
}

function Index() {
  const destaques = destaquesSlugs.map((s) => todosItens.find((i) => i.slug === s)!).filter(Boolean);
  const { add } = useCart();
  return (
    <>
      <section className="relative overflow-hidden">
        <ItemImage src={imagensHero.hero} ratio="video" eager alt="Espetos na brasa com fumaça e mesas vermelhas ao fundo"
          className="absolute inset-0 !aspect-auto h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/30" />
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="spark" style={{ left: `${(i * 9.7) % 100}%`, animationDelay: `${(i * 0.43) % 4}s`, animationDuration: `${3 + (i % 3)}s` }} />
          ))}
        </div>
        <div className="anim-sobe relative px-4 pb-10 pt-24 text-center">
          <p className="font-hand text-2xl text-secondary">Bora de espetinho?</p>
          <h1 className="mt-1 font-display text-[clamp(2.75rem,14vw,4rem)] uppercase leading-[0.9]">
            Espetaria do<br /><span className="text-primary">Buchecha</span>
          </h1>
          <p className="mx-auto mt-4 max-w-[18rem] text-pretty text-base text-muted-foreground">{negocio.subtitulo}</p>
          <div className="mt-6 grid gap-3">
            <Button asChild size="lg" className="min-h-12 font-bold"><Link to="/cardapio">Ver cardápio e pedir</Link></Button>
            <Button asChild size="lg" variant="outline" className="min-h-12">
              <a href={whatsappLink("Olá! Vim pelo site da Espetaria do Buchecha.")} target="_blank" rel="noreferrer"><MessageCircle className="h-5 w-5" /> Chamar no WhatsApp</a>
            </Button>
          </div>
          <div className="mt-5 flex flex-col items-center gap-1 text-xs">
            <StatusSelo />
            <div className="flex flex-wrap justify-center gap-2">
              <span className="selo"><Wallet className="h-3.5 w-3.5 text-primary" />{negocio.faixaPreco}</span>
              <span className="selo"><Utensils className="h-3.5 w-3.5 text-primary" />{negocio.selos[0]}</span>
            </div>
          </div>
        </div>
      </section>

      <InstallCard />

      <section className="px-4 py-12">
        <Titulo rotulo="Os queridinhos" titulo="Saindo da brasa" sub="Os espetos mais pedidos da casa." />
        <div className="grid grid-cols-2 gap-3">
          {destaques.map((i) => <MenuItemCard key={i.slug} item={i} />)}
        </div>
        <Button asChild variant="outline" className="mt-5 min-h-11 w-full"><Link to="/cardapio">Ver cardápio completo</Link></Button>
      </section>

      <section className="px-4 py-12">
        <Titulo rotulo="Pra galera" titulo="Combos da casa" sub="Junta a turma e economiza na rodada." />
        <div className="space-y-4">
          {combos.map((c) => (
            <article key={c.slug} className="overflow-hidden rounded-2xl border border-border bg-card">
              <ItemImage src={imagensItens[c.slug]} ratio="video" alt={`${c.nome}: ${c.descricao}`} />
              <div className="space-y-2 p-4">
                <h3 className="font-display text-2xl uppercase leading-tight">{c.nome}</h3>
                <p className="text-sm text-muted-foreground">{c.descricao}</p>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-display text-2xl text-primary">{brl(c.preco)}</span>
                  <Button className="min-h-11" onClick={() => { add({ slug: c.slug, nome: c.nome, preco: c.preco }); toast.success(`${c.nome} no pedido!`); }}>
                    <Plus className="h-4 w-4" /> Adicionar
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="rounded-3xl border border-primary/50 bg-ember p-6 text-center shadow-[0_0_40px_-12px_oklch(0.59_0.23_27/60%)]">
          <CalendarDays className="mx-auto h-8 w-8 text-secondary" />
          <h2 className="mt-2 text-balance font-display text-4xl uppercase leading-none">Reservar mesa</h2>
          <p className="mx-auto mt-2 max-w-[18rem] text-pretty text-sm text-muted-foreground">Aniversário ou resenha com a galera? Peça sua mesa pelo WhatsApp.</p>
          <Button asChild size="lg" className="mt-5 min-h-12 w-full"><Link to="/reservar">Solicitar reserva</Link></Button>
        </div>
      </section>

      <section className="px-4 py-12">
        <Titulo rotulo="Sobre a casa" titulo="Boteco raiz de verdade" />
        <ItemImage src={imagensHero.sobre} ratio="video" className="rounded-2xl" alt="Mesas de plástico vermelho com espetos, batata e cerveja à noite" />
        <p className="mt-4 text-center text-pretty text-muted-foreground">{negocio.bio}. Mesa vermelha, espeto saindo da brasa e cerveja trincando.</p>
        <a href={instagramUrl} target="_blank" rel="noreferrer" className="mx-auto mt-3 flex min-h-11 w-fit items-center gap-2 font-semibold text-secondary"><Instagram className="h-5 w-5" />@{negocio.instagram}</a>
      </section>

      <section className="px-4 py-12 text-center">
        <Titulo titulo="Quem vem, aprova" />
        <div className="flex items-center justify-center gap-1 text-secondary" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-6 w-6 fill-current" />)}
        </div>
        <p className="mt-2 font-display text-6xl">{negocio.google.nota.toLocaleString("pt-BR")}</p>
        <p className="text-sm text-muted-foreground">{negocio.google.avaliacoes} avaliações no Google · conferido em {negocio.google.conferidoEm}</p>
        <Button asChild variant="outline" className="mt-5 min-h-11 w-full"><a href={negocio.google.url} target="_blank" rel="noreferrer">Ver avaliações no Google</a></Button>
      </section>

      <section className="px-4 py-12 text-center">
        <Titulo titulo="Onde estamos" />
        <p className="flex items-start justify-center gap-2 text-pretty"><MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" />{enderecoCompleto}</p>
        <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
          {negocio.horariosTexto.map((h) => <li key={h.dia}><b className="text-foreground">{h.dia}:</b> {h.horas}</li>)}
        </ul>
        <Button asChild size="lg" className="mt-5 min-h-12 w-full"><a href={comoChegarUrl} target="_blank" rel="noreferrer"><MapPin className="h-5 w-5" /> Como chegar</a></Button>
      </section>
    </>
  );
}
