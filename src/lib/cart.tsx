import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Item } from "@/data/cardapio";

type Linha = { item: Item; qtd: number };
type Ctx = {
  linhas: Linha[];
  add: (i: Item) => void;
  dec: (slug: string) => void;
  clear: () => void;
  total: number;
  count: number;
};

const CartCtx = createContext<Ctx | null>(null);
const KEY = "buchecha-carrinho";

export function CartProvider({ children }: { children: ReactNode }) {
  const [linhas, setLinhas] = useState<Linha[]>([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLinhas(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(linhas));
    } catch {}
  }, [linhas]);

  const add = (item: Item) =>
    setLinhas((l) => {
      const e = l.find((x) => x.item.slug === item.slug);
      return e ? l.map((x) => (x === e ? { ...x, qtd: x.qtd + 1 } : x)) : [...l, { item, qtd: 1 }];
    });
  const dec = (slug: string) =>
    setLinhas((l) =>
      l.flatMap((x) => (x.item.slug === slug ? (x.qtd > 1 ? [{ ...x, qtd: x.qtd - 1 }] : []) : [x])),
    );
  const total = linhas.reduce((s, x) => s + (x.item.price ?? 0) * x.qtd, 0);
  const count = linhas.reduce((s, x) => s + x.qtd, 0);
  return (
    <CartCtx.Provider value={{ linhas, add, dec, clear: () => setLinhas([]), total, count }}>
      {children}
    </CartCtx.Provider>
  );
}

export const useCart = () => {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart fora do CartProvider");
  return c;
};
