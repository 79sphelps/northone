import React, { memo } from "react";

interface IFormProps {
  htmlFor: string;
  name: string;
  className: string;
  id: string;
  placeholder?: string;
  requiredMsg?: string;
  minLength?: number;
  minLengthMsg?: string;
  register: any;
}

const EventFormInput: React.FC<IFormProps>  = memo(({
  htmlFor,
  name,
  className,
  id,
  placeholder,
  requiredMsg,
  minLength,
  minLengthMsg,
  register,
}) => {
  return (
    <>
      <label htmlFor={htmlFor}>{name}: </label>{" "}
      <input
        name={name}
        className={className}
        style={{
          display: "block",
          width: "100%",
          height: 40,
          borderRadius: 5,
          border: "solid 1px lightblue",
        }}
        type="text"
        id={id}
        placeholder={placeholder}
        {...register(id, {
          // onChange: (e) => { setValue('title', e.target.value) },
          required: requiredMsg,
          minLength: {
            value: minLength,
            message: minLengthMsg,
          },
        })}
      />
    </>
  );
});

export default EventFormInput;
