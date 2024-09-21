<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a id="readme-top"></a>

<h3 align="center">CountryStein</h3>
  <img src="/screenshots/title.png"/>

  <p align="center">
    A geography trivia game where you create your own nation...made up of other nations!?
    <br />
  </p>
  <p align="center">
  Made by Lena Wu (lena.wu@vanderbilt.edu)
    <br />
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

_CountryStein_ is a trivia game where you build a country out of other countries (hence, Country + Frankenstein = CountryStein). Imagine a country made of Canada, Croatia, and Chad. Well, now you don't have to! That is, if you get the questions right. For every trivia question you get right about a country, you acquire the country to add to your CountryStein creation. Not to fear, you get hints for every question. And if you're really daring you can even adjust the difficulty and number of questions to make a MEGA NATION.

### Some cool features :0

- animations! (feedback, the landing page)
- flag hints
- changing difficulty and game length
- you get to name your countrystein!

### My Process

I applied to Change++ last year and I've come back with more a bit more web dev experience. I focused on organizing my code to be more modular, separating pages and components so that code is more readable and maintainable. I handled most storage and computation in the backend. I kind of hate working with vanilla CSS so I opted for Tailwind & a component library so I could focus on functionality instead of spending _too_ much time fiddling with margins.

#### Challenges

Alas, this project did not come without its challenges. Since a player is supposed to collect countries for each question, I had to filter the questions fetched from the trivia database to ones with only country names for answers. Sometimes there was not enough questions, so I used the provided CSV as a fallback.

The other big issue I struggled with was making the building part of the game where you drag all the countries together. I originally wanted the countries to be in a separate div and the build area to be its own div, but I couldn't figure out how to have the countries transfer to the other div while maintaining their position. So everything ended up being in one div. _maybe don't change your window size while building your country...i promise most other things are responsive though_ I'm sure there's a way I could've figured out how to do this properly with more time.

#### Things I would've added with more time

- a gallery to admire your previous countrysteins
- funny things to add to your countrystein
- login and stats
- achivements

### Built With

[![React][React.js]][React-url]
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

I used the [DaisyUI](https://daisyui.com/) component library as well.

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

After cloning the repo, install the dependencies in both the frontend and backend folder by running:

```sh
cd frontend // or backend
npm install
```

You may have to run `npm install --force` in the frontend since there's some weird dependency stuff going on. Don't worry it'll work though.

Once you've installed the dependencies, run in both the frontend and backend folders. The frontend UI will run on port 3000 and the backend will run on 8080.

```sh
npm start
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
