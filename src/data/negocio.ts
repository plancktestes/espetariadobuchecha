// Dados do estabelecimento — edite aqui sem mexer no resto do site.
// ATENÇÃO: o número de WhatsApp abaixo é PROVISÓRIO. Substitua pelo número real.

export const negocio = {
  nome: "Espetaria do Buchecha",
  slogan: "Bora de espetinho?",
  subtitulo: "Espetos grelhados na hora, cerveja gelada e gente boa.",
  bio: "Espetos, Jantinha e Bebidas — restaurante familiar",
  whatsapp: "5534999999999", // PROVISÓRIO — só números, com DDI 55 + DDD
  instagram: "espetaria_do_buchecha",
  google: {
    nota: 4.7,
    avaliacoes: 440,
    conferidoEm: "14/10/2026",
    url: "https://www.google.com/maps/search/?api=1&query=Espetaria+do+Buchecha+Uberl%C3%A2ndia",
  },
  faixaPreco: "R$ 20 a R$ 40 por pessoa",
  funcionamentoResumo: "Aberto até 00h",
  horarios: [
    { dia: "Segunda a Domingo", horas: "18h às 00h" }, // confirmar com o cliente
  ],
  selos: ["Refeição no local", "Drive-through"],
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
