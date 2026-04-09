import { z } from 'zod';

export const registerFormSchema = z.object({
    email: z.string().email("Email khong hop le"),
    password: z.string().min(6, "It nhat 6 ky tu."),
    confirmPassword: z.string(),   
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password khong khop",
    path: ["confirmPassword"]
});