import Head from "next/head";
import { Map } from "homam/modules/map/Map";

const Home = () => {
  return (
    <>
      <Head>
        <title>Homam</title>
        <meta name="description" content="Homam app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <h1>Homam</h1>
      <Map />
    </>
  );
};

export default Home;
