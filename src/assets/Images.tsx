type ImagesType = {
  logo: string;
};

const Images: ImagesType = {
  logo: new URL("./logo.svg", import.meta.url).href || "",
};

export default Images;
