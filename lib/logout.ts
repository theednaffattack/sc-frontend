import { isBrowser } from "./isBrowser";

export const logout = (): void => {
  let now = new Date();

  if (isBrowser) {
    // To trigger the event listener we save some random data into the `logout` key
    window.localStorage.setItem("logout", now.toISOString());
    // console.log("window?", window.localStorage.getItem("logout"));
  }
};
