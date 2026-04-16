"use client";

import { useState, useRef, useEffect } from "react";

// ── Card data ────────────────────────────────────────────────────────────────
// Randomised order. isAI drives scoring; swap src/content here when updating.
type CardData = {
  id: number;
  src: string;
  type: "image" | "video";
  isAI: boolean;
  title: string;
  description: string;
  tags: string[];
  objectPosition?: string;
};

const CARDS: CardData[] = [
  {
    id: 0,
    src: "/human3.jpeg",
    type: "image",
    isAI: false,
    title: "The One Who Burns",
    description:
      "New piece in the series. Oil on canvas, 24×24in. Been thinking a lot about conformity lately — what it actually costs to stand apart.",
    tags: ["Oil Painting", "Fine Art", "Studio"],
  },
  {
    id: 1,
    src: "/ai-generated5.png",
    type: "image",
    isAI: true,
    title: "1 Month Into the Project",
    description:
      "Finally happy with how the light rays turned out. This one's called Golden Hour — part of a longer pixel art series I've been building out.",
    tags: ["Pixel Art", "Digital Art", "Gamedev"],
  },
  {
    id: 2,
    src: "/human4.jpeg",
    type: "image",
    isAI: false,
    title: "House by the Field",
    description:
      "Drove three hours to find this. Shot on my mirrorless, no editing except a slight crop. Sometimes simple is everything.",
    tags: ["Photography", "Minimalism", "Architecture"],
  },
  {
    id: 3,
    src: "/ai-generated2.png",
    type: "image",
    isAI: true,
    title: "Just Dropped Our Concept Photos",
    description:
      "Final batch from the studio session. VHS filter, natural light, no retouching. The energy in these came out exactly how we wanted.",
    tags: ["K-Pop", "Photoshoot", "Aesthetic"],
  },
  {
    id: 4,
    src: "/human1.jpeg",
    type: "image",
    isAI: false,
    title: "Finished This Piece Last Night",
    description:
      "Been working on this for three weeks. The tree took forever but I'm really happy with how the moons came out. Gouache on illustration board.",
    tags: ["Illustration", "Fantasy Art", "Painting"],
  },
  {
    id: 5,
    src: "/ai-generated3.png",
    type: "image",
    isAI: true,
    title: "Found This Spot in Shinjuku",
    description:
      "Stumbled upon this alley on my last night in Tokyo. The colors at dusk were unreal — didn't touch the edit at all.",
    tags: ["Tokyo", "Travel", "Street"],
  },
  {
    id: 6,
    src: "/human5.mov",
    type: "video",
    isAI: false,
    title: "Golden Hour Drive",
    description:
      "Couldn't stop to get out of the car but had to capture this somehow. Phone propped on the dash, one hand on the wheel.",
    tags: ["Video", "Sunset", "Travel"],
  },
  {
    id: 7,
    src: "/ai-generated4.png",
    type: "image",
    isAI: true,
    title: "Morning in the Highlands",
    description:
      "Woke up at 5am just for this. The fog was still lifting off the hills when I arrived. Worth every minute of lost sleep.",
    tags: ["Iceland", "Horses", "Nature"],
    objectPosition: "bottom",
  },
  {
    id: 8,
    src: "/human2.jpeg",
    type: "image",
    isAI: false,
    title: "Grocery Run Studies",
    description:
      "Trying to get better at painting everyday objects. There's something really satisfying about plastic wrap and produce.",
    tags: ["Illustration", "Still Life", "Gouache"],
  },
  {
    id: 9,
    src: "/ai-generated1.mov",
    type: "video",
    isAI: true,
    title: "Experimenting With New Techniques",
    description:
      "Playing around with some new motion tools for a client project. Still early days but starting to like where it's going.",
    tags: ["Video", "Motion", "Creative"],
  },
];

const TOTAL_CARDS = CARDS.length;

// ── PostCard ─────────────────────────────────────────────────────────────────
function PostCard({
  card,
  liked,
  onLike,
}: {
  card: CardData;
  liked: boolean;
  onLike: () => void;
}) {
  return (
    <div className="w-[min(480px,85vw)] bg-white border border-[#ccc] rounded-[8px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.15)] p-6 flex flex-col gap-6">
      <p className="text-[14px] font-medium text-black">{card.title}</p>

      {card.type === "video" ? (
        <video
          key={card.src}
          src={card.src}
          autoPlay
          loop
          muted
          playsInline
          className="w-full aspect-square object-cover rounded-[4px] border border-[#ccc]"
        />
      ) : (
        <img
          src={card.src}
          alt={card.title}
          className="w-full aspect-square object-cover rounded-[4px] border border-[#ccc]"
          style={{ objectPosition: card.objectPosition ?? "center" }}
        />
      )}

      <p className="text-[13px] text-black">{card.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex gap-3 flex-wrap">
          {card.tags.map((tag) => (
            <div
              key={tag}
              className="border border-[#ccc] rounded-[4px] px-2 py-1.5 text-[11px] text-[#676767] bg-white"
            >
              {tag}
            </div>
          ))}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLike();
          }}
          className="w-7 h-7 flex items-center justify-center cursor-pointer shrink-0 ml-3"
          aria-label={liked ? "Unlike" : "Like"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-full h-full transition-colors"
            fill={liked ? "#e53e3e" : "none"}
            stroke={liked ? "#e53e3e" : "currentColor"}
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ── Home ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [previewVisible, setPreviewVisible] = useState(true);
  const [liked, setLiked] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [dragY, setDragY] = useState(0);
  const [cardKey, setCardKey] = useState(0);
  const [exiting, setExiting] = useState<"left" | "right" | null>(null);
  const [currentCard, setCurrentCard] = useState(1);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (gameStarted) return;
    const interval = setInterval(() => {
      setPreviewVisible(false);
      setTimeout(() => {
        setPreviewIndex((i) => (i + 1) % TOTAL_CARDS);
        setPreviewVisible(true);
      }, 700);
    }, 3000);
    return () => clearInterval(interval);
  }, [gameStarted]);

  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const currentDragRef = useRef({ x: 0, y: 0 });

  const THRESHOLD = 80;

  const startDrag = (x: number, y: number) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartRef.current = { x, y };
  };

  const moveDrag = (x: number, y: number) => {
    if (!isDraggingRef.current) return;
    const dx = x - dragStartRef.current.x;
    const dy = y - dragStartRef.current.y;
    currentDragRef.current = { x: dx, y: dy };
    setDragX(dx);
    setDragY(dy);
  };

  const endDrag = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    const { x: dx, y: dy } = currentDragRef.current;

    if (Math.abs(dx) >= THRESHOLD && currentCard <= TOTAL_CARDS) {
      const dir = dx > 0 ? "right" : "left";
      const guessedAI = dir === "left";
      if (guessedAI === CARDS[currentCard - 1].isAI) setScore((s) => s + 1);
      setExiting(dir);
      setTimeout(() => {
        setExiting(null);
        setDragX(0);
        setDragY(0);
        currentDragRef.current = { x: 0, y: 0 };
        setLiked(false);
        setCurrentCard((n) => n + 1);
        setCardKey((k) => k + 1);
      }, 380);
    } else {
      setDragX(0);
      setDragY(0);
    }
  };

  const restart = () => {
    setCurrentCard(1);
    setScore(0);
    setCardKey((k) => k + 1);
    setLiked(false);
    setDragX(0);
    setDragY(0);
    currentDragRef.current = { x: 0, y: 0 };
  };

  const swipeHint = exiting
    ? null
    : dragX > 40
    ? "right"
    : dragX < -40
    ? "left"
    : null;

  const cardTransform = exiting
    ? `translate(${exiting === "right" ? 1400 : -1400}px, ${dragY * 0.3}px) rotate(${exiting === "right" ? 25 : -25}deg)`
    : isDragging
    ? `translate(${dragX}px, ${dragY}px) rotate(${dragX * 0.06}deg)`
    : "translate(0,0) rotate(0deg)";

  const cardTransition = exiting
    ? "transform 0.38s cubic-bezier(0.4,0,1,1)"
    : isDragging
    ? "none"
    : "transform 0.25s ease-out";

  const done = currentCard > TOTAL_CARDS;

  return (
    <div
      className="min-h-screen bg-white font-[family-name:var(--font-geist-sans)] overflow-hidden select-none relative"
      onMouseMove={(e) => moveDrag(e.clientX, e.clientY)}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
    >
      {/* ── INTRO ── */}
      <div
        className={`absolute inset-0 flex flex-col lg:flex-row transition-opacity duration-500 ${
          gameStarted ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="flex flex-col justify-center px-8 py-12 lg:px-16 lg:w-[45%]">
          <div className="flex flex-col gap-3 max-w-[400px]">
            <p className="text-[17px] font-semibold text-black">Is This You?</p>
            <div className="text-[17px] text-black flex flex-col gap-2">
              <p>
                In this game, you&apos;ll be shown a series of 10 social media
                posts – some of which are AI-generated.
              </p>
              <p>
                Your goal is to swipe left or right and determine if the post is
                AI or human-created.
              </p>
            </div>
          </div>
          <button
            onClick={() => setGameStarted(true)}
            className="mt-9 w-fit bg-[#414141] text-white text-[14px] font-semibold px-4 py-2 rounded-[4px] hover:bg-[#2a2a2a] transition-colors cursor-pointer"
          >
            Begin
          </button>
        </div>
        <div className="flex items-center justify-center px-8 py-12 lg:px-12 lg:w-[55%]">
          <div className={`transition-opacity duration-700 ${previewVisible ? "opacity-100" : "opacity-0"}`}>
            <PostCard card={CARDS[previewIndex]} liked={liked} onLike={() => setLiked((p) => !p)} />
          </div>
        </div>
      </div>

      {/* ── GAME ── */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 delay-200 ${
          gameStarted ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Progress indicator */}
        <div className="absolute top-8 flex flex-col items-center gap-2">
          <div className="flex gap-1.5">
            {Array.from({ length: TOTAL_CARDS }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-6 rounded-full transition-all duration-300 ${
                  i < currentCard - 1
                    ? "bg-[#414141]"
                    : i === currentCard - 1 && !done
                    ? "bg-[#414141] opacity-40"
                    : "bg-[#e0e0e0]"
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] text-[#999]">
            {Math.min(currentCard, TOTAL_CARDS)} / {TOTAL_CARDS}
          </span>
        </div>

        {/* Left arrow — AI-Generated */}
        <div
          className={`absolute left-6 lg:left-14 flex items-center gap-3 z-10 transition-opacity duration-300 ${
            done ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <span
            className={`text-[13px] font-medium transition-all duration-150 ${
              swipeHint === "left" ? "opacity-100 text-black" : "opacity-40 text-[#676767]"
            }`}
          >
            AI-Generated?
          </span>
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-[10px] transition-all duration-150 ${
              swipeHint === "left"
                ? "bg-[#414141] text-white scale-110 shadow-lg"
                : "bg-[#ebebeb] text-[#555]"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </div>
        </div>

        {/* Card or results */}
        {!done ? (
          <div key={cardKey} className="card-enter">
            <div
              style={{
                transform: cardTransform,
                transition: cardTransition,
                cursor: isDragging ? "grabbing" : "grab",
                touchAction: "none",
              }}
              onMouseDown={(e) => { e.preventDefault(); startDrag(e.clientX, e.clientY); }}
              onTouchStart={(e) => startDrag(e.touches[0].clientX, e.touches[0].clientY)}
              onTouchMove={(e) => { e.preventDefault(); moveDrag(e.touches[0].clientX, e.touches[0].clientY); }}
              onTouchEnd={endDrag}
            >
              <PostCard
                card={CARDS[currentCard - 1]}
                liked={liked}
                onLike={() => setLiked((p) => !p)}
              />
            </div>
          </div>
        ) : (
          <div className="card-enter flex flex-col items-center gap-4 text-center">
            <p className="text-[20px] font-semibold text-black">
              You got {score} / {TOTAL_CARDS} correct
            </p>
            <p className="text-[14px] text-[#676767]">
              {score === TOTAL_CARDS
                ? "Perfect score!"
                : score >= TOTAL_CARDS * 0.7
                ? "Nice work!"
                : score >= TOTAL_CARDS * 0.4
                ? "Not bad!"
                : "Better luck next time."}
            </p>
            <button
              onClick={restart}
              className="mt-2 bg-[#414141] text-white text-[14px] font-semibold px-5 py-2 rounded-[4px] hover:bg-[#2a2a2a] transition-colors cursor-pointer"
            >
              Play Again
            </button>
          </div>
        )}

        {/* Right arrow — Human */}
        <div
          className={`absolute right-6 lg:right-14 flex items-center gap-3 z-10 transition-opacity duration-300 ${
            done ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-[10px] transition-all duration-150 ${
              swipeHint === "right"
                ? "bg-[#414141] text-white scale-110 shadow-lg"
                : "bg-[#ebebeb] text-[#555]"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
          <span
            className={`text-[13px] font-medium transition-all duration-150 ${
              swipeHint === "right" ? "opacity-100 text-black" : "opacity-40 text-[#676767]"
            }`}
          >
            Human?
          </span>
        </div>
      </div>
    </div>
  );
}
