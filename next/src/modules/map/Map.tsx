import React, {useContext, useEffect, useRef, useState} from "react";
import {HeroDispatch, HeroStore, moveAction, moveBirdAction} from "homam/modules/hero/store";
import {Field} from "homam/modules/field/Field";


export const Map = () => {
  const store = useContext(HeroStore)
  const hero = useContext(HeroDispatch)
  const el = useRef<any>(null)


  const [cursor, setCursor] = useState<any>({x:0, y:0}) // todo: into reducer

    return <svg ref={el} xmlns="http://www.w3.org/2000/svg" height={store.map.maxSize} width={store.map.maxSize}
    onMouseMove={(event) => {
      const bounding = el.current.getBoundingClientRect()

      const newX = event.clientX - bounding.left
      const newY = event.clientY - bounding.top

      // doprava
      if ((newX - cursor.x) > 20) {
        const x = Math.round(newX / 20) * 20
        setCursor({ x, y:cursor.y })
      } else if (newX < cursor.x) {
        // doleva
        const x = Math.floor(newX / 20) * 20
        setCursor({ x, y:cursor.y })
      } else if ((newY - cursor.y) > 20) {
        // dolu
        const y = Math.round(newY / 20) * 20
        setCursor({ x: cursor.x, y })
      } else if (newY < cursor.y) {
        //nahoru
        const y = Math.floor(newY / 20) * 20
        setCursor({ x: cursor.x, y: y })
      }
    }}
              onClick={(event) => {
                const bounding = el.current.getBoundingClientRect()
    //todo: calculate real position
    // hero(moveAction([event.clientX - bounding.left, event.clientY - bounding.top]))
    hero(moveAction([cursor.x, cursor.y]))
  }}>
    {/* {map.fields.map((row, x) => row.flatMap((field, y) => <Field key={`field-${x},${y}`} fieldSize={map.fieldSize} field={field} x={x} y={y} onClick={() => onFieldClick(x, y)} />))} */}

    <Tiles />
    <Hero  />
    <Bird />
    <Cursor x={cursor.x} y={cursor.y} />
  </svg>
}


const getColor = (code: string) => {
  switch (code) {
    case 'D':
      return '#E7E4A5'
    case 'M':
      return '#1C1C1D'
    case 'G':
      return '#C2F3D6'
    default:
        return 'black'
  }
}


const Tiles = () => {
  const store = useContext(HeroStore)
  return (
      <>{store.map.tiles.map((row, y) => {
        return row.flatMap((tile, x) => {
          return (<Field x={x} y={y} color={getColor(tile)} fieldSize={store.map.tileSize} />)

        })
        })}
      </>)
}

const Hero = () => {
  const store = useContext(HeroStore)
  const fieldSize = 20
  const x = store.location[0]
  const y = store.location[1]
  return  (  <>
    <rect width={fieldSize} height={fieldSize} x={x} y={y} fill={'red'} />
    <rect width={fieldSize / 2} height={fieldSize / 2} x={x + fieldSize / 4} y={y + fieldSize / 4} fill={'red'} stroke="black" />
  </>)
}


const Cursor = (props: any) => {
  return  (  <>
    <rect width={20} height={20} x={props.x} y={props.y} fill={'red'} stroke="black" />
  </>)
}

const Bird = () => {
  const hero = useContext(HeroDispatch)
  const store = useContext(HeroStore)


  const x = store.bird.location[0]
  const y = store.bird.location[1]

  useEffect(() => {
    setTimeout(() => {
      console.log('bird moved', store.bird.location)
      hero(moveBirdAction([x+1, y]))
    }, 1000)

  }, [store.bird.location])


  return  <rect width={50} height={50} x={x} y={y} fill={'red'} />
}