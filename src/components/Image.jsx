import { useState, useEffect } from "react";

const Image = ({ url, alt = "Image component" }) => {
  const [image, setImage] = useState("");
  useEffect(() => {
    fetch(url)
      .then((response) => setImage(response.url))
      .catch((err) => console.log(err));
  }, []);
  return <img src={image} alt={alt} />;
};

export default Image;
