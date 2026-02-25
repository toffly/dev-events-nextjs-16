import Event from "@/database/event.model";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

// Slug must be lowercase alphanumeric with hyphens only
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type RouteParams = { params: Promise<{ slug: string }> };

// GET /api/events/[slug] - Fetch a single event by slug
export async function GET(_req: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    // Validate slug format
    if (!slug || !SLUG_REGEX.test(slug)) {
      return NextResponse.json(
        { message: "Invalid or missing slug parameter" },
        { status: 400 },
      );
    }

    await connectDB();

    const event = await Event.findOne({ slug }).lean();

    if (!event) {
      return NextResponse.json(
        { message: `Event with slug '${slug}' not found` },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Event fetched successfully", event },
      { status: 200 },
    );
  } catch (e) {
    console.error("Error fetching event by slug:", e);
    return NextResponse.json(
      {
        message: "Failed to fetch event",
        error: e instanceof Error ? e.message : "Unknown",
      },
      { status: 500 },
    );
  }
}
