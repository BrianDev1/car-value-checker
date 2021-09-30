
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface InputCreateUser {
    name?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
}

export interface InputSignIn {
    email?: Nullable<string>;
    password?: Nullable<string>;
}

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface IQuery {
    signIn(inputSignIn: InputSignIn): string | Promise<string>;
}

export interface IMutation {
    signUp(inputCreateUser: InputCreateUser): User | Promise<User>;
}

type Nullable<T> = T | null;
