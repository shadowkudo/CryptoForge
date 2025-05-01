# Specifications Document — Web Encryption Application -> CryptoForge

---

## Project Objective

Create an interactive web application that allows users to:
- **Input or upload** a text or plain text file
- **Encrypt or decrypt** this content via a **terminal-style interface**
- Use various **cryptographic algorithms**
- Display the **result in a scrollable, exportable output area**
- Show a **progress bar during processing**

---

## Tech Stack

| Frontend (Client Side)      | Backend (Server Side)         |
|-----------------------------|-------------------------------|
| React.js                    | Node.js + Express             |
| xterm.js                    | crypto-js                     |
| Tailwind CSS                | Multer (for file upload)      |
| Axios                       | CORS, Body Parser             |

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
- **Progress bar** displayed only during encryption/decryption

---

### Backend (API)
- Route: `POST /api/crypto`
- Parameters: algorithm, action (encrypt/decrypt), key
- Content comes from frontend (text or uploaded file)
- Handles encryption/decryption logic based on selected algorithm
- Returns: the encrypted/decrypted output
- Includes error handling and response time management

---

### Supported Algorithms
- Caesar Cipher (key = integer)
- Vigenère Cipher (key = word)
- Base64
- AES (key = string, fixed mode ECB or CBC)
- ...possibly others?

---

## Project Timeline

| Week       | Goal                | Details                                      |
|------------|---------------------|----------------------------------------------|
| Week 1     | Mockups & Base Setup | Initialize React + Tailwind + xterm.js, basic UI |
| Week 2     | Terminal & Commands | Implement command parsing, display raw result |
| Week 3     | Backend Integration | Build API, connect to frontend, handle encryption |
| Week 4     | Final Touches       | Add file upload, progress bar, export feature, testing, deployment |

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

