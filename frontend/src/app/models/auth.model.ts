export interface loginModel{
    email : string,
    password : string
}

export interface signupModel{
    firstName : string,
    lastName : string,
    email : string,
    phone : string,
    dob : string,
    password : string,
    confirmPassword : string
}

export interface userDetails{
    firstName : string,
    lastName : string,
    email : string,
    phone : string,
    dob : string
}

export type resolveModel = (data:userDetails)=>void;
export type rejectModel = (error:string) => void; 