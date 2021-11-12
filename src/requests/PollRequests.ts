import axios, { AxiosResponse } from "axios";
import { APIPATH, POLLPATH } from "../constants";
import { PollType, UpdatePollRequest } from "../services/types";
import { getConfig } from "./UtilsRequests";

export const yesNoRequest = (pollId:number, accountId: number, vote: string, token: string) => {
  const config = getConfig(token);

  axios
    .put<PollType>(`${APIPATH}${POLLPATH}/${accountId}/${pollId}`, {"answer": vote.toUpperCase()}, config)
    .then((response: AxiosResponse<PollType>) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getAllPollsRequest = (
  setPollData: (arg0: PollType[]) => void,
  token: string
) => {
  const config = getConfig(token);

  axios
    .get<PollType[]>(`${APIPATH}${POLLPATH}`, config)
    .then((response: AxiosResponse<PollType[]>) => {
      console.log(response.data);
      setPollData(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getPollById = (id: number, token: string) => {
  const config = getConfig(token);

  return axios.get<PollType>(`${APIPATH}${POLLPATH}/${id}`, config)
};

export const putPollById = (
  id: number,
  updateData: UpdatePollRequest,
  token: string
) => {
  const config = getConfig(token);

  axios
    .put<PollType>(`${APIPATH}${POLLPATH}/${id}`, updateData, config)
    .then((response: AxiosResponse<PollType>) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    });
};

export const deletePollById = (id: number, token: string) => {
  const config = getConfig(token);

  axios.put(`${APIPATH}${POLLPATH}/${id}`, null, config).then((response) => {
    console.log(response);
    console.log(`Poll with id: ${id} deleted.`);
  });
};
