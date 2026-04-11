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
    url: "#",
    description: "Giai điệu thư giãn",
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
              target={link.url !== "#" ? "_blank" : "_self"}
              rel="noreferrer"
              className={`group relative flex items-center gap-4 p-5 rounded-lg border border-border/70 bg-card/72 shadow-[0_22px_70px_rgba(83,70,48,0.13)] backdrop-blur-md hover:bg-card/92 hover:border-primary/35 hover:-translate-y-0.5 transition-all duration-500 fade-in-up ${link.delay}`}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors duration-500">
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

        <footer className="mt-8 text-center sm:text-left fade-in-up delay-1000">
          <p className="font-serif italic text-muted-foreground text-sm">
            "Sự hoàn mỹ nằm trong những điều không hoàn hảo."
          </p>
        </footer>
      </main>
    </div>
  );
}
