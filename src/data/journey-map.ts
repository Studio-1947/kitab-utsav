/*
  Where each Kitab Utsav city sits on public/map.svg (viewBox 0 0 1977 2313).
  Positions were calibrated from latitude/longitude against known points on the map
  (Delhi, Chandigarh, Mumbai, Bengaluru, Varanasi, Kanyakumari, Indira Point).
*/
export const MAP_SIZE = { w: 1977, h: 2313 } as const;

export const MAP_CITIES: { city: string; cityHi: string; x: number; y: number }[] = [
  { city: "Bhopal", cityHi: "भोपाल", x: 660, y: 1073 },
  { city: "Banaras", cityHi: "बनारस", x: 986, y: 995 },
  { city: "Patna", cityHi: "पटना", x: 1109, y: 979 },
  { city: "Chandigarh", cityHi: "चंडीगढ़", x: 643, y: 573 },
  { city: "Lucknow", cityHi: "लखनऊ", x: 868, y: 884 },
  { city: "Mumbai", cityHi: "मुंबई", x: 369, y: 1298 },
  { city: "Indore", cityHi: "इंदौर", x: 567, y: 1088 },
  { city: "Bareilly", cityHi: "बरेली", x: 779, y: 746 },
];
