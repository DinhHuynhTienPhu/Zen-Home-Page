import React, { useEffect, useState } from "react";
import { ArrowUpRight, Youtube, MonitorPlay, Film, BookOpen, Music, Edit3 } from "lucide-react";
import zenBackground from "@assets/image_1775884017478.png";

interface LinkItem {
  title: string;
  url: string;
  description: string;
  icon: React.ReactNode;
  delay: string;
}

const meditationPlaylistUrl =
  "https://www.youtube.com/watch?v=1lXbTn372wI&list=RD1lXbTn372wI&start_radio=1&t=2087s";

const meditationEmbedUrl =
  "https://www.youtube.com/embed/1lXbTn372wI?start=2087&list=RD1lXbTn372wI";

const links: LinkItem[] = [
  {
    title: "Freemediaheckyeah",
    url: "https://fmhy.net",
    description: "Tài nguyên & công cụ",
    icon: <MonitorPlay className="w-5 h-5" strokeWidth={1.5} />,
    delay: "delay-200",
  },
  {
    title: "YouTube",
    url: "https://youtube.com",
    description: "Video & giải trí",
    icon: <Youtube className="w-5 h-5" strokeWidth={1.5} />,
    delay: "delay-300",
  },
  {
    title: "KissKH",
    url: "https://kisskh.ovh",
    description: "Phim & chương trình",
    icon: <Film className="w-5 h-5" strokeWidth={1.5} />,
    delay: "delay-400",
  },
  {
    title: "Góc Đọc Sách",
    url: "#",
    description: "Không gian tĩnh lặng",
    icon: <BookOpen className="w-5 h-5" strokeWidth={1.5} />,
    delay: "delay-500",
  },
  {
    title: "Danh Sách Phát",
    url: "#playlist",
    description: "Nhạc thiền relax",
    icon: <Music className="w-5 h-5" strokeWidth={1.5} />,
    delay: "delay-[600ms]",
  },
  {
    title: "Sổ Ghi Chép",
    url: "#",
    description: "Suy nghĩ & ý tưởng",
    icon: <Edit3 className="w-5 h-5" strokeWidth={1.5} />,
    delay: "delay-[700ms]",
  },
];

const thichNhatHanhQuotes = [
  "Walk as if you are kissing the Earth with your feet.",
  "Smile, breathe and go slowly.",
  "Because you are alive, everything is possible.",
  "Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.",
  "Sometimes your joy is the source of your smile, but sometimes your smile can be the source of your joy.",
  "To be beautiful means to be yourself. You don’t need to be accepted by others. You need to accept yourself.",
  "The present moment is filled with joy and happiness. If you are attentive, you will see it.",
  "Our own life has to be our message.",
  "Drink your tea slowly and reverently, as if it is the axis on which the world earth revolves.",
  "Breathing in, I calm body and mind. Breathing out, I smile.",
];

function DecorativeBotanicals() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
      <svg
        className="botanical-float absolute bottom-8 left-6 h-36 w-36 text-primary/24 sm:bottom-14 sm:left-16 sm:h-48 sm:w-48"
        viewBox="0 0 220 220"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M108 171c-17-29-15-60 0-91 15 31 17 62 0 91Z"
          fill="currentColor"
          opacity="0.34"
        />
        <path
          d="M73 166c-2-36 12-62 37-82 4 36-7 64-37 82Z"
          fill="currentColor"
          opacity="0.24"
        />
        <path
          d="M143 166c2-36-12-62-37-82-4 36 7 64 37 82Z"
          fill="currentColor"
          opacity="0.24"
        />
        <path
          d="M45 153c18-29 42-42 73-42-15 30-38 46-73 42Z"
          fill="currentColor"
          opacity="0.18"
        />
        <path
          d="M173 153c-18-29-42-42-73-42 15 30 38 46 73 42Z"
          fill="currentColor"
          opacity="0.18"
        />
        <path
          d="M55 177c34 18 74 18 108 0"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.28"
        />
      </svg>

      <svg
        className="botanical-float-slow absolute right-8 top-12 h-40 w-40 text-[hsl(87_18%_38%_/_0.23)] sm:right-24 sm:top-20 sm:h-56 sm:w-56"
        viewBox="0 0 220 220"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M70 181c13-48 37-91 84-127"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M119 83c-24-19-51-20-80-4 26 15 53 17 80 4Z"
          fill="currentColor"
        />
        <path
          d="M144 58c-7-30 2-55 27-75 9 29 2 55-27 75Z"
          fill="currentColor"
          opacity="0.78"
        />
        <path
          d="M98 122c-29-10-56-4-79 19 31 7 57 1 79-19Z"
          fill="currentColor"
          opacity="0.82"
        />
        <path
          d="M126 102c17-24 42-34 73-28-15 26-38 36-73 28Z"
          fill="currentColor"
          opacity="0.72"
        />
      </svg>

      <svg
        className="botanical-float-reverse absolute bottom-16 right-2 hidden h-44 w-44 text-[hsl(37_27%_38%_/_0.17)] md:block lg:right-16"
        viewBox="0 0 220 220"
        fill="none"
        aria-hidden="true"
      >
        <path d="M50 190c8-48 11-91 4-132" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M94 190c2-58 12-101 34-145" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M142 190c-4-48 2-88 18-120" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M54 74c-17 23-17 45 1 67 18-25 18-47-1-67Z" fill="currentColor" opacity="0.75" />
        <path d="M130 48c-26 20-34 46-23 78 28-22 36-48 23-78Z" fill="currentColor" opacity="0.62" />
        <path d="M158 76c-19 18-24 39-14 64 20-20 25-41 14-64Z" fill="currentColor" opacity="0.56" />
      </svg>
    </div>
  );
}

export default function Home() {
  const [time, setTime] = useState(new Date());
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteVisible, setQuoteVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const quoteTimer = setInterval(() => {
      setQuoteVisible(false);

      window.setTimeout(() => {
        setQuoteIndex((current) => (current + 1) % thichNhatHanhQuotes.length);
        setQuoteVisible(true);
      }, 650);
    }, 6500);

    return () => clearInterval(quoteTimer);
  }, []);

  const timeString = time.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const dateString = time.toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-hidden bg-background py-20 px-6 sm:px-12">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-80 scale-[1.02]"
        style={{ backgroundImage: `url(${zenBackground})` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_34%,rgba(255,253,245,0.04),rgba(245,238,221,0.52)_44%,rgba(229,219,197,0.78)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/58 to-background/18" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/16 via-transparent to-background/72" />
      <DecorativeBotanicals />
      <div className="noise-overlay" />
      <div className="absolute top-1/2 left-[34%] -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] bg-[rgba(255,250,235,0.28)] rounded-full blur-[110px] pointer-events-none" />

      <main className="w-full max-w-2xl mx-auto relative z-10 flex flex-col gap-16">
        <header className="flex flex-col gap-4 text-center sm:text-left fade-in-up">
          <p className="font-mono text-sm tracking-widest text-muted-foreground uppercase">
            {dateString} • {timeString}
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl text-foreground font-light tracking-tight drop-shadow-[0_2px_20px_rgba(255,255,255,0.6)]">
            Trở về nhà.
          </h1>
          <div
            className={`max-w-xl mx-auto sm:mx-0 mt-2 transition-all duration-700 ${
              quoteVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <p className="font-serif italic text-xl sm:text-2xl text-muted-foreground leading-relaxed">
              “{thichNhatHanhQuotes[quoteIndex]}”
            </p>
            <p className="mt-3 font-sans text-xs tracking-[0.22em] uppercase text-muted-foreground/75">
              Thích Nhất Hạnh
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target={link.url.startsWith("#") ? undefined : "_blank"}
              rel={link.url.startsWith("#") ? undefined : "noreferrer"}
              className={`group relative flex items-center gap-4 rounded-[1.75rem] border border-border/70 bg-card/72 p-5 shadow-[0_22px_70px_rgba(83,70,48,0.13)] backdrop-blur-md hover:-translate-y-0.5 hover:border-primary/35 hover:bg-card/92 transition-all duration-500 fade-in-up ${link.delay}`}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors duration-500">
                {link.icon}
              </div>
              <div className="flex flex-col flex-grow">
                <span className="font-sans font-medium text-foreground text-base group-hover:text-primary transition-colors duration-500">
                  {link.title}
                </span>
                <span className="font-sans text-sm text-muted-foreground">
                  {link.description}
                </span>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-500 text-primary">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </a>
          ))}
        </div>

        <section
          id="playlist"
          className="fade-in-up delay-700 scroll-mt-8 rounded-[2rem] border border-border/70 bg-card/70 p-4 shadow-[0_26px_90px_rgba(83,70,48,0.14)] backdrop-blur-md sm:p-5"
        >
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-sans text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Danh sách phát
              </p>
              <h2 className="mt-2 font-serif text-2xl font-light text-foreground">
                Nhạc thiền relax
              </h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                Một góc âm thanh nhẹ để thở chậm, đọc quote, hoặc để căn phòng yên hơn.
              </p>
            </div>
            <a
              href={meditationPlaylistUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 self-start rounded-full border border-primary/20 bg-background/50 px-4 py-2 text-sm font-medium text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-background/80 sm:self-auto"
            >
              Mở trên YouTube
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="overflow-hidden rounded-[1.55rem] border border-border/70 bg-background/45 shadow-inner">
            <iframe
              className="aspect-video w-full"
              src={meditationEmbedUrl}
              title="Danh sách phát nhạc thiền relax"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </section>

        <footer className="mt-8 text-center sm:text-left fade-in-up delay-1000">
          <p className="font-serif italic text-muted-foreground text-sm">
            "Sự hoàn mỹ nằm trong những điều không hoàn hảo."
          </p>
        </footer>
      </main>
    </div>
  );
}
