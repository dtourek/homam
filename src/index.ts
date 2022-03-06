import { createSvgContainer, getSvgMap } from './getSvgMap';
import { initWorldMap } from './map';
import { getStore } from './store';
import { IConfig } from './types';

const rootHtmlElement = document.getElementById('root');
if (!rootHtmlElement) {
  const error = new Error('Failed to get #root html element');
  alert(error.message);
  throw error;
}

document.body.style.overflow = 'hidden';

const config: IConfig = {
  unit: 20,
  store: getStore(initWorldMap, { location: { x: 1, y: 1 } }),
  rootHtmlElement: rootHtmlElement,
  mapMaxSize: 1000,
};

export const renderNow = (parentSvg: SVGSVGElement, nodes: SVGRectElement[]) => {
  parentSvg.innerHTML = '';
  nodes.forEach((node) => {
    parentSvg.appendChild(node);
  });
};

const main = ({ store, unit, rootHtmlElement }: IConfig) => {
  const mainSvgElement = createSvgContainer({ width: String(config.mapMaxSize), height: String(config.mapMaxSize) });

  renderNow(mainSvgElement, getSvgMap(store, mainSvgElement, unit));

  document.addEventListener('keydown', (event: KeyboardEvent) => {
    const player = store.getPlayer();

    if (event.code === 'ArrowDown') {
      store.updatePlayerLocation({ ...player.location, y: player.location.y + 1 });
      renderNow(mainSvgElement, getSvgMap(store, mainSvgElement, unit));
    }

    if (event.code === 'ArrowUp') {
      store.updatePlayerLocation({ ...player.location, y: player.location.y - 1 });
      renderNow(mainSvgElement, getSvgMap(store, mainSvgElement, unit));
    }

    if (event.code === 'ArrowLeft') {
      store.updatePlayerLocation({ ...player.location, x: player.location.x - 1 });
      renderNow(mainSvgElement, getSvgMap(store, mainSvgElement, unit));
    }

    if (event.code === 'ArrowRight') {
      store.updatePlayerLocation({ ...player.location, x: player.location.x + 1 });
      renderNow(mainSvgElement, getSvgMap(store, mainSvgElement, unit));
    }
  });

  rootHtmlElement.appendChild(mainSvgElement);
};

main(config);
