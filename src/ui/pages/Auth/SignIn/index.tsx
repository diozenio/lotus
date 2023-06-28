import React from "react";
import {
  Button,
  Description,
  TextInput,
  Title,
  Cover,
} from "@components/index";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

function SignInPage() {
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

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
        <form onSubmit={onSubmit} className={styles.form}>
          <TextInput
            label="E-mail"
            htmlInputProps={{
              placeholder: "Digite seu email",
              autoComplete: "off",
              onKeyDown: handleInputKeyDown,
            }}
            type="email"
          />
          <TextInput
            label="Senha"
            htmlInputProps={{
              placeholder: "Digite sua senha",
              autoComplete: "off",
              onKeyDown: handleInputKeyDown,
            }}
            type="password"
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
