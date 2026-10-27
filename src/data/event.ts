/*
  All Kitab Utsav content lives here. Edit this file to change the current
  edition, programme, authors, editions and FAQs.
*/
import type { IconName } from "@/components/ui/Icon";
import type { CityPhotoKey } from "./cities";

/* ---------------------------------------------------------------- */
/* Current edition                                                  */
/* ---------------------------------------------------------------- */

export const EVENT = {
  name: "Kitab Utsav",
  nameHi: "किताब उत्सव",
  host: "Rajkamal Prakashan",
  hostGroup: "Rajkamal Prakashan Samuh",
  city: "Bareilly",
  cityHi: "बरेली",
  year: 2026,
  startsAt: "2026-10-23T11:00:00+05:30",
  endsAt: "2026-10-27T20:00:00+05:30",
  dateLabel: "23 to 27 October 2026",
  dateShort: "23 to 27 October",
  hours: "Daily, 11 am to 8 pm",
  hoursShort: "11 am to 8 pm",
  venue: "Windermere Theatre, Balwant Singh Marg, Civil Lines, opposite Akshar Vihar, Bareilly",
  venueShort: "Windermere Theatre, Bareilly",
  mapQuery: "Windermere Auditorium, Balwant Singh Marg, Civil Lines, Bareilly, Uttar Pradesh 243001",
  partners: ["Windermere Theatre", "Speaking Tiger"],
  phones: [
    { label: "011 4263 8228", href: "tel:+911142638228" },
    { label: "+91 98102 81912", href: "tel:+919810281912" },
  ],
  email: "info@rajkamalprakashan.com",
  shopUrl: "https://rajkamalprakashan.com",
  instagram: { handle: "@kitab.utsav", href: "https://www.instagram.com/kitab.utsav/" },
  facebook: { handle: "@kitabutsav", href: "https://www.facebook.com/kitabutsav" },
  hashtag: "#साथजुड़ेंसाथपढ़ें",
  calendarUrl: "/kitab-utsav-bareilly.ics",
} as const;

export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(EVENT.mapQuery)}`;
export const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(EVENT.mapQuery)}&z=15&output=embed`;

/** Kitab Utsav so far */
export const JOURNEY_STATS = [
  { value: "5", label: "years" },
  { value: "7", label: "states" },
  { value: "11", label: "cities" },
  { value: "16", label: "editions" },
] as const;

/** Runs along the strip under the hero */
export const FORMATS = [
  "Author meets",
  "Poetry readings",
  "Book exhibition",
  "Book launches",
  "Conversations",
  "Workshops",
  "Children's literature",
  "Dastangoi",
] as const;

/* ---------------------------------------------------------------- */
/* Programme                                                        */
/* ---------------------------------------------------------------- */

export type SessionType = "Exhibition" | "Opening" | "Conversation" | "Book launch" | "Discussion" | "Reading";

export type Session = {
  time: string; // shown as written, e.g. "11 am - 8 pm"
  title?: string; // empty = "To be announced"
  type: SessionType;
};

export type FestivalDay = {
  date: string; // YYYY-MM-DD
  sessions: Session[];
};

const announcedLater: Session[] = [
  { time: "1 pm", type: "Conversation" },
  { time: "3 pm", type: "Book launch" },
  { time: "4:30 pm", type: "Discussion" },
  { time: "6 pm", type: "Reading" },
];

// Day 1 is the published outline. Days 2–5 follow the same daily outline until sessions are announced.
export const SCHEDULE: FestivalDay[] = [
  {
    date: "2026-10-23",
    sessions: [
      { time: "11 am - 8 pm", title: "Book exhibition", type: "Exhibition" },
      { time: "11:30 am", title: "Opening session", type: "Opening" },
      ...announcedLater,
    ],
  },
  ...["2026-10-24", "2026-10-25", "2026-10-26", "2026-10-27"].map((date) => ({
    date,
    sessions: [{ time: "11 am - 8 pm", title: "Book exhibition", type: "Exhibition" as const }, ...announcedLater],
  })),
];

export const SCHEDULE_NOTE = "Sessions and speakers will be announced soon. Below is the day-wise outline; for the latest, follow";

/* ---------------------------------------------------------------- */
/* Authors                                                          */
/* ---------------------------------------------------------------- */

export type Author = {
  name: string;
  nameHi: string;
  role: string;
  bio: string;
  city: string;
  year: number;
  /** Square portrait in public/authors (built by scripts/build-authors.mjs) */
  photo?: string;
  /** Announced as a speaker for the current edition */
  speaker?: boolean;
};

export const AUTHORS: Author[] = [
  {
    name: "Geetashree",
    nameHi: "गीताश्री", photo: "/authors/geetashree.webp",
    role: "Journalist and writer",
    bio: "Author of seven story collections, six novels and four research books on women's writing. Winner of the Ramnath Goenka Award for journalism (2008-09); a working journalist from 1991 to 2017, now an independent journalist and writer.",
    city: "Bareilly",
    year: 2026,
    speaker: true,
  },
  {
    name: "Sujata",
    nameHi: "सुजाता", photo: "/authors/sujata.webp",
    role: "Poet, novelist and critic",
    bio: "Founder of 'Chokher Bali', the first community feminist blog in Hindi. Author of 'Anantim Maun ke Beech', 'Stree-Nirmiti', 'Ek Bata Do', 'Daryaganj Via Bazaar Fatte Khan' and 'Alochana ka Streepaksh'; teaches at Delhi University.",
    city: "Bareilly",
    year: 2026,
    speaker: true,
  },
  {
    name: "Adnan Kafeel Darvesh",
    nameHi: "अदनान कफ़ील दरवेश", photo: "/authors/adnan-kafeel-darvesh.webp",
    role: "Poet",
    bio: "Winner of the Bharatbhushan Agrawal Award (2018). Poetry collections 'Laanat ka Pyala', 'Thithurte Lamp Post' and 'Neeli Bayaaz', translated into several Indian languages, English and Spanish.",
    city: "Bareilly",
    year: 2026,
    speaker: true,
  },
  { name: "Govind Mishra", nameHi: "गोविन्द मिश्र", role: "Novelist and story writer", bio: "Senior Hindi writer and recipient of the Saraswati Samman.", city: "Bhopal", year: 2022 },
  { name: "Rajesh Joshi", nameHi: "राजेश जोशी", photo: "/authors/rajesh-joshi.webp", role: "Poet, writer and playwright", bio: "A major voice in contemporary Hindi poetry and a Sahitya Akademi Award recipient.", city: "Bhopal", year: 2022 },
  { name: "Shivmurti", nameHi: "शिवमूर्ति", photo: "/authors/shivmurti.webp", role: "Story writer and novelist", bio: "A distinguished Hindi writer known for stories rooted in rural society and social change.", city: "Bhopal", year: 2023 },
  { name: "Kumar Ambuj", nameHi: "कुमार अम्बुज", photo: "/authors/kumar-ambuj.webp", role: "Poet and critic", bio: "An important contemporary Hindi poet, essayist and critic.", city: "Bhopal", year: 2025 },
  { name: "Naresh Saxena", nameHi: "नरेश सक्सेना", photo: "/authors/naresh-saxena.webp", role: "Poet", bio: "Senior poet celebrated for concise, musical and deeply humane poetry.", city: "Mumbai", year: 2026 },
  { name: "Geet Chaturvedi", nameHi: "गीत चतुर्वेदी", photo: "/authors/geet-chaturvedi.webp", role: "Poet and fiction writer", bio: "Contemporary Hindi writer working across poetry, fiction and translation.", city: "Bhopal", year: 2023 },
  { name: "Savita Bhargava", nameHi: "सविता भार्गव", role: "Poet", bio: "A strong contemporary Hindi poetic voice and active literary interlocutor.", city: "Bhopal", year: 2023 },
  { name: "Udayan Vajpeyi", nameHi: "उदयन वाजपेयी", photo: "/authors/udayan-vajpeyi.webp", role: "Poet, writer and translator", bio: "A multidisciplinary writer across poetry, fiction, essays and translation.", city: "Bhopal", year: 2023 },
  { name: "Nilesh Raghuvanshi", nameHi: "नीलेश रघुवंशी", role: "Poet and fiction writer", bio: "A leading contemporary Hindi poet and fiction writer.", city: "Bhopal", year: 2023 },
  { name: "Abdul Bismillah", nameHi: "अब्दुल बिस्मिल्लाह", photo: "/authors/abdul-bismillah.webp", role: "Novelist and story writer", bio: "An important Hindi writer of marginal lives and social realities.", city: "Bhopal", year: 2025 },
];

export const SPEAKERS = AUTHORS.filter((a) => a.speaker);

/* ---------------------------------------------------------------- */
/* What happens at the festival                                     */
/* ---------------------------------------------------------------- */

export const FEATURES: { icon: IconName; title: string; text: string }[] = [
  { icon: "chat", title: "Author meets", text: "Face to face with writers about their books and lives, with signings." },
  { icon: "bookOpen", title: "Readings", text: "Stories, poems and prose read in the writers' own voices." },
  { icon: "mic", title: "Discussions", text: "Open debate on books and the questions around us." },
  { icon: "sparkle", title: "Book launches", text: "New titles meeting readers for the first time." },
  { icon: "library", title: "Book exhibition", text: "Books from Rajkamal, Radhakrishna, Lokbharti and Rajkamal Urdu." },
  { icon: "stage", title: "Performances", text: "Dastangoi, folk performances and poetry evenings." },
  { icon: "pen", title: "Workshops", text: "Writing, translation and storytelling workshops." },
  { icon: "book", title: "Children's literature", text: "Story hours and book activities for young readers." },
  { icon: "signature", title: "Book signings", text: "Get your favourite book signed by its author." },
];

/* ---------------------------------------------------------------- */
/* Editions                                                         */
/* ---------------------------------------------------------------- */

export type Edition = {
  slug: string;
  city: string;
  year: number;
  dates: string;
  venue?: string;
  upcoming?: boolean;
};

/** Editions with full details on record, newest first */
export const EDITIONS: Edition[] = [
  { slug: "bareilly-2026", city: "Bareilly", year: 2026, dates: "23 to 27 October 2026", venue: "Windermere Theatre, Balwant Singh Marg, Civil Lines, opposite Akshar Vihar, Bareilly", upcoming: true },
  { slug: "indore-2026", city: "Indore", year: 2026, dates: "4 to 8 September 2026", venue: "Pritamlal Dua Sabhagrih, Ahilya Library campus, Regal Square, Indore" },
  { slug: "patna-2026", city: "Patna", year: 2026, dates: "3 to 7 April 2026", venue: "Bharatiya Nritya Kala Mandir, Patna" },
  { slug: "mumbai-2026", city: "Mumbai", year: 2026, dates: "6 to 10 February 2026", venue: "P.L. Deshpande Auditorium, Maharashtra Kala Academy, Ravindra Natya Mandir, Mumbai" },
  { slug: "bareilly-2025", city: "Bareilly", year: 2025, dates: "5 to 9 November 2025", venue: "Windermere Theatre, Balwant Singh Marg, Civil Lines, Bareilly" },
  { slug: "bhopal-2025", city: "Bhopal", year: 2025, dates: "6 to 10 September 2025", venue: "Hindi Bhawan, Bhopal" },
  { slug: "lucknow-2024", city: "Lucknow", year: 2024, dates: "January 2024", venue: "International Buddha Research Institute, Lucknow" },
  { slug: "chandigarh-2023", city: "Chandigarh", year: 2023, dates: "10 to 14 February 2023", venue: "Punjab Kala Bhawan, Sector 16, Chandigarh" },
  { slug: "patna-2022", city: "Patna", year: 2022, dates: "5 to 13 November 2022" },
];

/** City by city, in the order Kitab Utsav travelled */
export const JOURNEY: { city: string; when: string; slug?: string; photo: CityPhotoKey }[] = [
  { city: "Bhopal", when: "Where it began", photo: "bhopal-taj" },
  { city: "Banaras", when: "", photo: "banaras" },
  { city: "Patna", when: "2022", slug: "patna-2022", photo: "patna-golghar" },
  { city: "Chandigarh", when: "2023", slug: "chandigarh-2023", photo: "chandigarh" },
  { city: "Lucknow", when: "2024", slug: "lucknow-2024", photo: "lucknow" },
  { city: "Bhopal", when: "2025", slug: "bhopal-2025", photo: "bhopal-lake" },
  { city: "Mumbai", when: "2026", slug: "mumbai-2026", photo: "mumbai" },
  { city: "Patna", when: "2026", slug: "patna-2026", photo: "patna-buddha" },
  { city: "Indore", when: "2026", slug: "indore-2026", photo: "indore" },
  { city: "Bareilly", when: "Oct 2026", slug: "bareilly-2026", photo: "bareilly" },
];

export const EDITION_NUMBERS = {
  label: "Bhopal 2025, in numbers",
  title: "One edition, five days",
  stats: [
    { value: "5", label: "days" },
    { value: "32", label: "sessions" },
    { value: "100+", label: "writers and artists" },
    { value: "5000+", label: "books on display" },
  ],
} as const;

/* ---------------------------------------------------------------- */
/* FAQ, navigation                                                  */
/* ---------------------------------------------------------------- */

export const FAQS: { q: string; a: string }[] = [
  {
    q: "What is Kitab Utsav?",
    a: "Kitab Utsav is a festival of conversation between books, readers and writers, taken from city to city by Rajkamal Prakashan Samuh. Each edition usually runs for five days with writer and reader conversations, readings, panel discussions, book launches, cultural performances and an exhibition of books from the Rajkamal group.",
  },
  {
    q: "When and where is the next Kitab Utsav?",
    a: `Kitab Utsav ${EVENT.city} runs from ${EVENT.dateLabel}, daily from ${EVENT.hoursShort}, at ${EVENT.venue}.`,
  },
  {
    q: "Which cities has Kitab Utsav visited?",
    a: "Since its start in Bhopal, Kitab Utsav has reached Banaras, Patna, Chandigarh, Lucknow, Mumbai, Indore and Bareilly: sixteen editions in eleven cities across seven states, in five years.",
  },
  {
    q: "Can I buy books at the festival?",
    a: "Yes. Every edition has an exhibition of books from Rajkamal, Radhakrishna, Lokbharti and Rajkamal Urdu, open all day. The group's books are also available online at rajkamalprakashan.com.",
  },
];

export const NAV = [
  { href: "/festivals", label: "Festivals" },
  { href: "/events", label: "Events" },
  { href: "/authors", label: "Authors" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/visit", label: "Visit" },
] as const;
