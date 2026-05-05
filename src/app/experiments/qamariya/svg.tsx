import s from './qamariya.module.css';

/* ===========================================================
   Shared SVG primitives for the Qamariya theme
   (used by both EN and AR pages).
   =========================================================== */

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none">
      <path
        d="M20 4 L34 18 L34 36 L6 36 L6 18 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="20" cy="20" r="2" fill="var(--ruby)" />
      <path
        d="M20 12 L20 20 M20 20 L26 22 M20 20 L14 22 M20 20 L24 28 M20 20 L16 28"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path d="M6 36 L34 36" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function Qamariya({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 300 400"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Qamariya stained-glass window"
    >
      <defs>
        <radialGradient id="cobaltGlass" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#3a6fd0" />
          <stop offset="100%" stopColor="#0e2a66" />
        </radialGradient>
        <radialGradient id="rubyGlass" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#e0454f" />
          <stop offset="100%" stopColor="#7d1219" />
        </radialGradient>
        <radialGradient id="emeraldGlass" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#3fb27d" />
          <stop offset="100%" stopColor="#0e5436" />
        </radialGradient>
        <radialGradient id="amberGlass" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#f5c54d" />
          <stop offset="100%" stopColor="#a76f12" />
        </radialGradient>
        <radialGradient id="ivoryGlass" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fff7e1" />
          <stop offset="100%" stopColor="#e6d4a8" />
        </radialGradient>
        <linearGradient id="plasterFrame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f3ead9" />
          <stop offset="100%" stopColor="#c9b89a" />
        </linearGradient>
      </defs>

      <path
        d="M30 400 L30 200 Q30 30 150 30 Q270 30 270 200 L270 400 Z"
        fill="url(#plasterFrame)"
        stroke="#2a1f10"
        strokeWidth="3"
      />
      <path
        d="M50 380 L50 200 Q50 50 150 50 Q250 50 250 200 L250 380 Z"
        fill="#2a1f10"
      />

      <g transform="translate(150 220)">
        <circle r="22" fill="url(#amberGlass)" stroke="#2a1f10" strokeWidth="2" />
        <circle r="8" fill="url(#ivoryGlass)" stroke="#2a1f10" strokeWidth="1.2" />

        {petalPaths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            fill={`url(#${p.fill})`}
            stroke="#2a1f10"
            strokeWidth="2"
          />
        ))}

        {diamondPositions.map((d, i) => (
          <g key={i} transform={`rotate(${d.r}) translate(0 -160)`}>
            <path
              d="M0 -8 L8 0 L0 8 L-8 0 Z"
              fill={
                d.fill === 'cobalt'
                  ? 'url(#cobaltGlass)'
                  : d.fill === 'ruby'
                  ? 'url(#rubyGlass)'
                  : d.fill === 'emerald'
                  ? 'url(#emeraldGlass)'
                  : 'url(#amberGlass)'
              }
              stroke="#2a1f10"
              strokeWidth="1.5"
            />
          </g>
        ))}
      </g>

      <g>
        <line x1="50" y1="225" x2="250" y2="225" stroke="#2a1f10" strokeWidth="3" />
        {gridCells.map((c, i) => (
          <g key={i}>
            <rect
              x={c.x}
              y={c.y}
              width="44"
              height="44"
              fill={`url(#${c.fill})`}
              stroke="#2a1f10"
              strokeWidth="1.5"
            />
            <circle cx={c.x + 22} cy={c.y + 22} r="3" fill="#2a1f10" opacity="0.4" />
          </g>
        ))}
        <rect
          x="50"
          y="370"
          width="200"
          height="10"
          fill="url(#plasterFrame)"
          stroke="#2a1f10"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}

export function ArchDivider() {
  return (
    <div className={s.archDivider} aria-hidden>
      <svg viewBox="0 0 200 80" fill="none">
        <path
          d="M2 78 L2 40 Q2 4 100 4 Q198 4 198 40 L198 78"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M22 78 L22 42 Q22 22 100 22 Q178 22 178 42 L178 78"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          opacity="0.6"
        />
        <circle cx="100" cy="40" r="3" fill="currentColor" />
        <circle cx="100" cy="40" r="10" stroke="currentColor" strokeWidth="1" fill="none" />
        <line x1="0" y1="78" x2="200" y2="78" stroke="currentColor" strokeWidth="1" />
        <line x1="40" y1="60" x2="60" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="140" y1="60" x2="160" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      </svg>
    </div>
  );
}

export function ArchDividerLight() {
  return (
    <div className={s.archDivider} style={{ color: 'var(--amber)' }} aria-hidden>
      <svg viewBox="0 0 200 80" fill="none">
        <path
          d="M2 78 L2 40 Q2 4 100 4 Q198 4 198 40 L198 78"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="100" cy="40" r="3" fill="currentColor" />
        <circle cx="100" cy="40" r="10" stroke="currentColor" strokeWidth="1" fill="none" />
        <line x1="0" y1="78" x2="200" y2="78" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  );
}

export function SanaaSkyline() {
  return (
    <svg
      viewBox="0 0 1600 220"
      preserveAspectRatio="xMidYEnd slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0" y="160" width="1600" height="60" fill="#1a140d" opacity="0.22" />
      {towerHouses.map((t, i) => (
        <TowerHouse key={i} {...t} />
      ))}
      <rect x="0" y="218" width="1600" height="2" fill="#1a140d" />
    </svg>
  );
}

function TowerHouse({
  x,
  w,
  h,
  stories,
}: {
  x: number;
  w: number;
  h: number;
  stories: number;
}) {
  const baseY = 220 - h;
  return (
    <g>
      <rect x={x} y={baseY} width={w} height={h} fill="#1a140d" />
      {Array.from({ length: Math.floor(w / 8) }).map((_, i) =>
        i % 2 === 0 ? (
          <rect
            key={i}
            x={x + i * 8}
            y={baseY - 6}
            width="8"
            height="6"
            fill="#1a140d"
          />
        ) : null,
      )}
      {Array.from({ length: stories }).map((_, i) => {
        const sy = baseY + 12 + i * (h / stories);
        return (
          <g key={i}>
            <line
              x1={x + 4}
              y1={sy}
              x2={x + w - 4}
              y2={sy}
              stroke="#f3ead9"
              strokeWidth="1"
              opacity="0.55"
            />
            <line
              x1={x + 4}
              y1={sy + 3}
              x2={x + w - 4}
              y2={sy + 3}
              stroke="#f3ead9"
              strokeWidth="0.5"
              opacity="0.35"
            />
          </g>
        );
      })}
      {Array.from({ length: stories }).map((_, i) => {
        const wy = baseY + 18 + i * (h / stories);
        const ww = Math.min(8, w * 0.18);
        const wx = x + w / 2 - ww / 2;
        return (
          <path
            key={`w${i}`}
            d={`M${wx} ${wy + ww * 1.3} L${wx} ${wy + ww * 0.6} Q${wx} ${wy} ${wx + ww / 2} ${wy} Q${wx + ww} ${wy} ${wx + ww} ${wy + ww * 0.6} L${wx + ww} ${wy + ww * 1.3} Z`}
            fill="#e9a82a"
            opacity="0.5"
          />
        );
      })}
      <path
        d={`M${x + w / 2 - 8} ${baseY + 6} L${x + w / 2 - 8} ${baseY + 2} Q${x + w / 2 - 8} ${baseY - 6} ${x + w / 2} ${baseY - 6} Q${x + w / 2 + 8} ${baseY - 6} ${x + w / 2 + 8} ${baseY + 2} L${x + w / 2 + 8} ${baseY + 6} Z`}
        fill="#1f4ea8"
        opacity="0.6"
      />
    </g>
  );
}

const petalPaths = (() => {
  const petals = 12;
  const innerR = 22;
  const outerR = 110;
  const colors = ['cobaltGlass', 'rubyGlass', 'emeraldGlass', 'amberGlass'];
  const out: { d: string; fill: string }[] = [];
  for (let i = 0; i < petals; i++) {
    const a1 = (i / petals) * Math.PI * 2 - Math.PI / 2;
    const a2 = ((i + 1) / petals) * Math.PI * 2 - Math.PI / 2;
    const x1 = Math.cos(a1) * innerR,
      y1 = Math.sin(a1) * innerR;
    const x2 = Math.cos(a1) * outerR,
      y2 = Math.sin(a1) * outerR;
    const x3 = Math.cos(a2) * outerR,
      y3 = Math.sin(a2) * outerR;
    const x4 = Math.cos(a2) * innerR,
      y4 = Math.sin(a2) * innerR;
    if (y2 > 50 && y3 > 50) continue;
    out.push({
      d: `M${x1.toFixed(2)} ${y1.toFixed(2)} L${x2.toFixed(2)} ${y2.toFixed(2)} A${outerR} ${outerR} 0 0 1 ${x3.toFixed(2)} ${y3.toFixed(2)} L${x4.toFixed(2)} ${y4.toFixed(2)} A${innerR} ${innerR} 0 0 0 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`,
      fill: colors[i % colors.length],
    });
  }
  return out;
})();

const diamondPositions = (() => {
  const out: { r: number; fill: string }[] = [];
  const colors = ['cobalt', 'ruby', 'emerald', 'amber'];
  for (let i = 0; i < 9; i++) {
    const r = -90 + (i / 8) * 180;
    out.push({ r, fill: colors[i % colors.length] });
  }
  return out;
})();

const gridCells = (() => {
  const cells: { x: number; y: number; fill: string }[] = [];
  const startX = 60;
  const startY = 235;
  const colors = ['cobaltGlass', 'rubyGlass', 'emeraldGlass', 'amberGlass', 'ivoryGlass'];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      const idx = (row * 4 + col + row) % colors.length;
      cells.push({
        x: startX + col * 46,
        y: startY + row * 46,
        fill: colors[idx],
      });
    }
  }
  return cells;
})();

const towerHouses: { x: number; w: number; h: number; stories: number }[] = (() => {
  const out: { x: number; w: number; h: number; stories: number }[] = [];
  const widths = [62, 78, 54, 70, 60, 84, 52, 68, 76, 58, 64, 80, 56, 72, 66, 82, 50, 74, 60, 78, 54, 70];
  const heights = [180, 142, 168, 196, 130, 156, 188, 144, 172, 158, 182, 134, 168, 192, 150, 174, 138, 164, 196, 152, 168, 144];
  const storyList = [6, 5, 6, 7, 4, 5, 6, 5, 6, 5, 7, 4, 5, 7, 5, 6, 4, 6, 7, 5, 6, 5];
  let x = 0;
  let i = 0;
  while (x < 1600 && i < widths.length) {
    out.push({ x, w: widths[i], h: heights[i], stories: storyList[i] });
    x += widths[i] + 4;
    i++;
  }
  return out;
})();
