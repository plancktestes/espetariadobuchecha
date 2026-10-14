import { Plus, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ItemImage } from "./ItemImage";
import { brl, type Item } from "@/data/cardapio";
import { imagensItens } from "@/data/imagens";
import { whatsappLink } from "@/data/negocio";
import { useCart } from "@/lib/cart";

export function MenuItemCard({ item }: { item: Item }) {
  const { add } = useCart();
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card">
      <ItemImage src={imagensItens[item.slug]} nome={item.nome} alt={`${item.nome}: ${item.descricao}`} />
      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="font-display text-xl uppercase leading-none">{item.nome}</h3>
        <p className="flex-1 text-xs text-muted-foreground">{item.descricao}</p>
        <div className="flex items-center justify-between gap-2">
          <span className="font-display text-2xl text-primary">{item.price === null ? "Consulte" : brl(item.price)}</span>
          {item.price === null ? (
            <Button asChild size="sm" variant="secondary">
              <a href={whatsappLink(`Olá! Tem ${item.nome} hoje? Qual o valor?`)} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4" /> Perguntar
              </a>
            </Button>
          ) : (
            <Button size="sm" aria-label={`Adicionar ${item.nome}`} onClick={() => { add(item); toast.success(`${item.nome} no pedido!`); }}>
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
