type Path = (string | number)[];

/** Immutably sets a nested value by path. Used by the Studio editor. */
export function setAtPath<T>(source: T, path: Path, value: unknown): T {
  if (path.length === 0) return value as T;

  const [head, ...rest] = path;

  if (Array.isArray(source)) {
    const index = Number(head);
    const next = [...source];
    next[index] = setAtPath(source[index], rest, value);
    return next as T;
  }

  const record = (source ?? {}) as Record<string, unknown>;
  return { ...record, [head]: setAtPath(record[head as string], rest, value) } as T;
}

/** Immutably removes an item from a nested array by path + index. */
export function removeAtPath<T>(source: T, path: Path, index: number): T {
  const list = getAtPath(source, path);
  if (!Array.isArray(list)) return source;
  return setAtPath(source, path, list.filter((_, i) => i !== index));
}

export function getAtPath(source: unknown, path: Path): unknown {
  return path.reduce<unknown>((acc, key) => {
    if (acc == null) return undefined;
    return (acc as Record<string | number, unknown>)[key];
  }, source);
}

/** Builds an empty clone of a template object (strings emptied, numbers zeroed). */
export function blankLike(template: unknown): unknown {
  if (Array.isArray(template)) return [];
  if (template && typeof template === "object") {
    return Object.fromEntries(
      Object.entries(template as Record<string, unknown>).map(([k, v]) => [k, blankLike(v)])
    );
  }
  if (typeof template === "number") return 0;
  if (typeof template === "boolean") return false;
  return "";
}
