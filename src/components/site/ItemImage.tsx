import { useImgOk } from "@/hooks/use-img-ok";
import { LogoSvg } from "./Logo";
import { cn } from "@/lib/utils";

export function ItemImage({
  src, alt, ratio = "square", className, eager,
}: { src?: string | undefined; alt: string; ratio?: "square" | "video"; className?: string; eager?: boolean }) {
  const img = useImgOk(src);
  const erro = img.state === "erro";
  const [w, h] = ratio === "square" ? [600, 600] : [1280, 720];
  return (
    <div className={cn("relative overflow-hidden bg-ember", ratio === "square" ? "aspect-square" : "aspect-video", className)}>
      {img.state === "carregando" && <div className="absolute inset-0 animate-pulse bg-muted/60" aria-hidden />}
      {!erro && (
        <img src={src} alt={alt} width={w} height={h} loading={eager ? "eager" : "lazy"} decoding="async"
          ref={img.ref} onLoad={img.onLoad} onError={img.onError}
          className={cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-500", img.state !== "ok" && "opacity-0")} />
      )}
      {erro && (
        <div className="absolute inset-0 grid place-items-center" role="img" aria-label={alt}>
          <LogoSvg className="h-1/2 w-1/2 opacity-15" />
        </div>
      )}
    </div>
  );
}
