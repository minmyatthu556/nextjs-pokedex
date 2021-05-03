import Head from "next/head";
import Layout from "../components/Layout";
import Link from "next/link";
import {list} from "postcss";

export default function Home({ pokemon }) {
  return (
    <div>
      <Head>
        <title>Pokemon</title>
        <link rel="icon" href="/pokeball.svg" />
      </Head>

      <Layout title={"Pokedex"}>
          <div className={"py-4 rounded-md mb-8 flex items-center mx-auto bg-gray-700 justify-center w-4/5 sm:w-full "}>
            <img src="/pokeball.png" alt="pokeball" className={"h-10"}/>
            <h1 className={"text-4xl text-center text-gray-50 tracking-wide text-bold uppercase"}>Pokedex</h1>
          </div>

          <ul>
            {pokemon.map((pokeman, index) => {
              return(
                <li key={index} className={"hover:-translate-y-1 transform transition hover:shadow-lg w-4/5 sm:w-full mx-auto"}>
                  <Link href={`/pokemon?id=${index+1}`}>
                    <a className={"border p-4 border-gray my-2 capitalize flex items-center text-lg bg-gray-100 rounded-md shadow-md"}>
                      <img src={pokeman.image} alt={pokeman.name} className={"w-20 h-20 mr-3"}/>
                      <span className={"mr-2 tracking-wide font-bold"}>{index + 1}. </span>
                      {pokeman.name}
                    </a>
                  </Link>
                </li>
              )
            })}
          </ul>
      </Layout>
    </div>
  );
}

export async function getStaticProps(contex) {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const { results } = await res.json();
    const pokemon = results.map((result, index) => {
      const paddedIndex = ("00" + (index + 1)).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
      return {
        ...result,
        image,
      };
    });

    return {
      props: { pokemon },
    };
  } catch (e) {
    console.error(e);
  }
}
