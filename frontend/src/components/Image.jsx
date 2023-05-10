import { useState, useEffect } from "react";

const Image = ({ url, alt = "Image-component" }) => {
  console.log(url);
  const [img, setImg] = useState("");
  useEffect(() => {
    fetch(url)
      .then((response) => setImg(response.url))
      .catch((err) => console.error(err));
  }, []);

  return <img src={img} alt={alt} />;
};

export default Image;
