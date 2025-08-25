import { memo } from "react";

const EventFormInput = memo(({
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
