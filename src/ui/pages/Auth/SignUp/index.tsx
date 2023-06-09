import React, { useState } from "react";
import {
  Button,
  Description,
  Stepper,
  TextInput,
  Title,
  Cover,
  UploadAvatar,
  VerificationCode,
} from "@components/index";
import styles from "./styles.module.scss";

const stepHeaders = [
  {
    title: "Dados da conta",
    description: "Preencha os campos com os dados da conta",
  },
  {
    title: "Personalização",
    description: "Personalize sua conta com uma foto de perfil",
  },
  {
    title: "Verificação de conta",
    description: "Confirme o e-mail cadastrado",
  },
];

function SignUpPage() {
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
  const nextButtonText = isLastPage ? "Finalizar" : "Avançar";

  return (
    <div className={styles.container}>
      <Cover>
        <Title size="xl">Crie sua conta</Title>
        <Stepper stepperProps={{ currentPage }} />
      </Cover>
      <div className={styles.content}>
        <header>
          <Title size="md">{stepHeaders[currentPage].title}</Title>
          <Description>{stepHeaders[currentPage].description}</Description>
          <Stepper
            stepperProps={{
              currentPage,
              className: styles.horizontalStepper,
            }}
            horizontal
          />
        </header>
        <form onSubmit={onSubmit} className={styles.form}>
          <div
            className={currentPage !== 0 ? styles.hidden : styles.inputGroup}
          >
            <TextInput
              label="Nome"
              htmlInputProps={{
                placeholder: "Digite seu nome",
                autoComplete: "off",
                onKeyDown: handleInputKeyDown,
              }}
            />
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
            <TextInput
              label="Confirmar senha"
              htmlInputProps={{
                placeholder: "Digite sua senha novamente",
                autoComplete: "off",
                onKeyDown: handleInputKeyDown,
              }}
              type="password"
            />
          </div>
          <UploadAvatar
            onFileChange={() => {}}
            className={currentPage !== 1 ? styles.hidden : ""}
          />
          <VerificationCode
            onResendCode={() => {}}
            className={currentPage !== 2 ? styles.hidden : ""}
          />
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
    </div>
  );
}

export default SignUpPage;
