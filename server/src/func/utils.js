import dotenv from "dotenv";
dotenv.config();

/* FIXME: Arreglar esta funcion, a veces debuelve una cifra menos */
export function createVerificationCode(length) {
  const code = new Array(length)
    .fill(null)
    .map(() => {
      return Math.floor(Math.random() * 10);
    })
    .join("");
  return Number(code);
}

export function generateViewFromCode({ verificationCode, name }) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <title>Email Verification | Portfolio Alvaro</title>
    </head>
    <body
      style="
        font-family: 'Poppins', sans-serif;
        text-align: center;
        background-color: #101215;
        background-image: url('${process.env.SERVER_DOMAIN}/api.email-view-images/light-lines.png');
        background-repeat: repeat;
        background-position: -150px 0;
        background-size: 30rem;
        background-attachment: fixed;
        color: #ddd;
        padding: 50px;
        margin: 0;
      "
    >
      <header>
        <h1 class="Title" style="padding: 25px 0; margin: 0; font-size: 55px">
          Let's
          <span class="relevant-word" style="font-size: 55px; color: #09f"
            >verify</span
          >
          your email !
        </h1>
      </header>
      <main
        class="container"
        style="
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          padding: 25px 0;
        "
      >
        <p style="font-size: 1.8rem">
          Hi ${name} thanks for sending a contact request, here is your
          verification code:
          <span
            class="code"
            style="
              font-size: 2.5rem;
              font-weight: 700;
              padding: 0 20px;
              color: #09f;
            "
            >${verificationCode}</span
          >
        </p>
      </main>
    </body>
  </html>
  `;
}
