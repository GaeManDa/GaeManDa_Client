import { atom } from "recoil";

const UserInfoState = atom({
  key: "UserInfoState",
  default: {
    id: "",
    name: "",
    address: "",
    birth: "",
    picture: "",
    description: "",
    breed: "",
    gender: "",
    age: "",
    weight: "",
    height: "",
    isNeutral: false,
    dogMbti: "",
  },
});

export default UserInfoState;
