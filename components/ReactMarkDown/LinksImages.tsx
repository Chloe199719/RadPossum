import Image from "next/image";
type Props = {
  children: any;
  href: string;
};
function A({ children, href }: Props) {
  return (
    <a className="text-primary  link link-hover" href={href}>
      {children}
    </a>
  );
}

type img = {
  src: string;
  alt: string;
};
function IMG({ src, alt }: img) {
  return <img className=" text-center" src={src} alt={alt} width={200} />;
}

export { A, IMG };
