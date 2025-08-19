// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { client } from "@/lib/zendesks";
// import { NextRequest, NextResponse } from "next/server";
// import { Readable } from "stream";

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();

//     const title = formData.get("title") as string;
//     const description = formData.get("description") as string;
//     const userName = formData.get("userName") as string | null;
//     const userEmail = formData.get("userEmail") as string | null;
//     const file = formData.get("file") as File | null;

//     let uploadToken: string | null = null;
//     console.log("file", file);

//     if (file && file.size > 0) {
//       try {
//         const buffer = Buffer.from(await file.arrayBuffer());
//         const stream = Readable.from(buffer);

//         const upload = (await client.attachments.upload(stream as any, {
//           filename: file.name,
//           binary: true,
//         })) as any;

//         if (upload) {
//           uploadToken = upload.token || upload.upload?.token;
//         }
//       } catch (uploadError) {
//         console.error("File upload error:", uploadError);
//       }
//     }

//     const ticketData: any = {
//       ticket: {
//         subject: title,
//         comment: {
//           body: description,
//         },
//         requester: {
//           name: userName,
//           email: userEmail,
//         },
//       },
//     };

//     if (uploadToken) {
//       ticketData.ticket.comment.uploads = [uploadToken];
//     }

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

import { NextRequest, NextResponse } from "next/server";

const GORGIAS_DOMAIN = process.env.GORGIAS_DOMAIN || "smartosc";
const GORGIAS_API_TOKEN = process.env.GORGIAS_API_TOKEN;
const GORGIAS_EMAIL = process.env.GORGIAS_EMAIL;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const orderNumber = formData.get("orderNumber") as string;
    const productBeingReturn = formData.get("productBeingReturn") as string;
    const reasonReturn = formData.get("reasonReturn") as string;
    const batchSerialNumber = formData.get("batchSerialNumber") as string;
    const untouched = formData.get("untouched") as string;
    const desiredOutcome = formData.get("desiredOutcome") as string;
    const additionalInfo = formData.get("additionalInfo") as string;
    const files = formData.getAll("attachments") as File[];

    const ticketBody = `
Email: ${email}
Name: ${name}
Order number: ${orderNumber}
Product being returned: ${productBeingReturn}
Reason for return: ${reasonReturn}
Batch/serial number: ${batchSerialNumber}
Product is untouched: ${untouched}
Desired outcome: ${desiredOutcome}
Additional information: ${additionalInfo}
`;

    const attachments = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: file.type });
        const formDataNode = new FormData();
        formDataNode.append("file", blob, file.name);

        const uploadRes = await fetch(
          `https://${GORGIAS_DOMAIN}.gorgias.com/api/upload`,
          {
            method: "POST",
            headers: {
              Authorization:
                "Basic " +
                Buffer.from(`${GORGIAS_EMAIL}:${GORGIAS_API_TOKEN}`).toString(
                  "base64"
                ),
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            body: formDataNode as any,
          }
        );

        const uploadData = await uploadRes.json();
        console.log("uploadData :>> ", uploadData);

        if (!uploadData?.[0]?.url) return null;
        return {
          url: uploadData[0].url,
          name: uploadData[0].name,
          content_type: uploadData[0].content_type,
        };
      })
    );

    console.log("attachments final :>> ", attachments);

    const payload = {
      customer: { email },
      messages: [
        {
          sender: { email },
          source: {
            from: { address: email },
            to: [{ address: "support@example.com" }],
          },
          body_text: ticketBody,
          channel: "email",
          from_agent: false,
          via: "api",
          attachments: attachments.filter(Boolean),
        },
      ],
      subject: `Return Request for Order ${orderNumber}`,
      channel: "email",
      from_agent: false,
      via: "api",
      tags: [{ name: "return-request" }],
    };

    console.log("payload :>> ", payload);

    const response = await fetch(
      `https://${GORGIAS_DOMAIN}.gorgias.com/api/tickets`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            Buffer.from(`${GORGIAS_EMAIL}:${GORGIAS_API_TOKEN}`).toString(
              "base64"
            ),
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
