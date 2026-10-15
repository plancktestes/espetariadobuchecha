// Todas as imagens do site. Para trocar por fotos reais, substitua o arquivo
// importado (ou aponte para outro). Se faltar, o site mostra um fundo de brasa.
import hero from "@/assets/hero.jpg";
import sobre from "@/assets/sobre.jpg";
import combosImg from "@/assets/combos.jpg";
import carne from "@/assets/itens/carne.jpg";
import franbacon from "@/assets/itens/franbacon.jpg";
import queijo from "@/assets/itens/queijo.jpg";
import linguica from "@/assets/itens/linguica.jpg";
import coracao from "@/assets/itens/coracao.jpg";
import kafta from "@/assets/itens/kafta.jpg";
import tulipa from "@/assets/itens/tulipa.jpg";
import jantinha from "@/assets/itens/jantinha.jpg";
import simples from "@/assets/itens/simples.jpg";
import batataBacon from "@/assets/itens/batata-bacon.jpg";
import batata from "@/assets/itens/batata.jpg";
import mandioca from "@/assets/itens/mandioca.jpg";
import tilapia from "@/assets/itens/tilapia.jpg";
import calabresa from "@/assets/itens/calabresa.jpg";
import caldoFeijao from "@/assets/itens/caldo-feijao.jpg";
import caldoFrango from "@/assets/itens/caldo-frango.jpg";
import vacaAtolada from "@/assets/itens/vaca-atolada.jpg";
import tropeiro from "@/assets/itens/tropeiro.jpg";
import ovo from "@/assets/itens/ovo.jpg";
import vinagrete from "@/assets/itens/vinagrete.jpg";
import cerveja from "@/assets/itens/cerveja.jpg";
import longNeck from "@/assets/itens/long-neck.jpg";
import caipirinha from "@/assets/itens/caipirinha.jpg";
import gin from "@/assets/itens/gin.jpg";
import campari from "@/assets/itens/campari.jpg";
import refri from "@/assets/itens/refrigerante.jpg";
import agua from "@/assets/itens/agua.jpg";
import energetico from "@/assets/itens/energetico.jpg";
import suco from "@/assets/itens/suco.jpg";

// Coloque o arquivo do logo em public/images/logo.png e troque "" por "/images/logo.png".
export const logo = "";

export const imagensHero = { hero, sobre, combos: combosImg };

export const imagensItens: Record<string, string> = {
  "espeto-contra-file": carne,
  "espeto-fraldinha": carne,
  "espeto-lombo": carne,
  "espeto-franbacon": franbacon,
  "espeto-almondega-bacon": franbacon,
  "espeto-coracao": coracao,
  "espeto-kafta": kafta,
  "espeto-linguica-pernil": linguica,
  "espeto-linguica-apimentada": linguica,
  "espeto-provolone": queijo,
  "espeto-queijo-coalho": queijo,
  "espeto-tulipa": tulipa,
  jantinha,
  simples,
  "calabresa-cebola": calabresa,
  "batata-frita": batata,
  "batata-queijo-bacon": batataBacon,
  "mandioca-frita": mandioca,
  tilapia,
  "caldo-feijao": caldoFeijao,
  "caldo-frango": caldoFrango,
  "vaca-atolada": vacaAtolada,
  arroz: vinagrete,
  tropeiro,
  vinagrete,
  mandioca,
  "ovo-frito": ovo,
  "amstel-600": cerveja,
  "brahma-duplo-malte-600": cerveja,
  "petra-600": cerveja,
  "spaten-600": cerveja,
  "heineken-600": cerveja,
  "stella-600": cerveja,
  "barrigudinha-brahma": longNeck,
  "barrigudinha-original": longNeck,
  "barrigudinha-skol": longNeck,
  "ln-corona": longNeck,
  "ln-heineken": longNeck,
  "ln-spaten": longNeck,
  "ln-stella": longNeck,
  caipirinha,
  caipivodka: caipirinha,
  campari,
  "gin-tonica": gin,
  "gin-tropical": gin,
  "cdb-dose": campari,
  "cozumel-dose": campari,
  "gelo-limao": agua,
  "coca-litro": refri,
  "coca-lata": refri,
  "guarana-lata": refri,
  "sprite-lemon": refri,
  agua,
  "agua-gas": agua,
  "agua-tonica": agua,
  "red-bull": energetico,
  "del-valle-lata": suco,
  "fruitz-300": suco,
  "fruitz-900": suco,
  "combo-dupla-jantinha": jantinha,
  "combo-petisco-mesa": batataBacon,
  "combo-rodada-galera": combosImg,
};
