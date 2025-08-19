// const GORGIAS_DOMAIN = "smartosc.gorgias.com";
// const GORGIAS_EMAIL = "lamnt4@smartosc.com";
// const GORGIAS_API_TOKEN =
//   "fd7ec77001f01776f8fec170d1bc15aee9ea1ab038bbb47e3023dd3678dc4409";

import { NextRequest, NextResponse } from "next/server";

const GORGIAS_DOMAIN = "smartosc.gorgias.com";
const GORGIAS_EMAIL = "lamnt4@smartosc.com";
const GORGIAS_API_TOKEN =
  "fd7ec77001f01776f8fec170d1bc15aee9ea1ab038bbb47e3023dd3678dc4409";

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

    const ticketFormData = new FormData();
    ticketFormData.append("subject", "Returned Product");
    ticketFormData.append(
      "body",
      `Email: ${email}
Name: ${name}
Order number: ${orderNumber}
Product being returned: ${productBeingReturn}
Reason for return: ${reasonReturn}
Batch/serial number: ${batchSerialNumber}
Product is untouched: ${untouched}
Desired outcome: ${desiredOutcome}
Additional information: ${additionalInfo}`
    );
    ticketFormData.append("requester_email", email);
    ticketFormData.append("requester_name", name);
    ticketFormData.append("tags[]", "return-request");

    // đính kèm file
    files.forEach((file) => {
      ticketFormData.append("attachments[]", file, file.name);
    });

    const response = await fetch(`https://${GORGIAS_DOMAIN}/api/tickets`, {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${GORGIAS_EMAIL}:${GORGIAS_API_TOKEN}`).toString(
            "base64"
          ),
      },
      body: ticketFormData,
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gorgias API error:", errText);
      return NextResponse.json(
        { error: "Failed to create ticket" },
        { status: 500 }
      );
    }

    const ticketData = await response.json();
    return NextResponse.json(ticketData);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
