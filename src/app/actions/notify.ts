"use server";

import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const apiKey = process.env.RESEND_API_KEY;
const segmentId = process.env.RESEND_SEGMENT_ID;
const resend = apiKey ? new Resend(apiKey) : null;

export type NotifyState = {
  ok: boolean;
  message: string;
};

export async function notify(
  _prev: NotifyState | null,
  formData: FormData,
): Promise<NotifyState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!EMAIL_RE.test(email)) {
    return { ok: false, message: "Enter a valid email." };
  }

  if (!resend || !segmentId) {
    console.warn(
      "[notify] RESEND_API_KEY or RESEND_SEGMENT_ID not set, falling back to log",
      email,
    );
    return { ok: true, message: "We'll let you know." };
  }

  try {
    const { error } = await resend.contacts.create({
      email,
      segments: [{ id: segmentId }],
    });

    if (error) {
      const msg = (error.message ?? "").toLowerCase();
      if (msg.includes("already exists") || msg.includes("contact already")) {
        return { ok: true, message: "Already on the list." };
      }
      console.error("[notify] Resend error", error);
      return { ok: false, message: "Something went wrong. Try again?" };
    }

    return { ok: true, message: "We'll let you know." };
  } catch (err) {
    console.error("[notify] Resend threw", err);
    return { ok: false, message: "Something went wrong. Try again?" };
  }
}
