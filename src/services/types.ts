export type User = {
    id: number;
    name: String;
    username: String;
    email: String;
    address: Array<String>;
    phone: String;
    website: String;
    company: Array<String>;
};

export type AccountType = {
    id: number;
    username: String;
    password: String;
    e_mail: String;
    f_name: String;
    l_name: String;
    polls: Array<number>;
};

export type PollType = {
    id: number;
    pollDesc: String;
    pollName: String;
    startTime: String;
    endTime: String;
    privatePoll: boolean;
    closed: boolean;
    answers: Array<number>;
    accountId: number;
};

export type MakeNewPollRequest = {
    pollDesc: String;
    pollName: String;
    startTime: String;
    endTime: String;
    privatePoll: boolean;
    closed: boolean;
    yesOption: number;
    noOption: number;
};

export type MakeNewAccountRequest = {
    username: String,
    password: String,
    e_mail: String,
    f_name: String,
    l_name: String,
    polls : Array<number>,
}

export type AccountByIdResponse = {
    username: String,
    e_mail: String,
    f_name: String,
    l_name: String,
    polls: Array<number>,
    id: number,
}

export type UpdateAccountRequest = {
    username: String | undefined,
    password: String | undefined,
    e_mail: String | undefined,
    f_name: String | undefined,
    l_name: String | undefined,
}

export type UpdatePollRequest = {
    pollDesc: String | undefined,
    pollName: String | undefined,
    startTime: String | undefined,
    endTime: String | undefined,
    privatePoll: boolean | undefined,
    closed: boolean | undefined,
    yesOption: number | undefined,
    noOption: number | undefined ,
}

export type PollVote = {
    id: number,
    answer: string,
    pollId: number,
    accountId: number,
}

export type LoginAccountRequest = {
    username: string,
    password: string,
}

export type BearerToken = {
    Bearer: string,
}

export type LoggedInUser = {
    bearerToken: string | undefined;
    id: number | undefined;
    username: string | undefined;
    f_name: string | undefined;
    l_name: string | undefined;
    e_mail: string | undefined;
}