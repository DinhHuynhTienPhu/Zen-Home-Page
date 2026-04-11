import React, { useEffect, useState } from "react";
import { ArrowUpRight, Youtube, MonitorPlay, Film, BookOpen, Music, Edit3 } from "lucide-react";
import zenBackground from "@assets/image_2026-04-11_114929125_1775882969139.png";

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

export default function Home() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
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
        className="absolute inset-0 bg-cover bg-center opacity-55 scale-[1.03]"
        style={{ backgroundImage: `url(${zenBackground})` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(236,222,190,0.22),rgba(20,31,23,0.74)_42%,rgba(13,20,15,0.94)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/35 to-background/80" />
      <div className="noise-overlay" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <main className="w-full max-w-2xl mx-auto relative z-10 flex flex-col gap-16">
        <header className="flex flex-col gap-4 text-center sm:text-left fade-in-up">
          <p className="font-mono text-sm tracking-widest text-muted-foreground uppercase">
            {dateString} • {timeString}
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl text-foreground font-light tracking-tight">
            Trở về nhà.
          </h1>
          <p className="font-sans text-muted-foreground text-lg max-w-md mx-auto sm:mx-0 font-light leading-relaxed mt-2">
            Một góc nhỏ bình yên. Hít thở sâu và chậm lại.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target={link.url !== "#" ? "_blank" : "_self"}
              rel="noreferrer"
              className={`group relative flex items-center gap-4 p-5 rounded-lg border border-border/60 bg-card/55 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-md hover:bg-card/85 hover:border-foreground/18 transition-all duration-500 fade-in-up ${link.delay}`}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors duration-500">
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
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-500 text-muted-foreground">
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
