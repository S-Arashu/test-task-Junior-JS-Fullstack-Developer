import React from "react";
import { useForm } from "react-hook-form";
import "./FormMessagePage.css";

const FormMessagePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      reset();
    } catch (error) {
      console.error("Ой, здесь ошибка. Пишет, что ", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(errors.name);

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <input
        className="form-fields"
        {...register("name", { required: true, minLength: 2 })}
        placeholder="Имя"
      />
      {errors.name && (
        <span className="form__error">
          Пожалуйста, введите как минимум два символа
        </span>
      )}

      <input
        className="form-fields"
        {...register("phone", {
          required: true,
          pattern: /^\+375[0-9]{9}$|^80[0-9]{9}$/,
        })}
        placeholder="Телефон"
      />
      {errors.phone && (
        <span className="form__error">
          Пожалуйста, укажите телефон в формате +375... или 80...
        </span>
      )}

      <textarea
        className="form-fields"
        {...register("message", { required: true, minLength: 2 })}
        placeholder="Сообщение"
      />
      {errors.message && (
        <span className="form__error">
          Пожалуйста, введите как минимум два символа
        </span>
      )}

      <button className="form__button" type="submit" disabled={loading}>
        {loading ? "Отправляем..." : "Отправить"}
      </button>
    </form>
  );
};

export default FormMessagePage;
