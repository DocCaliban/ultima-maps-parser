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
yarn test:u3map
```

### Detailed Getting Started
Follow these steps to get the project running locally:

1. **Download the repository from GitHub**  
   - Click the green **Code** button → **Download ZIP**, or  
   - Clone it with Git:  
     ```bash
     git clone https://github.com/DocCaliban/ultima-maps-parser.git
     ```

2. **Open the project in your IDE**  
   I recommend **VS Code**, but you can use whatever editor you prefer.

3. **Open a command prompt / terminal in the project folder**  
   - On Windows: you can open PowerShell, Command Prompt, or the built-in terminal in VS Code.  
   - On macOS/Linux: open Terminal.

4. **Install dependencies (just run Yarn with no arguments)**  
   ```bash
   yarn
   ```
5. **Explore the test file**
Inside the `tests` directory, open: `test-u3map-renderer.ts`
This file is a good starting point for understanding how the Ultima III map rendering works.
Feel free to read through it, tweak things, or log different values to see how the decoding behaves.

6. **Run the Ultima III map test**
```bash
yarn test:u3map
```
This executes the Ultima III map renderer test and will generate the output file(s) defined in the script. It’s the easiest way to verify the project is set up correctly and see the decoding in action.

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

## Ultima I:
TBD – support for reading maps and tiles is planned.

## Ultima II:
TBD – support for decoding world and dungeon data is planned.

## Ultima III:
Currently supports decoding CGA 16x16 tiles from SHAPES.ULT.
```
File Format: Each tile is 64 bytes (16x16 pixels, 2 bits per pixel). Each byte encodes 4 pixels:
Bits 7-6 → pixel 0
Bits 5-4 → pixel 1
Bits 3-2 → pixel 2
Bits 1-0 → pixel 3
Rows are stored in a half-order: the first 8 decoded rows correspond to even rows (0,2,4…) and the next 8 to odd rows (1,3,5…).
```
Current Output Types:
- Raw 0–3 Pixel Array: A 16x16 array of pixel values (0–3).
- RGBA Array: Each pixel converted to a standard RGBA color using a CGA palette, producing an array [tileIndex][y][x] = [r,g,b,a].

## Ultima IV:
TBD – decoding of overworld, dungeons, and tile sets is planned.

## Ultima V:
TBD – support for more advanced map and tile structures is planned.
