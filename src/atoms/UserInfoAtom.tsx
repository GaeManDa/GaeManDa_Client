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
    age: 0,
    weight: 0,
    height: 0,
    isNeutered: false,
    dogMbti: "",
    token: ""
  },
});

export default UserInfoState;
