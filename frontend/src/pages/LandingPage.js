import AnimatedBackground from "../components/AnimatedBackground";

function LandingPage() {
  return (
    <div className="relative w-full h-full">
      <AnimatedBackground />
      <div class="w-screen h-screen bg-color flex justify-center">
        <div class="w-3/4 content-center">
          <div class="container h-80 flex justify-center">
            <div class="flex flex-col justify-center items-center space-y-4">
              <h1 class="text-7xl font-bowlby mb-6">countrystein</h1>
              <a class="btn btn-lg btn-primary w-60 text-xl" href="/start">
                New Game
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
