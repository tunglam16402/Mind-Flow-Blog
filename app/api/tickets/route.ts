/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "@/lib/zendesks";
import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const userName = formData.get("userName") as string | null;
    const userEmail = formData.get("userEmail") as string | null;
    const file = formData.get("file") as File | null;

    let uploadToken: string | null = null;
    console.log("file", file);

    if (file && file.size > 0) {
      try {
        const buffer = Buffer.from(await file.arrayBuffer());
        const stream = Readable.from(buffer);

        const upload = (await client.attachments.upload(stream as any, {
          filename: file.name,
          binary: true,
        })) as any;

        if (upload) {
          uploadToken = upload.token || upload.upload?.token;
        }
      } catch (uploadError) {
        console.error("File upload error:", uploadError);
      }
    }

    const ticketData: any = {
      ticket: {
        subject: title,
        comment: {
          body: description,
        },
        requester: {
          name: userName,
          email: userEmail,
        },
      },
    };

    if (uploadToken) {
      ticketData.ticket.comment.uploads = [uploadToken];
    }

    const result = await client.tickets.create(ticketData);

    return NextResponse.json({ success: true, ticket: result });
  } catch (err: any) {
    console.error("Zendesk ticket creation error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
