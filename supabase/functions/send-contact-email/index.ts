import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContactFormRequest {
  name: string;
  email: string;
  message: string;
}

const escapeHtml = (input: string) =>
  input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { name, email, message }: ContactFormRequest = await req.json();

    const nameTrimmed = (name ?? "").trim();
    const emailTrimmed = (email ?? "").trim();
    const messageTrimmed = (message ?? "").trim();

    // Validate required fields
    if (!nameTrimmed || !emailTrimmed || !messageTrimmed) {
      console.error("Missing required fields:", {
        name: !!nameTrimmed,
        email: !!emailTrimmed,
        message: !!messageTrimmed,
      });
      return new Response(
        JSON.stringify({ error: "Missing required fields: name, email, and message are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrimmed)) {
      console.error("Invalid email format:", emailTrimmed);
      return new Response(JSON.stringify({ error: "Invalid email format" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Validate input lengths
    if (nameTrimmed.length > 100 || emailTrimmed.length > 255 || messageTrimmed.length > 5000) {
      console.error("Input too long");
      return new Response(JSON.stringify({ error: "Input exceeds maximum length" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log("Sending contact form email from:", emailTrimmed);

    const safeName = escapeHtml(nameTrimmed);
    const safeEmail = escapeHtml(emailTrimmed);
    const safeMessage = escapeHtml(messageTrimmed).replace(/\n/g, "<br />");

    const emailResponse = await resend.emails.send({
      from: "IBIT Website <noreply@innovatebitech.com>",
      to: ["support@innovatebitech.com"],
      // Resend API expects reply_to, but replyTo also works in some SDK versions.
      // Use reply_to for maximum compatibility.
      reply_to: emailTrimmed,
      subject: `New Contact Form Message from ${nameTrimmed}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <hr />
        <h3>Message:</h3>
        <p>${safeMessage}</p>
        <hr />
        <p style="color: #666; font-size: 12px;">This message was sent from the IBIT website contact form.</p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, id: emailResponse.id }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending contact email:", error);
    return new Response(JSON.stringify({ error: error.message || "Failed to send message" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
