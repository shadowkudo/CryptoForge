# CryptoForge - Web Project

## Introduction
Welcome to **CryptoForge** - a hands-on web app that lets you encrypt and decrypt text using a terminal-style interface. It’s designed for both casual users and developers who want to explore classic and modern ciphers through direct command-line interaction.

## Features
- Homepage: A clean, welcoming landing page introducing CryptoForge and its purpose. 
- Tool Page: Interactive terminal interface powered by xterm.js, with input/output zones for text encryption and decryption, supporting file upload for input and file download for output. 
- About Page: Detailed information about the app, including usage instructions, cipher theory, contact details, and credits. 
- Command History & Navigation: Use arrow keys to cycle through past commands and navigate within input lines. 
- Classic & Modern Cipher Support: Includes ciphers like Caesar, Vigenère, AES, and DES, along with educational descriptions. 
- Responsive Sidebar Navigation: Quick access to sections like Introduction, Terminal help, Cipher Theory, Contact, and Credits. 
- Light & Dark Theme Modes: Matches your system’s preferred color scheme automatically for comfortable viewing. 
- User Guidance & Alerts: Built-in alerts and info boxes to guide users and encourage responsible use of encryption.

## Getting Started

### As a User
Visit the link &rarr; [https://linkToCome.ch](https://linkToCome.ch) (not available yet)

> [!NOTE]
> Enjoy and have fun!

### As a Developer

#### Prerequisites
- Node.js (tested with v22.14.0)
- npm (bundled with Node.js, test with v10.9.2)

Make sure both are installed and available in your system. Verify by running:
```sh
node -v
npm -v
```

#### Installation
Install project dependencies:
```sh
npm install
```

#### Running the Project
For development (uses port `2705`):
```sh
npm run dev
```

For production (uses the port `2705`):
```sh
npm run build
npm run prod
```

> [!WARNING]
> In file `app/components/term/core.jsx`, the import of `xterm.js` varies depending on the runtime profile. By default, it is set up for development (`dev`).

## Contributing
Contributions are welcome! Here’s how to get involved:
- Reporting Bugs: Open an issue on GitHub with a clear description and steps to reproduce.
- Feature Requests:  Submit a detailed feature request via GitHub issues to discuss before implementation.
- Code of Conduct:  Be respectful and constructive in discussions. Code reviews may request changes; respond promptly.

## Credits
This project leverages the following open-source libraries and frameworks:

- [xterm.js](https://xtermjs.org/) — Terminal emulator for the web
- [Ant Design (antd)](https://ant.design/) — UI components and icons
- [DaisyUI](https://daisyui.com/) — Tailwind CSS component library
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [React Router](https://reactrouter.com/) — Declarative routing for React applications
- [crypto-js](https://github.com/brix/crypto-js) — JavaScript library of crypto standards and ciphers
- [Zod](https://zod.dev/) — Type-safe schema validation and parsing for JavaScript and TypeScript.

A big thanks to these projects and their communities for enabling this app.

## License
This project is licensed under the [MIT License](./LICENSE).
