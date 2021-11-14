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
import { getConfig } from "./UtilsRequests";
import { getAllPollsRequest } from "./PollRequests";

export const postNewPollRequest = (
  data: MakeNewPollRequest,
  accountId: number,
  setPollData: (arg0: PollType[]) => void,
  token: string
) => {
  const config = getConfig(token);
  axios
    .post(`${APIPATH}${ACCOUNTPATH}/${accountId}/newPoll`, data, config)
    .then((response: AxiosResponse) => {
      // orket ikke finne typene xD
      console.log(response);
      getAllPollsRequest(setPollData, token); // For å oppdatere listen med den nettoppgade pollen
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getAllAccountsRequest = (
  setAccountData: (arg0: AccountType[]) => void,
  token: string
) => {
  const config = getConfig(token);

  axios
    .get<AccountType[]>(`${APIPATH}${ACCOUNTPATH}`, config)
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

export const loginAccountRequest = (
  data: LoginAccountRequest,
  callback: (arg0: any) => void
) => {
  axios
    .post<BearerToken>(`${APIPATH}/login`, data)
    .then((response: AxiosResponse<BearerToken>) => {
      console.log(response.data.Bearer);
      callback(response.data);
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getAccountByIdRequest = (
  id: number,
  setAccountData: (arg0: AccountByIdResponse) => void,
  token: string
) => {
  const config = getConfig(token);

  axios
    .get<AccountByIdResponse>(`${APIPATH}${ACCOUNTPATH}/${id}`, config)
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
  id: number,
  token: string
) => {
  const config = getConfig(token);

  axios
    .put<AccountByIdResponse>(
      `${APIPATH}${ACCOUNTPATH}/${id}`,
      updateData,
      config
    )
    .then((response: AxiosResponse<AccountByIdResponse>) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    });
};

export const deleteAccountRequest = (id: number, token: string) => {
  const config = getConfig(token);

  axios
    .delete(`${APIPATH}${ACCOUNTPATH}/${id}`, config)
    .then((response) => {
      console.log(`Account with id: ${id} deleted.`);
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getAccountByUsernameRequest = (
  username: string,
  token: string,
  callback: (arg0: any) => void
) => {
  const config = getConfig(token);

  axios
    .get<LoggedInUser>(`${APIPATH}${ACCOUNTPATH}/username/${username}`, config)
    .then((res: AxiosResponse<LoggedInUser>) =>
      callback({
        id: res.data.id,
        username: res.data.username,
        f_name: res.data.f_name,
        l_name: res.data.l_name,
        e_mail: res.data.e_mail,
        bearerToken: token,
      })
    );
};
