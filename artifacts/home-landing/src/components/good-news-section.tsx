import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Newspaper } from "lucide-react";

type GoodNewsArticle = {
  title: string;
  description: string;
  link: string;
  imageUrl?: string;
  source?: string;
};

type NewsDataArticle = {
  title?: string | null;
  description?: string | null;
  link?: string | null;
  image_url?: string | null;
  source_id?: string | null;
};

type NewsDataResponse = {
  results?: NewsDataArticle[];
};

type GoodNewsState =
  | { status: "loading"; article: null; message: null }
  | { status: "success"; article: GoodNewsArticle; message: null }
  | { status: "fallback"; article: GoodNewsArticle; message: string };

const cacheKey = "personal-home-good-news-v1";
const cacheTtl = 1000 * 60 * 60 * 6;
const newsDataEndpoint = "https://newsdata.io/api/1/news";
const keywords = "khám phá OR thành tựu OR truyền cảm hứng OR cứu trợ OR vui vẻ OR inspiring OR wholesome OR innovation";

const fallbackArticle: GoodNewsArticle = {
  title: "Good Quote",
  description:
    "Because you are alive, everything is possible. Hôm nay vẫn có một điều nhỏ đáng để mỉm cười.",
  link: "https://www.goodreads.com/author/quotes/9074.Thich_Nhat_Hanh",
  source: "Thích Nhất Hạnh",
};

function pickRandomArticle(articles: GoodNewsArticle[]) {
  const topFive = articles.slice(0, 5);
  return topFive[Math.floor(Math.random() * topFive.length)];
}

function normalizeArticles(results: NewsDataArticle[] = []) {
  return results
    .filter((article) => article.title && article.link)
    .slice(0, 5)
    .map((article) => ({
      title: article.title ?? "",
      description:
        article.description?.trim() ||
        "Một mẩu tin nhẹ nhàng để nhắc mình rằng thế giới vẫn có những điều đang tốt lên.",
      link: article.link ?? "",
      imageUrl: article.image_url ?? undefined,
      source: article.source_id ?? "Good News",
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

  const apiKey = useMemo(() => import.meta.env.VITE_NEWSDATA_API_KEY as string | undefined, []);

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

        if (!apiKey) {
          throw new Error("Missing VITE_NEWSDATA_API_KEY");
        }

        const params = new URLSearchParams({
          apikey: apiKey,
          language: "vi",
          category: "entertainment,technology,science,health",
          sentiment: "positive",
          q: keywords,
        });

        const response = await fetch(`${newsDataEndpoint}?${params.toString()}`);

        if (!response.ok) {
          throw new Error(`News request failed: ${response.status}`);
        }

        const data = (await response.json()) as NewsDataResponse;
        const articles = normalizeArticles(data.results);

        if (!articles.length) {
          throw new Error("No positive news articles found");
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
            message: "Chưa lấy được tin tốt mới, nên mình để lại một câu nhẹ nhàng ở đây.",
          });
        }
      }
    }

    loadGoodNews();

    return () => {
      cancelled = true;
    };
  }, [apiKey]);

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
              <Newspaper className="h-10 w-10" strokeWidth={1.2} />
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