"use server";

import { z } from "zod";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import nodemailer from "nodemailer";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function sendContactMessage(prevState: any, formData: FormData) {
  const validatedFields = formSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid form data.",
      issues: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, message } = validatedFields.data;

  try {
    await addDoc(collection(db, "messages"), {
      name,
      email,
      message,
      createdAt: serverTimestamp(),
    });
  } catch (error: any) {
    console.error("Firebase Error:", error);
    return {
      success: false,
      error: `Failed to save message: ${error.message}`,
      issues: null,
    };
  }

  try {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT) || 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        replyTo: email,
        to: process.env.EMAIL_TO,
        subject: `New message from ${name} via portfolio`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message}</p>`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error: any) {
    console.error("Nodemailer Error: Failed to send email.", error);
  }

  return { success: true, error: null, issues: null };
}