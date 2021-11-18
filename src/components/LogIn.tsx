import { useLogedInAccount } from "../AccountProvider";

type LoginProps = {
  token: string | undefined;
  username: string | undefined;
};

export const LogIn = (props: LoginProps) => {
  const { login } = useLogedInAccount();

  const sendForm = (event: any) => {
    event.preventDefault();

    const { username, password } = event.target;

    login(username.value, password.value);
  };

  return (
    <div className="Content">
      <h2>Log In</h2>
      <form
        onSubmit={(evt) => {
          sendForm(evt);
        }}
      >
        <div>
          <label>
            Username: <br /> <input type="username" id="username" />
          </label>
        </div>
        <div>
          <label>
            Password: <br /> <input type="password" id="password" />
          </label>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};
