import { EmailWelcome } from "@/components/emails/welcome";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: "noreply <noreply@resend.dev>",
      to: ["aromot@gmail.com"],
      subject: "Hello world",
      react: await EmailWelcome({ name: "John" }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    console.log("-- DATA -------------------------------");
    console.log(data);
    console.log("-- /DATA -------------------------------");
    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
