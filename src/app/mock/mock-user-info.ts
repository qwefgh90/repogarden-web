import { UserInfo } from '../class/user-info';

let expiredDate: Date = new Date();
expiredDate.setDate(expiredDate.getDate() + 1);

export const AUTH_RESPOND = {
    id: 'qwefgh90',
    username: 'leadersama',
    firstName: 'changwon',
    lastName: 'choe',
    token: 'fake-jwt-token',
    expiredDate: expiredDate
};
