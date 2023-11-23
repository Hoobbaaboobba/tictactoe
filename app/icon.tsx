import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 50,
  height: 50,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div className="text-xl bg-white text-black w-full h-full flex flex-col justify-center items-center">
        <h1 className="font-bold text-black text-3xl">X|O</h1>
        <div className="w-10 h-1 bg-black"></div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    }
  );
}
