import { prisma } from "@/lib/db";
import { NextRequest } from "next/server";
import { addComment } from "../_db/db-queries";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const positionId = parseInt(searchParams.get("positionId") as string);

  const comments = await prisma.comment.findMany({
    where: {
      positionId,
    },
  });

  return Response.json({ comments });
}

export async function POST(request: NextRequest) {
  const inputs = await request.json();

  const newComment = await addComment(
    inputs.content,
    inputs.positionId,
    inputs.directoryId
  );

  return new Response(JSON.stringify(newComment), {
    headers: { "Content-Type": "application/json" },
    status: 201,
  });
}
