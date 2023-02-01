import React, {useContext, MouseEvent, useRef} from "react";
import {Tiles} from "homam/modules/tile/Tile";
import {cursorMoveAction, GameDispatch, GameStore, heroMoveAction} from "homam/modules/store/store";
import {Hero} from "homam/modules/hero/Hero";
import {Cursor} from "homam/modules/cursor/Cursor";


export const Map = () => {
  const store = useContext(GameStore)
  const action = useContext(GameDispatch)
  const element = useRef<SVGSVGElement>(null)

  const onMouseMove = (event: MouseEvent<SVGSVGElement>): void => {
    if (!element.current) {
      return
    }

    const bounding = element.current.getBoundingClientRect()

    const mapXPosition = event.clientX - bounding.left
    const mapYPosition = event.clientY - bounding.top
    // right
    if ((mapXPosition - store.cursor.location.x) > store.map.tileSize) {
      const x = Math.round(mapXPosition / store.map.tileSize) * store.map.tileSize
      action(cursorMoveAction({x, y: store.cursor.location.y}))
    } else if (mapXPosition < store.cursor.location.x) {
      // left
      const x = Math.floor(mapXPosition / store.map.tileSize) * store.map.tileSize
      action(cursorMoveAction({x, y: store.cursor.location.y}))
    } else if ((mapYPosition - store.cursor.location.y) > store.map.tileSize) {
      // down
      const y = Math.round(mapYPosition / store.map.tileSize) * store.map.tileSize
      action(cursorMoveAction({x: store.cursor.location.x, y}))
    } else if (mapYPosition < store.cursor.location.y) {
      // up
      const y = Math.floor(mapYPosition / store.map.tileSize) * store.map.tileSize
      action(cursorMoveAction({ x: store.cursor.location.x, y}))
    }
  }

  const onClick = (event: MouseEvent<SVGSVGElement>) => {
    // const bounding = element.current.getBoundingClientRect()
    //todo: calculate real position
    // hero(moveAction([event.clientX - bounding.left, event.clientY - bounding.top]))
    action(heroMoveAction({x: store.cursor.location.x, y: store.cursor.location.y}))
  }

  return <svg
    ref={element}
    xmlns="http://www.w3.org/store.map.tileSize00/svg"
    height={store.map.maxSize}
    width={store.map.maxSize}
    onMouseMove={onMouseMove}
    onClick={onClick}
  >
    <Tiles />
    <Hero />
    <Cursor />
  </svg>
}
