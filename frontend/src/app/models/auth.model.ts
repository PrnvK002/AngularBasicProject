export interface loginModel{
    email : string,
    password : string
}

export interface signupModel{
    firstName : string,
    lastName : string,
    email : string,
    phone : string,
    dob : Date,
    password : string,
    confirmPassword : string
}

export interface userDetails{
    _id : string,
    firstName : string,
    lastName : string,
    email : string,
    phone : string,
    dob : Date,
    authToken:string
}

export type resolveModel = (data:userDetails)=>void;
export type rejectModel = (error:string) => void; 