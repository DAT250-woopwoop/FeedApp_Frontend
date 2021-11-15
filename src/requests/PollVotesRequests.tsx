import axios, { AxiosResponse } from "axios";
import { APIPATH, POLLPATH, POLLVOTEPATH } from "../constants";
import { PollVote } from "../services/types";
import { getConfig } from "./UtilsRequests";

export const getAllPollVoteRequest = (
    setPollVotes: (arg0: PollVote[]) => void,
    token: string
  ) => {
    const config = getConfig(token);
  
    axios
      .get<PollVote[]>(`${APIPATH}${POLLVOTEPATH}`, config)
      .then((response: AxiosResponse<PollVote[]>) => {
        console.log("KKKKKLLLLLLLLLLGGGGGGGGGGGGG: " + response.data);
        setPollVotes(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  export const getPollVoteByIdRequest = (
    id: number,
    token: string
  ) => {
    const config = getConfig(token);
  
    return axios
      .get<PollVote>(`${APIPATH}${POLLVOTEPATH}/${id}`, config)
      
  };