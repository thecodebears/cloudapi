import { Application } from "../application/application.entity";
import { User } from "../user/user.entity";

/**
 * Users finding parameters
 */
export type ClientsFindQuery = {
    id?: string,
    token?: string,
    instance?: string
};

export type ClientType = 'user' | 'application';

export type ClientAuthParameters ={
    type: ClientType,
    instance: string
};
