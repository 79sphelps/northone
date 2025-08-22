const FormInputValidationError = ({ fieldError }) => {
  if (!fieldError) return null;
  return (
    <div role="alert" style={{ color: "red", marginBottom: 2 }}>
      {fieldError.message}
    </div>
  );
};

export default FormInputValidationError;
