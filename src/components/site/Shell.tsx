import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Instagram, MapPin, WifiOff } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "./Logo";
import { InstallHeaderButton } from "./Install";
import { CartButton, useOnline } from "./Cart";
import { negocio, instagramUrl, enderecoCompleto } from "@/data/negocio";
import { registerPWA } from "@/lib/pwa";

export function Header() {
  const online = useOnline();
  useEffect(() => { registerPWA(() => toast("Cardápio atualizado")); }, []);
  return (
    <>
      {!online && (
        <div className="flex items-center justify-center gap-2 bg-secondary px-3 py-2 text-center text-sm font-semibold text-secondary-foreground">
          <WifiOff className="h-4 w-4" /> Você está offline — os preços podem estar desatualizados
        </div>
      )}
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2">
          <Link to="/" className="flex items-center gap-2">
            <Logo className="h-11 w-11" />
            <span className="hidden font-display text-xl uppercase md:inline">Espetaria do Buchecha</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/cardapio" className="px-2 font-semibold hover:text-primary" activeProps={{ className: "text-primary" }}>Cardápio</Link>
            <InstallHeaderButton />
            <CartButton />
          </nav>
        </div>
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 text-sm text-muted-foreground md:grid-cols-3">
        <div className="flex items-center gap-3"><Logo className="h-14 w-14" /><p className="font-hand text-lg text-secondary">{negocio.slogan}</p></div>
        <p className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-primary" />{enderecoCompleto}</p>
        <div className="space-y-1">
          <a href={instagramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-foreground"><Instagram className="h-4 w-4" />@{negocio.instagram}</a>
          <p>{negocio.funcionamentoResumo} · {negocio.faixaPreco}</p>
        </div>
      </div>
    </footer>
  );
}
