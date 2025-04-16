import { Howl } from "howler";

export const audios = {
  move: new Howl({
    src: ["/move.mp3"],
  }),
  capture: new Howl({
    src: ["/capture.webm"],
  }),
};
