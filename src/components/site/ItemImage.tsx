import { useImgOk } from "@/hooks/use-img-ok";
import { LogoSvg } from "./Logo";
import { cn } from "@/lib/utils";

export function ItemImage({
  src, alt, nome, ratio = "square", className, eager,
}: { src?: string | undefined; alt: string; nome: string; ratio?: "square" | "video"; className?: string; eager?: boolean }) {
  const img = useImgOk(src);
  const erro = img.state === "erro";
  return (
    <div className={cn("relative overflow-hidden bg-ember", ratio === "square" ? "aspect-square" : "aspect-video", className)}>
      {!erro && (
        <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} ref={img.ref} onLoad={img.onLoad} onError={img.onError}
          className={cn("absolute inset-0 h-full w-full object-cover", img.state !== "ok" && "opacity-0")} />
      )}
      {img.state !== "ok" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center" aria-label={erro ? alt : undefined} role={erro ? "img" : undefined}>
          <LogoSvg className="absolute h-3/4 w-3/4 opacity-10" />
          <span className="relative font-display text-xl uppercase leading-tight text-foreground drop-shadow">{nome}</span>
        </div>
      )}
    </div>
  );
}
