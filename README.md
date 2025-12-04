# ultima-maps-parser
This project exists to make sure future generations can easily decode and understand various data formats used in the classic Ultima games—things like maps, tilesets, and other game assets. A lot of the existing tools that handle these formats are old, unmaintained, closed-source, or rely on proprietary systems. Many are difficult to learn from, and they’re not designed for long-term accessibility.

As an open-source developer, I want to change that. My goal is to build a set of tools and documentation that are fully open, easy to understand, and built using modern, accessible technologies. I want someone 20 or 30 years from now to be able to open this project and immediately grasp how to decode these files, how the formats work, and how the original games structured their data.

This project is meant to be a clear, long-lasting resource for anyone interested in how the Ultima series stored its game data—whether they’re developers, historians, or just curious fans.

### Why TypeScript?

I chose TypeScript for this project because it strikes the right balance between accessibility and structure. It’s easy to learn, easy to maintain, and strong enough to guide people into understanding the code properly instead of getting lost in loosely typed guesswork. On top of that, it’s incredibly straightforward to work with: you can download the source, run yarn install, execute one of the included tests, and you’ll immediately have output files to inspect.

## Quick Start (in 5 minutes)
```bash
git clone https://github.com/DocCaliban/ultima-maps-parser.git  
cd ultima-maps-parser  
yarn  
yarn render
```

### Detailed Getting Started
Follow these steps to get the project running locally:

**Download the repository from GitHub**  
   - Click the green **Code** button → **Download ZIP**, or  
   - Clone it with Git:  
     ```bash
     git clone https://github.com/DocCaliban/ultima-maps-parser.git
     ```

**Open the project in your IDE**  
   I recommend **VS Code**, but you can use whatever editor you prefer.

**Open a command prompt / terminal in the project folder**  
   - On Windows: you can open PowerShell, Command Prompt, or the built-in terminal in VS Code.  
   - On macOS/Linux: open Terminal.

**Install dependencies (just run Yarn with no arguments)**  
   ```bash
   yarn
   ```

### Install Data Files

To use this project, you will need the original Ultima III data files. This includes:

- Map files corresponding to the towns, castles, dungeons, arenas, and overworlds.  
- Tilesets contained in `shapes.ega` **or** `shapes.ult`.

Place all these files into your `Data/Ultima-3` folder so that the rendering and map tools can access them.

> **Note:** We highly recommend purchasing a legal copy of Ultima III, for example from [Good Old Games](https://www.gog.com/), so you can obtain the data files legitimately. This ensures you are working with valid, licensed assets.

# Run the Ultima III Map Renderer

Run the interactive renderer with:

```
yarn render
```

This allows you to:

- Select map types (Towns, Castles, Dungeons, Arenas, Overworlds)
- Render maps as PNG files in the `./out` folder
- Switch between CGA, EGA, or Both graphics modes during rendering

## Example

1. Run `yarn render`.
2. Select a map type, e.g., `1` for Towns.
3. Choose a specific map from the list, e.g., `2` for Fawn (`FAWN.ULT`).
4. The renderer will create a PNG in the `./out` folder, e.g., `FAWN.ULT_render.png`.
5. To switch graphics modes, choose the corresponding menu option and select `CGA`, `EGA`, or `Both`.


## Contribution
Contributions are welcome! Whether you want to fix bugs, add new Ultima decoding support, improve tests, or enhance documentation, feel free to open an issue or submit a pull request.  

To contribute:

1. Fork the repository.  
2. Create a new branch for your changes.  
3. Make your changes and provide tests and minimal test data.
4. Submit a Pull Request with a clear description of your changes.  

Please be respectful of the existing code style and maintain consistency with TypeScript conventions used in the project.

---

## License

This project is licensed under the [MIT License](LICENSE).  
You are free to use, modify, and distribute the code, as long as the original copyright notice and license are included.

---

## Contact
If you have questions, run into issues, or want to suggest features, please use the GitHub [Issues](https://github.com/DocCaliban/ultima-maps-parser/issues) page.  

You can also reach out via GitHub directly: [DocCaliban](https://github.com/DocCaliban).
