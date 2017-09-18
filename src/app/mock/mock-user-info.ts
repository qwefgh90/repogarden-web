import { UserInfo } from '../class/user-info';

let expiredDate: Date = new Date();
expiredDate.setDate(expiredDate.getDate() + 1);

export const AUTH_RESPOND = {
    id: 'qwefgh90',
    username: 'leadersama',
    login: 'qwefgh90',
    firstName: 'changwon',
    lastName: 'choe',
    expiredDate: expiredDate,
    url: '',
    imgUrl: ''
};
