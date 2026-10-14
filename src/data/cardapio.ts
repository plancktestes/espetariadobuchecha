// Cardápio oficial. Preço como número. preco: null => "Consulte".
// opcoes => item com Meia / Inteira.

export type Opcoes = { meia: number; inteira: number };
export type Item = {
  id: string;
  slug: string;
  nome: string;
  descricao: string;
  preco: number | null;
  opcoes?: Opcoes;
  categoria: string;
  tags: string[];
};
export type Categoria = { id: string; nome: string; icone: string; itens: Item[] };

type Base = { slug: string; nome: string; descricao: string; preco?: number | null; opcoes?: Opcoes; tags?: string[] };

const cat = (id: string, nome: string, icone: string, itens: Base[]): Categoria => ({
  id,
  nome,
  icone,
  itens: itens.map((i) => ({
    id: i.slug,
    slug: i.slug,
    nome: i.nome,
    descricao: i.descricao,
    preco: i.opcoes ? i.opcoes.meia : (i.preco ?? null),
    opcoes: i.opcoes,
    categoria: id,
    tags: i.tags ?? [],
  })),
});

const MAIS = ["Mais pedido"];

export const cardapio: Categoria[] = [
  cat("espetos", "Espetos", "flame", [
    { slug: "espeto-contra-file", nome: "Contra Filé", descricao: "Cubos de contra filé dourados na brasa.", preco: 11, tags: MAIS },
    { slug: "espeto-fraldinha", nome: "Fraldinha", descricao: "Fraldinha suculenta, grelhada na hora.", preco: 11 },
    { slug: "espeto-franbacon", nome: "Franbacon", descricao: "Frango com bacon dourado na brasa.", preco: 11, tags: MAIS },
    { slug: "espeto-coracao", nome: "Coração", descricao: "Coração de frango temperado e grelhado.", preco: 11 },
    { slug: "espeto-kafta", nome: "Kafta", descricao: "Kafta grelhada no palito.", preco: 11 },
    { slug: "espeto-almondega-bacon", nome: "Almôndega c/ Bacon", descricao: "Almôndega com bacon dourado.", preco: 11 },
    { slug: "espeto-linguica-pernil", nome: "Linguiça de Pernil", descricao: "Rodelas grossas de linguiça tostada.", preco: 11 },
    { slug: "espeto-linguica-apimentada", nome: "Linguiça Apimentada", descricao: "Linguiça com aquele ardidinho.", preco: 11 },
    { slug: "espeto-lombo", nome: "Lombo", descricao: "Lombo suíno dourado na brasa.", preco: 11 },
    { slug: "espeto-provolone", nome: "Queijo Provolone", descricao: "Provolone dourado na grelha.", preco: 11 },
    { slug: "espeto-queijo-coalho", nome: "Queijo Coalho", descricao: "Coalho dourado com marcas de grelha.", preco: 11, tags: MAIS },
    { slug: "espeto-tulipa", nome: "Tulipa", descricao: "Tulipa de frango dourada no palito.", preco: 11 },
  ]),
  cat("acompanhamentos", "Acompanhamentos", "utensils", [
    { slug: "jantinha", nome: "Jantinha", descricao: "Arroz, feijão tropeiro, mandioca, vinagrete e alface.", preco: 11 },
    { slug: "simples", nome: "Simples", descricao: "Mandioca, vinagrete, farofa e alface.", preco: 7 },
  ]),
  cat("porcoes", "Porções", "drumstick", [
    { slug: "calabresa-cebola", nome: "Calabresa c/ Cebola", descricao: "Calabresa acebolada na travessa.", opcoes: { meia: 15, inteira: 25 } },
    { slug: "batata-frita", nome: "Batata Frita", descricao: "Batata frita sequinha e crocante.", opcoes: { meia: 15, inteira: 25 } },
    { slug: "batata-queijo-bacon", nome: "Batata Frita c/ Queijo e Bacon", descricao: "Batata com queijo derretido e bacon.", opcoes: { meia: 18, inteira: 30 }, tags: MAIS },
    { slug: "mandioca-frita", nome: "Mandioca Frita", descricao: "Crocante por fora, macia por dentro.", opcoes: { meia: 15, inteira: 25 } },
    { slug: "tilapia", nome: "Tilápia", descricao: "Iscas de tilápia com limão.", opcoes: { meia: 20, inteira: 40 } },
  ]),
  cat("caldos", "Caldos", "soup", [
    { slug: "caldo-feijao", nome: "Caldo de Feijão", descricao: "Caldo de feijão quentinho.", preco: 22 },
    { slug: "caldo-frango", nome: "Caldo de Frango", descricao: "Caldo de frango quentinho.", preco: 22 },
    { slug: "vaca-atolada", nome: "Vaca Atolada", descricao: "Pergunte a disponibilidade e o valor.", preco: null },
  ]),
  cat("guarnicoes", "Guarnições", "salad", [
    { slug: "arroz", nome: "Arroz", descricao: "Porção de arroz.", preco: 7 },
    { slug: "tropeiro", nome: "Feijão Tropeiro", descricao: "Porção de feijão tropeiro.", preco: 7 },
    { slug: "vinagrete", nome: "Vinagrete", descricao: "Porção de vinagrete.", preco: 7 },
    { slug: "mandioca", nome: "Mandioca", descricao: "Porção de mandioca.", preco: 7 },
    { slug: "ovo-frito", nome: "Ovo Frito", descricao: "Ovo frito na hora.", preco: 2 },
  ]),
  cat("cervejas", "Cervejas 600ml", "beer", [
    { slug: "amstel-600", nome: "Amstel 600ml", descricao: "Garrafa 600ml bem gelada.", preco: 14 },
    { slug: "brahma-duplo-malte-600", nome: "Brahma Duplo Malte 600ml", descricao: "Garrafa 600ml bem gelada.", preco: 14 },
    { slug: "petra-600", nome: "Petra 600ml", descricao: "Garrafa 600ml bem gelada.", preco: 14 },
    { slug: "spaten-600", nome: "Spaten 600ml", descricao: "Garrafa 600ml bem gelada.", preco: 15 },
    { slug: "heineken-600", nome: "Heineken 600ml", descricao: "Garrafa 600ml bem gelada.", preco: 17 },
    { slug: "stella-600", nome: "Stella Artois 600ml", descricao: "Garrafa 600ml bem gelada.", preco: 17 },
  ]),
  cat("barrigudinhas", "Barrigudinhas", "beer", [
    { slug: "barrigudinha-brahma", nome: "Brahma Barrigudinha", descricao: "Garrafinha trincando.", preco: 6 },
    { slug: "barrigudinha-original", nome: "Original Barrigudinha", descricao: "Garrafinha trincando.", preco: 6 },
    { slug: "barrigudinha-skol", nome: "Skol Barrigudinha", descricao: "Garrafinha trincando.", preco: 6 },
  ]),
  cat("long-neck", "Long Neck", "beer", [
    { slug: "ln-corona", nome: "Corona Long Neck", descricao: "Long neck gelada.", preco: 11 },
    { slug: "ln-heineken", nome: "Heineken Long Neck", descricao: "Long neck gelada.", preco: 11 },
    { slug: "ln-spaten", nome: "Spaten Long Neck", descricao: "Long neck gelada.", preco: 11 },
    { slug: "ln-stella", nome: "Stella Artois Long Neck", descricao: "Long neck gelada.", preco: 11 },
  ]),
  cat("drinks", "Drinks", "martini", [
    { slug: "caipirinha", nome: "Caipirinha", descricao: "Limão, gelo e açúcar.", preco: 15 },
    { slug: "caipivodka", nome: "Caipivodka", descricao: "Vodka, limão, gelo e açúcar.", preco: 15 },
    { slug: "campari", nome: "Campari", descricao: "Campari servido com gelo.", preco: 15 },
    { slug: "gin-tonica", nome: "Gin Tônica", descricao: "Gin com água tônica e gelo.", preco: 25 },
    { slug: "gin-tropical", nome: "Gin Tropical", descricao: "Gin com toque tropical e gelo.", preco: 25 },
    { slug: "cdb-dose", nome: "CDB (dose)", descricao: "Dose servida no copinho.", preco: 3 },
    { slug: "cozumel-dose", nome: "Cozumel (dose)", descricao: "Dose servida no copinho.", preco: 6 },
    { slug: "gelo-limao", nome: "Gelo e Limão", descricao: "Copo com gelo e limão.", preco: 1 },
  ]),
  cat("refrigerantes", "Refrigerantes e Águas", "cup", [
    { slug: "coca-litro", nome: "Coca-Cola Litro", descricao: "Garrafa de 1 litro gelada.", preco: 10 },
    { slug: "coca-lata", nome: "Coca-Cola Lata", descricao: "Lata gelada.", preco: 6 },
    { slug: "guarana-lata", nome: "Guaraná Lata", descricao: "Lata gelada.", preco: 6 },
    { slug: "sprite-lemon", nome: "Sprite Lemon", descricao: "Gelada.", preco: 6 },
    { slug: "agua", nome: "Água", descricao: "Água mineral gelada.", preco: 4 },
    { slug: "agua-gas", nome: "Água com Gás", descricao: "Água com gás gelada.", preco: 4 },
    { slug: "agua-tonica", nome: "Água Tônica", descricao: "Tônica gelada.", preco: 6 },
    { slug: "red-bull", nome: "Red Bull", descricao: "Energético gelado.", preco: 15 },
  ]),
  cat("sucos", "Sucos", "glass", [
    { slug: "del-valle-lata", nome: "Del Valle Lata", descricao: "Suco em lata gelado.", preco: 6 },
    { slug: "fruitz-300", nome: "Fruitz 300ml", descricao: "Suco 300ml gelado.", preco: 8 },
    { slug: "fruitz-900", nome: "Fruitz 900ml", descricao: "Suco 900ml gelado.", preco: 15 },
  ]),
];

// AJUSTAR COM O DONO: combos sugeridos.
export type Combo = { slug: string; nome: string; descricao: string; preco: number };
export const combos: Combo[] = [
  { slug: "combo-dupla-jantinha", nome: "Combo Dupla + Jantinha", descricao: "2 espetos à escolha + Jantinha.", preco: 33 },
  { slug: "combo-petisco-mesa", nome: "Combo Petisco da Mesa", descricao: "Batata c/ Queijo e Bacon (inteira) + 1 Brahma Duplo Malte 600ml.", preco: 44 },
  { slug: "combo-rodada-galera", nome: "Combo Rodada da Galera", descricao: "6 espetos à escolha + Mandioca Frita (inteira) + 2 Amstel 600ml.", preco: 119 },
];

export const todosItens = cardapio.flatMap((c) => c.itens);
export const destaquesSlugs = ["espeto-contra-file", "espeto-franbacon", "espeto-queijo-coalho", "espeto-fraldinha"];

const fmt = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
export const brl = (v: number) => fmt.format(v);

export const normalizar = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
