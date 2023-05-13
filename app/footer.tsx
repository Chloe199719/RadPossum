import Link from "next/link";
import Image from "next/image";
type Props = {};
function Footer({}: Props) {
  return (
    <div className="flex justify-center py-4 bg-gray-600 ">
      <footer className="footer p-10  text-white max-w-7xl ">
        <div>
          <Image
            className="hidden md:block w-12 h-12 rounded-full"
            src="/logo.jpg"
            alt="logo"
            width={48}
            height={48}
          />
          <p>
            Rad Possum
            <br />
            Providing reliable Services since 2022
          </p>
        </div>

        <div>
          <span className="footer-title">Our Work</span>
          <Link href={`/about`} className="link link-hover">
            About Me
          </Link>
          <Link href={`/contact`} className="link link-hover">
            Contact
          </Link>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <Link href={`/tos`} className="link link-hover">
            Terms of use
          </Link>
        </div>
      </footer>
    </div>
  );
}
export default Footer;
