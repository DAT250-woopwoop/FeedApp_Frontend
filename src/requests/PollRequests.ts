import axios, { AxiosResponse } from "axios";
import { APIPATH, POLLPATH } from "../constants";
import { Poll, UpdatePollRequest } from "../services/types";

export const getAllPollsRequest = (setPollData: (arg0: Poll[]) => void) => {
  axios
    .get<Poll[]>(`${APIPATH}${POLLPATH}`)
    .then((response: AxiosResponse<Poll[]>) => {
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
    .get<Poll>(`${APIPATH}${POLLPATH}/${id}`)
    .then((response: AxiosResponse<Poll>) => {
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
    .put<Poll>(`${APIPATH}${POLLPATH}/${id}`, updateData)
    .then((response: AxiosResponse<Poll>) => {
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
