import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Home, BookOpen, CalendarDays, ShoppingBag, Instagram, MapPin, WifiOff } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "./Logo";
import { InstallHeaderButton } from "./Install";
import { CartButton, useOnline } from "./Cart";
import { negocio, instagramUrl, enderecoCompleto } from "@/data/negocio";
import { registerPWA } from "@/lib/pwa";
import { useCart } from "@/lib/cart";

export function Header() {
  const online = useOnline();
  useEffect(() => { registerPWA(() => toast("Cardápio atualizado")); }, []);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 pt-[env(safe-area-inset-top)] backdrop-blur">
      {!online && (
        <div className="flex items-center justify-center gap-2 bg-secondary px-3 py-1.5 text-center text-xs font-semibold text-secondary-foreground">
          <WifiOff className="h-4 w-4 shrink-0" /> Offline — os preços podem estar desatualizados
        </div>
      )}
      <div className="grid h-14 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4">
        <Link to="/" className="flex min-w-0 items-center gap-2" aria-label="Início">
          <Logo className="h-10 w-10 shrink-0" />
          <span className="truncate font-display text-xl uppercase">{negocio.nomeCurto}</span>
        </Link>
        <div className="flex items-center gap-2">
          <InstallHeaderButton />
          <CartButton />
        </div>
      </div>
    </header>
  );
}

export function BottomNav() {
  const { count, setAberto } = useCart();
  const cls = "flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-semibold text-muted-foreground";
  const ativo = { className: "text-primary" };
  return (
    <nav aria-label="Navegação principal" className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
      <div className="mx-auto grid max-w-[480px] grid-cols-4">
        <Link to="/" className={cls} activeProps={ativo} activeOptions={{ exact: true }}><Home className="h-5 w-5" />Início</Link>
        <Link to="/cardapio" className={cls} activeProps={ativo}><BookOpen className="h-5 w-5" />Cardápio</Link>
        <Link to="/reservar" className={cls} activeProps={ativo}><CalendarDays className="h-5 w-5" />Reservar</Link>
        <button type="button" onClick={() => setAberto(true)} className={cls}>
          <span className="relative">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && <span className="absolute -right-2.5 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] text-primary-foreground">{count}</span>}
          </span>
          Pedido
        </button>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40 px-4 py-10 text-center text-sm text-muted-foreground">
      <Logo className="mx-auto h-16 w-16" />
      <p className="mt-2 font-hand text-lg text-secondary">{negocio.slogan}</p>
      <p className="mx-auto mt-4 flex max-w-xs items-start justify-center gap-2 text-pretty"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{enderecoCompleto}</p>
      <a href={instagramUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 hover:text-foreground"><Instagram className="h-4 w-4" />@{negocio.instagram}</a>
      <p className="mt-2">Pagamento: {negocio.pagamentos.join(", ")}</p>
      <p className="mt-6 text-xs">Site por NeuroDyne</p>
    </footer>
  );
}
