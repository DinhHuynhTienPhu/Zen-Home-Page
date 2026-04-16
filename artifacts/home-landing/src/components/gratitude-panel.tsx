import React, { useEffect, useState } from "react";

const STORAGE_ENTRIES_KEY = "zenhome:gratitude:entries";
const STORAGE_LAST_SHOWN_KEY = "zenhome:gratitude:lastShownDate";

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export default function GratitudePanel() {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    try {
      const last = localStorage.getItem(STORAGE_LAST_SHOWN_KEY);
      const today = getTodayKey();
      if (last !== today) setVisible(true);
    } catch (e) {
      // ignore
    }
  }, []);

  function submit() {
    const trimmed = text.trim();
    if (!trimmed) return;

    const entry = {
      id: String(Date.now()),
      text: trimmed,
      date: new Date().toISOString(),
    };

    try {
      const raw = localStorage.getItem(STORAGE_ENTRIES_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      arr.unshift(entry);
      localStorage.setItem(STORAGE_ENTRIES_KEY, JSON.stringify(arr));
      localStorage.setItem(STORAGE_LAST_SHOWN_KEY, getTodayKey());
    } catch (e) {
      // ignore
    }

    setVisible(false);
    setText("");
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 w-full max-w-xl rounded-xl bg-card/95 p-6 shadow-lg">
        <h2 className="text-lg font-medium text-foreground">Hôm nay tôi biết ơn điều gì?</h2>
        <p className="mt-2 text-sm text-muted-foreground">Viết một điều bạn biết ơn hôm nay.</p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder="Ví dụ: Tôi biết ơn một tách trà ấm, một cuộc gọi từ bạn thân..."
          className="mt-4 w-full resize-none rounded-md border border-border/60 bg-background/60 p-3 text-foreground placeholder:opacity-70"
        />

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={submit}
            disabled={!text.trim()}
            className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-background disabled:opacity-50"
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
}
