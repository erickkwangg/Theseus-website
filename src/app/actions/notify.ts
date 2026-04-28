"use server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type NotifyState = {
  ok: boolean;
  message: string;
};

export async function notify(
  _prev: NotifyState | null,
  formData: FormData,
): Promise<NotifyState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!EMAIL_RE.test(email)) {
    return { ok: false, message: "Enter a valid email." };
  }

  // TODO: forward to Resend / Loops / Vercel KV.
  // For now we just log so the form is wired end-to-end.
  console.log("[playground-waitlist]", email);

  return { ok: true, message: "We'll let you know." };
}
