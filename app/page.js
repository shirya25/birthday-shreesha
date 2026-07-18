'use client';

import { useEffect, useRef, useState } from 'react';

const CANDLE_COUNT = 5;

const BALLOONS = [
  { left: '8%', background: 'var(--blush)', width: 60, height: 74, duration: '16s', delay: '0s' },
  { left: '24%', background: 'var(--gold-soft)', width: 50, height: 62, duration: '13s', delay: '2s' },
  { left: '52%', background: 'var(--sage)', width: 54, height: 68, duration: '19s', delay: '4s' },
  { left: '72%', background: 'var(--blush)', width: 46, height: 58, duration: '15s', delay: '1s' },
  { left: '88%', background: 'var(--gold-soft)', width: 60, height: 74, duration: '21s', delay: '6s' },
];

const CONFETTI_COLORS = ['#eab958', '#f3d48a', '#f0a6c8', '#93ac86', '#fbf3e6'];

export default function HomePage() {
  const [litStates, setLitStates] = useState(Array(CANDLE_COUNT).fill(true));
  const [wishGranted, setWishGranted] = useState(false);
  const [wishText, setWishText] = useState('');
  const [lanterns, setLanterns] = useState([]);

  const confettiCanvasRef = useRef(null);
  const remaining = litStates.filter(Boolean).length;

  let counterText;
  if (remaining === CANDLE_COUNT) {
    counterText = 'Tap every flame to blow out the candles';
  } else if (remaining > 0) {
    counterText = `${remaining} candle${remaining === 1 ? '' : 's'} left — keep going`;
  } else {
    counterText = 'All candles out — make it count!';
  }

  useEffect(() => {
    const canvas = confettiCanvasRef.current;
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  function launchConfetti() {
    const canvas = confettiCanvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = Array.from({ length: 160 }, () => ({
      x: canvas.width / 2 + (Math.random() - 0.5) * 120,
      y: canvas.height * 0.55,
      vx: (Math.random() - 0.5) * 14,
      vy: -Math.random() * 14 - 6,
      size: Math.random() * 7 + 4,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      gravity: 0.28 + Math.random() * 0.1,
      life: 0,
      maxLife: 130 + Math.random() * 40,
    }));

    function frame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      for (const p of pieces) {
        if (p.life > p.maxLife) continue;
        alive = true;
        p.life += 1;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        const fade = 1 - p.life / p.maxLife;
        ctx.save();
        ctx.globalAlpha = Math.max(fade, 0);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }

      if (alive) {
        requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    requestAnimationFrame(frame);
  }

  function blowCandle(i) {
    if (!litStates[i]) return;
    const next = [...litStates];
    next[i] = false;
    setLitStates(next);

    if (next.every((lit) => !lit)) {
      setWishGranted(true);
      launchConfetti();
    }
  }

  function handleWishSubmit(e) {
    e.preventDefault();
    const text = wishText.trim();
    if (!text) return;

    setLanterns((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        text,
        left: 10 + Math.random() * 80,
        drift: (Math.random() - 0.5) * 200,
      },
    ]);
    setWishText('');
  }

  function removeLantern(id) {
    setLanterns((prev) => prev.filter((l) => l.id !== id));
  }

  return (
    <main>
      {/* HERO */}
      <header className="hero">
        <div className="balloons" aria-hidden="true">
          {BALLOONS.map((b, i) => (
            <span
              key={i}
              className="balloon"
              style={{
                left: b.left,
                background: b.background,
                width: b.width,
                height: b.height,
                animationDuration: b.duration,
                animationDelay: b.delay,
              }}
            />
          ))}
        </div>

        <p className="hero__eyebrow">a little celebration, just for</p>
        <h1 className="hero__name">Shreesha</h1>
        <p className="hero__line">It&apos;s your birthday — the sky knows it too.</p>

        <a href="#message" className="scroll-cue" aria-label="Scroll down">
          <span></span>
          keep scrolling
        </a>
      </header>

      {/* MESSAGE */}
      <section className="message" id="message">
        <svg className="divider" viewBox="0 0 200 40" aria-hidden="true">
          <path d="M10 20 Q 50 0, 100 20 T 190 20" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="100" cy="20" r="4" fill="currentColor" />
        </svg>

        <p className="message__text">
          Dear Shreesha, <br />
          Some people just make a room warmer the moment they walk in — you&apos;re one of them.
          Today isn&apos;t just about cake and candles (although, yes, definitely those too),
          it&apos;s a small pause to say: the world is genuinely better with you in it.
          Here&apos;s to another year of your laugh being too loud, your ideas being too big,
          and you being exactly, wonderfully, you.
        </p>
        <p className="message__signoff">
          With all my love,<br />
          <span>your favourite sibling 🤍</span>
        </p>
      </section>

      {/* CAKE / WISH */}
      <section className="cake-section">
        <h2 className="section-title">Make a wish, Shreesha</h2>
        <p className="section-sub">{counterText}</p>

        <div className="cake">
          <div className="candles">
            {litStates.map((lit, i) => (
              <button
                key={i}
                type="button"
                className="candle"
                data-lit={lit ? 'true' : 'false'}
                onClick={() => blowCandle(i)}
                aria-label={`Candle ${i + 1}, ${lit ? 'lit — tap to blow out' : 'blown out'}`}
              >
                <div className="flame"></div>
                <div className="smoke"></div>
                <div className="stick"></div>
              </button>
            ))}
          </div>
          <div className="cake__tier cake__tier--top">
            <span className="drip drip--1"></span>
            <span className="drip drip--2"></span>
            <span className="drip drip--3"></span>
          </div>
          <div className="cake__tier cake__tier--bottom"></div>
          <div className="cake__plate"></div>
        </div>

        <p className={`cake__granted ${wishGranted ? 'is-visible' : ''}`}>
          Wish granted 🎉 — may every one of it find its way to you.
        </p>
      </section>

      {/* WISH JAR */}
      <section className="jar-section">
        <h2 className="section-title">Send her a wish into the sky</h2>
        <p className="section-sub">Type something sweet — watch it drift off as a lantern</p>

        <form className="wish-form" onSubmit={handleWishSubmit}>
          <input
            type="text"
            className="wish-form__input"
            placeholder="Happy birthday, Shreesha... "
            maxLength={80}
            autoComplete="off"
            value={wishText}
            onChange={(e) => setWishText(e.target.value)}
          />
          <button type="submit" className="wish-form__button">
            Release ✨
          </button>
        </form>
      </section>

      <div className="lantern-layer" aria-hidden="true">
        {lanterns.map((l) => (
          <div
            key={l.id}
            className="lantern"
            style={{ left: `${l.left}%`, '--drift': `${l.drift}px` }}
            onAnimationEnd={() => removeLantern(l.id)}
          >
            <div className="lantern__body">{l.text}</div>
            <div className="lantern__flame"></div>
          </div>
        ))}
      </div>

      <canvas id="confetti" ref={confettiCanvasRef} aria-hidden="true"></canvas>

      <footer className="footer">
        <p>made with 🤍 for the birthday girl herself</p>
      </footer>
    </main>
  );
}
