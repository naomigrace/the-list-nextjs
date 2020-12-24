import { CMS_NAME } from "@/lib/constants";
import Link from "next/link";

export default function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <Link href="/" passHref>
        <h1 className="cursor-pointer text-6xl md:text-8xl font-bold hover:text-purple-600 transition-colors duration-500 tracking-tighter leading-tight md:pr-8">
          {CMS_NAME}
        </h1>
      </Link>
    </section>
  );
}
