import localFont from "next/font/local";

export const playwrite = localFont({
  src: "./PlaywriteHU-VariableFont_wght.ttf",
});

export const varelaRound = localFont({
  src: "./VarelaRound-Regular.ttf",
});

export const nunito = localFont({
  src: [
    {
      path: "./Nunito-VariableFont_wght.ttf",
      style: "normal",
    },
    {
      path: "./Nunito-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
  ],
});
