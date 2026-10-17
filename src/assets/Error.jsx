import React, { useState, useEffect, useCallback } from 'react';



const PIECES = ['🎨', '⚙️', '🚀', '🔒', '📦', '🧩'];

const STATUS_LINES = [
    'Compiling good ideas…',
    'Arguing about button colors…',
    'Teaching the server to behave…',
    'Feeding the CI pipeline…',
    'Polishing pixels nobody asked for…',
];

const buildDeck = () =>
    [...PIECES, ...PIECES]
        .map((emoji, i) => ({ id: i, emoji, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ id, emoji }) => ({ id, emoji }));

function WorkInProgress({ title = 'This module', progress = 37, onBack }) {
    const [deck, setDeck] = useState(buildDeck);
    const [flipped, setFlipped] = useState([]); // indexes currently face-up (max 2)
    const [matched, setMatched] = useState([]); // indexes matched
    const [moves, setMoves] = useState(0);
    const [statusIdx, setStatusIdx] = useState(0);

    const pairs = PIECES.length;
    const matchedPairs = matched.length / 2;
    const won = matchedPairs === pairs;
    const base = Math.min(Math.max(progress, 0), 95);
    const pct = Math.round(base + (100 - base) * (matchedPairs / pairs));

    const handleBackHome = () => {
        if (onBack) onBack();
        else window.location.href = '/';
    };

    useEffect(() => {
        const t = setInterval(() => setStatusIdx((i) => (i + 1) % STATUS_LINES.length), 2600);
        return () => clearInterval(t);
    }, []);

    // Compare two flipped cards
    useEffect(() => {
        if (flipped.length !== 2) return;
        const [a, b] = flipped;
        setMoves((m) => m + 1);
        if (deck[a].emoji === deck[b].emoji) {
            const t = setTimeout(() => {
                setMatched((m) => [...m, a, b]);
                setFlipped([]);
            }, 450);
            return () => clearTimeout(t);
        }
        const t = setTimeout(() => setFlipped([]), 850);
        return () => clearTimeout(t);
    }, [flipped, deck]);

    const flip = (i) => {
        if (flipped.length >= 2 || flipped.includes(i) || matched.includes(i) || won) return;
        setFlipped((f) => [...f, i]);
    };

    const reset = useCallback(() => {
        setDeck(buildDeck());
        setFlipped([]);
        setMatched([]);
        setMoves(0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-10 selection:bg-indigo-500 selection:text-white">
            <style>{`
                @keyframes wip-sheen { from { background-position: 0 0 } to { background-position: 28px 0 } }
                @keyframes wip-rise { 0% { transform: translateY(0) rotate(0); opacity: 1 } 100% { transform: translateY(-160px) rotate(var(--r)); opacity: 0 } }
                @keyframes wip-bounce { 0%,100% { transform: scale(1) } 50% { transform: scale(1.12) } }
                .wip-stripes { background-image: repeating-linear-gradient(135deg, rgba(255,255,255,.18) 0 8px, transparent 8px 16px); background-size: 28px 100%; animation: wip-sheen 1s linear infinite }
                .wip-confetti { animation: wip-rise 1.4s ease-out both }
                .wip-matched { animation: wip-bounce .4s ease-out }
                .wip-card { perspective: 600px }
                .wip-inner { transform-style: preserve-3d; transition: transform .45s cubic-bezier(.4,.2,.2,1) }
                .wip-inner.is-up { transform: rotateY(180deg) }
                .wip-face { backface-visibility: hidden; -webkit-backface-visibility: hidden }
                .wip-front { transform: rotateY(180deg) }
                @media (prefers-reduced-motion: reduce) {
                    .wip-stripes, .wip-confetti, .wip-matched { animation: none !important }
                    .wip-inner { transition: none }
                }
            `}</style>

            <div className="relative w-full max-w-md">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-[2.2rem] blur-xl opacity-75 pointer-events-none" />

                <div className="relative bg-slate-950 rounded-3xl p-6 sm:p-8 text-center overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] ring-1 ring-white/5">
                    {/* Confetti */}
                    {won && (
                        <div className="absolute inset-x-0 bottom-28 pointer-events-none" aria-hidden="true">
                            {Array.from({ length: 18 }).map((_, i) => (
                                <span
                                    key={i}
                                    className="wip-confetti absolute w-2 h-3 rounded-sm"
                                    style={{
                                        left: `${5 + i * 5.2}%`,
                                        background: ['#818cf8', '#c084fc', '#34d399', '#fbbf24', '#f472b6'][i % 5],
                                        '--r': `${(i % 2 ? 1 : -1) * (120 + i * 14)}deg`,
                                        animationDelay: `${(i % 6) * 0.06}s`,
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-5">
                        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                        Still being built
                    </div>

                    <h2 className="text-2xl font-bold tracking-tight mb-2">
                        {won ? 'All pieces in place!' : `${title} isn't ready yet`}
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed mb-5 min-h-[2.5rem]">
                        {won
                            ? `You finished the build in ${moves} moves. The real thing is almost ready, check back soon.`
                            : 'While we finish it, match the pairs to fill the build bar.'}
                    </p>

                    {/* Build progress */}
                    <div className="mb-5 text-left">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                            <span className="text-slate-500 truncate pr-3" aria-live="polite">
                                {won ? 'Build complete' : STATUS_LINES[statusIdx]}
                            </span>
                            <span className="font-semibold tabular-nums text-indigo-300">{pct}%</span>
                        </div>
                        <div
                            className="h-2.5 rounded-full bg-slate-900 ring-1 ring-white/5 overflow-hidden"
                            role="progressbar"
                            aria-valuenow={pct}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label="Build progress"
                        >
                            <div
                                className="relative h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-[width] duration-500 ease-out overflow-hidden"
                                style={{ width: `${pct}%` }}
                            >
                                {!won && <div className="wip-stripes absolute inset-0" />}
                            </div>
                        </div>
                    </div>

                    {/* Memory board: 4 columns x 3 rows */}
                    <div className="grid grid-cols-4 gap-2.5 sm:gap-3 mb-4 select-none">
                        {deck.map((card, i) => {
                            const isMatched = matched.includes(i);
                            const isUp = isMatched || flipped.includes(i);
                            return (
                                <button
                                    key={card.id}
                                    type="button"
                                    onClick={() => flip(i)}
                                    aria-label={isUp ? `Card ${card.emoji}` : 'Hidden card'}
                                    className="wip-card aspect-square cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-2xl"
                                >
                                    <div className={`wip-inner relative w-full h-full ${isUp ? 'is-up' : ''}`}>
                                        {/* Back (hidden side) */}
                                        <div className="wip-face absolute inset-0 rounded-2xl bg-slate-900 border border-slate-800 shadow-inner flex items-center justify-center hover:border-indigo-500/40 transition-colors">
                                            <span className="text-indigo-400/50 text-lg font-bold">?</span>
                                        </div>
                                        {/* Front (emoji side) */}
                                        <div
                                            className={`wip-face wip-front absolute inset-0 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl border ${
                                                isMatched
                                                    ? 'wip-matched bg-indigo-500/15 border-indigo-400/50'
                                                    : 'bg-slate-800 border-slate-700'
                                            }`}
                                        >
                                            {card.emoji}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <p className="text-xs text-slate-500 mb-5 tabular-nums">
                        Pairs: {matchedPairs} / {pairs} &nbsp;•&nbsp; Moves: {moves}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={reset}
                            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium text-sm shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 hover:scale-[1.02] transition-all duration-200 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
                        >
                            {won ? 'Play again' : 'Shuffle'}
                        </button>
                        <button
                            onClick={handleBackHome}
                            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-medium text-sm hover:border-indigo-500/40 hover:text-white transition-colors duration-200 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WorkInProgress;