import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Linha = { key: string; slug: string; nome: string; opcao?: string | undefined; preco: number; qtd: number; obs: string };
type Novo = { slug: string; nome: string; opcao?: string | undefined; preco: number; qtd?: number; obs?: string };
type Ctx = {
  linhas: Linha[];
  add: (n: Novo) => void;
  setQtd: (key: string, qtd: number) => void;
  setObs: (key: string, obs: string) => void;
  clear: () => void;
  subtotal: number;
  count: number;
  aberto: boolean;
  setAberto: (b: boolean) => void;
};

const CartCtx = createContext<Ctx | null>(null);
const KEY = "buchecha-carrinho-v2";

export function CartProvider({ children }: { children: ReactNode }) {
  const [linhas, setLinhas] = useState<Linha[]>([]);
  const [aberto, setAberto] = useState(false);
  const [carregado, setCarregado] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      const v = raw ? JSON.parse(raw) : [];
      if (Array.isArray(v)) setLinhas(v.filter((l) => l && typeof l.preco === "number" && l.qtd > 0));
    } catch {}
    setCarregado(true);
  }, []);
  useEffect(() => {
    if (!carregado) return;
    try { localStorage.setItem(KEY, JSON.stringify(linhas)); } catch {}
  }, [linhas, carregado]);

  const add = (n: Novo) =>
    setLinhas((l) => {
      const key = `${n.slug}|${n.opcao ?? ""}`;
      const e = l.find((x) => x.key === key);
      const q = n.qtd ?? 1;
      if (e) return l.map((x) => (x === e ? { ...x, qtd: x.qtd + q, obs: n.obs || x.obs } : x));
      return [...l, { key, slug: n.slug, nome: n.nome, opcao: n.opcao, preco: n.preco, qtd: q, obs: n.obs ?? "" }];
    });
  const setQtd = (key: string, qtd: number) =>
    setLinhas((l) => l.flatMap((x) => (x.key === key ? (qtd > 0 ? [{ ...x, qtd }] : []) : [x])));
  const setObs = (key: string, obs: string) => setLinhas((l) => l.map((x) => (x.key === key ? { ...x, obs } : x)));
  const subtotal = linhas.reduce((s, x) => s + x.preco * x.qtd, 0);
  const count = linhas.reduce((s, x) => s + x.qtd, 0);
  return (
    <CartCtx.Provider value={{ linhas, add, setQtd, setObs, clear: () => setLinhas([]), subtotal, count, aberto, setAberto }}>
      {children}
    </CartCtx.Provider>
  );
}

export const useCart = () => {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart fora do CartProvider");
  return c;
};
