import React from "react";

interface FormInputValidationErrorProps {
  fieldError: { message: string } | undefined;
}

const FormInputValidationError: React.FC<FormInputValidationErrorProps> = ({ fieldError }) => {
  if (!fieldError) return null;
  return (
    <div role="alert" style={{ color: "red", marginBottom: 2 }}>
      {fieldError.message}
    </div>
  );
};

export default FormInputValidationError;
