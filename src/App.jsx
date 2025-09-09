import React, { useState, useRef, useEffect} from "react";

// Cute Sanrio-style Memories Collage (static with popup letter + 10 things)
// ----------------------------------------------------
// • Replace image URLs in TIMELINE, CUTE_PICS, and IntroCard cover.
// • Click the bow button (or the Intro card button) to open the letter modal.
// • “10 Things I Love About You” shows as small rectangles.
// • All static — no uploads. Great for GitHub Pages/Netlify.

const MUSIC_SRC = "/stickers/spirited-away.mp3";

const TIMELINE = [
  { key: "cover", title: "A cool pic of us I must say with you wearing my hoodie haha:)", src: "/stickers/Blue.jpeg", note: "Me and You bubu ♡" }, // 👈 Added cover image slot
  { key: "Rooftop", title: "Rooftop Dinner with my bubu", src: "/stickers/Rooftop.jpeg", note: "Our second year aniversery when I was finally making some real money even though the food portions were tiny, but we had an amazing view of the downtown sunset together, and I'm always grateful for that day life is going good for us and nothiing can stop it." },
  { key: "first-trip", title: "On our first Kayak ride together", src: "/stickers/Kayaking.jpeg", note: "The summertime kayak ride we had together! I remember myself being super scared that I was going to fall off, and we both didn't use life jackets but it was so fun to be out on the lake. I had an amazing time with you that I'll always remember Leela :)" },
  { key: "ohio-game", title: "OSU Game day", src: "stickers/Ohio.jpeg", note: "Our first ever football game my love! Even though it was crazy hot outside, I still thought it was fun I was able to experince my first osu game with you babe. Let's go to more events and concerts together it'll always be a blast with you :) " },
  { key: "bar-time", title: "Our night out together :0", src: "stickers/Usdrink.jpeg", note: "The time when you took me out for my birthday but you were the one that got drunk instead haha. It's always nice though to take care of you and make sure you're safe Leela :) " },
  { key: "painting", title: "Painting Night:) ", src: "stickers/painting.jpeg", note: "I can't beleive I was able to randomly find a good place for us to paint and sip. Our little wine night with painting. They ended up turning out pretty well we're top tier artists I must say. Arts and crafts are actually pretty fun haha." },
  { key: "Fall-time", title: "Hoodie Season", src: "stickers/Fall.jpeg", note: "When the weather started getting colder and we would still go out on our late night walks togther even though we would be freezing there would always be something to talk about, but even when it was quiet we felt the comfort of each other's silience as we were holding hands, and I would do it all again with you babe." },
  { key: "Cleavland", title: "Our time in Cleveland", src: "stickers/Cleavlandcold.jpeg", note: "Back when we were at the pier it was winter time and the wind was so cold it was freezing both of our hands. I remember we had to hug each other for warmth as we looked for a bench and took our picture before we wrapped our trip, and I couldn't be more happy with traveling with a person than you Leela" },
  { key: "cleveland-trip", title: "One more picture from the city since I can't resist haha", src: "stickers/CleavlandCity.jpeg", note: "Strolling through the city together after we got some good nepalese food :)." },
  { key: "Foodie", title: "My foodie bubu:))", src: "stickers/Foodie.jpeg", note: "We always need the sweet treat of course bubu ♡" },
  { key: "valentines-day", title: "Valentines day with my sweetie ", src: "stickers/Valentine.jpeg", note: "Our 3rd valentines together baby! I hope you'll be mine always and I'll always be yours my love." },
  { key: "Pool-Day", title: "Swimming Time bubu!!", src: "stickers/Pool.jpeg", note: "One of our relaxing days in the summmer. I'm sure you remember what a great swimmer I was. Just kidding of course, but thank you so much bubu always staying by my side and swimming with me you always support me when I'm not feeling confident" },
  { key: "Holding-hands", title: "You're so important to me I can't let you go", src: "stickers/Hands.jpeg", note: "I'm realizng that I'll have to go to New Jersey soon and it's hitting me hard becuase I'm going to miss you so much and I really don't like being away from you Leela we do everything together :( but I know we got this it's the start of a new chapter with just the two of us. Before we were always saying what if we move in and now we might actually do it which is exciting for us :)" },
  { key: "Only-Us", title: "Thinking about you", src: "stickers/Justus.jpeg", note: "I keep thinking about how it'll be when we live togther bubu becuase I know we'll be doing everything then whether it be travelling, cooking, watching movies, deceroting our place. I keep thinking about it and I get so happy seeing us doing that I don't care if it's boring things as long as we're together, and I can't wait for it we'll just have to get through long distance for a bit, but we got this we've been with each other through so much I don't see why it would stop now.  " },
  { key: "Leaving", title: "Leaving soon babe :(", src: "stickers/MeNu.jpeg", note: "In the time I'm writing this I'll be leaving to jersey in a few days . I'm really sad about leaving ohio and especially saying goodbye to you, I always suck at saying goodbyes, but I know we're not saying goodbye becuase you'll be coming soon. Even if we can't see each other for our 3rd aniversary I'm making this website for you that way you can look at it whenever you want to whenever you're feeling down and want to look back at the times we had. I'll see you soon bubu ♡" },
  { key: "Love", title: "Together forever my love :) ", src: "stickers/ILoveU.jpeg", note: " I love you Leela :) ♡" },
];


// ✅ Single source of truth (no duplicates)
const TEN_THINGS = [
  "Your laugh whenever I try to make you smile it's always so cute ",
  "How you hype me up at the gym and in everything, I always feel stronger and more confident. My biggest supporter",
  "Your beauty, it's honestly crazy sometimes when I look at you I get those same butterflies again and think to myself this girl is so pretty and I'm so lucky that I'm with her",
  "You always wanting to steal my hoodies and clothes especially the OSU one. ",
  "The way you're always thoughtful even with things that you're not intrested in them becuase I like it",
  "You always want to go on foodie adventures. We always fill our bellies and get ourselves a sweet treat.",
  "The way you introduce me to new things and walk me through them like ice skating, card games  or music I've never listened to ",
  "You helped me overcome my fear of dogs at first I wanted nothing to do with them but now I'm always happy to see Pepper and Chap:)",
  "How you care about family. You're always so considerate to your loved ones and I'm grateful to be apart of that",
  "Your spontaneous energy whether it be kissing me a bunch or doing the floss dance haha ",
  "Your brave honesty you're never afriad to speak your mind",
  "The way you make any place feel like home. Home is wherever you are my love :) ",
  "You're such a strong person, I know if you put your mind to it you can accomplish anything!"
];

const LETTER_HTML = `
  <p>Leela,</p>
  <p> Three years ago, under the soft sky of the Park of Roses, everything began. I can still feel that moment as if it were yesterday—sitting with you, sharing momos for the very first time. I remember how my confidence on FaceTime dissolved the second I saw you in person. My hands trembled, my heart raced, and yet, with just a smile from you, all of that nervousness melted away. The words came easily, the laughter came naturally, and something inside me knew this was the start of something beautiful.</p>
  <p> Since that day, we have woven a whole new web of memories together. Through our college years, hand in hand, we’ve laughed, explored, and built a world that feels entirely our own. We tried new foods that became favorites, discovered places that became chapters in our story, and stood proudly beside each other at our greatest accomplishments. You’ve been my anchor, my confidant, my greatest adventure. I wouln't trust anyone with my feelings more than you</p>
  <p> What I treasure most are not only the big milestones, but the little things—the late-night drives, the quiet study sessions, the simple joy of just being near you. Holidays like Thanksgiving and Christmas have been brighter because you were there; each season we’ve passed through has felt warmer, fuller, more alive, simply because we shared it together.</p>
  <p> If I could, I would relive it all again—the shaky hands of our first meeting, the countless shared meals, the journeys, the laughter, even the quiet moments in between—because every single moment with you has been a gift I would never trade.</p>
  <p> Leela, these three years with you have been the happiest years of my life. You are my heart’s constant, my greatest blessing, and the love that turns even the ordinary into something extraordinary. And as I look back on everything we’ve shared, I feel even more grateful knowing this is only the beginning of our forever.</p>
  <p> I love you, endlessly and always.</p>
  <p> Yours forever, </p>
  <p>Dhruv</p>
`;

const CUTE_PICS = [
  { src: "/stickers/Bubu.jpeg", alt: "cute cat 1" },
  { src: "/stickers/luv.jpeg", alt: "heart 1" },
  { src: "/stickers/Dudu.jpeg", alt: "cute cat 2" },
  { src: "/stickers/Bubu1.jpeg", alt: "heart 2" },
  { src: "/stickers/peach.png", alt: "cute cat 3" },
];

const STICKERS = {
  bow: "/stickers/bow.svg",
  heart: "/stickers/heart.svg",
  sparkle: "/stickers/sparkle.svg",
  cat: "/stickers/cat.svg",
};

export default function CuteMemoriesMusicOnly() {
  const [showLetter, setShowLetter] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const audioRef = useRef(null);
  // Load preference on mount
  useEffect(() => {
    const saved = localStorage.getItem("music:on");
    if (saved === "true") setIsMusicOn(true);
  }, []);

  // Play/pause handler
  useEffect(() => {
    localStorage.setItem("music:on", String(isMusicOn));
    const audio = audioRef.current;
    if (!audio) return;
    if (isMusicOn) {
      const attempt = async () => {
        try { await audio.play(); }
        catch { /* will play after next user click if autoplay blocked */ }
      };
      attempt();
    } else {
      audio.pause();
    }
  }, [isMusicOn]);
  
  return (
    <div className="min-h-screen text-rose-900 bg-[linear-gradient(135deg,#fff0f6_0%,#ffe8f6_30%,#e7f5ff_100%)]">
      <Header 
        onOpenLetter={() => setShowLetter(true)}
        isMusicOn={isMusicOn}
        toggleMusic={() => setIsMusicOn(v => !v)}
      />

      {/* Hidden audio element */}
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" />

      {/* Letter Modal */}
      {showLetter && (
        <Modal onClose={() => setShowLetter(false)} title="A little letter for you">
          <div className="prose prose-pink max-w-none" dangerouslySetInnerHTML={{ __html: LETTER_HTML }} />
        </Modal>
      )}

      <main className="mx-auto max-w-6xl px-4 pb-24">
        <IntroCard onOpenLetter={() => setShowLetter(true)} />

        <CuteStrip />

        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-3"> Things I Love About You</h2>
          <TenThingsGrid />
        </section>

        {/* Timeline */}
        <ol className="relative mt-10 pl-6 border-l-4 border-pink-200">
          {TIMELINE.map((item, idx) => (
            <li key={item.key} className="mb-12 ml-2">
              <div className="absolute -left-3 mt-2 w-6 h-6 rounded-full bg-pink-400 ring-4 ring-white shadow" />
              <TimelineItem i={idx + 1} {...item} />
            </li>
          ))}
        </ol>
      </main>

      <Footer />

      <Bubbles />

      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-bg { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
        .polaroid-shadow { box-shadow: 0 12px 24px rgba(244,114,182,0.25), 0 2px 6px rgba(0,0,0,0.06); }
        .sticker { filter: drop-shadow(0 6px 12px rgba(0,0,0,0.1)); }
        .tilt-l { transform: rotate(-2.5deg); }
        .tilt-r { transform: rotate(2.5deg); }
        .grid-bg {
          background-image: radial-gradient(circle at 1px 1px, rgba(244,114,182,.35) 1px, transparent 1px);
          background-size: 16px 16px;
        }
        .thick-border img { border: 12px solid #f472b6; border-radius: 0.5rem; }
        @keyframes float {
          0% { transform: translateY(100vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-10vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
}


function Header({ onOpenLetter, isMusicOn, toggleMusic }) {
  return (
    <header className="no-print sticky top-0 z-30 backdrop-blur bg-white/60 border-b border-pink-100">
      <div className="mx-auto max-w-6xl px-4 py-3 flex flex-wrap gap-3 items-center">
        <HeartBow />
        <div className="flex-1 min-w-[260px]">
          <h1 className="text-2xl font-semibold tracking-tight">Our Cute Little Timeline of 2024–2025. Happy 3 years babe!!!</h1>
          <p className="text-sm text-rose-600">Made for Leela's eyes only. I hope you enjoy it my love ♡</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenLetter}
            className="rounded-full bg-pink-500 text-white text-sm px-4 py-2 hover:bg-pink-600 flex items-center gap-2 shadow"
          >
            <img src={STICKERS.bow} alt="bow" className="w-5 h-5"/>
            Open your letter
          </button>
          <button
            onClick={toggleMusic}
            className="rounded-full bg-white border border-pink-200 text-sm px-3 py-2 hover:bg-pink-50 shadow"
          >
            {isMusicOn ? "Pause music" : "Play music"}
          </button>
        </div>
      </div>
    </header>
  );
}


function IntroCard({ onOpenLetter }) {
  return (
    <section className="grid md:grid-cols-[1.2fr,1fr] gap-4 mt-6">
      <div className="rounded-3xl bg-white/80 border border-pink-100 p-5 polaroid-shadow grid-bg">
        <h2 className="text-lg font-semibold">A website for just us about the time we've been together.</h2>
        <p className="text-sm text-rose-700 mt-2">
          I put some of our favorite moments in order. I figured since you wrote me a whole book I should make a whole website for you haha.
          Tap the bow button on the top to read the letter I wrote for you babe. 
        </p>
        <div className="mt-3">
          <button onClick={onOpenLetter} className="rounded-2xl bg-white border border-pink-200 px-4 py-2 text-sm hover:bg-pink-50">Read your letter</button>
        </div>
      </div>
      <div className="relative">
        <div className="tilt-l rounded-3xl bg-white border border-rose-100 p-3 polaroid-shadow">
          <img src="/stickers/Leela.jpeg" alt="Cover" className="w-full aspect-[4/3] object-cover rounded-2xl" />
          <div className="text-center mt-2">
            <p className="text-sm">The most beautiful girl in the world ♡</p>
          </div>
        </div>
        <img src={STICKERS.bow} alt="bow sticker" className="absolute -top-2 -left-2 w-6 h-6 sticker" />
        <img src={STICKERS.sparkle} alt="sparkle sticker" className="absolute -bottom-2 -right-2 w-6 h-6 sticker" />
      </div>
    </section>
  );
}

function CuteStrip() {
  return (
    <section className="mt-8">
      <div className="rounded-3xl bg-white/70 border border-pink-100 p-3 overflow-x-auto">
        <div className="flex items-center gap-3 min-w-max">
          {CUTE_PICS.map((p, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border border-pink-100 polaroid-shadow">
              <img src={p.src} alt={p.alt} className="w-44 h-28 object-cover" />
            </div>
          ))}
          <img src={STICKERS.heart} alt="heart" className="w-8 h-8" />
          <img src={STICKERS.sparkle} alt="sparkle" className="w-7 h-7" />
          <img src={STICKERS.bow} alt="bow" className="w-8 h-8" />
        </div>
      </div>
    </section>
  );
}

function TenThingsGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {TEN_THINGS.map((t, i) => (
        <div key={i} className="rounded-2xl bg-white border border-pink-100 p-3 polaroid-shadow">
          <div className="text-xs text-rose-500 mb-1">{String(i + 1).padStart(2, '0')}</div>
          <p className="text-sm text-rose-800">{t}</p>
        </div>
      ))}
    </div>
  );
}

function Modal({ title, children, onClose }) {
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white border border-pink-100 p-5 polaroid-shadow">
        <button onClick={onClose} className="absolute top-3 right-3 rounded-full bg-pink-500 text-white text-xs px-2 py-1">Close</button>
        <div className="flex items-center gap-2 mb-3">
          <img src={STICKERS.bow} alt="bow" className="w-5 h-5" />
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        {children}
      </div>
    </div>
  );
}

function TimelineItem({ i, title, src, note }) {
  const tilt = i % 2 ? "tilt-l" : "tilt-r";
  return (
    <section className="grid md:grid-cols-[1.1fr,1fr] gap-4 items-start">
      <div className={`rounded-3xl bg-white border border-rose-100 p-3 polaroid-shadow ${tilt}`}>
        <img src={src} alt={title} className="w-full aspect-[4/3] object-cover rounded-2xl" />
        <div className="flex items-center justify-between mt-2">
          <h3 className="font-semibold">{title}</h3>
          <span className="text-xs text-rose-500">#{String(i).padStart(2,'0')}</span>
        </div>
      </div>
      <div className="rounded-3xl bg-white/80 border border-pink-100 p-4">
        <p className="text-sm text-rose-700">{note}</p>
      </div>
    </section>
  );
}


function Footer() {
  return (
    <footer className="no-print border-t border-pink-100 bg-white/60 mt-10">
      <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-rose-600 flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
        <p>Made with cats 🐱 hearts 💖 and bows 🎀 along with my love for my sweetie bubu.</p>
        <p className="text-rose-500">Thanks for listening with me ♫</p>
      </div>
    </footer>
  );
}

function HeartBow() {
  return <img src={STICKERS.bow} alt="bow" className="w-7 h-7" />;
}

function Bubbles() {
  const items = Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 6,
    duration: 8 + Math.random() * 6,
    src: i % 3 === 0 ? STICKERS.heart : (i % 3 === 1 ? STICKERS.sparkle : STICKERS.cat),
    size: i % 3 === 0 ? 20 : 18,
  }));
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {items.map(b => (
        <img
          key={b.id}
          src={b.src}
          alt="sticker"
          className="absolute opacity-70"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.x}%`,
            animation: `float ${b.duration}s linear ${b.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes float {
          0% { transform: translateY(100vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-10vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
