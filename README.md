# Flashcard Generator Using Padlet API
![build workflow](https://github.com/padlet/flashcard-api-demo/actions/workflows/build-and-deploy.yml/badge.svg) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)



This is a unique and effective flashcard application powered by the latest [Padlet API](https://docs.padlet.dev/). It enables you to convert the information from your Padlet posts directly into handy flashcards.


## Usage

The app is accessible through:
- Github Pages: https://padlet.github.io/flashcard-api-demo
- Hosted on padlet.dev: https://flashcard-api-demo.padlet.dev

## Developing

Ensure you have the latest version of Node.js installed. You can use a package manager of your choice. We use `pnpm` to develop the app. Clone this repository and navigate to the directory in your terminal. Run the following commands to setup and compile the app with hot-reload for development.

```sh
git clone https://github.com/padlet/flashcard-api-demo.git
cd flashcard-api-demo
pnpm install
pnpm dev
```

### Padlet API

- [`src/services/padletService.ts`](https://github.com/padlet/flashcard-api-demo/blob/main/src/services/padletService.ts) is where the API calls are made. You can find the API documentation for the endpoints used in the code here: https://docs.padlet.dev/
- You can join the Padlet discord channel for any API discussions: https://discord.gg/HX9r4jTkjF

### Recommended IDE Setup
[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).


### Type-Check, Compile and Minify for Production

```sh
pnpm build
```


## Contribute

Contributions are always welcome! Check out the [Issues](https://github.com/padlet/flashcard-api-demo/issues) tab to see if there's something you might like to work on, or open a new issue if you've identified a bug or want to suggest an improvement. Submit a [Pull Request](https://github.com/padlet/flashcard-api-demo/pulls) to make changes.

## License
The demo is released under the MIT License. See the LICENSE file for further details.

## Contact
Should you have any queries or suggestions, please feel free to open an issue in this repository. We look forward to hearing from you!

-- Love, laughter
