import { useImgOk } from "@/hooks/use-img-ok";
import { logo } from "@/data/imagens";

export function LogoSvg({ className }: { className?: string | undefined }) {
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="Espetaria do Buchecha">
      <polygon points="100,6 182,53 182,147 100,194 18,147 18,53" fill="#0D0D0D" stroke="#fff" strokeWidth="6" />
      <path d="M100 30 C120 55 130 70 118 92 C130 85 132 72 130 66 C145 85 140 105 128 112 L72 112 C58 102 58 82 72 68 C70 80 76 88 84 90 C76 70 88 48 100 30Z" fill="#E11D1D" />
      <path d="M100 62 C110 76 114 90 104 106 L94 106 C86 94 90 78 100 62Z" fill="#FF8A1E" />
      <g stroke="#bbb" strokeWidth="3">
        <line x1="60" y1="116" x2="140" y2="116" /><line x1="66" y1="110" x2="66" y2="122" /><line x1="134" y1="110" x2="134" y2="122" />
      </g>
      <g transform="rotate(-8 100 140)">
        <rect x="22" y="126" width="156" height="30" fill="#E6E22B" />
        <text x="100" y="139" textAnchor="middle" fontFamily="Anton, Bebas Neue, Impact, sans-serif" fontSize="12" fill="#0D0D0D">ESPETARIA DO</text>
        <text x="100" y="153" textAnchor="middle" fontFamily="Anton, Bebas Neue, Impact, sans-serif" fontSize="15" fill="#0D0D0D">BUCHECHA</text>
      </g>
      <rect x="90" y="162" width="20" height="22" rx="2" fill="#E8A317" />
      <rect x="88" y="158" width="24" height="7" rx="3" fill="#fff" />
    </svg>
  );
}

export function Logo({ className }: { className?: string | undefined }) {
  const img = useImgOk(logo);
  if (img.state === "erro") return <LogoSvg className={className} />;
  return <img ref={img.ref} src={logo} alt="Espetaria do Buchecha" className={className} onLoad={img.onLoad} onError={img.onError} />;
}
