// Dados do estabelecimento — edite aqui sem mexer no resto do site.

export const negocio = {
  nome: "Espetaria do Buchecha",
  nomeCurto: "Buchecha",
  slogan: "Bora de espetinho?",
  subtitulo: "Espetos grelhados na hora, cerveja gelada e gente boa.",
  bio: "Restaurante familiar: Espetos, Jantinha e Bebidas",
  whatsapp: "5534997145327", // só números, com DDI 55 + DDD
  whatsappExibicao: "(34) 99714-5327",
  instagram: "espetaria_do_buchecha",
  google: {
    nota: 4.7,
    avaliacoes: 440,
    conferidoEm: "14/10/2026",
    url: "https://www.google.com/maps/search/?api=1&query=Espetaria+do+Buchecha+Uberl%C3%A2ndia",
  },
  faixaPreco: "R$ 20 a R$ 40 por pessoa",
  funcionamentoResumo: "Aberto até 00h",
  // CONFIRMAR COM O DONO: horário de funcionamento.
  // dias: 0 = domingo ... 6 = sábado. fecha "00:00" = meia-noite.
  horario: { dias: [0, 1, 2, 3, 4, 5, 6], abre: "18:00", fecha: "00:00" },
  horariosTexto: [{ dia: "Todos os dias", horas: "18h às 00h" }],
  selos: ["Refeição no local"],
  pagamentos: ["Pix", "Crédito", "Débito", "Dinheiro"],
  entrega: true,
  taxaEntrega: null as number | null, // null = "a combinar" — CONFIRMAR COM O DONO
  embalagem: 2, // R$ por pedido em Entrega ou Retirada
  endereco: {
    rua: "R. Vinte e Nove de Outubro, 726",
    bairro: "Copacabana",
    cidade: "Uberlândia",
    uf: "MG",
    cep: "38411-068",
  },
  siteUrl: "https://plancktestes.lovable.app",
};

export const enderecoCompleto = `${negocio.endereco.rua} — ${negocio.endereco.bairro}, ${negocio.endereco.cidade}/${negocio.endereco.uf}, CEP ${negocio.endereco.cep}`;

export const comoChegarUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${negocio.endereco.rua}, ${negocio.endereco.bairro}, ${negocio.endereco.cidade} - ${negocio.endereco.uf}, ${negocio.endereco.cep}`,
)}`;

export const whatsappLink = (texto: string) =>
  `https://wa.me/${negocio.whatsapp}?text=${encodeURIComponent(texto)}`;

export const instagramUrl = `https://instagram.com/${negocio.instagram}`;
