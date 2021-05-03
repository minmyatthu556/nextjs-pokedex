import Layout from "../components/Layout";
import Link from "next/link";

const pokemon = ({ pokeman }) => {
  return (
    <Layout title={pokeman.name}>
      <div className={"bg-gray-100 h-auto p-8 rounded-md shadow-lg w-4/5 sm:w-full mx-auto"}>
        <h1
          className={
            "text-4xl mb-2 text-center capitalize mb-10 rounded-md bg-gray-700 text-gray-50 p-4"
          }
        >
          {pokeman.name}
        </h1>
        <img
          className={"mx-auto h-28"}
          src={pokeman.image}
          alt={pokeman.name}
        />
        <p>
          <span className={"font-bold mr-2"}>Weight: {pokeman.weight}</span>
        </p>
        <p>
          <span className={"font-bold mr-2"}>Height: {pokeman.height}</span>
        </p>
        <h2 className="text-2xl mt-6 mb-2">Types</h2>
        {pokeman.types.map((type, index) => {
          return <p key={index}>{type.type.name}</p>;
        })}
      </div>
      <p className="mt-10 text-center bg-gray-700 rounded-md text-gray-50 shadow-md
      hover:bg-gray-600 hover:-translate-y-0.5 transform transition hover:shadow-lg py-4 w-24 mx-auto
      ">
        <Link href="/">Home</Link>
      </p>
    </Layout>
  );
};

export default pokemon;

export async function getServerSideProps({ query }) {
  const id = query.id;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokeman = await res.json();
  const paddedIndex = ("00" + id).slice(-3);
  const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
  pokeman.image = image;

  return {
    props: {
      pokeman,
    },
  };
}
