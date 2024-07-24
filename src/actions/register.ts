"use server";

import { RegisterSchema } from "@/schemas/auth";
import * as z from "zod";
import bcryptjs from "bcryptjs";
import db from "@/lib/db";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, name } = validatedFields.data;

  const hashedPassword = await bcryptjs.hash(password, 12);

  //check if user already exists

  const existingUser = await db.user.findFirst({
    where: {
      email,
    },
  });

  if (existingUser) {
    return {
      data: null,
      error: "This email is already in use",
      status: 409,
    };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  //TODO Send verification email

  return { success: "Registration successful!" };
};
