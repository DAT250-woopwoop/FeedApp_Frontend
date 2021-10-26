import axios, { AxiosResponse } from "axios";
import { APIPATH, ACCOUNTPATH } from "../constants";
import {
  Account,
  AccountByIdResponse,
  MakeNewAccountRequest,
  MakeNewPollRequest,
  Poll,
  UpdateAccountRequest,
} from "../services/types";
import { getAllPollsRequest } from "./PollRequests";

export const postNewPollRequest = (
  data: MakeNewPollRequest,
  accountId: number,
  setPollData: (arg0: Poll[]) => void
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
  setAccountData: (arg0: Account[]) => void
) => {
  axios
    .get<Account[]>(`${APIPATH}${ACCOUNTPATH}`)
    .then((response: AxiosResponse<Account[]>) => {
      setAccountData(response.data);
      console.log(response.data);
    })
    .catch((err) => {
      console.error(err);
    });
};

export const makeNewAccountRequest = (data: MakeNewAccountRequest) => {
  axios
    .post(`${APIPATH}${ACCOUNTPATH}`, data)
    .then((response: AxiosResponse) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    });
};

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