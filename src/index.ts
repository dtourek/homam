import { FieldType, getField } from './map/field';
import { createSvgContainer, render } from './render';
import { getStore, WorldMap } from './store';
import { IConfig } from './types';

const rootHtmlElement = document.getElementById('root');
if (!rootHtmlElement) {
  const error = new Error('Failed to get #root html element');
  alert(error.message);
  throw error;
}

document.body.style.overflow = 'hidden';

const initWorldMap: WorldMap = [
  [getField(FieldType.water), getField(FieldType.forest), getField(FieldType.mountain), getField(FieldType.grass), getField(FieldType.grass), getField(FieldType.grass)],
  [getField(FieldType.grass), getField(FieldType.grass), getField(FieldType.grass), getField(FieldType.mountain), getField(FieldType.mountain), getField(FieldType.grass)],
  [getField(FieldType.water), getField(FieldType.water), getField(FieldType.mud), getField(FieldType.water), getField(FieldType.mud), getField(FieldType.mud)],
  [getField(FieldType.mountain), getField(FieldType.mud), getField(FieldType.mud), getField(FieldType.water), getField(FieldType.mud), getField(FieldType.water)],
  [getField(FieldType.mud), getField(FieldType.mud), getField(FieldType.mud), getField(FieldType.grass), getField(FieldType.mud), getField(FieldType.water)],
  [getField(FieldType.mountain), getField(FieldType.mountain), getField(FieldType.mud), getField(FieldType.grass), getField(FieldType.mountain), getField(FieldType.mountain)],
];

const config: IConfig = {
  unit: 20,
  store: getStore(initWorldMap, { location: { x: 1, y: 1 } }),
  rootHtmlElement: rootHtmlElement,
};

const main = ({ store, unit, rootHtmlElement }: IConfig) => {
  const mainSvgElement = createSvgContainer({ width: '1000', height: '1000' });
  render(store, mainSvgElement, unit);

  document.addEventListener('keydown', (event: KeyboardEvent) => {
    const player = store.getPlayer();

    if (event.code === 'ArrowDown') {
      store.updatePlayerLocation({ ...player.location, y: player.location.y + 1 });
      render(store, mainSvgElement, unit);
    }

    if (event.code === 'ArrowUp') {
      store.updatePlayerLocation({ ...player.location, y: player.location.y - 1 });
      render(store, mainSvgElement, unit);
    }

    if (event.code === 'ArrowLeft') {
      store.updatePlayerLocation({ ...player.location, x: player.location.x - 1 });
      render(store, mainSvgElement, unit);
    }

    if (event.code === 'ArrowRight') {
      store.updatePlayerLocation({ ...player.location, x: player.location.x + 1 });
      render(store, mainSvgElement, unit);
    }
  });

  rootHtmlElement.appendChild(mainSvgElement);
};

main(config);
