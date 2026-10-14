import type { NextConfig } from "next";
import { PERSON } from "./src/lib/constants";

const nextConfig: NextConfig = {
  // The CV used to be served from public/; keep links shared before the move to Drive working.
  async redirects() {
    return [{ source: "/Vaibhav_Jain_Java_Backend_Developer_CV.pdf", destination: PERSON.cv, permanent: false }];
  },
};

export default nextConfig;
