import axios, { AxiosResponse } from "axios";
import { APIPATH, ACCOUNTPATH } from "../constants";
import {
  AccountType,
  AccountByIdResponse,
  MakeNewAccountRequest,
  MakeNewPollRequest,
  PollType,
  UpdateAccountRequest,
  LoginAccountRequest,
  BearerToken,
  LoggedInUser,
} from "../services/types";
import { getAllPollsRequest } from "./PollRequests";

const getConfig = (token:string) => {
  return {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }
}

export const postNewPollRequest = (
  data: MakeNewPollRequest,
  accountId: number,
  setPollData: (arg0: PollType[]) => void
) => {
  axios
    .post(`${APIPATH}${ACCOUNTPATH}/${accountId}/newPoll`, data)
    .then((response: AxiosResponse) => {
      // orket ikke finne typene xD
      console.log(response);
      getAllPollsRequest(setPollData); // For å oppdatere listen med den nettoppgade pollen
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getAllAccountsRequest = (
  setAccountData: (arg0: AccountType[]) => void
) => {
  axios
    .get<AccountType[]>(`${APIPATH}${ACCOUNTPATH}`)
    .then((response: AxiosResponse<AccountType[]>) => {
      setAccountData(response.data);
      console.log(response.data);
    })
    .catch((err) => {
      console.error(err);
    });
};

export const makeNewAccountRequest = (data: MakeNewAccountRequest) => {
  axios
    .post(`${APIPATH}${ACCOUNTPATH}/signup`, data)
    .then((response: AxiosResponse) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    });
};

export const loginAccountRequest = (data: LoginAccountRequest, callback : (arg0:any) => void) => {
  axios
    .post<BearerToken>(`${APIPATH}/login`, data)
    .then((response: AxiosResponse<BearerToken>) => {
      console.log(response.data.Bearer);
      callback(response.data)
    })
    .catch((err) => {
      console.error(err);
    });
  }

export const getAccountByIdRequest = (
  id: number,
  setAccountData: (arg0: AccountByIdResponse) => void
) => {
  axios
    .get<AccountByIdResponse>(`${APIPATH}${ACCOUNTPATH}/${id}`)
    .then((response: AxiosResponse<AccountByIdResponse>) => {
      console.log(response);
      setAccountData(response.data);
    })
    .catch((err) => {
      console.error(err);
    });
};

export const putAccountRequest = (
  updateData: (arg0: UpdateAccountRequest) => void,
  id: number
) => {
  axios
    .put<AccountByIdResponse>(`${APIPATH}${ACCOUNTPATH}/${id}`, updateData)
    .then((response: AxiosResponse<AccountByIdResponse>) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    });
};

export const deleteAccountRequest = (
  id: number,
) => {
  axios
  .delete(`${APIPATH}${ACCOUNTPATH}/${id}`)
  .then(response => {
    console.log(`Account with id: ${id} deleted.`);
  }).catch((err) => {
    console.error(err);
  });
}

export const getAccountByUsernameRequest = (
  username: string,
  token: string,
  callback: (arg0: any) => void, 
) => {
  const config = getConfig(token)

  axios
  .get<LoggedInUser>(`${APIPATH}${ACCOUNTPATH}/username/${username}`, config)
  .then((res: AxiosResponse<LoggedInUser>) => callback({
    id: res.data.id,
    username: res.data.username,
    f_name: res.data.f_name,
    l_name: res.data.l_name,
    bearerToken: token,
 }))
}