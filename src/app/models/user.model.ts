import {SeriesMusculation} from "../services/session.services";

export interface User {
    _id?: string;
    email?: string;
    password?: string;
    phone?: string;
    firstname?: string;
    lastname?: string;
    dateOfBirth?: string,
    height?: number,
    weight?: number,
    imc?: number,
    timeStay?: number,
    group?: number,
    price?: number,
    discount?: number,
    paid?: number,
    balance?: number,
    sessions?: SeriesMusculation
}
