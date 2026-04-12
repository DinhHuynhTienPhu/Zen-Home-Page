import { Router, type IRouter } from "express";

type RedditPost = {
  data?: {
    title?: string;
    url?: string;
    thumbnail?: string;
    permalink?: string;
  };
};

type RedditResponse = {
  data?: {
    children?: RedditPost[];
  };
};

const router: IRouter = Router();
const upliftingNewsEndpoint =
  "https://www.reddit.com/r/UpliftingNews/top.json?limit=5&t=day";

function isUsableThumbnail(thumbnail?: string) {
  return Boolean(thumbnail && thumbnail.startsWith("http"));
}

router.get("/good-news", async (_req, res, next) => {
  try {
    const response = await fetch(upliftingNewsEndpoint, {
      headers: {
        Accept: "application/json",
        "User-Agent": "personal-home-landing/1.0",
      },
    });

    if (!response.ok) {
      throw new Error(`Reddit request failed: ${response.status}`);
    }

    const data = (await response.json()) as RedditResponse;
    const articles = (data.data?.children ?? [])
      .map((post) => post.data)
      .filter((post) => post?.title && post.url)
      .slice(0, 5)
      .map((post) => ({
        title: post?.title ?? "",
        description:
          "Tin tích cực được cộng đồng r/UpliftingNews bình chọn trong 24 giờ qua.",
        link: post?.url ?? `https://www.reddit.com${post?.permalink ?? "/r/UpliftingNews/"}`,
        imageUrl: isUsableThumbnail(post?.thumbnail)
          ? post?.thumbnail
          : undefined,
        source: "r/UpliftingNews",
      }));

    res.json({ articles });
  } catch (error) {
    next(error);
  }
});

export default router;