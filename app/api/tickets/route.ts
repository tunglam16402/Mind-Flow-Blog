/* eslint-disable @typescript-eslint/no-explicit-any */
// import { client } from "@/lib/zendesks";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();

//     const title = formData.get("title") as string;
//     const description = formData.get("description") as string;
//     const file = formData.get("file") as File | null;

//     console.log("File from formData:", file);

//     let uploadToken: string | null = null;

//     if (file && file.size > 0) {
//       const buffer = Buffer.from(await file.arrayBuffer());

//       const upload = await (client.attachments.upload as any)(
//         file.name,
//         buffer
//       );

//       if (upload && upload.token) {
//         uploadToken = upload.token;
//       } else {
//         throw new Error("Upload failed: no token received");
//       }
//     }

//     const ticketData: any = {
//       ticket: {
//         subject: title,
//         comment: {
//           body: description,
//         },
//       },
//     };

//     if (uploadToken) {
//       ticketData.ticket.comment.uploads = [uploadToken];
//     }

//     // Tạo ticket
//     const result = await client.tickets.create(ticketData);

//     return NextResponse.json({ success: true, ticket: result });
//   } catch (err: any) {
//     console.error("Zendesk ticket creation error:", err);
//     return NextResponse.json(
//       { success: false, error: err.message || "Unknown error" },
//       { status: 500 }
//     );
//   }
// }

import { client } from "@/lib/zendesks";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    const ticketData = {
      ticket: {
        subject: title,
        comment: {
          body: description,
        },
      },
    };

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
