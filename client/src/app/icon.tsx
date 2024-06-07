import Logo from "@/components/logo";
import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 40,
  height: 40,
};
export const contentType = "image/svg+xml";

// Image generation
export default function Icon() {
  return new ImageResponse(<Logo />, {
    ...size,
  });
}
