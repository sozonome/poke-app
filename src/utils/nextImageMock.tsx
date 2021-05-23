import { DetailedHTMLProps, ImgHTMLAttributes } from "react";

export const nextImageMock =
  () =>
  ({
    src,
    alt,
  }: DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >) =>
    <img src={src} alt={alt} />;
