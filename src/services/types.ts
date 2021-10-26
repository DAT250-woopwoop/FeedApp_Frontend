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

export type Account = {
    id: number;
    username: String;
    password: String;
    e_mail: String;
    f_name: String;
    l_name: String;
    polls: Array<number>;
};

export type Poll = {
    id: number;
    pollDesc: String;
    pollName: String;
    startTime: String;
    endTime: String;
    privatePoll: boolean;
    closed: boolean;
    yesOption: number;
    noOption: number;
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