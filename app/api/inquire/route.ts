import { NextRequest, NextResponse } from "next/server";
import { insertInquiry } from "@/lib/admin-data";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, date, location, eventType, guestCount, story } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and Email are required." }, { status: 400 });
    }

    // 1. Insert into database
    const { data, error } = await insertInquiry({
      name,
      email,
      phone: phone || null,
      event_date: date || null,
      location: location || null,
      event_type: eventType || null,
      guest_count: guestCount || null,
      story: story || null,
    });

    if (error) {
      console.error("[api/inquire] Database error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    // 2. Simulate sending email (logs to server console)
    console.log("\n=======================================================");
    console.log(`✉️ [SMTP SIMULATOR] NEW EVENT INQUIRY RECEIVED`);
    console.log(`   To: spotmeus@gmail.com`);
    console.log(`   From: ${name} <${email}>`);
    console.log(`   Phone: ${phone || "N/A"}`);
    console.log(`   Date: ${date || "N/A"}`);
    console.log(`   Location: ${location || "N/A"}`);
    console.log(`   Type: ${eventType}`);
    console.log(`   Guest Count: ${guestCount}`);
    console.log(`   Story: ${story || "N/A"}`);
    console.log("=======================================================\n");

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[api/inquire] Server error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
