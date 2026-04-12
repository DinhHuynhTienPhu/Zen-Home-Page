import { useEffect, useState } from "react";
import { ArrowUpRight, Newspaper } from "lucide-react";

type GoodNewsArticle = {
  title: string;
  description: string;
  link: string;
  imageUrl?: string;
  source?: string;
};

type RedditPost = {
  title: string;
  description: string;
  link: string;
  imageUrl?: string;
  source?: string;
};

type GoodNewsResponse = {
  articles?: RedditPost[];
};

type GoodNewsState =
  | { status: "loading"; article: null; message: null }
  | { status: "success"; article: GoodNewsArticle; message: null }
  | { status: "fallback"; article: GoodNewsArticle; message: string };

const cacheKey = "personal-home-good-news-reddit-v1";
const cacheTtl = 1000 * 60 * 30;
const goodNewsEndpoint = `${import.meta.env.BASE_URL}api/good-news`;

const fallbackArticle: GoodNewsArticle = {
  title: "Hôm nay là một ngày tuyệt vời để bắt đầu những điều mới mẻ! ✨",
  description: "Một lời nhắc nhỏ: vẫn luôn có điều tốt lành đang xảy ra quanh mình.",
  link: "https://www.reddit.com/r/UpliftingNews/",
  source: "Good Vibes",
};

function pickRandomArticle(articles: GoodNewsArticle[]) {
  const topFive = articles.slice(0, 5);
  return topFive[Math.floor(Math.random() * topFive.length)];
}

function normalizeArticles(posts: RedditPost[] = []) {
  return posts
    .filter((post) => post.title && post.link)
    .slice(0, 5)
    .map((post) => ({
      title: post.title,
      description: post.description,
      link: post.link,
      imageUrl: post.imageUrl,
      source: post.source,
    }));
}

function readCachedArticles() {
  const raw = window.localStorage.getItem(cacheKey);

  if (!raw) {
    return null;
  }

  const cached = JSON.parse(raw) as {
    savedAt: number;
    articles: GoodNewsArticle[];
  };

  if (!Array.isArray(cached.articles) || Date.now() - cached.savedAt > cacheTtl) {
    window.localStorage.removeItem(cacheKey);
    return null;
  }

  return cached.articles;
}

function writeCachedArticles(articles: GoodNewsArticle[]) {
  window.localStorage.setItem(
    cacheKey,
    JSON.stringify({
      savedAt: Date.now(),
      articles,
    }),
  );
}

export default function GoodNewsSection() {
  const [state, setState] = useState<GoodNewsState>({
    status: "loading",
    article: null,
    message: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function loadGoodNews() {
      try {
        const cachedArticles = readCachedArticles();

        if (cachedArticles?.length) {
          const article = pickRandomArticle(cachedArticles);

          if (!cancelled) {
            setState({ status: "success", article, message: null });
          }

          return;
        }

        const response = await fetch(goodNewsEndpoint);

        if (!response.ok) {
          throw new Error(`Good news request failed: ${response.status}`);
        }

        const data = (await response.json()) as GoodNewsResponse;
        const articles = normalizeArticles(data.articles);

        if (!articles.length) {
          throw new Error("No uplifting news posts found");
        }

        writeCachedArticles(articles);
        const article = pickRandomArticle(articles);

        if (!cancelled) {
          setState({ status: "success", article, message: null });
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            status: "fallback",
            article: fallbackArticle,
            message: "Reddit hơi thất thường hôm nay, nên mình để lại một lời nhắc tốt lành ở đây.",
          });
        }
      }
    }

    loadGoodNews();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="fade-in-up delay-700 rounded-[2rem] border border-border/70 bg-gradient-to-br from-card/86 via-background/64 to-[hsl(82_28%_84%_/_0.52)] p-5 shadow-[0_26px_90px_rgba(83,70,48,0.14)] backdrop-blur-md sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-primary">
          <Newspaper className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <div>
          <p className="font-sans text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Some Good News ✨
          </p>
          <h2 className="mt-1 font-serif text-2xl font-light text-foreground">
            Một tin tốt lành
          </h2>
        </div>
      </div>

      {state.status === "loading" ? (
        <div className="grid gap-5 sm:grid-cols-[180px_1fr]">
          <div className="h-40 animate-pulse rounded-[1.5rem] bg-secondary/70" />
          <div className="flex flex-col justify-center gap-3">
            <div className="h-5 w-3/4 animate-pulse rounded-full bg-secondary/80" />
            <div className="h-4 w-full animate-pulse rounded-full bg-secondary/65" />
            <div className="h-4 w-5/6 animate-pulse rounded-full bg-secondary/55" />
            <div className="mt-2 h-9 w-32 animate-pulse rounded-full bg-secondary/70" />
          </div>
        </div>
      ) : (
        <article className="grid gap-5 sm:grid-cols-[180px_1fr]">
          {state.article.imageUrl ? (
            <img
              src={state.article.imageUrl}
              alt=""
              className="h-40 w-full rounded-[1.5rem] border border-border/60 object-cover shadow-inner"
            />
          ) : (
            <div className="flex h-40 w-full items-center justify-center rounded-[1.5rem] border border-border/60 bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.72),rgba(214,203,174,0.62)_42%,rgba(152,139,101,0.28)_100%)] text-primary">
              <span className="font-serif text-5xl" aria-hidden="true">
                ✨
              </span>
            </div>
          )}
          <div className="flex flex-col justify-center">
            {state.status === "fallback" && state.message ? (
              <p className="mb-2 text-xs uppercase tracking-[0.18em] text-muted-foreground/80">
                {state.message}
              </p>
            ) : null}
            <h3 className="font-serif text-2xl font-light leading-snug text-foreground">
              {state.article.title}
            </h3>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {state.article.description}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={state.article.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/50 px-4 py-2 text-sm font-medium text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-background/80"
              >
                Read More
                <ArrowUpRight className="h-4 w-4" />
              </a>
              {state.article.source ? (
                <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground/75">
                  {state.article.source}
                </span>
              ) : null}
            </div>
          </div>
        </article>
      )}
    </section>
  );
}