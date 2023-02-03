import Head from 'next/head';
import { Map } from 'homam/modules/map/Map';
import { useAppDispatch, useAppSelector } from 'homam/store';
import { endTurn, heroPath } from 'homam/modules/store/store';

const Home = () => {
  const turn = useAppSelector((state) => state.game.turn);
  const hero = useAppSelector((state) => state.game.player.hero);
  const dispatch = useAppDispatch();

  return (
    <>
      <Head>
        <title>Homam</title>
        <meta name="description" content="Homam app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <h1>Homam</h1>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <p>Hero Steps left: {hero.stepsLeft}</p>
          <button
            disabled={hero.isMoving}
            onClick={() => {
              dispatch(endTurn());
            }}
          >
            End Turn
          </button>
          <p>Turn: {turn}</p>
        </div>
        <Map />
      </div>
    </>
  );
};

export default Home;
