'use client';

import { Children, useRef, useState, type ReactNode } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Observer } from 'gsap/Observer';
import d from './notebook-deck.module.css';

gsap.registerPlugin(useGSAP, Observer);

export type DeckPage = { id: string; label: string };

type DeckCopy = {
  turn: string;
  last: string;
  prev: string;
  next: string;
  page: string;
};

type Props = {
  pages: DeckPage[];
  header: ReactNode;
  children: ReactNode;
  dir?: 'ltr' | 'rtl';
  copy: DeckCopy;
};

type WindowWithIdle = Window & {
  requestIdleCallback?: (cb: () => void) => number;
  cancelIdleCallback?: (handle: number) => void;
};

const STRIPS = 8;
const BEND = 62;
const TURN = 1.15;

export function NotebookDeck({ pages, header, children, dir = 'ltr', copy }: Props) {
  const sheets = Children.toArray(children);
  const total = sheets.length;
  const rtl = dir === 'rtl';

  const stageRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const sheetRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [index, setIndex] = useState(0);
  const [atEnd, setAtEnd] = useState(false);
  const indexRef = useRef(0);
  const busyRef = useRef(false);
  const edgeRef = useRef(0);
  const armedRef = useRef(true);
  const lastInputRef = useRef(0);

  const turnRef = useRef<(next: number) => void>(() => {});
  const preparedRef = useRef<{
    index: number;
    curl: { draw: (s: number) => void; sync: (top: number) => void; show: () => void; destroy: () => void };
  } | null>(null);

  useGSAP(
    () => {
      const stage = stageRef.current;
      const shadow = shadowRef.current;
      if (!stage || !shadow) return;

      const reduced = () =>
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const alignPaper = () => {
        const top = stage.getBoundingClientRect().top;
        stage.style.setProperty('--paper-shift', `${-(top % 28)}px`);
      };

      const syncEnd = () => {
        const inner = innerRefs.current[indexRef.current];
        if (!inner) return;
        const max = inner.scrollHeight - inner.clientHeight;
        setAtEnd(max <= 4 || inner.scrollTop >= max - 8);
      };

      const onInnerScroll = () => {
        edgeRef.current = 0;
        syncEnd();
      };

      const commit = (to: number, back: boolean) => {
        indexRef.current = to;
        edgeRef.current = 0;
        setIndex(to);
        const inner = innerRefs.current[to];
        if (inner) {
          inner.scrollTop = back
            ? Math.max(0, inner.scrollHeight - inner.clientHeight)
            : 0;
        }
        syncEnd();
        window.history.replaceState(null, '', `#${pages[to].id}`);
      };

      type Curl = {
        draw: (s: number) => void;
        sync: (top: number) => void;
        show: () => void;
        destroy: () => void;
      };

      const buildCurl = (sheet: HTMLElement): Curl | null => {
        const face = sheet.querySelector<HTMLElement>(`.${d.sheetFace}`);
        const scroller = sheet.querySelector<HTMLElement>(`.${d.sheetInner}`);
        if (!face || !scroller) return null;

        const { width: W, height: H } = stage.getBoundingClientRect();
        const w = W / STRIPS;
        const near = rtl ? 'right' : 'left';
        const far = rtl ? 'left' : 'right';

        const root = document.createElement('div');
        root.className = d.curl;
        root.setAttribute('aria-hidden', 'true');
        root.inert = true;
        root.style.visibility = 'hidden';

        const template = face.cloneNode(true) as HTMLElement;
        template.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
        template.style.width = `${W}px`;
        template.style.height = `${H}px`;
        template.style[far] = 'auto';

        const strips: HTMLElement[] = [];
        const fronts: HTMLElement[] = [];
        const backs: HTMLElement[] = [];

        let parent: HTMLElement = root;
        for (let i = 0; i < STRIPS; i++) {
          const strip = document.createElement('div');
          strip.className = d.strip;
          strip.style.width = `${w}px`;
          strip.style.height = `${H}px`;
          if (i > 0) strip.style[near] = `${w}px`;

          const front = document.createElement('div');
          front.className = d.stripFace;
          front.style.width = `${w + 1}px`;
          front.style.height = `${H}px`;

          const clone = template.cloneNode(true) as HTMLElement;
          clone.style[near] = `${-i * w}px`;
          front.appendChild(clone);

          const frontShade = document.createElement('span');
          frontShade.className = d.stripShade;
          front.appendChild(frontShade);

          const rear = document.createElement('div');
          rear.className = d.stripBack;
          rear.style.width = `${w + 1}px`;
          rear.style.height = `${H}px`;
          const backShade = document.createElement('span');
          backShade.className = d.stripShade;
          rear.appendChild(backShade);

          strip.append(front, rear);
          parent.appendChild(strip);
          parent = strip;

          strips.push(strip);
          fronts.push(frontShade);
          backs.push(backShade);
        }

        stage.appendChild(root);

        const clones = Array.from(
          root.querySelectorAll<HTMLElement>(`.${d.sheetInner}`),
        );
        clones.forEach((el) => {
          el.style.scrollbarColor = 'transparent transparent';
        });

        const sync = (top: number) => {
          clones.forEach((el) => {
            el.scrollTop = top;
          });
        };
        sync(scroller.scrollTop);

        const sign = rtl ? 1 : -1;

        const draw = (s: number) => {
          const bend = BEND * Math.sin(Math.PI * s);
          const per = bend / (STRIPS - 1);
          const base = (180 * s - bend / 2) * sign;

          root.style.transform = `rotateY(${base}deg)`;
          for (let i = 1; i < STRIPS; i++) {
            strips[i].style.transform = `rotateY(${per * sign}deg)`;
          }
          for (let i = 0; i < STRIPS; i++) {
            const facing = Math.cos(((base + i * per * sign) * Math.PI) / 180);
            const shade = (1 - Math.abs(facing)) * 0.6;
            fronts[i].style.opacity = `${shade}`;
            backs[i].style.opacity = `${Math.min(0.5, shade + 0.06)}`;
          }
          shadow.style.opacity = `${Math.sin(Math.PI * s) * 0.8}`;
        };

        return {
          draw,
          sync,
          show: () => {
            root.style.visibility = '';
          },
          destroy: () => root.remove(),
        };
      };

      let idleHandle = 0;
      const cancelIdle = (window as WindowWithIdle).cancelIdleCallback;
      const requestIdle =
        (window as WindowWithIdle).requestIdleCallback ??
        ((cb: () => void) => window.setTimeout(cb, 300));

      const discardPrepared = () => {
        preparedRef.current?.curl.destroy();
        preparedRef.current = null;
      };

      const prepare = () => {
        const i = indexRef.current;
        if (busyRef.current || preparedRef.current?.index === i) return;
        const sheet = sheetRefs.current[i];
        if (!sheet) return;
        discardPrepared();
        const curl = buildCurl(sheet);
        if (curl) preparedRef.current = { index: i, curl };
      };

      const schedulePrepare = () => {
        if (idleHandle && cancelIdle) cancelIdle.call(window, idleHandle);
        idleHandle = requestIdle.call(window, () => {
          idleHandle = 0;
          prepare();
        }) as unknown as number;
      };

      const turn = (next: number) => {
        const from = indexRef.current;
        const to = gsap.utils.clamp(0, total - 1, next);
        if (busyRef.current || to === from) return;

        const fromEl = sheetRefs.current[from];
        const toEl = sheetRefs.current[to];
        if (!fromEl || !toEl) return;

        const back = to < from;

        if (reduced()) {
          commit(to, back);
          innerRefs.current[to]?.focus({ preventScroll: true });
          return;
        }

        busyRef.current = true;
        armedRef.current = false;
        stage.setAttribute('data-busy', 'true');

        const cover = document.querySelector<HTMLElement>('[data-nb-cover]');
        const idle = cover ? gsap.getTweensOf(cover) : [];
        idle.forEach((t) => t.pause());

        commit(to, back);

        const turning = back ? toEl : fromEl;
        fromEl.setAttribute('data-hold', 'true');
        if (back) toEl.setAttribute('data-veiled', 'true');

        const scrollTop = innerRefs.current[back ? to : from]?.scrollTop ?? 0;
        let curl: Curl | null = null;
        if (!back && preparedRef.current?.index === from) {
          curl = preparedRef.current.curl;
          preparedRef.current = null;
          curl.sync(scrollTop);
        } else {
          discardPrepared();
          curl = buildCurl(turning);
        }

        if (!curl) {
          fromEl.removeAttribute('data-hold');
          toEl.removeAttribute('data-veiled');
          stage.removeAttribute('data-busy');
          busyRef.current = false;
          armedRef.current = true;
          return;
        }

        const proxy = { s: back ? 1 : 0 };
        curl.draw(proxy.s);
        curl.show();

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            gsap.to(proxy, {
              s: back ? 0 : 1,
              duration: TURN,
              ease: 'power1.inOut',
              onUpdate: () => curl.draw(proxy.s),
              onComplete: () => {
                curl.destroy();
                gsap.set(shadow, { opacity: 0 });
                fromEl.removeAttribute('data-hold');
                toEl.removeAttribute('data-veiled');
                idle.forEach((t) => t.resume());
                innerRefs.current[to]?.focus({ preventScroll: true });
                stage.removeAttribute('data-busy');
                busyRef.current = false;
                edgeRef.current = 0;
                if (performance.now() - lastInputRef.current > 150) {
                  armedRef.current = true;
                }
                schedulePrepare();
              },
            });
          });
        });
      };

      turnRef.current = turn;

      const canScrollOn = (el: HTMLElement | null, delta: 1 | -1) => {
        if (!el) return false;
        const max = el.scrollHeight - el.clientHeight;
        if (max <= 4) return false;
        return delta > 0 ? el.scrollTop < max - 2 : el.scrollTop > 2;
      };

      const attempt = (delta: 1 | -1) => {
        const now = performance.now();
        lastInputRef.current = now;
        if (busyRef.current || !armedRef.current) return;
        const inner = innerRefs.current[indexRef.current];
        if (canScrollOn(inner, delta)) {
          edgeRef.current = 0;
          return;
        }
        if (!edgeRef.current) {
          edgeRef.current = now;
          return;
        }
        if (now - edgeRef.current < 180) return;
        turn(indexRef.current + delta);
      };

      const observer = Observer.create({
        target: stage,
        type: 'wheel,touch',
        wheelSpeed: -1,
        tolerance: 8,
        dragMinimum: 14,
        preventDefault: false,
        onUp: () => attempt(1),
        onDown: () => attempt(-1),
        onStop: () => {
          armedRef.current = true;
          edgeRef.current = 0;
        },
        onStopDelay: 0.2,
      });

      const onKey = (e: KeyboardEvent) => {
        const el = e.target as HTMLElement | null;
        if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) {
          return;
        }
        const forward = rtl ? 'ArrowLeft' : 'ArrowRight';
        const backward = rtl ? 'ArrowRight' : 'ArrowLeft';

        if (e.key === 'PageDown' || e.key === forward) {
          e.preventDefault();
          turn(indexRef.current + 1);
        } else if (e.key === 'PageUp' || e.key === backward) {
          e.preventDefault();
          turn(indexRef.current - 1);
        } else if (e.key === 'Home') {
          e.preventDefault();
          turn(0);
        } else if (e.key === 'End') {
          e.preventDefault();
          turn(total - 1);
        }
      };

      const ids = pages.map((p) => p.id);
      const onClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        const anchor = target?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
        if (!anchor) return;
        const to = ids.indexOf(anchor.getAttribute('href')!.slice(1));
        if (to < 0) return;
        e.preventDefault();
        turn(to);
      };

      const onResize = () => {
        alignPaper();
        syncEnd();
        discardPrepared();
        schedulePrepare();
      };

      stage.addEventListener('scroll', onInnerScroll, true);
      window.addEventListener('keydown', onKey);
      window.addEventListener('resize', onResize);
      document.addEventListener('click', onClick);
      document.body.classList.add(d.locked);

      alignPaper();

      const initial = ids.indexOf(window.location.hash.slice(1));
      if (initial > 0) commit(initial, false);
      syncEnd();
      schedulePrepare();

      return () => {
        observer.kill();
        if (idleHandle && cancelIdle) cancelIdle.call(window, idleHandle);
        discardPrepared();
        stage.removeEventListener('scroll', onInnerScroll, true);
        window.removeEventListener('keydown', onKey);
        window.removeEventListener('resize', onResize);
        document.removeEventListener('click', onClick);
        document.body.classList.remove(d.locked);
      };
    },
    { scope: stageRef },
  );

  const isLast = index >= total - 1;

  return (
    <div className={d.deck}>
      <div className={d.chrome}>{header}</div>

      <div className={d.stage} ref={stageRef}>
        {sheets.map((child, i) => (
          <div
            key={pages[i]?.id ?? i}
            ref={(el) => {
              sheetRefs.current[i] = el;
            }}
            className={d.sheet}
            data-page={pages[i]?.id}
            data-active={i === index ? 'true' : 'false'}
          >
            <div className={d.sheetFace}>
              <div
                ref={(el) => {
                  innerRefs.current[i] = el;
                }}
                className={d.sheetInner}
                tabIndex={-1}
                data-lenis-prevent
              >
                {child}
              </div>
              <span className={d.sheetFolio} aria-hidden>
                {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </div>
          </div>
        ))}

        <div className={d.turnShadow} ref={shadowRef} aria-hidden />

        <button
          type="button"
          className={d.dogEar}
          data-ready={atEnd ? 'true' : 'false'}
          onClick={() => turnRef.current(index + 1)}
          disabled={isLast}
        >
          <span className={d.dogEarHint}>{isLast ? copy.last : copy.turn}</span>
          <span className={d.srOnly}>{copy.next}</span>
        </button>
      </div>

      <nav className={d.rail} aria-label={copy.page}>
        {pages.map((p, i) => (
          <button
            key={p.id}
            type="button"
            className={d.tab}
            data-active={i === index ? 'true' : 'false'}
            aria-current={i === index ? 'page' : undefined}
            onClick={() => turnRef.current(i)}
          >
            <span className={d.tabNum}>{String(i + 1).padStart(2, '0')}</span>
            <span className={d.tabLabel}>{p.label}</span>
          </button>
        ))}
      </nav>

      <div className={d.foot}>
        <button
          type="button"
          className={d.footBtn}
          onClick={() => turnRef.current(index - 1)}
          disabled={index === 0}
          aria-label={copy.prev}
        >
          ↑
        </button>
        <span className={d.folio}>
          {copy.page} {index + 1} / {total}
        </span>
        <button
          type="button"
          className={d.footBtn}
          onClick={() => turnRef.current(index + 1)}
          disabled={isLast}
          aria-label={copy.next}
        >
          ↓
        </button>
      </div>
    </div>
  );
}
