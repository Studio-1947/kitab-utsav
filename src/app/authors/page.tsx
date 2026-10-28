import type { Metadata } from "next";
import { AUTHORS } from "@/data/event";
import { AuthorsDirectory } from "@/components/authors/AuthorsDirectory";

export const metadata: Metadata = {
  title: "Authors",
  description: "The writers, poets and speakers who have shared the Kitab Utsav stage, in one place.",
};

export default function AuthorsPage() {
  return <AuthorsDirectory authors={AUTHORS} />;
}
