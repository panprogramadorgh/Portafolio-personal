import { dirname, join } from "path";
const __dirname = dirname(import.meta.url);
const imgPath = join(__dirname, "light-lines.png");

export default view = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification | Portfolio Alvaro</title>
  </head>
  <body>
    <header>
      <h1 class="Title">
        <span class="relevant-word">Contact</span> request sended !
      </h1>
    </header>
    <main class="container">
      <div class="text-container">
        <p>
          Someone is trying to send a contact request to Alvaro portfolio with
          your email address. It is you ?
        </p>
      </div>
      <button class="Button" onClick="{callback}">
        Yes, i am<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path
            clip-rule="evenodd"
            d="M9.00025 13.8871L14.0002 8.8871L14.0002 8.17999L9.00025 3.17999L8.29314 3.8871L12.4396 8.03354L2.00024 8.03354L2.00024 9.03354L12.4396 9.03354L8.29314 13.18L9.00025 13.8871Z"
          />
        </svg>
      </button>
      <button class="Button" onClick="{callback}">
        No, i am not<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path
            clip-rule="evenodd"
            d="M9.00025 13.8871L14.0002 8.8871L14.0002 8.17999L9.00025 3.17999L8.29314 3.8871L12.4396 8.03354L2.00024 8.03354L2.00024 9.03354L12.4396 9.03354L8.29314 13.18L9.00025 13.8871Z"
          />
        </svg>
      </button>
    </main>

    <style>
      @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;500;600;700;800&display=swap");

      :root {
        --main-blue: #09f;
        --main-dark-bg: #101215;
        --bg-card-color: #ffffff09;
      }

      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: "Poppins", sans-serif;
      }

      html {
        font-size: 18px;
      }

      ::selection {
        background-color: rgb(223, 53, 223);
        color: #fff;
      }

      ::-webkit-scrollbar {
        width: 8px;
      }

      ::-webkit-scrollbar-track {
        background-color: #fff2;
      }

      ::-webkit-scrollbar-thumb {
        background-color: #555;
      }

      ::-webkit-scrollbar-thumb:active {
        background-color: #aaa;
      }

      body {
        height: 100vh;
        text-align: center;
        background-color: var(--main-dark-bg);
        background-image: url("${imgPath}");
        background-repeat: repeat;
        background-position: -150px 0;
        background-size: 30rem;
        background-attachment: fixed;
        color: #ddd;
        padding: 0 50px;
      }

      /* port de estilos de componentes */

      .Button {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 10px;
        background-color: #ddd;
        border: 0.06em solid #ddd;
        border-radius: 0.2em;
        user-select: none;
        transition: all 0.2s;
        cursor: pointer;
        font-size: 0.8rem;
        width: 200px;
        margin: 7px 0;
      }

      .Button:hover {
        background-color: transparent;
        color: #ddd;
      }

      .Button svg {
        width: 25px;
        fill: #222;
        margin-left: 7px;
        transition: all 0.2s;
      }

      .Button:hover > svg {
        transform: translate(7px, 0);
        fill: #ddd;
      }

      .Title {
        padding: 35px 0;
        font-size: 55px;
      }

      .Title .relevant-word {
        font-size: 55px;
        color: var(--main-blue);
      }

      .container {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
      }

      .container .text-container {
        padding: 35px 0;
      }
    </style>
  </body>
</html>
`;
