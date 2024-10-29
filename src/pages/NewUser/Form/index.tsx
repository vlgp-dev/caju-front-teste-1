import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import Button from "~/components/Buttons";
import { DatePicker } from "~/components/DatePicker";
import TextField from "~/components/TextField";
import { useCreateRegistrations } from "~/hooks/registrations/useCreateRegistration";
import routes from "~/router/routes";
import { maskCpf, unmaskCpf } from "~/utils/cpf-mask";
import { validateCpf } from "~/utils/validators";

import * as S from "./styles";

const newAdmissionFormSchema = z.object({
  employeeName: z
    .string()
    .min(2, "O nome deve conter pelo menos duas letras")
    .regex(/\s+./, "Por favor, insira o nome completo")
    .regex(/^[^\d]/, "O nome não pode começar com números"),
  email: z
    .string()
    .min(1, { message: "Por favor, preencha o e-mail" })
    .email("Por favor, insira um e-mail válido"),
  cpf: z
    .string()
    .min(1, { message: "Por favor, preencha o CPF" })
    .refine(validateCpf, "CPF inválido"),
  admissionDate: z.coerce.date({
    errorMap: ({ code }, { defaultError }) => {
      if (code == "invalid_date") return { message: "Data inválida" };
      return { message: defaultError };
    },
  }),
});

export type NewAdmissionFormData = z.infer<typeof newAdmissionFormSchema>;

const NewAdmissionForm = () => {
  const history = useHistory();

  const methods = useForm<NewAdmissionFormData>({
    resolver: zodResolver(newAdmissionFormSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { create, isPending } = useCreateRegistrations();

  const goToDashboard = () => {
    history.push(routes.dashboard);
  };

  const onSubmit = async (data: NewAdmissionFormData) => {
    try {
      await create({
        ...data,
        cpf: unmaskCpf(data.cpf),
        admissionDate: data.admissionDate.toLocaleDateString("pt-BR"),
      });

      goToDashboard();
    } catch (error) {
      toast.error("Ops! Algo deu errado. Tente novamente mais tarde.");
    }
  };

  return (
    <FormProvider {...methods}>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          placeholder="Nome"
          label="Nome"
          error={errors.employeeName?.message}
          {...register("employeeName")}
        />
        <TextField
          placeholder="Email"
          label="Email"
          error={errors.email?.message}
          {...register("email", { required: false })}
        />
        <TextField
          placeholder="CPF"
          label="CPF"
          error={errors.cpf?.message}
          {...register("cpf", {
            onChange: (e) => (e.target.value = maskCpf(e.target.value)),
          })}
        />

        <DatePicker
          name="admissionDate"
          placeholder="Data de admissão"
          label="Data de admissão"
          error={errors.admissionDate?.message}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Cadastrando..." : "Cadastrar"}
        </Button>
      </S.Form>
    </FormProvider>
  );
};

export default NewAdmissionForm;
