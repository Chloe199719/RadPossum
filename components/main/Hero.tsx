import React from "react";

type Props = {};

function Hero({}: Props) {
  return (
    <section className="h-screen flex flex-col bg-gradient-to-r from-[#30bead]/30 to-[#ff7e84]/40 mx-auto items-center justify-center z-0 snap-center py-24">
      <div className="max-w-7xl">
        <h1>Test </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis
          provident dolore assumenda, obcaecati vero voluptates non ullam natus
          doloremque debitis animi sunt perferendis tempore esse commodi ipsam
          nam excepturi. Dolore?
        </p>
      </div>
    </section>
  );
}

export default Hero;
