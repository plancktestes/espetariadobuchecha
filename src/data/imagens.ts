// SUBSTITUIR PELAS FOTOS REAIS DO CLIENTE
// Coloque os arquivos em public/images/... com exatamente estes nomes.
// Se o arquivo não existir, o site mostra automaticamente um fundo de brasa com o nome do item.

export const logo = "/images/logo.png";

export const imagensHero = {
  hero: "/images/hero/hero.webp",
  sobre: "/images/ambiente/sobre.webp",
  combos: "/images/ambiente/combos.webp",
};

const slugs = [
  "espeto-contra-file", "espeto-fraldinha", "espeto-franbacon", "espeto-coracao", "espeto-kafta",
  "espeto-almondega-bacon", "espeto-linguica-pernil", "espeto-linguica-apimentada", "espeto-lombo",
  "espeto-provolone", "espeto-queijo-coalho", "espeto-tulipa", "jantinha", "simples",
  "calabresa-cebola", "batata-frita", "batata-queijo-bacon", "mandioca-frita", "tilapia",
  "caldo-feijao", "caldo-frango", "vaca-atolada", "arroz", "tropeiro", "vinagrete",
  "mandioca-cozida", "ovo-frito", "cerveja-600", "barrigudinha", "long-neck", "caipirinha",
  "campari", "gin-tonica", "doses", "refrigerante", "energetico", "suco",
] as const;

export const imagensItens: Record<string, string> = Object.fromEntries(
  slugs.map((s) => [s, `/images/itens/${s}.webp`]),
);
