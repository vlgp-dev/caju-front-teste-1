import { ptBR } from "date-fns/locale/pt-BR";
import BaseDatePicker, {
  registerLocale,
  type DatePickerProps as BaseDatePickerProps,
} from "react-datepicker";
import { useFormContext, Controller } from "react-hook-form";
import { HiOutlineCalendar } from "react-icons/hi";

import * as S from "./styles";

import "react-datepicker/dist/react-datepicker.css";

registerLocale("ptBR", ptBR);

export type DatePickerProps = Omit<BaseDatePickerProps, "name"> & {
  label?: string;
  placeholder?: string;
  name: string;
  error?: string;
};

export const DatePicker = (props: DatePickerProps) => {
  const { label, placeholder, id, name, error } = props;

  const { control } = useFormContext();

  return (
    <S.Wrapper>
      {label && <label htmlFor={id}>{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <S.DatePicker
            as={BaseDatePicker}
            $hasError={Boolean(error)}
            selected={field.value}
            onChange={(date) => field.onChange(date?.toISOString())}
            dateFormat="dd/MM/yyyy"
            placeholderText={placeholder}
            locale="ptBR"
            showIcon
            icon={<HiOutlineCalendar />}
            toggleCalendarOnIconClick
          />
        )}
      />
      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
    </S.Wrapper>
  );
};
