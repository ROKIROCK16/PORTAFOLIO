import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getContent, isContentKey, saveContent } from "@/lib/content";
import type { ContentKey, ContentMap } from "@/types/content";

type Params = { params: Promise<{ key: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { key } = await params;
  if (!isContentKey(key)) {
    return NextResponse.json({ error: "Unknown content key" }, { status: 404 });
  }
  return NextResponse.json(await getContent(key));
}

export async function PUT(request: Request, { params }: Params) {
  const { key } = await params;
  if (!isContentKey(key)) {
    return NextResponse.json({ error: "Unknown content key" }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return NextResponse.json({ error: "Content must be a JSON object" }, { status: 400 });
  }

  await saveContent(key as ContentKey, body as ContentMap[ContentKey]);
  revalidatePath("/", "layout");

  return NextResponse.json({ ok: true });
}
