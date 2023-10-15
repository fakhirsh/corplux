import { atom } from "recoil";

export const menuState = atom({
    key: 'nenuState',
    default: false,
});

export const lightThemeState = atom({
    key: 'lightThemeState',
    default: true,
}); 

export const cartState = atom({
    key: 'cartState',
    default: [],
});