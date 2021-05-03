import Head from "next/head";

const Layout = ({ title, children }) => {
  return (
    <div className={"bg-gray-200"}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/pokeball.svg" />
      </Head>
      <main className="container mx-auto max-w-xl pt-8 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default Layout;
