// Cardápio. Preços PROVISÓRIOS — confirme com o estabelecimento.
// price: null => exibe "Consulte" e botão de perguntar no WhatsApp.

export type Item = {
  slug: string;
  nome: string;
  descricao: string;
  price: number | null;
};

export type Categoria = { id: string; nome: string; itens: Item[] };

export const cardapio: Categoria[] = [
  {
    id: "espetos",
    nome: "Espetos",
    itens: [
      { slug: "espeto-contra-file", nome: "Contra filé", descricao: "Cubos de contra filé grelhados no sal grosso.", price: 12 },
      { slug: "espeto-fraldinha", nome: "Fraldinha", descricao: "Fraldinha suculenta, levemente caramelizada.", price: 12 },
      { slug: "espeto-franbacon", nome: "Franbacon", descricao: "Frango envolto em bacon crocante.", price: 10 },
      { slug: "espeto-coracao", nome: "Coração", descricao: "Coração de frango temperado e grelhado.", price: 10 },
      { slug: "espeto-kafta", nome: "Kafta", descricao: "Carne moída temperada com ervas.", price: 10 },
      { slug: "espeto-almondega-bacon", nome: "Almôndega c/ bacon", descricao: "Almôndegas envoltas em bacon.", price: 10 },
      { slug: "espeto-linguica-pernil", nome: "Linguiça de pernil", descricao: "Rodelas grossas de linguiça tostada.", price: 9 },
      { slug: "espeto-linguica-apimentada", nome: "Linguiça apimentada", descricao: "Pra quem gosta de um ardidinho.", price: 9 },
      { slug: "espeto-lombo", nome: "Lombo", descricao: "Lombo suíno dourado e macio.", price: 10 },
      { slug: "espeto-provolone", nome: "Queijo provolone", descricao: "Provolone derretendo na brasa.", price: 10 },
      { slug: "espeto-queijo-coalho", nome: "Queijo coalho", descricao: "Coalho dourado com marcas de grelha.", price: 9 },
      { slug: "espeto-tulipa", nome: "Tulipa", descricao: "Coxinha da asa dourada no palito.", price: 10 },
    ],
  },
  {
    id: "pratos",
    nome: "Jantinha e porções",
    itens: [
      { slug: "jantinha", nome: "Jantinha", descricao: "Arroz, tropeiro, vinagrete, mandioca, alface e 1 espeto.", price: 25 },
      { slug: "simples", nome: "Simples", descricao: "Mandioca, vinagrete, farofa, alface e 1 espeto.", price: 20 },
      { slug: "calabresa-cebola", nome: "Calabresa c/ cebola", descricao: "Calabresa acebolada na travessa.", price: 35 },
      { slug: "batata-frita", nome: "Batata frita", descricao: "Batata palito sequinha e crocante.", price: 28 },
      { slug: "batata-queijo-bacon", nome: "Batata c/ queijo e bacon", descricao: "Coberta de queijo derretido e bacon.", price: 38 },
      { slug: "mandioca-frita", nome: "Mandioca frita", descricao: "Crocante por fora, macia por dentro.", price: 28 },
      { slug: "tilapia", nome: "Tilápia", descricao: "Iscas de tilápia empanadas com limão.", price: 45 },
    ],
  },
  {
    id: "caldos",
    nome: "Caldos",
    itens: [
      { slug: "caldo-feijao", nome: "Caldo de feijão", descricao: "Caldo grosso com cebolinha e bacon.", price: 15 },
      { slug: "caldo-frango", nome: "Caldo de frango", descricao: "Caldo dourado com cheiro-verde.", price: 15 },
      { slug: "vaca-atolada", nome: "Vaca Atolada", descricao: "Costela com mandioca. Consulte disponibilidade.", price: null },
    ],
  },
  {
    id: "guarnicoes",
    nome: "Guarnições",
    itens: [
      { slug: "arroz", nome: "Arroz", descricao: "Porção de arroz branco soltinho.", price: 6 },
      { slug: "tropeiro", nome: "Feijão tropeiro", descricao: "Tropeiro com bacon e couve.", price: 8 },
      { slug: "vinagrete", nome: "Vinagrete", descricao: "Tomate, cebola e cheiro-verde.", price: 5 },
      { slug: "mandioca-cozida", nome: "Mandioca cozida", descricao: "Mandioca amarelinha e macia.", price: 6 },
      { slug: "ovo-frito", nome: "Ovo frito", descricao: "Gema dourada, borda crocante.", price: 3 },
    ],
  },
  {
    id: "bebidas",
    nome: "Bebidas",
    itens: [
      { slug: "cerveja-600", nome: "Cerveja 600ml", descricao: "Trincando de gelada.", price: 14 },
      { slug: "barrigudinha", nome: "Barrigudinha", descricao: "Garrafinha gelada.", price: 6 },
      { slug: "long-neck", nome: "Long neck", descricao: "Long neck estupidamente gelada.", price: 9 },
      { slug: "caipirinha", nome: "Caipirinha / Caipivodka", descricao: "Limão, gelo e açúcar.", price: 18 },
      { slug: "campari", nome: "Campari", descricao: "Com gelo e laranja.", price: 15 },
      { slug: "gin-tonica", nome: "Gin tônica / Gin tropical", descricao: "Com frutas e especiarias.", price: 25 },
      { slug: "doses", nome: "Doses (CDB, Cozumel)", descricao: "Dose servida no copinho.", price: 8 },
      { slug: "refrigerante", nome: "Refrigerantes e águas", descricao: "Lata ou garrafa gelada.", price: 6 },
      { slug: "energetico", nome: "Energético", descricao: "Lata gelada.", price: 14 },
      { slug: "suco", nome: "Sucos (uva e laranja)", descricao: "Lata ou garrafa.", price: 7 },
    ],
  },
];

export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
