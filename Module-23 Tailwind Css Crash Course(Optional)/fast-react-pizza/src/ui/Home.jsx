import CreateUser from "../features/user/CreateUser";

function Home() {
  return (
    <div className="mb-8 text-center ">
      <h1 className="p-4 text-xl font-semibold sm:my-16 md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      <CreateUser />
    </div>
  );
}

export default Home;
