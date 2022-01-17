import { IField, isObstacleField } from "./map/field";
import { getPlayer, IPlayer } from "./player/player";
import {createSvgContainer, render } from "./render";
import { getStore, Store } from "./store";
import {IConfig, ILocation } from "./types";

const rootHtmlElement = document.getElementById('root')
if (!rootHtmlElement) {
  const error = new Error('Failed to get #root html element')
  alert(error.message)
  throw error
}

const config: IConfig = {
  unit: 20,
  store: getStore(),
  rootHtmlElement: rootHtmlElement
}

const main = ({ store, unit, rootHtmlElement }: IConfig) => {
  store.init()

  const mainSvgElement = createSvgContainer({width: '1000', height: '1000'})
  render(store, mainSvgElement, unit)

  document.addEventListener('keydown', (event: KeyboardEvent) => {
    const player = store.getPlayer()

    if (event.code === 'ArrowDown') {
      store.updatePlayerLocation({...player.location, y: player.location.y + 1})
      render(store, mainSvgElement, unit)
    }

    if (event.code === 'ArrowUp') {
      store.updatePlayerLocation({...player.location, y: player.location.y - 1})
      render(store, mainSvgElement, unit)
    }

    if (event.code === 'ArrowLeft') {
      store.updatePlayerLocation({...player.location, x: player.location.x - 1})
      render(store, mainSvgElement, unit)
    }

    if (event.code === 'ArrowRight') {
      store.updatePlayerLocation({...player.location, x: player.location.x + 1})
      render(store, mainSvgElement, unit)
    }
  })

  rootHtmlElement.appendChild(mainSvgElement)
}

main(config)
