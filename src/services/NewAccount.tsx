import { useEffect, useState } from "react";
import { MakeNewAccountRequest } from "./types";
import { makeNewAccountRequest } from "../requests/AccountRequests";
import "../assets/Style.css";
import { useCookies } from "react-cookie";

export const NewAccount = () => {
  const [newAccountDetail, setNewAccountDetail] =
    useState<MakeNewAccountRequest>({
      username: "",
      password: "",
      e_mail: "",
      f_name: "",
      l_name: "",
      polls: [], // This should be made in backend woth out this in the request.
    });

  const SendForm = (
    event: any,
    setNewAccountDetail: (arg0: MakeNewAccountRequest) => void
  ) => {
    event.preventDefault();
    // Should have an error check.
    const { username, fName, lName, email, password } = event.target;

    setNewAccountDetail({
      username: username.value,
      password: password.value,
      e_mail: email.value,
      f_name: fName.value,
      l_name: lName.value,
      polls: [], // This should be made in backend woth out this in the request.
    });
  };
  useEffect(() => {
    // this is not good idea :P
    if (
      newAccountDetail.e_mail !== "" &&
      newAccountDetail.f_name !== "" &&
      newAccountDetail.l_name !== "" &&
      newAccountDetail.password !== "" &&
      newAccountDetail.username !== ""
    ) {
      makeNewAccountRequest(newAccountDetail);
    } else {
      console.log("You are missing something.");
    }
  }, [newAccountDetail]);

  return (
    <div className="Content">
      <h2>Make new user</h2>

      <form onSubmit={(evt) => SendForm(evt, setNewAccountDetail)}>
        <div>
          <label>
            Username: <br /> <input type="username" id="username" />
          </label>
        </div>
        <div>
          <label>
            First name: <br /> <input type="fName" id="fName" />
          </label>
        </div>
        <div>
          <label>
            Last name: <br /> <input type="lName" id="lName" />
          </label>
        </div>
        <div>
          <label>
            Email: <br /> <input type="email" id="email" />
          </label>
        </div>
        <div>
          <label>
            Password: <br /> <input type="password" id="password" />
          </label>
        </div>
        <div>
          <button type="submit">Register new user</button>
        </div>
      </form>
    </div>
  );
};
