import { useEffect, useRef, useState } from "react";
// Detecta imagem quebrada inclusive quando o erro ocorre antes da hidratação.
export function useImgOk(src?: string) {
  const ref = useRef<HTMLImageElement>(null);
  const [state, setState] = useState<"carregando" | "ok" | "erro">(src ? "carregando" : "erro");
  useEffect(() => {
    const el = ref.current;
    if (!src) return setState("erro");
    if (el?.complete) setState(el.naturalWidth > 0 ? "ok" : "erro");
  }, [src]);
  return { ref, state, onLoad: () => setState("ok"), onError: () => setState("erro") };
}
