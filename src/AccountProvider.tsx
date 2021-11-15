import {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from "react";
import { useCookies } from "react-cookie";
import { getAccountByUsernameRequest, loginAccountRequest } from "./requests/AccountRequests";
import { BearerToken, LoggedInUser, LoginAccountRequest } from "./services/types";

type LoggedInAccountContextValue = {
    login: (username:string, password:string) => void,
    loggedInUser: LoggedInUser,
    getAllInfoOfAccount: () => void
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
  const [myVotes, setMyVotes] = useState<number[]>([]);

  const [cookies, setCookie] = useCookies(["token", "username"])
  

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
  }, [bearerToken, userId, username, fname, lName, email, myVotes]);

  const login = useCallback(
    (username:string, password: string) => {
        setUsername(username)
        const login: LoginAccountRequest = {
            username: username,
            password: password,
          };

         loginAccountRequest(login).then((res) => {
           setCookie("token", res.data.Bearer, {path:"/", expires:new Date(Date.now() + (3600 * 60 * 24))});
           setCookie("username", username,  {path:"/", expires:new Date(Date.now() + (3600 * 60 * 24))});
         })
      }, [setCookie]
  )

  const getAllInfoOfAccount = useCallback(
    () => {
      getAccountByUsernameRequest(username, cookies.token, setLogedInUser)
    }, [cookies.token, username]
  )
/*
  useEffect(() => {
    if(cookies.token) {
        getAccountByUsernameRequest(username, cookies.token, setLogedInUser)
    }
  }, [bearerToken.Bearer, cookies.token, username])
  */

  return (
    <LoggedInAccountContext.Provider
      value={{
        login,
        getAllInfoOfAccount,
        loggedInUser,
      }}
      {...props}
    />
  );
}


export { useLogedInAccount, LogedInAccountProvider };
