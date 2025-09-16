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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("name", { required: true, minLength: 2 })}
        placeholder="Имя"
      />
      {errors.name && <span>Пожалуйста, введите как минимум два символа</span>}

      <input
        {...register("phone", {
          required: true,
          pattern: /^\\+375[0-9]{9}$|^80[0-9]{9}$/,
        })}
        placeholder="Телефон"
      />
      {errors.name && (
        <span>Пожалуйста, укажите телефон в формате +375... или 80...</span>
      )}

      <textarea
        {...register("message", { required: true, minLength: 2 })}
        placeholder="Сообщение"
      />
      {errors.name && <span>Пожалуйста, введите как минимум два символа</span>}

      <button type="submit" disabled={loading}>
        {loading ? "Отправляем..." : "Отправить"}
      </button>
    </form>
  );
};

export default FormMessagePage;
