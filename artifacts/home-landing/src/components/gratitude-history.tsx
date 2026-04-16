import React, { useEffect, useState } from "react";

const STORAGE_ENTRIES_KEY = "zenhome:gratitude:entries";

type Entry = { id: string; text: string; date: string };

export default function GratitudeHistory({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    if (!open) return;
    try {
      const raw = localStorage.getItem(STORAGE_ENTRIES_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      setEntries(arr);
    } catch (e) {
      setEntries([]);
    }
  }, [open]);

  function clearAll() {
    try {
      localStorage.removeItem(STORAGE_ENTRIES_KEY);
      setEntries([]);
    } catch (e) {
      // ignore
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 w-full max-w-2xl rounded-xl bg-card/95 p-6 shadow-lg">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-medium text-foreground">Lịch sử biết ơn</h2>
            <p className="mt-1 text-sm text-muted-foreground">Những lần bạn đã ghi lại.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={clearAll}
              className="rounded-full border border-border/60 px-3 py-1 text-sm text-foreground"
            >
              Xóa tất cả
            </button>
            <button
              onClick={onClose}
              className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-background"
            >
              Đóng
            </button>
          </div>
        </div>

        <div className="mt-4 max-h-[60vh] overflow-auto">
          {entries.length === 0 ? (
            <p className="text-sm text-muted-foreground">Chưa có mục nào.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {entries.map((e) => (
                <li key={e.id} className="rounded-md border border-border/60 bg-background/60 p-3">
                  <div className="text-sm text-muted-foreground">
                    {new Date(e.date).toLocaleString("vi-VN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div className="mt-1 text-foreground">{e.text}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
