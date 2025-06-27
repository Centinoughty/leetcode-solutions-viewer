import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const questionId = searchParams.get("questionId");
  const language = searchParams.get("language");

  if (!questionId || !language) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const rawURL = `https://raw.githubusercontent.com/${process.env.NEXT_PUBLIC_GITHUB}/leetcode/main/${questionId}.${language}`;

  try {
    const res = await fetch(rawURL);

    if (!res.ok) {
      return NextResponse.json({ error: "Code not found" }, { status: 404 });
    }

    const code = await res.text();

    console.log(code);

    return NextResponse.json({
      code,
      language,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch code" },
      { status: 500 }
    );
  }
}
