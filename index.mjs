import { fromEvent, interval, map, merge, switchMap, takeUntil } from "./operators/index.mjs";
import { formatPixelsToNumber } from "./utils/formatPixelsToNumber.mjs";

const canvas = document.getElementById("canvas");
const clearBtn = document.getElementById("clear");

const ctx = canvas.getContext("2d");

const mouseEvents = {
  down: 'mousedown',
  move: 'mousemove',
  up: 'mouseup',
  leave: 'mouseleave',

  touchstart: 'touchstart',
  touchmove: 'touchmove',
  touchend: 'touchend',

  click: 'click',
}

const getMousePosition = (canvasDom, eventValue) => {
  const rect = canvasDom.getBoundingClientRect()
  return {
    x: eventValue.clientX - rect.left,
    y: eventValue.clientY - rect.top,
  }
}

const resetCanvas = () => {
  const canvasStyle = window.getComputedStyle(canvas)
  const height = formatPixelsToNumber(canvasStyle.height)
  const width = formatPixelsToNumber(canvasStyle.width)

  canvas.height = height
  canvas.width = width

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.lineWidth = 4
}

resetCanvas()

const touchToMouse = (touchEvent, mouseEvent) => {
  const [touch] = touchEvent.touches.length ?
    touchEvent.touches :
    touchEvent.changedTouches

  return new MouseEvent(mouseEvent, {
    clientX: touch.clientX,
    clientY: touch.clientY,
  })

}

merge([
  fromEvent(canvas, mouseEvents.down),
  fromEvent(canvas, mouseEvents.touchstart)
    .pipeThrough(map(e => touchToMouse(e, mouseEvents.touchstart))),
])
  .pipeThrough(
    switchMap(e => {
      return merge([
        fromEvent(canvas, mouseEvents.move),
        fromEvent(canvas, mouseEvents.touchmove)
          .pipeThrough(map(e => touchToMouse(e, mouseEvents.touchmove))),
      ])
        .pipeThrough(
          takeUntil(merge([
            fromEvent(canvas, mouseEvents.up),
            fromEvent(canvas, mouseEvents.leave),
            fromEvent(canvas, mouseEvents.touchend)
              .pipeThrough(map(e => touchToMouse(e, mouseEvents.touchend))),
          ]))
        )
    })

  )
  .pipeThrough(map(function ([mouseDown, mouseMove]) {
    this._lastPosition = this._lastPosition ?? mouseDown

    const [from, to] = [
      this._lastPosition, mouseMove
    ].map(item => getMousePosition(canvas, item))

    this._lastPosition = mouseMove.type === mouseEvents.up ? null : mouseMove
    return { from, to }
  }))
  .pipeTo(new WritableStream({
    write({ from, to }) {
      ctx.beginPath()
      ctx.moveTo(from.x, from.y)
      ctx.lineTo(to.x, to.y)
      ctx.stroke()
      ctx.closePath()
    }
  }))