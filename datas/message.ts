import { atom } from "jotai";

const IpcMessageAtom = atom<IpcMessage>({
  type: "",
});

export default IpcMessageAtom;
