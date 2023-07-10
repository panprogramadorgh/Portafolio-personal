export function createVerificationCode(length) {
  const code = new Array(length)
    .fill(null)
    .map(() => {
      return Math.floor(Math.random() * 10);
    })
    .join("");
  return Number(code);
}

/* TODO: Ivestigar sobre estilizar vistas de email */
export function generateViewFromCode({ verificationCode, name }) {
  return `
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
      <p>
      Hi ${name} thanks for sending a contact request, here is your verification code: ${verificationCode}
    </p>
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
          background-image: url("/api/email-view-images/light-lines.png");
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
}
