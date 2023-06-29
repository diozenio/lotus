import React, { useCallback } from "react";
import {
  Button,
  Description,
  TextInput,
  Title,
  Cover,
} from "@components/index";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "./SignInFormSchema";
import Credentials from "@models/auth/Credentials";
import { useAuth } from "@contexts/auth/AuthCTX";

type FormProps = z.infer<typeof signInSchema>;

function SignInPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: zodResolver(signInSchema),
  });

  const handleForm = useCallback(async (data: FormProps) => {
    const credentials = Credentials.fromForm(data);
    await signIn(credentials);
  }, []);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.currentTarget.form;
      const inputs = Array.from(form!.elements).filter(
        (el) => el.tagName === "INPUT"
      );
      const currentIndex = inputs.findIndex((el) => el === e.currentTarget);
      const nextIndex = currentIndex + 1;
      if (nextIndex < inputs.length) {
        const nextInput = inputs[nextIndex] as HTMLInputElement;
        nextInput.focus();
      } else if (nextIndex === inputs.length) {
        handleSubmit(handleForm)();
      }
    }
  };

  return (
    <div className={styles.container}>
      <Cover>
        <Title size="xl">LOTUS CHAT</Title>
      </Cover>
      <div className={styles.content}>
        <header>
          <Title size="md">Faça o login</Title>
          <Description>
            Preencha os campos com os dados da sua conta
          </Description>
        </header>
        <form onSubmit={handleSubmit(handleForm)} className={styles.form}>
          <TextInput
            label="E-mail"
            htmlInputProps={{
              placeholder: "Digite seu email",
              autoComplete: "off",
              onKeyDown: handleInputKeyDown,
              autoFocus: true,
              name: "email",
              id: "email",
            }}
            error={!!errors.email?.message}
            helperText={errors.email?.message}
            type="email"
            {...register("email")}
          />
          <TextInput
            label="Senha"
            htmlInputProps={{
              placeholder: "Digite sua senha",
              autoComplete: "off",
              onKeyDown: handleInputKeyDown,
            }}
            error={!!errors.password?.message}
            helperText={errors.password?.message}
            type="password"
            {...register("password")}
          />
          <a
            onClick={() => {
              navigate("/forgot-password");
            }}
            className={styles.forgotPassword}
          >
            Esqueceu a senha? <span>Clique aqui</span>
          </a>

          <Button type="submit" className={styles.submitButton}>
            Avançar
          </Button>
        </form>
        <a
          onClick={() => {
            navigate("/register");
          }}
        >
          Ainda não possui uma conta?{" "}
          <span className={styles.registerAnchor}>Cadastre-se agora</span>
        </a>
      </div>
    </div>
  );
}

export default SignInPage;
