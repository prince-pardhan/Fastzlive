"use client";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import {
  Box,
  Container,
  Group,
  Text,
  Title,
  Badge,
  Stack,
  SimpleGrid,
  Anchor,
  Divider,
  TextInput,
  ActionIcon,
  Loader,
  Center,
  Alert,
  Grid,
  Button,
  UnstyledButton,
  Paper,
  Menu,
  Select,
  Pagination,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconSearch,
  IconSun,
  IconMoon,
  IconCloud,
  IconChevronLeft,
  IconLanguage,
  IconMapPin,
  IconWind,
  IconDroplet,
  IconClock,
  IconLink,
  IconCheck,
  IconExternalLink,
  IconTrendingUp,
  IconCalendar,
} from "@tabler/icons-react";
import { FaWhatsapp, FaYoutube, FaBloggerB, FaFacebookF } from "react-icons/fa";
import { RiTwitterXLine, RiSlideshow3Fill } from "react-icons/ri";
import { FaSquareFacebook } from "react-icons/fa6";
import { BsPinterest } from "react-icons/bs";

import { createClient } from "@base44/sdk";

// ─── Base44 sources ─────────────────────────────────────────────────────────
const BASE44_SOURCES = [
  { appId: "6ac73942c980e55d9137380b", entity: "News", label: "Source 1" },
  { appId: "6ac47ab69017eaaaca59d2b6", entity: "NewsArticle", label: "Source 2" },
  { appId: "6ac74166b60dfff87e4daa42", entity: "News", label: "Source 3" },
  { appId: "6ac739626c09d4a58a836242", entity: "News", label: "Source 4" },
  { appId: "6ac886b5654b5b3de6285403", entity: "News", label: "Source 5" },
  { appId: "6ac8879bc192246ca1e81374", entity: "News", label: "Source 6" },
  { appId: "6ac88f5d592444cfa59f9489", entity: "News", label: "Source 7" },
  { appId: "6ac9d498df194de5527bec19", entity: "News", label: "Source 8" },
  { appId: "6aa8e8cfd6878fb3c6c66a6d", entity: "News", label: "Source 9" },
  { appId: "6ac9d305c9956c412b63d620", entity: "Article", label: "Source 10" },
  { appId: "6ab4c278a87c64b26180c135", entity: "News", label: "Source 11" },
  { appId: "6a9fc3ec7fb02e0fe4f0af78", entity: "News", label: "Source 12" },
  { appId: "6ab4c3844cd0d31fd45fd867", entity: "News", label: "Source 13" },
  { appId: "6aa8edc0e27445204a122451", entity: "News", label: "Source 14" },
  { appId: "6ad5a10119c682645e9cf5dd", entity: "News", label: "Source 15" },
  { appId: "6ad5a094c13f37fe65e17d12", entity: "NewsArticle", label: "Source 16" },
  { appId: "6adadbbcd1a9f75d48aa7328", entity: "News", label: "Source 17" },
];

// ⚠️ Is token ko client code me mat rakhein (browser me sabko dikhta hai).
// Behtar: Next.js API route / server component se fetch karein.
const PERSONAL_ACCESS_TOKEN = "YOUR_PERSONAL_ACCESS_TOKEN";

// ─── Design tokens ──────────────────────────────────────────────────────────
const ACCENT = "#e30613";
const HEAD_FONT = "'Hind', 'Noto Sans Devanagari', system-ui, sans-serif";
const BODY_FONT = "'Inter', 'Noto Sans Devanagari', system-ui, -apple-system, sans-serif";
const HERO_COUNT = 4;
const ITEMS_PER_PAGE = 12;

const CATEGORIES = [
  { key: "all", label: "All News" },
  { key: "india", label: "India" },
  { key: "world", label: "World" },
  { key: "politics", label: "Politics" },
  { key: "business", label: "Business" },
  { key: "technology", label: "Technology" },
  { key: "sports", label: "Sports" },
  { key: "entertainment", label: "Entertainment" },
  { key: "education", label: "Education" },
  { key: "health", label: "Health" },
];

const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ml", label: "Malayalam", native: "മലയാളം" },
  { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { code: "ur", label: "Urdu", native: "اردو" },
];

const WEATHER_CITIES = [
  { name: "Delhi", state: "दिल्ली", lat: 28.6139, lon: 77.209 },
  { name: "Mumbai", state: "महाराष्ट्र", lat: 19.076, lon: 72.8777 },
  { name: "Kolkata", state: "पश्चिम बंगाल", lat: 22.5726, lon: 88.3639 },
  { name: "Chennai", state: "तमिलनाडु", lat: 13.0827, lon: 80.2707 },
  { name: "Bengaluru", state: "कर्नाटक", lat: 12.9716, lon: 77.5946 },
  { name: "Hyderabad", state: "तेलंगाना", lat: 17.385, lon: 78.4867 },
  { name: "Ahmedabad", state: "गुजरात", lat: 23.0225, lon: 72.5714 },
  { name: "Jaipur", state: "राजस्थान", lat: 26.9124, lon: 75.7873 },
  { name: "Lucknow", state: "उत्तर प्रदेश", lat: 26.8467, lon: 80.9462 },
  { name: "Chandigarh", state: "पंजाब/हरियाणा", lat: 30.7333, lon: 76.7794 },
  { name: "Bhopal", state: "मध्य प्रदेश", lat: 23.2599, lon: 77.4126 },
  { name: "Patna", state: "बिहार", lat: 25.5941, lon: 85.1376 },
  { name: "Guwahati", state: "असम", lat: 26.1445, lon: 91.7362 },
  { name: "Thiruvananthapuram", state: "केरल", lat: 8.5241, lon: 76.9366 },
  { name: "Ranchi", state: "झारखंड", lat: 23.3441, lon: 85.3096 },
  { name: "Raipur", state: "छत्तीसगढ़", lat: 21.2514, lon: 81.6296 },
];

const WEATHER_CODES: Record<number, { en: string; hi: string; icon: string }> = {
  0: { en: "Clear sky", hi: "साफ आसमान", icon: "☀️" },
  1: { en: "Mainly clear", hi: "मुख्यतः साफ", icon: "🌤️" },
  2: { en: "Partly cloudy", hi: "आंशिक बादल", icon: "⛅" },
  3: { en: "Overcast", hi: "घने बादल", icon: "☁️" },
  45: { en: "Fog", hi: "कोहरा", icon: "🌫️" },
  48: { en: "Rime fog", hi: "कोहरा", icon: "🌫️" },
  51: { en: "Light drizzle", hi: "हल्की बूंदाबांदी", icon: "🌦️" },
  53: { en: "Moderate drizzle", hi: "मध्यम बूंदाबांदी", icon: "🌦️" },
  55: { en: "Dense drizzle", hi: "तेज बूंदाबांदी", icon: "🌧️" },
  61: { en: "Slight rain", hi: "हल्की बारिश", icon: "🌧️" },
  63: { en: "Moderate rain", hi: "मध्यम बारिश", icon: "🌧️" },
  65: { en: "Heavy rain", hi: "तेज बारिश", icon: "🌧️" },
  71: { en: "Slight snow", hi: "हल्की बर्फबारी", icon: "❄️" },
  73: { en: "Moderate snow", hi: "मध्यम बर्फबारी", icon: "❄️" },
  75: { en: "Heavy snow", hi: "तेज बर्फबारी", icon: "❄️" },
  80: { en: "Slight rain showers", hi: "हल्की बौछारें", icon: "🌦️" },
  81: { en: "Moderate rain showers", hi: "मध्यम बौछारें", icon: "🌧️" },
  82: { en: "Violent rain showers", hi: "तेज बौछारें", icon: "⛈️" },
  95: { en: "Thunderstorm", hi: "आंधी-तूफान", icon: "⛈️" },
  96: { en: "Thunderstorm with hail", hi: "ओलावृष्टि के साथ तूफान", icon: "⛈️" },
  99: { en: "Thunderstorm with heavy hail", hi: "तेज ओलावृष्टि", icon: "⛈️" },
};

const UI_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    loading: "Loading news from all sources...",
    searchPlaceholder: "Search news, topics, or keywords",
    breaking: "Live",
    topNews: "Trending now",
    latest: "Latest news",
    noNews: "No news found. Try another category or search term.",
    backHome: "Back to home",
    moreNews: "Read next",
    publishedOn: "Published on",
    viewAll: "View all",
    weather: "Live weather",
    humidity: "Humidity",
    wind: "Wind",
    selectCity: "Select city / state",
    updated: "Updated",
    feelLike: "Feels like",
    readTime: "min read",
    share: "Share",
    copyLink: "Copy link",
    copied: "Link copied",
    original: "Read original source",
    translatingArticle: "Translating full article...",
    follow: "Follow us",
    home: "Home",
    india: "India",
    world: "World",
    business: "Business",
    sports: "Sports",
  },
  hi: {
    loading: "सभी स्रोतों से समाचार लोड हो रहे हैं...",
    searchPlaceholder: "समाचार, विषय या कीवर्ड खोजें",
    breaking: "लाइव",
    topNews: "अभी ट्रेंडिंग",
    latest: "ताज़ा समाचार",
    noNews: "कोई समाचार नहीं मिला। दूसरी श्रेणी या शब्द आज़माएं।",
    backHome: "होम पर वापस",
    moreNews: "यह भी पढ़ें",
    publishedOn: "प्रकाशित",
    viewAll: "सभी देखें",
    weather: "लाइव मौसम",
    humidity: "नमी",
    wind: "हवा",
    selectCity: "शहर / राज्य चुनें",
    updated: "अपडेट",
    feelLike: "महसूस",
    readTime: "मिनट पढ़ें",
    share: "शेयर करें",
    copyLink: "लिंक कॉपी करें",
    copied: "लिंक कॉपी हो गया",
    original: "मूल स्रोत पढ़ें",
    translatingArticle: "पूरा लेख अनुवाद हो रहा है...",
    follow: "हमें फॉलो करें",
    home: "होम",
    india: "भारत",
    world: "विश्व",
    business: "व्यापार",
    sports: "खेल",
  },
};

// ─── Pure helpers (outside component) ───────────────────────────────────────
const SOURCE_BY_APP: Record<string, { appId: string; entity: string; label: string }> = {};
BASE44_SOURCES.forEach((s) => (SOURCE_BY_APP[s.appId] = s));

const getUid = (item: any) => `${item._appId || "x"}_${item.id || item._id || item.title || ""}`;

function cleanText(input: string): string {
  return (input || "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/(h[1-6]|li|div)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\r/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// Sabse lamba text field le lete hain taaki poori news dikhe
function getRawBody(item: any): string {
  const fields = [item.content, item.body, item.description, item.summary, item.text, item.article, item.details];
  const cleaned = fields
    .filter((f) => typeof f === "string" && f.trim())
    .map((f) => cleanText(String(f)));
  if (!cleaned.length) return "";
  return cleaned.sort((a, b) => b.length - a.length)[0];
}

const getRawTitle = (item: any) => item.title || item.name || item.headline || "Untitled";
const getImageSrc = (item: any): string | null =>
  item.image || item.image_url || item.cover_image || item.thumbnail || item.imageUrl || null;
const getOriginalLink = (item: any): string | null =>
  item.source_url || item.url || item.link || item.original_url || null;

const getItemDate = (item: any): Date => {
  const d = item.created_date || item.createdAt || item.published_at || item.date;
  const parsed = d ? new Date(d) : new Date();
  return isNaN(parsed.getTime()) ? new Date() : parsed;
};

const getCategoryKey = (item: any) => {
  const cat = (item.category || item.badge || item.tag || "").toString().toLowerCase();
  if (cat.includes("politic")) return "politics";
  if (cat.includes("world") || cat.includes("international")) return "world";
  if (cat.includes("business") || cat.includes("economy") || cat.includes("sensex")) return "business";
  if (cat.includes("tech") || cat.includes("6g") || /\bai\b/.test(cat)) return "technology";
  if (cat.includes("sport") || cat.includes("cricket")) return "sports";
  if (cat.includes("entertain") || cat.includes("bollywood")) return "entertainment";
  if (cat.includes("education")) return "education";
  if (cat.includes("health")) return "health";
  return "india";
};

const getBadge = (item: any) => {
  const raw = (item.category || item.badge || item.tag || item.type || "News").toString().trim();
  return raw.charAt(0).toUpperCase() + raw.slice(1);
};

// text ko chhote tukdon me todta hai (translate API ki limit ke liye)
function splitChunks(text: string, max = 900): string[] {
  if (text.length <= max) return [text];
  const sentences = text.split(/(?<=[.!?।])\s+/);
  const chunks: string[] = [];
  let cur = "";
  for (const s of sentences) {
    if ((cur + " " + s).length > max && cur) {
      chunks.push(cur);
      cur = s;
    } else {
      cur = cur ? cur + " " + s : s;
    }
    while (cur.length > max) {
      chunks.push(cur.slice(0, max));
      cur = cur.slice(max);
    }
  }
  if (cur) chunks.push(cur);
  return chunks;
}

async function translateText(text: string, targetLang: string): Promise<string> {
  if (!text || targetLang === "en") return text;
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(
      text
    )}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data && data[0]) return data[0].map((x: any) => x[0]).join("");
    return text;
  } catch {
    return text;
  }
}

// poora article (paragraph by paragraph) translate
async function translateLong(text: string, targetLang: string): Promise<string> {
  const paragraphs = text.split(/\n+/).filter((p) => p.trim());
  const out: string[] = [];
  for (const p of paragraphs) {
    const parts = splitChunks(p);
    const translated: string[] = [];
    for (const part of parts) translated.push(await translateText(part, targetLang));
    out.push(translated.join(" "));
  }
  return out.join("\n\n");
}

async function getNewsById(appId: string, entity: string, recordId: string) {
  const base44 = createClient({
    appId,
    headers: { Authorization: `Bearer ${PERSONAL_ACCESS_TOKEN}` },
  });
  return await base44.entities[entity].get(recordId);
}

// ─── Image with letter fallback ─────────────────────────────────────────────
const LETTER_COLORS = [
  ["#e30613", "#7a0010"],
  ["#1d4ed8", "#172554"],
  ["#047857", "#022c22"],
  ["#c2410c", "#431407"],
  ["#6d28d9", "#2e1065"],
  ["#be185d", "#500724"],
  ["#0e7490", "#083344"],
  ["#4338ca", "#1e1b4b"],
];

function NewsImage({
  src,
  title,
  ratio,
  h,
  w,
  radius = 0,
  letterSize = "clamp(2rem, 6vw, 4rem)",
  style = {},
}: {
  src: string | null;
  title: string;
  ratio?: string;
  h?: number | string;
  w?: number | string;
  radius?: number;
  letterSize?: number | string;
  style?: CSSProperties;
}) {
  const [failed, setFailed] = useState(false);
  const letter = (title || "N").trim().charAt(0).toUpperCase() || "N";
  const [from, to] = LETTER_COLORS[letter.charCodeAt(0) % LETTER_COLORS.length];

  const box: CSSProperties = {
    width: w ?? "100%",
    height: h,
    aspectRatio: ratio,
    borderRadius: radius,
    overflow: "hidden",
    position: "relative",
    flexShrink: 0,
    background: `linear-gradient(140deg, ${from}, ${to})`,
    ...style,
  };

  if (src && !failed) {
    return (
      <div style={box}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={title}
          loading="lazy"
          onError={() => setFailed(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
    );
  }

  return (
    <div style={{ ...box, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span
        style={{
          fontFamily: HEAD_FONT,
          fontWeight: 800,
          fontSize: letterSize,
          color: "rgba(255,255,255,0.95)",
          lineHeight: 1,
          userSelect: "none",
        }}
      >
        {letter}
      </span>
    </div>
  );
}

// ─── Social links (ek jagah define, dono sections reuse) ────────────────────
const SOCIAL_GROUPS = [
  {
    title: "Fastzlive.com",
    links: [
      { label: "WhatsApp", href: "https://chat.whatsapp.com/IMG3IepRZXyGLxYeG9QXKH?s=cl&p=a&mlu=4&ilr=4", color: "#25D366", Icon: FaWhatsapp },
      { label: "X (Twitter)", href: "https://x.com/LiveUpdate_", color: "#0f172a", darkColor: "#f8fafc", Icon: RiTwitterXLine },
      { label: "YouTube", href: "https://www.youtube.com/@Fastzlive", color: "#FF0000", Icon: FaYoutube },
      { label: "Facebook 2", href: "https://www.facebook.com/share/19DnvapDcU/", color: "#1877F2", Icon: FaSquareFacebook },
    ],
  },
  {
    title: "Ramesh Kumar",
    links: [
      { label: "Support", href: "https://buymeacoffee.com/srk016361w", color: "#f59e0b", Icon: RiSlideshow3Fill },
      { label: "Blogger", href: "https://fastzlive.blogspot.com/", color: "#16a34a", Icon: FaBloggerB },
      { label: "Pinterest", href: "https://in.pinterest.com/Fastzlive/_profile/", color: "#E60023", Icon: BsPinterest },
      { label: "Facebook", href: "https://www.facebook.com/share/19eNsgpE4H/", color: "#1877F2", Icon: FaFacebookF },
    ],
  },
];

// ════════════════════════════════════════════════════════════════════════════
export default function Home() {
  const { setColorScheme } = useMantineColorScheme();

  const [news, setNews] = useState<any[]>([]);
  const [selectedNews, setSelectedNews] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLang, setSelectedLang] = useState("en");
  const [translatedCache, setTranslatedCache] = useState<Record<string, { title: string; desc: string }>>({});
  const [bodyCache, setBodyCache] = useState<Record<string, string>>({});
  const [translating, setTranslating] = useState(false);
  const [bodyTranslating, setBodyTranslating] = useState(false);
  const cacheRef = useRef<Record<string, { title: string; desc: string }>>({});

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [selectedCity, setSelectedCity] = useState(WEATHER_CITIES[0]);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [lastWeatherUpdate, setLastWeatherUpdate] = useState<Date | null>(null);

  const [urlId, setUrlId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const feedRef = useRef<HTMLDivElement | null>(null);

  // ─── Theme ────────────────────────────────────────────────────────────────
  const c = {
    bg: isDarkMode ? "#0b1018" : "#f2f4f8",
    card: isDarkMode ? "#141b27" : "#ffffff",
    border: isDarkMode ? "#243044" : "#e3e8ef",
    header: isDarkMode ? "#0f1520" : "#ffffff",
    text: isDarkMode ? "#f1f5f9" : "#0f172a",
    sub: isDarkMode ? "#94a3b8" : "#5b6679",
    input: isDarkMode ? "#1a2332" : "#eef1f6",
    ink: isDarkMode ? "#05080d" : "#0b1220",
    readText: isDarkMode ? "#d5deea" : "#1f2937",
  };

  const t = (key: string) => UI_TRANSLATIONS[selectedLang]?.[key] || UI_TRANSLATIONS.en[key] || key;

  // ─── Init: theme + url ────────────────────────────────────────────────────
  useEffect(() => {
    const saved = localStorage.getItem("liveupdate_dark_mode");
    if (saved !== null) setIsDarkMode(saved === "true");
    else setIsDarkMode(window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false);
  }, []);

  useEffect(() => {
    setColorScheme(isDarkMode ? "dark" : "light");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkMode]);

  useEffect(() => {
    const read = () => {
      const id = new URLSearchParams(window.location.search).get("id");
      setUrlId(id);
      if (!id) setSelectedNews(null);
    };
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      localStorage.setItem("liveupdate_dark_mode", String(!prev));
      return !prev;
    });
  };

  // ─── Fetch news ───────────────────────────────────────────────────────────
  useEffect(() => {
    async function fetchAllNews() {
      try {
        setLoading(true);
        setError(null);
        const results = await Promise.all(
          BASE44_SOURCES.map(async (source) => {
            try {
              const base44 = createClient({
                appId: source.appId,
                headers: { Authorization: `Bearer ${PERSONAL_ACCESS_TOKEN}` },
              });
              const records = await base44.entities[source.entity].list();
              return Array.isArray(records)
                ? records.map((r: any) => ({ ...r, _source: source.label, _entity: source.entity, _appId: source.appId }))
                : [];
            } catch (e: any) {
              console.warn(`Failed to fetch from ${source.label}:`, e?.message);
              return [];
            }
          })
        );
        const all = results.flat();
        all.sort((a, b) => getItemDate(b).getTime() - getItemDate(a).getTime());
        setNews(all);
      } catch (err: any) {
        setError(err?.message || "Failed to load news");
      } finally {
        setLoading(false);
      }
    }
    fetchAllNews();
  }, []);

  // ?id= se news open
  useEffect(() => {
    if (!urlId || news.length === 0) return;
    if (selectedNews && String(selectedNews.id || selectedNews._id) === String(urlId)) return;

    const found = news.find((n) => String(n.id || n._id || "") === String(urlId));
    if (found) {
      setSelectedNews(found);
      return;
    }
    (async () => {
      for (const source of BASE44_SOURCES) {
        try {
          const record = await getNewsById(source.appId, source.entity, urlId);
          if (record) {
            setSelectedNews({ ...record, _source: source.label, _entity: source.entity, _appId: source.appId });
            return;
          }
        } catch {
          /* next source */
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlId, news]);

  const selectNews = (item: any) => {
    setSelectedNews(item);
    const id = item.id || item._id;
    if (id) {
      const url = new URL(window.location.href);
      url.searchParams.set("id", String(id));
      window.history.pushState({}, "", url.toString());
      setUrlId(String(id));
    }
    window.scrollTo({ top: 0 });
  };

  const clearNews = () => {
    setSelectedNews(null);
    setUrlId(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("id");
    window.history.pushState({}, "", url.toString());
  };

  // reading progress (detail view)
  useEffect(() => {
    if (!selectedNews) {
      setProgress(0);
      return;
    }
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [selectedNews]);

  // ─── Weather ──────────────────────────────────────────────────────────────
  const fetchWeather = async (city: (typeof WEATHER_CITIES)[0]) => {
    try {
      setWeatherLoading(true);
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=Asia%2FKolkata`;
      const res = await fetch(url);
      const data = await res.json();
      if (data?.current) {
        setWeatherData(data.current);
        setLastWeatherUpdate(new Date());
      }
    } catch (err) {
      console.warn("Weather fetch failed:", err);
    } finally {
      setWeatherLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(selectedCity);
    const interval = setInterval(() => fetchWeather(selectedCity), 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [selectedCity]);

  // ─── Text getters (translation aware) ─────────────────────────────────────
  const getTitle = (item: any) => {
    const raw = getRawTitle(item);
    if (selectedLang === "en") return raw;
    return translatedCache[getUid(item) + "_" + selectedLang]?.title || raw;
  };

  const getExcerpt = (item: any) => {
    const raw = getRawBody(item);
    if (selectedLang === "en") return raw.slice(0, 420);
    return translatedCache[getUid(item) + "_" + selectedLang]?.desc || raw.slice(0, 250);
  };

  const getFullBody = (item: any) => {
    const raw = getRawBody(item) || "No description available.";
    if (selectedLang === "en") return raw;
    return bodyCache[getUid(item) + "_" + selectedLang] || raw;
  };

  const fmtDate = (item: any, long = false) =>
    getItemDate(item).toLocaleDateString("en-GB", { day: "numeric", month: long ? "long" : "short", year: "numeric" });

  const getTimeAgo = (item: any) => {
    const mins = Math.floor((Date.now() - getItemDate(item).getTime()) / 60000);
    const hi = selectedLang === "hi";
    if (mins < 60) return mins < 2 ? (hi ? "अभी अभी" : "Just now") : hi ? `${mins} मिनट पहले` : `${mins} min ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return hi ? `${hours} घंटे पहले` : `${hours} hr ago`;
    const days = Math.floor(hours / 24);
    return hi ? `${days} दिन पहले` : `${days} day${days > 1 ? "s" : ""} ago`;
  };

  const readMinutes = (item: any) => Math.max(1, Math.round(getRawBody(item).split(/\s+/).length / 200));

  // ─── Derived lists ────────────────────────────────────────────────────────
  const q = searchQuery.trim().toLowerCase();
  const filteredNews = news.filter((item) => {
    const okCat = activeCategory === "all" || getCategoryKey(item) === activeCategory;
    const okSearch =
      !q || getTitle(item).toLowerCase().includes(q) || getRawTitle(item).toLowerCase().includes(q) || getRawBody(item).toLowerCase().includes(q);
    return okCat && okSearch;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  const heroItems = filteredNews.slice(0, HERO_COUNT);
  const feedItems = filteredNews.slice(HERO_COUNT);
  const totalPages = Math.max(1, Math.ceil(feedItems.length / ITEMS_PER_PAGE));
  const pageItems = feedItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const showHero = currentPage === 1 && heroItems.length > 0;
  const showHighlights = activeCategory === "all" && !q && currentPage === 1;
  const trending = news.slice(0, 6);
  const tickerItems = news.slice(0, 10);

  const highlightSections = [
    { key: "india", title: t("india") },
    { key: "world", title: t("world") },
    { key: "business", title: t("business") },
    { key: "sports", title: t("sports") },
  ].map((s) => ({ ...s, items: news.filter((n) => getCategoryKey(n) === s.key).slice(0, 3) }));

  // jo items screen par dikhte hain, unhi ko translate karo
  const visibleIds = [...(showHero ? heroItems : []), ...pageItems, ...trending, ...highlightSections.flatMap((s) => s.items)]
    .map(getUid)
    .join("|");

  useEffect(() => {
    if (selectedLang === "en" || news.length === 0) return;
    let cancelled = false;
    const ids = new Set(visibleIds.split("|"));
    const targets = news.filter((n) => ids.has(getUid(n)));

    (async () => {
      setTranslating(true);
      for (const item of targets) {
        if (cancelled) return;
        const key = getUid(item) + "_" + selectedLang;
        if (cacheRef.current[key]) continue;
        const [title, desc] = await Promise.all([
          translateText(getRawTitle(item), selectedLang),
          translateText(getRawBody(item).slice(0, 250), selectedLang),
        ]);
        if (cancelled) return;
        cacheRef.current[key] = { title, desc };
        setTranslatedCache({ ...cacheRef.current });
      }
      if (!cancelled) setTranslating(false);
    })();
    return () => {
      cancelled = true;
      setTranslating(false);
    };
  }, [selectedLang, visibleIds, news]);

  // Detail: poora article translate
  useEffect(() => {
    if (!selectedNews || selectedLang === "en") return;
    const key = getUid(selectedNews) + "_" + selectedLang;
    if (bodyCache[key]) return;
    let cancelled = false;
    setBodyTranslating(true);
    (async () => {
      const [title, body] = await Promise.all([
        translateText(getRawTitle(selectedNews), selectedLang),
        translateLong(getRawBody(selectedNews), selectedLang),
      ]);
      if (cancelled) return;
      cacheRef.current[key] = { title, desc: cacheRef.current[key]?.desc || "" };
      setTranslatedCache({ ...cacheRef.current });
      setBodyCache((prev) => ({ ...prev, [key]: body }));
    })().finally(() => {
      if (!cancelled) setBodyTranslating(false);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNews, selectedLang]);

  // ─── Weather helpers ──────────────────────────────────────────────────────
  const getWeatherText = (code: number) => {
    const info = WEATHER_CODES[code] || { en: "Unknown", hi: "अज्ञात", icon: "🌡️" };
    return selectedLang === "hi" ? info.hi : info.en;
  };
  const getWeatherIcon = (code: number) => WEATHER_CODES[code]?.icon || "🌡️";

  // ─── Share ────────────────────────────────────────────────────────────────
  const shareUrl = () => (typeof window !== "undefined" ? window.location.href : "");
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const clickable = (item: any) => ({
    role: "link" as const,
    tabIndex: 0,
    onClick: () => selectNews(item),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter") selectNews(item);
    },
  });

  // ─── Global CSS ───────────────────────────────────────────────────────────
  const globalCss = `
    @import url('https://fonts.googleapis.com/css2?family=Hind:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');
    .fz-root { font-family: ${BODY_FONT}; }
    .fz-head { font-family: ${HEAD_FONT}; }
    .fz-click { cursor: pointer; }
    .fz-click:focus-visible { outline: 2px solid ${ACCENT}; outline-offset: 3px; }
    .fz-click:hover .fz-hl { color: ${ACCENT}; }
    .fz-hl { transition: color .15s; }
    .fz-ticker { display: flex; width: max-content; animation: fz-marquee 80s linear infinite; }
    .fz-ticker:hover { animation-play-state: paused; }
    @keyframes fz-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    @keyframes fz-pulse { 0%,100% { opacity: 1; } 50% { opacity: .25; } }
    .fz-live { width: 8px; height: 8px; border-radius: 50%; background: #fff; animation: fz-pulse 1.4s ease-in-out infinite; }
    .fz-row { display: flex; gap: 16px; }
    .fz-row-img { width: 240px; }
    @media (max-width: 640px) {
      .fz-row { flex-direction: column; gap: 10px; }
      .fz-row-img { width: 100%; }
    }
    .fz-hero-grid { display: grid; grid-template-columns: 1.6fr 1fr; gap: 16px; }
    @media (max-width: 900px) { .fz-hero-grid { grid-template-columns: 1fr; } }
    .fz-pg .mantine-Pagination-control { background: ${c.card}; border-color: ${c.border}; color: ${c.text}; }
    .fz-pg .mantine-Pagination-control[data-active] { background: ${ACCENT}; border-color: ${ACCENT}; color: #fff; }
    .fz-nav::-webkit-scrollbar { display: none; }
    .fz-nav { scrollbar-width: none; }
    @media (prefers-reduced-motion: reduce) {
      .fz-ticker, .fz-live { animation: none; }
    }
  `;

  // ─── Reusable blocks ──────────────────────────────────────────────────────
  const MetaLine = ({ item }: { item: any }) => (
    <Group gap={10} wrap="wrap">
      <Text size="xs" c={c.sub}>
        {fmtDate(item)}
      </Text>
      <Text size="xs" c={c.sub}>
        {getTimeAgo(item)}
      </Text>
      <Text size="xs" c={c.sub}>
        {readMinutes(item)} {t("readTime")}
      </Text>
    </Group>
  );

  // CEO block: public/ceo.jpeg + naam (sirf read more / detail page me)
  const CeoBadge = ({ compact = false }: { compact?: boolean }) => {
    const size = compact ? 30 : 56;
    return (
      <Group
        gap={compact ? 8 : 14}
        wrap="nowrap"
        mt={compact ? 8 : 0}
        p={compact ? 0 : "md"}
        style={
          compact
            ? undefined
            : { border: `1px solid ${c.border}`, borderRadius: 12, background: c.card }
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/ceo.jpeg"
          alt="Rahul Swami"
          style={{
            width: 110,
            height: 110,
            borderRadius: "70%",
            objectFit: "cover",
            flexShrink: 0,
            border: `0px solid ${ACCENT}`,
          }}
        />
        <Box style={{ minWidth: 0 }}>
         <Text
  size={compact ? "2xl" : "xl"}
  fw={900}
  c={c.text}
  style={{ lineHeight: 1.2 }}
>
  Rahul Swami (CEO)
</Text>
          <br />
          <Text
  size="sm"
  c={c.sub}
  style={{ lineHeight: 1.6 }}
>
  Chief Executive Officer (CEO) – Fastzlive

  Rahul Swami leads Fastzlive with a vision to deliver fast, accurate, and reliable news through modern digital journalism and technology.

  Vision: Making Fastzlive a trusted digital news brand.
</Text>
        </Box>
      </Group>
    );
  };

  const Header = ({ detail }: { detail?: boolean }) => (
    <Box
      component="header"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: c.header,
        borderBottom: `1px solid ${c.border}`,
      }}
    >
      <Container size="xl" py={10}>
        <Group justify="space-between" wrap="nowrap" gap="md">
          <UnstyledButton onClick={detail ? clearNews : () => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ flexShrink: 0 }}>
            <Group gap={8} wrap="nowrap">
              <Box
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  background: ACCENT,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: HEAD_FONT,
                  fontWeight: 700,
                  fontSize: 20,
                }}
              >
                F
              </Box>
              <Text className="fz-head" fw={700} style={{ fontSize: 24, color: c.text, letterSpacing: -0.5, lineHeight: 1 }}>
                Fastz<span style={{ color: ACCENT }}>live</span>
              </Text>
            </Group>
          </UnstyledButton>

          {!detail && (
            <TextInput
              placeholder={t("searchPlaceholder")}
              leftSection={<IconSearch size={16} color={c.sub} />}
              radius="xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
              visibleFrom="sm"
              styles={{
                root: { flex: 1, maxWidth: 460 },
                input: { background: c.input, color: c.text, border: `1px solid ${c.border}` },
              }}
            />
          )}

          <Group gap={6} wrap="nowrap" style={{ flexShrink: 0 }}>
            <Menu shadow="md" width={210} position="bottom-end">
              <Menu.Target>
                <Button
                  variant="light"
                  color="red"
                  radius="xl"
                  size="sm"
                  leftSection={<IconLanguage size={16} />}
                  loading={translating || bodyTranslating}
                >
                  {LANGUAGES.find((l) => l.code === selectedLang)?.native || "English"}
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                {LANGUAGES.map((lang) => (
                  <Menu.Item
                    key={lang.code}
                    onClick={() => setSelectedLang(lang.code)}
                    style={{
                      fontWeight: selectedLang === lang.code ? 700 : 400,
                      color: selectedLang === lang.code ? ACCENT : undefined,
                    }}
                  >
                    {lang.native} ({lang.label})
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>

            <ActionIcon
              variant="default"
              size="lg"
              radius="xl"
              onClick={toggleDarkMode}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <IconSun size={18} color="#f59e0b" /> : <IconMoon size={18} color="#475569" />}
            </ActionIcon>
          </Group>
        </Group>

        {!detail && (
          <TextInput
            mt={10}
            placeholder={t("searchPlaceholder")}
            leftSection={<IconSearch size={16} color={c.sub} />}
            radius="xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            hiddenFrom="sm"
            styles={{ input: { background: c.input, color: c.text, border: `1px solid ${c.border}` } }}
          />
        )}
      </Container>

      {detail && (
        <div style={{ height: 3, background: "transparent" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: ACCENT, transition: "width .1s linear" }} />
        </div>
      )}
    </Box>
  );

  const ShareRow = () => {
    const text = encodeURIComponent(selectedNews ? getTitle(selectedNews) : "Fastzlive");
    const url = encodeURIComponent(shareUrl());
    const btn: CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "8px 14px",
      borderRadius: 999,
      border: `1px solid ${c.border}`,
      background: c.card,
      color: c.text,
      fontSize: 13,
      fontWeight: 600,
      textDecoration: "none",
      cursor: "pointer",
    };
    return (
      <Group gap={8} wrap="wrap">
        <Text size="sm" fw={600} c={c.sub}>
          {t("share")}
        </Text>
        <a style={btn} href={`https://wa.me/?text=${text}%20${url}`} target="_blank" rel="noopener noreferrer">
          <FaWhatsapp size={16} color="#25D366" /> WhatsApp
        </a>
        <a style={btn} href={`https://twitter.com/intent/tweet?text=${text}&url=${url}`} target="_blank" rel="noopener noreferrer">
          <RiTwitterXLine size={15} /> X
        </a>
        <a style={btn} href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank" rel="noopener noreferrer">
          <FaFacebookF size={14} color="#1877F2" /> Facebook
        </a>
        <button style={btn} onClick={copyLink} type="button">
          {copied ? <IconCheck size={16} color="#16a34a" /> : <IconLink size={16} />} {copied ? t("copied") : t("copyLink")}
        </button>
      </Group>
    );
  };

  const SocialCard = () => (
    <Paper p="md" radius="md" withBorder bg={c.card} style={{ borderColor: c.border }}>
      <Text className="fz-head" fw={700} size="lg" c={c.text} mb="sm">
        {t("follow")}
      </Text>
      <Stack gap="md">
        {SOCIAL_GROUPS.map((g) => (
          <Box key={g.title}>
            <Text size="sm" fw={600} c={c.sub} mb={8}>
              {g.title}
            </Text>
            <SimpleGrid cols={4} spacing="xs">
              {g.links.map(({ label, href, color, darkColor, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                    padding: "10px 4px",
                    borderRadius: 10,
                    background: c.input,
                    color: isDarkMode && darkColor ? darkColor : color,
                    textDecoration: "none",
                  }}
                >
                  <Icon size={24} />
                  <span style={{ fontSize: 11, color: c.text, textAlign: "center", lineHeight: 1.2 }}>{label}</span>
                </a>
              ))}
            </SimpleGrid>
          </Box>
        ))}
      </Stack>
    </Paper>
  );

  // ─── States: loading / error ──────────────────────────────────────────────
  if (loading) {
    return (
      <Center h="100vh" bg={c.bg}>
        <style>{globalCss}</style>
        <Stack align="center" gap="md">
          <Loader size="lg" color={ACCENT} />
          <Text size="sm" c={c.sub} fw={500}>
            {t("loading")}
          </Text>
        </Stack>
      </Center>
    );
  }

  if (error) {
    return (
      <Container size="sm" py={80}>
        <Alert color="red" title="Error" radius="md">
          {error}
        </Alert>
      </Container>
    );
  }

  // ═══════════════════════ DETAIL VIEW ═══════════════════════════════════════
  if (selectedNews) {
    const item = selectedNews;
    const body = getFullBody(item);
    const paragraphs = body.split(/\n+/).filter((p) => p.trim());
    const origin = getOriginalLink(item);
    const related = news.filter((n) => getUid(n) !== getUid(item)).slice(0, 4);

    return (
      <Box className="fz-root" bg={c.bg} style={{ minHeight: "100vh" }}>
        <style>{globalCss}</style>
        <Header detail />

        <Container size={780} py={{ base: 24, md: 44 }}>
          <Button
            variant="subtle"
            color="gray"
            size="compact-sm"
            leftSection={<IconChevronLeft size={16} />}
            onClick={clearNews}
            mb="lg"
            styles={{ root: { color: c.sub } }}
          >
            {t("backHome")}
          </Button>

          <Group gap="sm" mb="md" wrap="wrap">
            <Badge color="red" size="lg" radius="sm" variant="filled" tt="none">
              {getBadge(item)}
            </Badge>
            <Group gap={6} wrap="nowrap">
              <IconCalendar size={15} color={c.sub} />
              <Text size="sm" c={c.sub}>
                {fmtDate(item, true)}
              </Text>
            </Group>
            <Group gap={6} wrap="nowrap">
              <IconClock size={15} color={c.sub} />
              <Text size="sm" c={c.sub}>
                {readMinutes(item)} {t("readTime")}
              </Text>
            </Group>
          </Group>

          <Title
            order={1}
            className="fz-head"
            mb="lg"
            style={{ fontSize: "clamp(1.7rem, 4.4vw, 2.7rem)", fontWeight: 700, lineHeight: 1.22, color: c.text, letterSpacing: -0.4 }}
          >
            {getTitle(item)}
          </Title>

          <Box mb="lg" style={{ borderRadius: 14, overflow: "hidden" }}>
            <NewsImage src={getImageSrc(item)} title={getRawTitle(item)} ratio="16 / 9" radius={14} letterSize="clamp(4rem, 14vw, 9rem)" />
          </Box>

          <Box mb="xl">
            <ShareRow />
          </Box>

          {bodyTranslating && selectedLang !== "en" && !bodyCache[getUid(item) + "_" + selectedLang] && (
            <Group gap={8} mb="md">
              <Loader size="xs" color={ACCENT} />
              <Text size="sm" c={c.sub}>
                {t("translatingArticle")}
              </Text>
            </Group>
          )}

          <Box>
            {paragraphs.map((p, i) => (
              <Text
                key={i}
                component="p"
                style={{
                  fontSize: 18,
                  lineHeight: 1.85,
                  color: c.readText,
                  margin: "0 0 1.2em",
                  maxWidth: "68ch",
                }}
              >
                {p}
              </Text>
            ))}
          </Box>

          {/* CEO — news ke neeche (sirf read more me) */}
          <Box my="lg">
            <CeoBadge />
          </Box>

          {origin && (
            <Button
              component="a"
              href={origin}
              target="_blank"
              rel="noopener noreferrer"
              variant="light"
              color="red"
              radius="md"
              leftSection={<IconExternalLink size={16} />}
              mt="sm"
            >
              {t("original")}
            </Button>
          )}

          <Divider my="xl" color={c.border} />
          <ShareRow />

          {related.length > 0 && (
            <Box mt={56}>
              <Title order={3} className="fz-head" mb="lg" c={c.text} style={{ fontSize: 26, fontWeight: 700 }}>
                {t("moreNews")}
              </Title>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                {related.map((n) => (
                  <Paper
                    key={getUid(n)}
                    {...clickable(n)}
                    className="fz-click"
                    p="sm"
                    radius="md"
                    withBorder
                    bg={c.card}
                    style={{ borderColor: c.border }}
                  >
                    <Group wrap="nowrap" gap="sm" align="flex-start">
                      <NewsImage src={getImageSrc(n)} title={getRawTitle(n)} w={96} h={80} radius={8} letterSize={34} />
                      <Box style={{ minWidth: 0 }}>
                        <Text className="fz-hl fz-head" fw={600} lineClamp={3} c={c.text} style={{ lineHeight: 1.35, fontSize: 16 }}>
                          {getTitle(n)}
                        </Text>
                        <Text size="xs" c={c.sub} mt={4}>
                          {getTimeAgo(n)}
                        </Text>
                      </Box>
                    </Group>
                  </Paper>
                ))}
              </SimpleGrid>
            </Box>
          )}
        </Container>
      </Box>
    );
  }

  // ═══════════════════════ HOME VIEW ═════════════════════════════════════════
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <Box className="fz-root" bg={c.bg} style={{ minHeight: "100vh" }}>
      <style>{globalCss}</style>

      {/* Utility strip */}
      <Box bg={c.ink} c="white">
        <Container size="xl" py={6}>
          <Group justify="space-between">
            <Text size="xs" c="gray.4">
              {today}
            </Text>
            <Text size="xs" c="gray.4" visibleFrom="xs">
              Fastzlive.com
            </Text>
          </Group>
        </Container>
      </Box>

      <Header />

      {/* Category nav */}
      <Box bg={c.header} style={{ borderBottom: `1px solid ${c.border}` }}>
        <Container size="xl">
          <div className="fz-nav" style={{ display: "flex", gap: 8, overflowX: "auto", padding: "10px 0" }}>
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat.key;
              return (
                <UnstyledButton
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  style={{
                    padding: "7px 16px",
                    borderRadius: 999,
                    whiteSpace: "nowrap",
                    fontSize: 14,
                    fontWeight: 600,
                    background: active ? ACCENT : c.input,
                    color: active ? "#fff" : c.text,
                    transition: "background .15s",
                  }}
                >
                  {cat.key === "all" ? t("home") : cat.label}
                </UnstyledButton>
              );
            })}
          </div>
        </Container>
      </Box>

      {/* Live ticker */}
      {tickerItems.length > 0 && (
        <Box bg={c.ink} c="white" style={{ overflow: "hidden" }}>
          <Container size="xl" p={0}>
            <Group wrap="nowrap" gap={0}>
              <Group
                gap={8}
                wrap="nowrap"
                px="md"
                py={9}
                style={{ background: ACCENT, flexShrink: 0, position: "relative", zIndex: 2 }}
              >
                <span className="fz-live" />
                <Text size="sm" fw={700} c="white">
                  {t("breaking")}
                </Text>
              </Group>
              <Box style={{ overflow: "hidden", flex: 1 }}>
                <div className="fz-ticker">
                  {[...tickerItems, ...tickerItems].map((n, i) => (
                    <UnstyledButton
                      key={getUid(n) + i}
                      onClick={() => selectNews(n)}
                      style={{ padding: "9px 28px", whiteSpace: "nowrap", color: "#e2e8f0", fontSize: 14 }}
                    >
                      {getTitle(n)}
                    </UnstyledButton>
                  ))}
                </div>
              </Box>
            </Group>
          </Container>
        </Box>
      )}

      <Container size="xl" py={{ base: 18, md: 28 }}>
        <Grid >
          {/* ═══ MAIN COLUMN ═══ */}
          <Grid.Col span={{ base: 12, lg: 8 }}>
            {/* Hero */}
            {showHero && (
              <div className="fz-hero-grid">
                <article
                  {...clickable(heroItems[0])}
                  className="fz-click"
                  style={{ position: "relative", borderRadius: 14, overflow: "hidden", minHeight: 400, background: c.ink }}
                >
                  <NewsImage
                    src={getImageSrc(heroItems[0])}
                    title={getRawTitle(heroItems[0])}
                    h="100%"
                    letterSize="clamp(5rem, 16vw, 10rem)"
                    style={{ position: "absolute", inset: 0 }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(5,8,13,0.95) 0%, rgba(5,8,13,0.55) 45%, rgba(5,8,13,0) 80%)",
                    }}
                  />
                  <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "22px 24px", color: "#fff" }}>
                    <Badge color="red" radius="sm" mb={10} tt="none">
                      {getBadge(heroItems[0])}
                    </Badge>
                    <h2
                      className="fz-head fz-hl"
                      style={{ fontSize: "clamp(1.4rem, 2.8vw, 2rem)", fontWeight: 700, lineHeight: 1.25, margin: "0 0 10px", color: "#fff" }}
                    >
                      {getTitle(heroItems[0])}
                    </h2>
                    <Text size="sm" c="gray.3" lineClamp={3} mb={10} style={{ maxWidth: "62ch" }}>
                      {getExcerpt(heroItems[0])}
                    </Text>
                    <Text size="xs" c="gray.4">
                      {fmtDate(heroItems[0])} · {getTimeAgo(heroItems[0])} · {readMinutes(heroItems[0])} {t("readTime")}
                    </Text>
                  </div>
                </article>

                <Stack gap="sm">
                  {heroItems.slice(1).map((item) => (
                    <Paper
                      key={getUid(item)}
                      {...clickable(item)}
                      className="fz-click"
                      p="sm"
                      radius="md"
                      withBorder
                      bg={c.card}
                      style={{ borderColor: c.border, flex: 1 }}
                    >
                      <Group wrap="nowrap" gap="sm" align="flex-start">
                        <NewsImage src={getImageSrc(item)} title={getRawTitle(item)} w={92} h={76} radius={8} letterSize={32} />
                        <Box style={{ minWidth: 0, flex: 1 }}>
                          <Text size="xs" fw={700} c={ACCENT} mb={2}>
                            {getBadge(item)}
                          </Text>
                          <Text className="fz-hl fz-head" fw={600} lineClamp={3} c={c.text} style={{ lineHeight: 1.3, fontSize: 16 }}>
                            {getTitle(item)}
                          </Text>
                          <Text size="xs" c={c.sub} mt={4}>
                            {getTimeAgo(item)}
                          </Text>
                        </Box>
                      </Group>
                    </Paper>
                  ))}
                </Stack>
              </div>
            )}

            {/* Category highlights */}
            {showHighlights && (
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mt="lg">
                {highlightSections.map((section) => (
                  <Paper key={section.key} p="md" radius="md" withBorder bg={c.card} style={{ borderColor: c.border }}>
                    <Group justify="space-between" mb="sm">
                      <Text className="fz-head" fw={700} c={c.text} style={{ fontSize: 19 }}>
                        {section.title}
                      </Text>
                      <Anchor
                        size="sm"
                        c={ACCENT}
                        fw={600}
                        component="button"
                        type="button"
                        onClick={() => setActiveCategory(section.key)}
                      >
                        {t("viewAll")}
                      </Anchor>
                    </Group>
                    {section.items.length === 0 ? (
                      <Text size="sm" c={c.sub}>
                        —
                      </Text>
                    ) : (
                      <Stack gap="sm">
                        {section.items.map((item, i) => (
                          <Box key={getUid(item)}>
                            {i > 0 && <Divider mb="sm" color={c.border} />}
                            <Group wrap="nowrap" gap="sm" align="flex-start" {...clickable(item)} className="fz-click">
                              {i === 0 && (
                                <NewsImage src={getImageSrc(item)} title={getRawTitle(item)} w={84} h={68} radius={8} letterSize={30} />
                              )}
                              <Box style={{ minWidth: 0, flex: 1 }}>
                                <Text
                                  className="fz-hl"
                                  fw={i === 0 ? 600 : 500}
                                  lineClamp={3}
                                  c={c.text}
                                  style={{ lineHeight: 1.35, fontSize: i === 0 ? 15 : 14 }}
                                >
                                  {getTitle(item)}
                                </Text>
                                <Text size="xs" c={c.sub} mt={3}>
                                  {getTimeAgo(item)}
                                </Text>
                              </Box>
                            </Group>
                          </Box>
                        ))}
                      </Stack>
                    )}
                  </Paper>
                ))}
              </SimpleGrid>
            )}

            {/* Feed */}
            <Box mt={showHero ? 34 : 0} ref={feedRef}>
              <Title order={2} className="fz-head" mb="md" c={c.text} style={{ fontSize: 28, fontWeight: 700 }}>
                {t("latest")}
              </Title>

              {filteredNews.length === 0 ? (
                <Center py={60}>
                  <Text c={c.sub}>{t("noNews")}</Text>
                </Center>
              ) : (
                <Stack gap={0}>
                  {pageItems.map((item, idx) => (
                    <Box key={getUid(item)}>
                      {idx > 0 && <Divider my={18} color={c.border} />}
                      <article {...clickable(item)} className="fz-click fz-row">
                        <div className="fz-row-img">
                          <NewsImage src={getImageSrc(item)} title={getRawTitle(item)} ratio="3 / 2" radius={10} letterSize={48} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <Group gap={8} mb={6}>
                            <Badge size="sm" variant="light" color="red" tt="none">
                              {getBadge(item)}
                            </Badge>
                            {item._source && (
                              <Text size="xs" c={c.sub}>
                                {item._source}
                              </Text>
                            )}
                          </Group>
                          <h3
                            className="fz-head fz-hl"
                            style={{ fontSize: 21, fontWeight: 700, lineHeight: 1.3, margin: "0 0 6px", color: c.text }}
                          >
                            {getTitle(item)}
                          </h3>
                          <Text size="sm" c={c.sub} lineClamp={3} mb={8} style={{ lineHeight: 1.6, maxWidth: "70ch" }}>
                            {getExcerpt(item)}
                          </Text>
                          <MetaLine item={item} />
                        </div>
                      </article>
                    </Box>
                  ))}
                </Stack>
              )}

              {feedItems.length > ITEMS_PER_PAGE && (
                <Group justify="center" mt="xl" mb="md" className="fz-pg">
                  <Pagination
                    total={totalPages}
                    value={currentPage}
                    onChange={(p) => {
                      setCurrentPage(p);
                      feedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    color="red"
                    radius="md"
                    withEdges
                    siblings={1}
                    boundaries={1}
                  />
                </Group>
              )}
            </Box>
          </Grid.Col>

          {/* ═══ SIDEBAR ═══ */}
          <Grid.Col span={{ base: 12, lg: 4 }}>
            <Stack gap="md">
              {/* Weather */}
              <Paper p="md" radius="md" withBorder bg={c.card} style={{ borderColor: c.border }}>
                <Group justify="space-between" mb="sm">
                  <Group gap={6}>
                    <IconCloud size={18} color={ACCENT} />
                    <Text className="fz-head" fw={700} c={c.text} style={{ fontSize: 17 }}>
                      {t("weather")}
                    </Text>
                  </Group>
                  {lastWeatherUpdate && (
                    <Text size="xs" c={c.sub}>
                      {t("updated")}: {lastWeatherUpdate.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                    </Text>
                  )}
                </Group>

                <Select
                  placeholder={t("selectCity")}
                  data={WEATHER_CITIES.map((x) => ({ value: x.name, label: `${x.name} (${x.state})` }))}
                  value={selectedCity.name}
                  onChange={(val) => {
                    const city = WEATHER_CITIES.find((x) => x.name === val);
                    if (city) setSelectedCity(city);
                  }}
                  allowDeselect={false}
                  size="xs"
                  radius="md"
                  mb="md"
                  styles={{ input: { background: c.input, color: c.text, borderColor: c.border } }}
                />

                {weatherLoading && !weatherData ? (
                  <Center py="md">
                    <Loader size="sm" color={ACCENT} />
                  </Center>
                ) : weatherData ? (
                  <Box>
                    <Group justify="space-between" align="flex-start" mb="xs">
                      <Box>
                        <Group gap={4} mb={2}>
                          <IconMapPin size={13} color={c.sub} />
                          <Text size="xs" c={c.sub}>
                            {selectedCity.name}
                          </Text>
                        </Group>
                        <Text className="fz-head" fw={700} style={{ fontSize: 44, lineHeight: 1 }} c={c.text}>
                          {Math.round(weatherData.temperature_2m)}°
                        </Text>
                        <Text size="sm" c={c.sub} mt={2}>
                          {t("feelLike")} {Math.round(weatherData.apparent_temperature)}°
                        </Text>
                      </Box>
                      <Box ta="right">
                        <Text style={{ fontSize: 44, lineHeight: 1 }}>{getWeatherIcon(weatherData.weather_code)}</Text>
                        <Text size="sm" fw={600} c={c.text} mt={4}>
                          {getWeatherText(weatherData.weather_code)}
                        </Text>
                      </Box>
                    </Group>
                    <Divider my="sm" color={c.border} />
                    <Group grow>
                      <Box ta="center">
                        <IconDroplet size={16} color="#38bdf8" />
                        <Text size="xs" c={c.sub}>
                          {t("humidity")}
                        </Text>
                        <Text size="sm" fw={700} c={c.text}>
                          {weatherData.relative_humidity_2m}%
                        </Text>
                      </Box>
                      <Box ta="center">
                        <IconWind size={16} color="#94a3b8" />
                        <Text size="xs" c={c.sub}>
                          {t("wind")}
                        </Text>
                        <Text size="sm" fw={700} c={c.text}>
                          {Math.round(weatherData.wind_speed_10m)} km/h
                        </Text>
                      </Box>
                    </Group>
                  </Box>
                ) : (
                  <Text size="sm" c={c.sub} ta="center">
                    Weather data unavailable
                  </Text>
                )}
              </Paper>

              {/* Trending */}
              <Paper p="md" radius="md" withBorder bg={c.card} style={{ borderColor: c.border }}>
                <Group gap={6} mb="md">
                  <IconTrendingUp size={18} color={ACCENT} />
                  <Text className="fz-head" fw={700} c={c.text} style={{ fontSize: 17 }}>
                    {t("topNews")}
                  </Text>
                </Group>
                <Stack gap="sm">
                  {trending.map((item, i) => (
                    <Box key={getUid(item)}>
                      <Group wrap="nowrap" gap="sm" align="flex-start" {...clickable(item)} className="fz-click">
                        <Text className="fz-head" fw={700} c={ACCENT} style={{ fontSize: 26, lineHeight: 1, minWidth: 22 }}>
                          {i + 1}
                        </Text>
                        <Box style={{ minWidth: 0 }}>
                          <Text className="fz-hl" fw={500} lineClamp={3} c={c.text} style={{ lineHeight: 1.4, fontSize: 14 }}>
                            {getTitle(item)}
                          </Text>
                          <Text size="xs" c={c.sub} mt={2}>
                            {getTimeAgo(item)}
                          </Text>
                        </Box>
                      </Group>
                      {i < trending.length - 1 && <Divider mt="sm" color={c.border} />}
                    </Box>
                  ))}
                </Stack>
              </Paper>

              <SocialCard />
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>

      {/* Footer */}
      <Box bg={c.ink} c="white" mt={30}>
        <Container size="xl" py="lg">
          <Group justify="space-between" gap="md">
            <Text className="fz-head" fw={700} style={{ fontSize: 20 }}>
              Fastz<span style={{ color: ACCENT }}>live</span>
            </Text>
            <Text size="xs" c="gray.5">
              © {new Date().getFullYear()} Fastzlive.com
            </Text>
          </Group>
        </Container>
      </Box>
    </Box>
  );
}