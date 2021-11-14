import {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from "react";
import { getAccountByUsernameRequest, loginAccountRequest } from "./requests/AccountRequests";
import { BearerToken, LoggedInUser, LoginAccountRequest } from "./services/types";

type LoggedInAccountContextValue = {
    login: (username:string, password:string) => void,
    loggedInUser: LoggedInUser,
}

const LoggedInAccountContext = createContext<LoggedInAccountContextValue | undefined>(undefined);

function useLogedInAccount() {
  const context = useContext(LoggedInAccountContext);

  if (!context) {
    throw new Error("useCategories must be used within a CategoriesProvider");
  }

  return context;
}

function LogedInAccountProvider(props: any) {
  const [bearerToken, setBearerToken] = useState<BearerToken>({
    Bearer: "",
  });
  const [userId, setUserId] = useState<number>();
  const [username, setUsername] = useState<string>("");
  const [fname, setFName] = useState<string>("");
  const [lName, setLname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  

  const [loggedInUser, setLogedInUser] = useState<LoggedInUser>({
    bearerToken: bearerToken?.Bearer,
    id: userId,
    username: username,
    f_name: fname,
    l_name: lName,
    e_mail: email
  });

  useEffect(() => {
    setLogedInUser({
      bearerToken: bearerToken?.Bearer,
      id: userId,
      username: username,
      f_name: fname,
      l_name: lName,
      e_mail: email
    });
  }, [bearerToken, userId, username, fname, lName]);

  const login = useCallback(
    (username:string, password: string) => {
        setUsername(username)
        const login: LoginAccountRequest = {
            username: username,
            password: password,
          };

         loginAccountRequest(login, setBearerToken)
      }, []
  )

  useEffect(() => {
    if(bearerToken.Bearer !== "" && bearerToken.Bearer !== undefined ) {
        getAccountByUsernameRequest(username, bearerToken.Bearer, setLogedInUser)
    }
  }, [bearerToken, username])

  return (
    <LoggedInAccountContext.Provider
      value={{
        login,
        loggedInUser,
      }}
      {...props}
    />
  );
}


export { useLogedInAccount, LogedInAccountProvider };
