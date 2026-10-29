import { Hero } from "@/components/sections/Hero";
import { DayByDay, Features, Follow, Journey, Moments, Numbers, RecentEditions, Speakers, Writers } from "@/components/sections/HomeSections";
import { Faq } from "@/components/sections/Faq";
import { Register } from "@/components/sections/Register";

export default function Home() {
  return (
    <>
      <Hero />
      <DayByDay />
      <Speakers />
      <Writers />
      <Features />
      <Moments />
      <Journey />
      <Numbers />
      <RecentEditions />
      <Faq />
      <Register />
      <Follow />
    </>
  );
}
