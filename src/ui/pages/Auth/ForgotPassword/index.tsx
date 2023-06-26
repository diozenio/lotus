import React, { useState } from "react";
import {
  Button,
  Description,
  Stepper,
  TextInput,
  Title,
  Cover,
  VerificationCode,
} from "@components/index";
import styles from "./styles.module.scss";

const stepHeaders = [
  {
    title: "Esqueceu a senha?",
    description: "Insira o endereço de e-mail associado à sua conta",
  },
  {
    title: "Código de confirmação",
    description:
      "Para redefinir sua senha, digite o código de confirmação enviado para o seu e-mail",
  },
  {
    title: "Redefinição da senha",
    description: "Preencha os campos com a nova senha",
  },
];

function ForgotPasswordPage() {
  const [currentPage, setCurrentPage] = useState(0);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const nextPage = () => {
    if (currentPage < 2) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
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

  const isLastPage = currentPage === 2;
  const nextButtonText = isLastPage ? "Redefinir" : "Avançar";

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header>
          <Title size="md">{stepHeaders[currentPage].title}</Title>
          <Description>{stepHeaders[currentPage].description}</Description>
        </header>
        <form onSubmit={onSubmit} className={styles.form}>
          <div
            className={currentPage !== 0 ? styles.hidden : styles.inputGroup}
          >
            <TextInput
              label="E-mail"
              htmlInputProps={{
                placeholder: "Digite seu email",
              }}
              type="email"
            />
          </div>
          <VerificationCode
            onResendCode={() => {}}
            className={currentPage !== 1 ? styles.hidden : ""}
          />
          <div
            className={currentPage !== 2 ? styles.hidden : styles.inputGroup}
          >
            <TextInput
              label="Nova senha"
              htmlInputProps={{
                placeholder: "Digite sua senha",
                autoComplete: "off",
                onKeyDown: handleInputKeyDown,
              }}
              type="password"
            />
            <TextInput
              label="Confirmar nova senha"
              htmlInputProps={{
                placeholder: "Digite sua senha novamente",
                autoComplete: "off",
                onKeyDown: handleInputKeyDown,
              }}
              type="password"
            />
          </div>
        </form>
        <div className={styles.buttonsContainer}>
          {currentPage !== 0 && (
            <Button color="secondary" onClick={previousPage}>
              Voltar
            </Button>
          )}
          <Button onClick={nextPage}>{nextButtonText}</Button>
        </div>
      </div>
      <Cover className={styles.cover}>
        <Title size="xl">Esqueceu sua senha?</Title>
        <Description size="lg">
          {stepHeaders[currentPage].description}
        </Description>
      </Cover>
    </div>
  );
}

export default ForgotPasswordPage;
