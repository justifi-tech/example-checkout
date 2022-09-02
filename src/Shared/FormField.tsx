import React, { InputHTMLAttributes } from "react";

import FormFieldError, { FormFieldErrorTypes } from './FormFieldError';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  errors?: any;
  name: string;
  label: string;
  rules: any;
  register: any;
  type?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  errors,
  name,
  label,
  type = 'text',
  register,
  rules,
  ...rest
}) => {
  return (
    <>
      <input
        name={name}
        placeholder={label}
        type={type}
        id={name}
        {...register(name, rules)}
        className="form-field"
        {...rest}
      />
      {errors && errors[name] && (
        <FormFieldError label={label} errorType={FormFieldErrorTypes.required} />
      )}
    </>
  );
};

export default FormField;