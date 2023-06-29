import React, { useCallback, useState } from "react";
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
import { z } from "zod";
import { signUpSchema } from "./SignUpFormSchema";
import { useAuth } from "@contexts/auth/AuthCTX";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import User from "@models/auth/User";

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

type FormProps = z.infer<typeof signUpSchema>;

function SignUpPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const { signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormProps>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(signUpSchema),
  });

  const handleForm = useCallback(async (data: FormProps) => {
    const user = User.fromForm(data);
    await signUp(user);
  }, []);

  const isLastPage = currentPage === 2;
  const nextButtonText = isLastPage ? "Finalizar" : "Avançar";

  const nextPage = async () => {
    const isValid = await trigger();
    if (isValid) {
      if (currentPage < 2) {
        setCurrentPage((prevPage) => prevPage + 1);
      } else if (isLastPage) {
        handleSubmit(handleForm)();
      }
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
        <form onSubmit={handleSubmit(handleForm)} className={styles.form}>
          <div
            className={currentPage !== 0 ? styles.hidden : styles.inputGroup}
          >
            <TextInput
              label="Nome"
              htmlInputProps={{
                placeholder: "Digite seu nome",
                autoComplete: "signup-name",
                onKeyDown: handleInputKeyDown,
              }}
              error={!!errors.name?.message}
              helperText={errors.name?.message}
              {...register("name")}
            />
            <TextInput
              label="E-mail"
              htmlInputProps={{
                placeholder: "Digite seu email",
                autoComplete: "signup-email",
                onKeyDown: handleInputKeyDown,
              }}
              type="email"
              error={!!errors.email?.message}
              helperText={errors.email?.message}
              {...register("email")}
            />
            <TextInput
              label="Senha"
              htmlInputProps={{
                placeholder: "Digite sua senha",
                autoComplete: "new-password",
                onKeyDown: handleInputKeyDown,
              }}
              type="password"
              error={!!errors.password?.message}
              helperText={errors.password?.message}
              {...register("password")}
            />
            <TextInput
              label="Confirmar senha"
              htmlInputProps={{
                placeholder: "Digite sua senha novamente",
                onKeyDown: handleInputKeyDown,
              }}
              type="password"
              error={!!errors.confirmPassword?.message}
              helperText={errors.confirmPassword?.message}
              {...register("confirmPassword")}
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
