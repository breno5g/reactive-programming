import { fromEvent } from "./operators/index.mjs";

const canvas = document.getElementById("canvas");
const clearBtn = document.getElementById("clear");

const ctx = canvas.getContext("2d");

const resetCanvas = (width, height) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.lineWidth = 4
}

resetCanvas()

fromEvent(canvas, "mousedown").pipeTo(new WritableStream({
  write(chunk) {
    console.log(chunk)
  }
}))