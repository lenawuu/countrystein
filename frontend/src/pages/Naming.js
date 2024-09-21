function Naming({ finalImage, setName, name, handleTransition }) {
  return (
    <div class="w-screen h-screen bg-color flex justify-center">
      <div class="w-1/2 content-center">
        <div>
          <h2 class="mb-6 font-bowlby">
            What a beautiful nation! What shall we name it?
          </h2>
          <div class="border-4 border-primary rounded-md mb-6">
            <img src={finalImage} />
          </div>

          <div class="border-b-2 border-primary w-full mb-6">
            <input
              type="text"
              placeholder="Type here"
              class="focus:outline-none focus:ring-0 focus:border-focus:border-primary border-2 border-transparent bg-transparent text-primary text-lg w-full font-semibold"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          <button
            class="btn btn-primary w-2/3"
            onClick={() => {
              handleTransition();
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Naming;
