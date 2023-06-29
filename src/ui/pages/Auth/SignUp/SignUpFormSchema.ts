import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z
      .string()
      .nonempty("Campo obrigatório")
      .min(4, "Nome muito curto")
      .max(25, "Nome muito longo"),
    email: z.string().email("E-mail inválido").nonempty("Campo obrigatório"),
    password: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .nonempty("Campo obrigatório")
      .regex(
        new RegExp(".*[A-Z].*"),
        "A senha deve ter no mínimo uma letra maiúscula"
      )
      .regex(
        new RegExp(".*[a-z].*"),
        "A senha deve ter no mínimo uma letra minúscula"
      )
      .regex(new RegExp(".*\\d.*"), "A senha deve ter no mínimo um número"),
    confirmPassword: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .nonempty("Campo obrigatório")
      .regex(
        new RegExp(".*[A-Z].*"),
        "A senha deve ter no mínimo uma letra maiúscula"
      )
      .regex(
        new RegExp(".*[a-z].*"),
        "A senha deve ter no mínimo uma letra minúscula"
      )
      .regex(new RegExp(".*\\d.*"), "A senha deve ter no mínimo um número"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem ser iguais",
    path: ["confirmPassword"],
  });
