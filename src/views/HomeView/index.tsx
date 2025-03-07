import "./style.scss";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../contexts/AuthProvider.tsx";

type FormValue = {
  user_id: string;
  passcode: string;
};

export const HomeView = (): React.ReactNode => {

    const {login,logout, loginData, isAuthorized} = useAuth()

    console.log()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()<FormValue>;

  const [showAuthNotification, setShowAuthNotification] = useState(false);

  const navigate = useNavigate();
  const handleOnSubmit = useCallback(
    (fields) => {
      const { user_id, passcode } = fields;
     login({user_id, passcode})
      if (login({user_id, passcode})) {
        navigate(`/itinerary/${user_id}-${passcode}`);
      } else {
        setShowAuthNotification(true);
      }
    },
    [navigate],
  );

  return (
    <div
      className={classNames([
        "root",
        "flex-row",
        "justify-content-center",
        "align-items-center",
      ])}
    >
      <div className={"login-container"}>
        <div>
          <h1>Vamoos Frontend Assesment Task</h1>
          <h2>Mateusz Karpisiewicz</h2>
        </div>
        <form onSubmit={handleSubmit(handleOnSubmit)} className={"login-form"}>
          <input
            type={"text"}
            placeholder={"User Id"}
            autoFocus
            aria-invalid={errors.user_id ? "true" : "false"}
            {...register("user_id", {
              required: "User Id is required",
              maxLength: {
                value: 20,
                message: "This field can have maximum of 20 characters",
              },
            })}
          />
          <div className={"error-container"}>
            {errors.user_id && errors.user_id.type && (
              <div className={"error"}>{errors.user_id.message}</div>
            )}
          </div>
          <input
            type={"text"}
            aria-invalid={errors.passcode ? "true" : "false"}
            placeholder={"Passccode"}
            {...register("passcode", {
              required: "Passcode is required",
              maxLength: 20,
            })}
          />
          <div className={"error-container"}>
            {errors.passcode && errors.passcode.type === "required" && (
              <div className={"error"}>{errors.passcode.message}</div>
            )}
          </div>
          <input type={"submit"} value={"submit"} />
        </form>
      </div>
      {showAuthNotification && (
        <div className={"error-notification"}>
          Invalid User ID and Passcode. This is mock and worked only for User
          Id: VMD, Passcode: VL1234
        </div>
      )}
    </div>
  );
};

export default HomeView;
