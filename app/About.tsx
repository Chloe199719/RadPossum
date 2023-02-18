import Image from "next/image";
import React from "react";
import { SocialIcon } from "react-social-icons";

interface About {
  collectionId: string;
  collectionName: string;
  created: string;
  desc: string;
  id: string;
  updated: string;
}

interface Social {
  collectionId: string;
  collectionName: string;
  created: string;
  name: string;
  socialmedia_url: string;
  id: string;
  updated: string;
}

type Props = {};
const fetchAboutMe = async function () {
  try {
    const res = await fetch(
      `${process.env.DB_URL}api/collections/aboutme/records/`,
      { next: { revalidate: 100 } }
    );
    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e, "Error");
  }
};

const fetchSocialMedia = async function () {
  try {
    const res = await fetch(
      `${process.env.DB_URL}api/collections/social_media/records`,
      { next: { revalidate: 100 } }
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e, "Error");
  }
};

async function About({}: Props) {
  const aboutMeData = await fetchAboutMe();
  const socialMediaData = await fetchSocialMedia();
  return (
    <section className="min-h-screen snap-start md:snap-center flex flex-col items-center justify-center py-28 bg-zinc-200 ">
      <div className="max-w-7xl flex flex-col md:flex-row items-center justify-center relative gap-6 p-2 md:p-10 bg-gradient-to-r from-[#ff7e84]/40 to-[#30bead]/30 rounded-xl shadow-lg">
        <div className=" z-10">
          <Image
            className=" rounded-xl"
            src="/jana.jpg"
            alt="Jana"
            width={1500}
            height={2000}
          />
        </div>
        <div className="relative flex flex-col gap-4  z-10">
          <h1 className=" text-zinc-800 font-mono text-8xl uppercase tracking-widest ">
            About Me
          </h1>
          {aboutMeData?.items.map((e: About) => {
            return (
              <p key={e.id} className=" text-lg">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa,
                quisquam! Assumenda nulla eos rerum a fugiat, magni obcaecati
                molestias necessitatibus corrupti dolorem laborum est qui
                tempore voluptatem magnam suscipit voluptates.
              </p>
            );
          })}

          <h4 className="text-[#0c1327] text-6xl font-mono uppercase tracking-widest">
            Social Media
          </h4>
          <div className="flex gap-4">
            {socialMediaData.items.map((e: Social) => {
              return <SocialIcon key={e.id} url={e.socialmedia_url} />;
            })}
          </div>
        </div>
        <Image
          className=" absolute  top-0  left-0 opacity-80  z-[6]"
          src="/effect7.png"
          alt="hero"
          width={580}
          height={580}
        ></Image>
        <Image
          className="   absolute  bottom-2  -right-10 md:right-0 opacity-60 rotate-12 z-[6]"
          src="/effect4.png"
          alt="hero"
          width={180}
          height={180}
        ></Image>
      </div>
    </section>
  );
}

export default About;
