"use client";

import { useCallback, useEffect, useState } from "react";
import type { ContentKey } from "@/types/content";
import { setAtPath } from "@/lib/object-path";

type Status = "idle" | "loading" | "saving" | "saved" | "error";

async function fetchContent(key: ContentKey) {
  const response = await fetch(`/api/content/${key}`, { cache: "no-store" });
  if (!response.ok) throw new Error("No se pudo cargar el contenido");
  return (await response.json()) as Record<string, unknown>;
}

/** Loads one JSON content file, edits it in memory, and PUTs it back to disk. */
export function useContentEditor(key: ContentKey) {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let cancelled = false;

    fetchContent(key)
      .then((content) => {
        if (cancelled) return;
        setData(content);
        setStatus("idle");
        setError(null);
      })
      .catch((cause: Error) => {
        if (cancelled) return;
        setError(cause.message);
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [key, reloadToken]);

  const reload = useCallback(() => setReloadToken((token) => token + 1), []);

  const update = useCallback((path: (string | number)[], value: unknown) => {
    setData((current) => (current ? (setAtPath(current, path, value) as Record<string, unknown>) : current));
    setStatus("idle");
  }, []);

  const save = useCallback(async () => {
    if (!data) return;
    setStatus("saving");
    try {
      const response = await fetch(`/api/content/${key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const { error } = await response.json().catch(() => ({ error: null }));
        throw new Error(error ?? "No se pudo guardar");
      }
      setStatus("saved");
      setError(null);
    } catch (cause) {
      setError((cause as Error).message);
      setStatus("error");
    }
  }, [data, key]);

  return { data, status, error, update, save, reload };
}
