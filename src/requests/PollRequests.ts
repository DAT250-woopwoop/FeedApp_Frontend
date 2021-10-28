import axios, { AxiosResponse } from "axios";
import { APIPATH, POLLPATH } from "../constants";
import { PollType, UpdatePollRequest } from "../services/types";

export const yesNoRequest = (
    id: number,
    vote: string
) => {
    console.log(`hei: ${APIPATH}${POLLPATH}/${id}/${vote}`)
    axios
    .put<PollType>(`${APIPATH}${POLLPATH}/${id}/${vote}`)
    .then((response: AxiosResponse<PollType>) => {
        console.log(response);
    })
    .catch(err => {
        console.error(err);
    });
};

export const getAllPollsRequest = (setPollData: (arg0: PollType[]) => void) => {
  axios
    .get<PollType[]>(`${APIPATH}${POLLPATH}`)
    .then((response: AxiosResponse<PollType[]>) => {
      console.log(response.data);
      setPollData(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getPollById = (
    id: number,
) => {
    axios
    .get<PollType>(`${APIPATH}${POLLPATH}/${id}`)
    .then((response: AxiosResponse<PollType>) => {
        console.log(response);

    })
    .catch(err => {
        console.error(err);
    });
};

export const putPollById = (
    id: number,
    updateData: UpdatePollRequest,
) => {
    axios
    .put<PollType>(`${APIPATH}${POLLPATH}/${id}`, updateData)
    .then((response: AxiosResponse<PollType>) => {
        console.log(response);
    })
    .catch(err => {
        console.error(err);
    });
}

export const deletePollById = (id: number) => {
    axios
    .put(`${APIPATH}${POLLPATH}/${id}`)
    .then(response => {
        console.log(response);
        console.log(`Poll with id: ${id} deleted.`);
        
    })
}
