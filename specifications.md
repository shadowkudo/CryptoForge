# Specifications Document — Web Encryption Application -> CryptoForge

---

## Project Objective

Create an interactive web application that allows users to:
- **Input or upload** a text or plain text file
- **Encrypt or decrypt** this content via a **terminal-style interface**
- Use various **cryptographic algorithms**
- Display the **result in a scrollable, exportable output area**

---

## Tech Stack for Front-end

| Technology          | Description                                  | Link                                  |
|---------------------|----------------------------------------------|-------------------------------------|
| xterm.js            | Terminal emulator for the web                | [xterm.js](https://xtermjs.org/)    |
| Ant Design (antd)   | UI components and icons                       | [Ant Design](https://ant.design/)    |
| DaisyUI             | Tailwind CSS component library                | [DaisyUI](https://daisyui.com/)      |
| Tailwind CSS        | Utility-first CSS framework                    | [Tailwind CSS](https://tailwindcss.com/) |
| React Router        | Declarative routing for React applications    | [React Router](https://reactrouter.com/) |
| crypto-js           | JavaScript crypto library with cipher implementations | [crypto-js](https://github.com/brix/crypto-js) |
| Node.js             | JavaScript runtime environment                | [Node.js](https://nodejs.org/)       |
| npm                 | Node package manager                          | [npm](https://www.npmjs.com/)        |


---

## Expected Features

### User Interface (Frontend)
- **Text input area** for raw text (copy/paste)
- **Upload option** for `.txt` files (uploaded content is automatically 
displayed in the input area)
- **Web terminal** (via xterm.js) with commands like:
  ```
  encrypt -a caesar -k 3
  decrypt -a vigenere -k KEY
  list
  help
  clear
  ```
- **Output area** showing results (scrollable, copyable, exportable as `.txt`)

---

### Backend (API)
- Route: `POST /api/crypto`
- Parameters: algorithm, action (encrypt/decrypt), key
- Content comes from frontend (text or uploaded file)
- Handles encryption/decryption logic based on selected algorithm
- Returns: the encrypted/decrypted output
- Includes error handling and response time management

> [!NOTE]
> To be implemented only if time allows as front-end is enough for the project.
---

### Supported Algorithms
- Caesar Cipher (key = integer)
- Vigenère Cipher (key = word)
- AES (key = string, fixed mode ECB or CBC)
- ...possibly others?

---

## Supported Commands

| Command                      | Description                           |
|-----------------------------|---------------------------------------|
| `list`                      | Lists available algorithms            |
| `help`                      | Shows command help                    |
| `encrypt -a algo -k key`    | Encrypts input area content           |
| `decrypt -a algo -k key`    | Decrypts input area content           |
| `clear`                     | Clears the terminal display           |

---

## Deliverables

- Fully working React-based application
- Clean, well-organized source code
- `README.md` file with installation and usage instructions
- Final presentation

