import { z } from 'zod';

export const loginFormSchema = z.object({
    email: z.string().email("Email khong hop le"),
    password: z.string().min(1, "Password khong duoc de trong"),
});

