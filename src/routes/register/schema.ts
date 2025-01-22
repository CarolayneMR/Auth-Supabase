import { z } from "zod";

export const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});
 
export type FormSchema = typeof formSchema;

/**
 * Aqui, basicamente, definimos quais campus queremos incluir em nosso formulário e como os campos precisam ser.
 */
