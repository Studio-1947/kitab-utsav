/*
  City photos for the Journey cards, from Wikimedia Commons.
  All are Creative Commons licensed: free to use with credit to the photographer.
  The site shows that credit on each card. Files are resized/cropped copies in public/cities.
*/
export type CityPhoto = {
  src: string;
  alt: string;
  author: string;
  license: string;
  licenseUrl: string;
  /** The original file page on Wikimedia Commons */
  source: string;
};

export const CITY_PHOTOS = {
  "bhopal-taj": {
    src: "/cities/bhopal-taj.webp",
    alt: "Taj-ul-Masajid reflected in the lake, Bhopal",
    author: "Sutanu Mandal",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    source: "https://commons.wikimedia.org/wiki/File:Taj-ul-masajid_and_lake.jpg",
  },
  banaras: {
    src: "/cities/banaras.webp",
    alt: "Boats and ghats along the Ganga, Banaras",
    author: "Vyacheslav Argenberg",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0",
    source: "https://commons.wikimedia.org/wiki/File:Varanasi,_India,_Varanasi_eternal.jpg",
  },
  "patna-golghar": {
    src: "/cities/patna-golghar3.webp",
    alt: "Golghar, the historic granary dome in Patna",
    author: "Sumitsurai",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    source: "https://commons.wikimedia.org/wiki/File:Golghar_-_Patna_(1).jpg",
  },
  chandigarh: {
    src: "/cities/chandigarh.webp",
    alt: "Le Corbusier's Palace of Assembly reflected in its pool, Chandigarh",
    author: "duncid",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
    source: "https://commons.wikimedia.org/wiki/File:Palace_of_Assembly_Chandigarh_2006.jpg",
  },
  lucknow: {
    src: "/cities/lucknow.webp",
    alt: "Bara Imambara complex seen from above, Lucknow",
    author: "Slyronit",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    source: "https://commons.wikimedia.org/wiki/File:View_of_Bara_Imambara,_Lucknow.jpg",
  },
  "bhopal-lake": {
    src: "/cities/bhopal-lake.webp",
    alt: "Boats on the Upper Lake, Bhopal",
    author: "Sgbot321",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    source: "https://commons.wikimedia.org/wiki/File:Upper_Lake,_Bhopal,_M.P.jpg",
  },
  mumbai: {
    src: "/cities/mumbai.webp",
    alt: "The Gateway of India lit up in the evening, Mumbai",
    author: "SriSriChinmaya",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    source: "https://commons.wikimedia.org/wiki/File:Gateway_of_India_in_the_evening,_Mumbai,_India.jpg",
  },
  "patna-buddha": {
    src: "/cities/patna-buddha.webp",
    alt: "The stupa at Buddha Smriti Park, Patna",
    author: "Shivamsetu",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    source: "https://commons.wikimedia.org/wiki/File:Buddha_Smriti_Park_Patna.jpg",
  },
  indore: {
    src: "/cities/indore.webp",
    alt: "Rajwada palace, Indore",
    author: "Bernard Gagnon",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    source: "https://commons.wikimedia.org/wiki/File:Rajwada_Palace,_Indore.jpg",
  },
  bareilly: {
    src: "/cities/bareilly.webp",
    alt: "Sunset over the rooftops of Bareilly",
    author: "Abhimanyu7793",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    source: "https://commons.wikimedia.org/wiki/File:Bareilly_Sunset.jpg",
  },
} satisfies Record<string, CityPhoto>;

export type CityPhotoKey = keyof typeof CITY_PHOTOS;
