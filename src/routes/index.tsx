import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, MapPin, Clock, Wallet, Instagram, MessageCircle, Car, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ItemImage } from "@/components/site/ItemImage";
import { MenuItemCard } from "@/components/site/MenuItemCard";
import { InstallCard } from "@/components/site/Install";
import { cardapio } from "@/data/cardapio";
import { imagensHero } from "@/data/imagens";
import { negocio, enderecoCompleto, comoChegarUrl, whatsappLink, instagramUrl } from "@/data/negocio";

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
      { name: "description", content: "Espetos grelhados na hora, jantinha e cerveja gelada no Copacabana, Uberlândia. Veja o cardápio e peça pelo WhatsApp." },
      { property: "og:title", content: "Espetaria do Buchecha — Bora de espetinho?" },
      { property: "og:description", content: "Espetos grelhados na hora, cerveja gelada e gente boa. Peça pelo WhatsApp." },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  component: Index,
});

function Index() {
  const destaques = (cardapio[0]?.itens ?? []).slice(0, 4);
  return (
    <>
      <section className="relative overflow-hidden">
        <ItemImage src={imagensHero.hero} ratio="video" nome="" eager
          alt="Espetos na brasa com fumaça, mesas vermelhas desfocadas ao fundo"
          className="absolute inset-0 !aspect-auto h-full w-full opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className="spark" style={{ left: `${(i * 7.3) % 100}%`, animationDelay: `${(i * 0.37) % 4}s`, animationDuration: `${3 + (i % 3)}s` }} />
          ))}
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center md:py-32">
          <p className="font-hand text-2xl text-secondary">Bora de espetinho?</p>
          <h1 className="mt-2 font-display text-6xl uppercase leading-[0.9] md:text-8xl">
            Espetaria do <span className="text-primary">Buchecha</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">{negocio.subtitulo}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="font-bold"><Link to="/cardapio">Ver cardápio e pedir</Link></Button>
            <Button asChild size="lg" variant="outline">
              <a href={whatsappLink("Olá! Vim pelo site da Espetaria do Buchecha.")} target="_blank" rel="noreferrer"><MessageCircle className="h-5 w-5" /> Chamar no WhatsApp</a>
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs">
            {[[Clock, negocio.funcionamentoResumo], [Wallet, negocio.faixaPreco], [Utensils, negocio.selos[0]], [Car, negocio.selos[1]]].map(([I, t], i) => {
              const Icon = I as typeof Clock;
              return <span key={i} className="inline-flex items-center gap-1 rounded-full border border-border bg-card/70 px-3 py-1"><Icon className="h-3.5 w-3.5 text-primary" />{t as string}</span>;
            })}
          </div>
          <InstallCard />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-4xl uppercase">Saindo da brasa</h2>
          <Link to="/cardapio" className="text-sm text-primary hover:underline">Cardápio completo →</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {destaques.map((i) => <MenuItemCard key={i.slug} item={i} />)}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-2">
        <ItemImage src={imagensHero.sobre} ratio="video" nome="Nosso boteco" className="rounded-2xl"
          alt="Mesa de bar com porções e cerveja, cadeiras de plástico vermelho" />
        <div>
          <p className="font-hand text-xl text-secondary">Sobre a casa</p>
          <h2 className="font-display text-4xl uppercase">Boteco raiz, do jeito que tem que ser</h2>
          <p className="mt-3 text-muted-foreground">{negocio.bio}. Aqui é mesa vermelha, espeto saindo da brasa, cerveja trincando e a família e os amigos reunidos no Copacabana.</p>
          <a href={instagramUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-primary hover:underline">
            <Instagram className="h-4 w-4" />@{negocio.instagram}
          </a>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-16 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-3xl uppercase">O que a galera diz</h2>
          <div className="mt-4 flex items-center gap-3">
            <span className="font-display text-6xl">{negocio.google.nota.toLocaleString("pt-BR")}</span>
            <div>
              <div className="flex text-secondary">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}</div>
              <p className="text-sm text-muted-foreground">{negocio.google.avaliacoes} avaliações no Google</p>
            </div>
          </div>
          <Button asChild variant="secondary" className="mt-5"><a href={negocio.google.url} target="_blank" rel="noreferrer">Ver avaliações no Google</a></Button>
          <p className="mt-3 text-xs text-muted-foreground">Nota conferida em {negocio.google.conferidoEm}.</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-3xl uppercase">Onde estamos</h2>
          <p className="mt-4 flex gap-2"><MapPin className="h-5 w-5 shrink-0 text-primary" />{enderecoCompleto}</p>
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
            {negocio.horarios.map((h) => <li key={h.dia}><Clock className="mr-1 inline h-4 w-4" />{h.dia}: {h.horas}</li>)}
          </ul>
          <Button asChild className="mt-5"><a href={comoChegarUrl} target="_blank" rel="noreferrer"><MapPin className="h-4 w-4" /> Como chegar</a></Button>
        </div>
      </section>
    </>
  );
}
