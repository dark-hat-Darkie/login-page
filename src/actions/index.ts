"use server";
import { z } from "zod";

// Define the validation schema using Zod
const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    agreeTerms: z
        .boolean()
        .refine((val) => val === true, "You must agree to the terms"),
});

export async function handleSubmit(previousState: any, formData: FormData) {
    // Extract form data
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const agreeTerms = formData.get("agreeTerms") === "on";

    try {
        // Validate input with Zod
        loginSchema.parse({ email, password, agreeTerms });

        const response = await fetch(
            "https://social-login.druckland.de/api/v1/user/signin",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            }
        );

        const data = await response.json();
        return { message: data.message } as any;
    } catch (err) {
        if (err instanceof z.ZodError) {
            // Collect errors from Zod validation
            const errorMessages = err.errors.reduce((acc, curr) => {
                acc[curr.path[0]] = curr.message;
                return acc;
            }, {} as Record<string, string>);

            return errorMessages;
        }
    }
}
