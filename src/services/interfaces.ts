export interface User {
    "id": number,
    "name": String,
    "username": String,
    "email": String,
    "address": Array<String>,
    "phone": String,
    "website": String,
    "company": Array<String>,
  }

export interface Account {
    "id": number,
    "username":String,
    "password": String,
    "e_mail": String,
    "f_name": String,
    "l_name": String,
    "polls": Array<Poll>,
}

export interface Poll {
    "id": number,
    "pollDesc": String,
    "pollName": String,
    "startTime": String,
    "endTime": String,
    "timeLimit": String,
    "privatePoll": boolean,
    "closed": boolean,
    "yesOption": number,
    "noOption": number,
    "account": Account
}