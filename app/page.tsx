"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Group,
  Text,
  Title,
  Badge,
  Image,
  Stack,
  SimpleGrid,
  Card,
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
  ScrollArea,
  Paper,
  Menu,
} from "@mantine/core";
import {
  IconSearch,
  IconBell,
  IconUser,
  IconHome,
  IconFlame,
  IconSun,
  IconMoon,
  IconCloud,
  IconChevronLeft,
  IconLanguage,
} from "@tabler/icons-react";
import { FaWhatsapp } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";


import { createClient } from "@base44/sdk";

// ─── Multiple Base44 App Configs ────────────────────────────────────────────
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
];

const PERSONAL_ACCESS_TOKEN = "YOUR_PERSONAL_ACCESS_TOKEN"; // apna token daalein

const ACCENT = "#e30613";
const FONT = "'Inter', system-ui, -apple-system, sans-serif";

const CATEGORIES = [
  { key: "all", label: "All News", icon: "" },
  { key: "india", label: "India", icon: "" },
  { key: "world", label: "World", icon: "" },
  { key: "politics", label: "Politics", icon: "" },
  { key: "business", label: "Business", icon: "" },
  { key: "technology", label: "Technology", icon: "" },
  { key: "sports", label: "Sports", icon: "" },
  { key: "entertainment", label: "Entertainment", icon: "" },
  { key: "education", label: "Education", icon: "" },
  { key: "health", label: "Health", icon: "" },
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

const UI_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    loading: "Loading news from all sources...",
    searchPlaceholder: "Search news, topics, or keywords...",
    breaking: "Breaking News",
    topNews: "Top News",
    allNews: "— All News —",
    noNews: "No news found in this category.",
    backHome: "Back to Home",
    backAll: "← Back to All News",
    moreNews: "More News",
    publishedOn: "Published on",
    viewAll: "View All →",
    india: "India",
    world: "World",
    business: "Business",
    sports: "Sports",
  },
  hi: {
    loading: "सभी स्रोतों से समाचार लोड हो रहे हैं...",
    searchPlaceholder: "समाचार, विषय या कीवर्ड खोजें...",
    breaking: "ब्रेकिंग न्यूज़",
    topNews: "टॉप न्यूज़",
    allNews: "— सभी समाचार —",
    noNews: "इस श्रेणी में कोई समाचार नहीं मिला।",
    backHome: "होम पर वापस जाएं",
    backAll: "← सभी समाचारों पर वापस",
    moreNews: "अन्य समाचार",
    publishedOn: "प्रकाशित तिथि",
    viewAll: "सभी देखें →",
    india: "भारत",
    world: "विश्व",
    business: "व्यापार",
    sports: "खेल",
  },
};

export default function Home() {
  const [news, setNews] = useState<any[]>([]);
  const [selectedNews, setSelectedNews] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLang, setSelectedLang] = useState("en");
  const [translatedCache, setTranslatedCache] = useState<Record<string, { title: string; desc: string }>>({});
  const [translating, setTranslating] = useState(false);

  // ─── DARK MODE STATE ───────────────────────────────────────────────────────
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Load saved dark mode preference
  useEffect(() => {
    const saved = localStorage.getItem("liveupdate_dark_mode");
    if (saved !== null) {
      setIsDarkMode(saved === "true");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem("liveupdate_dark_mode", String(next));
      return next;
    });
  };

  // Color tokens based on dark mode
  const themeColors = {
    bg: isDarkMode ? "#090d16" : "#f8fafc",
    cardBg: isDarkMode ? "#151d2f" : "#ffffff",
    cardBorder: isDarkMode ? "#253248" : "#e2e8f0",
    headerBg: isDarkMode ? "#0f172a" : "#ffffff",
    textPrimary: isDarkMode ? "#f8fafc" : "#0f172a",
    textSecondary: isDarkMode ? "#94a3b8" : "#64748b",
    inputBg: isDarkMode ? "#1e293b" : "#f1f5f9",
  };

  useEffect(() => {
    async function fetchAllNews() {
      try {
        setLoading(true);
        setError(null);
        const allResults: any[] = [];
        const promises = BASE44_SOURCES.map(async (source) => {
          try {
            const base44 = createClient({
              appId: source.appId,
              headers: {
                Authorization: `Bearer ${PERSONAL_ACCESS_TOKEN}`,
              },
            });
            const records = await base44.entities[source.entity].list();
            if (Array.isArray(records)) {
              return records.map((r: any) => ({
                ...r,
                _source: source.label,
                _entity: source.entity,
                _appId: source.appId,
              }));
            }
            return [];
          } catch (srcErr: any) {
            console.warn(`Failed to fetch from ${source.label}:`, srcErr?.message);
            return [];
          }
        });
        const results = await Promise.all(promises);
        results.forEach((arr) => allResults.push(...arr));

        allResults.sort((a, b) => {
          const dateA = new Date(
            a.created_date || a.createdAt || a.published_at || a.date || 0
          ).getTime();
          const dateB = new Date(
            b.created_date || b.createdAt || b.published_at || b.date || 0
          ).getTime();
          return dateB - dateA;
        });
        setNews(allResults);
      } catch (err: any) {
        console.error(err);
        setError(err?.message || "Failed to load news");
      } finally {
        setLoading(false);
      }
    }
    fetchAllNews();
  }, []);

  // ─── GOOGLE TRANSLATE API HELPER (Reliable & Fast) ─────────────────────────
  async function translateText(text: string, targetLang: string): Promise<string> {
    if (!text || targetLang === "en") return text;
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data && data[0]) {
        return data[0].map((item: any) => item[0]).join("");
      }
      return text;
    } catch (err) {
      console.warn("Translation failed:", err);
      return text;
    }
  }

  // Auto-translate news items when language changes
  useEffect(() => {
    if (selectedLang === "en" || news.length === 0) return;

    let isMounted = true;
    async function doTranslate() {
      setTranslating(true);
      const toTranslate = filteredNews.slice(0, 25);
      const newCache: Record<string, { title: string; desc: string }> = { ...translatedCache };

      for (const item of toTranslate) {
        const id = item.id || (item.title || item.name || "item");
        const cacheKey = id + "_" + selectedLang;

        if (newCache[cacheKey]) continue;

        const rawTitle = item.title || item.name || item.headline || "";
        const rawDesc = (item.description || item.content || item.summary || item.body || "").slice(0, 250);

        try {
          const [tTitle, tDesc] = await Promise.all([
            translateText(rawTitle, selectedLang),
            translateText(rawDesc, selectedLang),
          ]);
          newCache[cacheKey] = { title: tTitle, desc: tDesc };
        } catch {
          // ignore error
        }
      }

      if (isMounted) {
        setTranslatedCache(newCache);
        setTranslating(false);
      }
    }

    doTranslate();
    return () => {
      isMounted = false;
    };
  }, [selectedLang, news, activeCategory]);

  const t = (key: string) => {
    return UI_TRANSLATIONS[selectedLang]?.[key] || UI_TRANSLATIONS.en[key] || key;
  };

  const getImage = (item: any) =>
    item.image ||
    item.image_url ||
    item.cover_image ||
    item.thumbnail ||
    "https://images.unsplash.com/photo-1504711434869-e1ff66873b80?w=800&h=500&fit=crop";

  const getTitle = (item: any) => {
    const raw = item.title || item.name || item.headline || "Untitled";
    if (selectedLang === "en") return raw;
    const id = item.id || raw;
    return translatedCache[id + "_" + selectedLang]?.title || raw;
  };

  const getDesc = (item: any) => {
    const raw =
      item.description ||
      item.content ||
      item.summary ||
      item.body ||
      "No description available.";
    if (selectedLang === "en") return raw;
    const id = item.id || (item.title || item.name || "item");
    return translatedCache[id + "_" + selectedLang]?.desc || raw;
  };

  const getDate = (item: any) => {
    const d = item.created_date || item.createdAt || item.published_at || item.date || Date.now();
    return new Date(d).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getFullDate = (item: any) => {
    const d = item.created_date || item.createdAt || item.published_at || item.date || Date.now();
    return new Date(d).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getTimeAgo = (item: any) => {
    const d = new Date(item.created_date || item.createdAt || item.published_at || item.date || Date.now());
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours} hr ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  };

  const getBadge = (item: any) =>
    (item.category || item.badge || item.tag || item.type || "News").toString().toUpperCase();

  const getCategoryKey = (item: any) => {
    const cat = (item.category || item.badge || item.tag || "").toString().toLowerCase();
    if (cat.includes("politic")) return "politics";
    if (cat.includes("world") || cat.includes("international")) return "world";
    if (cat.includes("business") || cat.includes("economy") || cat.includes("sensex")) return "business";
    if (cat.includes("tech") || cat.includes("6g") || cat.includes("ai")) return "technology";
    if (cat.includes("sport") || cat.includes("cricket")) return "sports";
    if (cat.includes("entertain") || cat.includes("bollywood")) return "entertainment";
    if (cat.includes("education")) return "education";
    if (cat.includes("health")) return "health";
    return "india";
  };

  const filteredNews = news.filter((item) => {
    const matchesCategory = activeCategory === "all" || getCategoryKey(item) === activeCategory;
    const matchesSearch =
      !searchQuery ||
      getTitle(item).toLowerCase().includes(searchQuery.toLowerCase()) ||
      getDesc(item).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featured = filteredNews[0];
  const sideNews = filteredNews.slice(1, 5);
  const topNews = filteredNews.slice(0, 5);
  const indiaNews = filteredNews.filter((n) => getCategoryKey(n) === "india").slice(0, 1);
  const worldNews = filteredNews.filter((n) => getCategoryKey(n) === "world").slice(0, 1);
  const businessNews = filteredNews.filter((n) => getCategoryKey(n) === "business").slice(0, 1);
  const sportsNews = filteredNews.filter((n) => getCategoryKey(n) === "sports").slice(0, 1);

  // ─── LOADING ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <Center h="100vh" bg={themeColors.bg}>
        <Stack align="center" gap="md">
          <Loader size="xl" color={ACCENT} />
          <Text size="sm" c={themeColors.textSecondary} fw={500}>
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

  // ─── DETAIL VIEW ──────────────────────────────────────────────────────────
  if (selectedNews) {
    const item = selectedNews;
    return (
      <Box bg={themeColors.bg} style={{ minHeight: "100vh", fontFamily: FONT, transition: "background 0.2s" }}>
        {/* Sticky Detail Header */}
        <Box
          bg={themeColors.headerBg}
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            borderBottom: `1px solid ${themeColors.cardBorder}`,
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <Container size="lg" py="sm">
            <Group justify="space-between">
              <Group gap="xs">
                <Box
                  style={{
                    width: 32,
                    height: 32,
                    background: ACCENT,
                    borderRadius: 6,
                  }}
                />
                <Text fw={800} size="lg" style={{ color: ACCENT }}>
                  Fastzlive
                </Text>
              </Group>
              <Group gap="xs">
                <ActionIcon
                  variant="default"
                  size="lg"
                  radius="xl"
                  onClick={toggleDarkMode}
                  title={isDarkMode ? "Light Mode" : "Dark Mode"}
                >
                  {isDarkMode ? <IconSun size={18} color="#f59e0b" /> : <IconMoon size={18} color="#475569" />}
                </ActionIcon>
                <Button
                  variant="light"
                  color="gray"
                  radius="md"
                  size="sm"
                  leftSection={<IconChevronLeft size={16} />}
                  onClick={() => setSelectedNews(null)}
                >
                  {t("backHome")}
                </Button>
              </Group>
            </Group>
          </Container>
        </Box>

        <Container size="md" py={{ base: 30, md: 50 }}>
          <Group gap="sm" mb="md">
            <Badge color="red" size="lg" radius="sm" variant="filled">
              {getBadge(item)}
            </Badge>
            {item._source && (
              <Badge color={isDarkMode ? "gray" : "dark"} size="sm" variant="outline">
                {item._source}
              </Badge>
            )}
            <Text size="sm" c={themeColors.textSecondary} fw={500}>
              {getFullDate(item)}
            </Text>
          </Group>

          <Title
            order={1}
            mb="xl"
            style={{
              fontSize: "clamp(1.6rem, 4vw, 2.6rem)",
              fontWeight: 800,
              lineHeight: 1.25,
              color: themeColors.textPrimary,
            }}
          >
            {getTitle(item)}
          </Title>

          <Box
            mb="xl"
            style={{
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
            }}
          >
            <Image
              src={getImage(item)}
              alt={getTitle(item)}
              h={{ base: 240, sm: 380, md: 460 }}
              fit="cover"
            />
          </Box>

          <Paper
            p={{ base: "lg", sm: "xl" }}
            radius="md"
            withBorder
            bg={themeColors.cardBg}
            style={{ borderColor: themeColors.cardBorder }}
          >
            <Text
              style={{
                fontSize: 17,
                lineHeight: 1.85,
                color: isDarkMode ? "#cbd5e1" : "#334155",
                whiteSpace: "pre-line",
              }}
            >
              {getDesc(item)}
            </Text>
            <Divider my="xl" color={themeColors.cardBorder} />
            <Group justify="space-between">
              <Box>
                <Text size="xs" c={themeColors.textSecondary}>
                  {t("publishedOn")}
                </Text>
                <Text size="sm" fw={600} c={themeColors.textPrimary}>
                  {getFullDate(item)}
                </Text>
              </Box>
              <Button variant="filled" color="red" radius="md" onClick={() => setSelectedNews(null)}>
                {t("backAll")}
              </Button>
            </Group>
          </Paper>

          {/* More News */}
          {news.length > 1 && (
            <Box mt={50}>
              <Title order={3} mb="lg" fw={700} c={themeColors.textPrimary}>
                {t("moreNews")}
              </Title>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                {news
                  .filter((n) => n.id !== item.id)
                  .slice(0, 4)
                  .map((n) => (
                    <Card
                      key={n.id || Math.random()}
                      padding="sm"
                      radius="md"
                      withBorder
                      bg={themeColors.cardBg}
                      style={{ cursor: "pointer", borderColor: themeColors.cardBorder }}
                      onClick={() => setSelectedNews(n)}
                    >
                      <Group wrap="nowrap" gap="sm">
                        <Image src={getImage(n)} w={72} h={72} radius={8} fit="cover" />
                        <Box>
                          <Text size="sm" fw={600} lineClamp={2} c={themeColors.textPrimary}>
                            {getTitle(n)}
                          </Text>
                          <Text size="xs" c={themeColors.textSecondary} mt={4}>
                            {getDate(n)}
                          </Text>
                        </Box>
                      </Group>
                    </Card>
                  ))}
              </SimpleGrid>
            </Box>
          )}
        </Container>
      </Box>
    );
  }

  // ─── MAIN LIST VIEW ───────────────────────────────────────────────────────
  return (
    <Box bg={themeColors.bg} style={{ minHeight: "100vh", fontFamily: FONT, transition: "background 0.2s" }}>
      {/* ═══════ TOP HEADER ═══════ */}
      <Box
        bg={themeColors.headerBg}
        style={{
          borderBottom: `1px solid ${themeColors.cardBorder}`,
          transition: "background 0.2s",
        }}
      >
        <Container size="xl" py="sm">
          <Group justify="space-between" align="center" wrap="nowrap">
            {/* Logo */}
            <Group gap={8} style={{ flexShrink: 0 }}>
              <Text fw={900} size="xl" style={{ color: ACCENT, letterSpacing: -0.5, lineHeight: 1 }}>
                Fastzlive
              </Text>
            </Group>

            {/* Search */}
            <TextInput
              placeholder={t("searchPlaceholder")}
              leftSection={<IconSearch size={16} color={themeColors.textSecondary} />}
              radius="xl"
              size="sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
              styles={{
                root: { flex: 1, maxWidth: 480, margin: "0 24px" },
                input: {
                  background: themeColors.inputBg,
                  color: themeColors.textPrimary,
                  border: `1px solid ${themeColors.cardBorder}`,
                  fontSize: 14,
                },
              }}
              visibleFrom="sm"
            />

            {/* Right icons + Language + Dark Mode */}
            <Group gap="xs" style={{ flexShrink: 0 }}>
              {/* Language Selector */}
              <Menu shadow="md" width={200} position="bottom-end">
                <Menu.Target>
                  <Button
                    variant="light"
                    color="red"
                    radius="xl"
                    size="sm"
                    leftSection={<IconLanguage size={16} />}
                    loading={translating}
                  >
                    {LANGUAGES.find((l) => l.code === selectedLang)?.native || "English"}
                  </Button>
                </Menu.Target>
                <Menu.Dropdown bg={themeColors.cardBg} style={{ borderColor: themeColors.cardBorder }}>
                  <Menu.Label c={themeColors.textSecondary}>भारतीय भाषाएँ (Select Language)</Menu.Label>
                  {LANGUAGES.map((lang) => (
                    <Menu.Item
                      key={lang.code}
                      onClick={() => setSelectedLang(lang.code)}
                      style={{
                        fontWeight: selectedLang === lang.code ? 700 : 400,
                        color: selectedLang === lang.code ? ACCENT : themeColors.textPrimary,
                        background:
                          selectedLang === lang.code
                            ? isDarkMode
                              ? "#3b1216"
                              : "#fef2f2"
                            : "transparent",
                      }}
                    >
                      {lang.native} ({lang.label})
                    </Menu.Item>
                  ))}
                </Menu.Dropdown>
              </Menu>

              {/* Dark Mode Toggle */}
              <ActionIcon
                variant="subtle"
                color="gray"
                size="lg"
                radius="xl"
                onClick={toggleDarkMode}
                title={isDarkMode ? "Light Mode" : "Dark Mode"}
              >
                {isDarkMode ? <IconSun size={20} color="#f59e0b" /> : <IconMoon size={20} color="#334155" />}
              </ActionIcon>

              <ActionIcon variant="subtle" color="gray" size="lg" radius="xl" style={{ position: "relative" }}>
                <IconBell size={18} color={themeColors.textSecondary} />
                <Box
                  style={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    width: 16,
                    height: 16,
                    background: ACCENT,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    color: "white",
                    fontWeight: 700,
                  }}
                >
                  3
                </Box>
              </ActionIcon>
              <ActionIcon variant="subtle" color="gray" size="lg" radius="xl">
                <IconUser size={18} color={themeColors.textSecondary} />
              </ActionIcon>
            </Group>
          </Group>
        </Container>
      </Box>

      {/* ═══════ NAVIGATION BAR ═══════ */}
      <Box bg="#0a0f1d" c="white">
        <Container size="xl">
          <Group gap={0} wrap="nowrap" style={{ overflowX: "auto" }}>
            <UnstyledButton
              px="md"
              py={12}
              style={{
                background: activeCategory === "all" ? ACCENT : "transparent",
                display: "flex",
                alignItems: "center",
                gap: 6,
                whiteSpace: "nowrap",
              }}
              onClick={() => setActiveCategory("all")}
            >
              <IconHome size={16} />
              <Text size="sm" fw={600}>
                Home
              </Text>
            </UnstyledButton>
            {CATEGORIES.slice(1).map((cat) => (
              <UnstyledButton
                key={cat.key}
                px="md"
                py={12}
                style={{
                  background: activeCategory === cat.key ? ACCENT : "transparent",
                  whiteSpace: "nowrap",
                }}
                onClick={() => setActiveCategory(cat.key)}
              >
                <Text size="sm" fw={500}>
                  {cat.label}
                </Text>
              </UnstyledButton>
            ))}
          </Group>
        </Container>
      </Box>

      {/* ═══════ BREAKING NEWS BAR ═══════ */}
      <Box
        bg={isDarkMode ? "#2c0b0e" : "#fef2f2"}
        style={{ borderBottom: `1px solid ${isDarkMode ? "#4c1218" : "#fecaca"}` }}
      >
        <Container size="xl" py={10}>
          <Group justify="space-between" wrap="nowrap">
            <Group gap="md" wrap="nowrap" style={{ overflow: "hidden" }}>
              <Badge
                color="red"
                size="lg"
                radius="sm"
                leftSection={<IconFlame size={14} />}
                style={{ flexShrink: 0 }}
              >
                {t("breaking")}
              </Badge>
              <Text
                size="sm"
                fw={600}
                style={{ color: isDarkMode ? "#fca5a5" : "#7f1d1d" }}
                lineClamp={1}
              >
                {featured ? getTitle(featured) : t("breaking")}
              </Text>
            </Group>
          </Group>
        </Container>
      </Box>

      {/* ═══════ MAIN CONTENT ═══════ */}
      <Container size="xl" py={{ base: 20, md: 28 }}>
        <Grid>
          {/* LEFT – Featured + Side Stories */}
          <Grid.Col span={{ base: 12, lg: 8 }}>
            <Grid>
              {/* Big Featured */}
              <Grid.Col span={{ base: 12, md: 7 }}>
                {featured && (
                  <Box
                    style={{
                      position: "relative",
                      borderRadius: 12,
                      overflow: "hidden",
                      cursor: "pointer",
                      height: "100%",
                      minHeight: 380,
                    }}
                    onClick={() => setSelectedNews(featured)}
                  >
                    <Image
                      src={getImage(featured)}
                      h="100%"
                      fit="cover"
                      style={{ position: "absolute", inset: 0 }}
                    />
                    <Box
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
                      }}
                    />
                    <Box
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: "20px 24px",
                        color: "white",
                      }}
                    >
                      <Badge color="red" size="sm" mb={8} radius="sm">
                        {getBadge(featured)}
                      </Badge>
                      <Title
                        order={2}
                        style={{
                          fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                          fontWeight: 800,
                          lineHeight: 1.3,
                          color: "white",
                          marginBottom: 8,
                        }}
                      >
                        {getTitle(featured)}
                      </Title>
                      <Text size="sm" c="gray.3" lineClamp={2} mb={10}>
                        {getDesc(featured)}
                      </Text>
                      <Group gap="md">
                        <Text size="xs" c="gray.4">
                          📅 {getDate(featured)}
                        </Text>
                        <Text size="xs" c="gray.4">
                          ⏱ {getTimeAgo(featured)}
                        </Text>
                      </Group>
                    </Box>
                  </Box>
                )}
              </Grid.Col>

              {/* Side Stories */}
              <Grid.Col span={{ base: 12, md: 5 }}>
                <Stack gap="sm" h="100%">
                  {sideNews.map((item, i) => (
                    <Paper
                      key={item.id || i}
                      p="sm"
                      radius="md"
                      withBorder
                      bg={themeColors.cardBg}
                      style={{ cursor: "pointer", flex: 1, borderColor: themeColors.cardBorder }}
                      onClick={() => setSelectedNews(item)}
                    >
                      <Group wrap="nowrap" gap="sm" align="flex-start">
                        <Image
                          src={getImage(item)}
                          w={80}
                          h={64}
                          radius={8}
                          fit="cover"
                          style={{ flexShrink: 0 }}
                        />
                        <Box style={{ flex: 1, minWidth: 0 }}>
                          <Text
                            size="xs"
                            fw={900}
                            c={ACCENT}
                            tt="uppercase"
                            mb={2}
                            style={{ letterSpacing: 0.5 }}
                          >
                            {getBadge(item)}
                          </Text>
                          <Text
                            size="sm"
                            fw={600}
                            lineClamp={2}
                            style={{ lineHeight: 1.35 }}
                            c={themeColors.textPrimary}
                          >
                            {getTitle(item)}
                          </Text>
                          <Text size="xs" c={themeColors.textSecondary} mt={4}>
                            {getTimeAgo(item)}
                          </Text>
                        </Box>
                      </Group>
                    </Paper>
                  ))}
                </Stack>
              </Grid.Col>
            </Grid>
          </Grid.Col>

          {/* RIGHT – Weather + Top News */}
          <Grid.Col span={{ base: 12, lg: 4 }}>
            <Stack gap="md">
              {/* Weather Card */}
              <Paper
                p="md"
                radius="md"
                withBorder
                bg={themeColors.cardBg}
                style={{ borderColor: themeColors.cardBorder }}
              >
                <Group justify="space-between" mb={4}>
                  <Group gap={6}>
                    <Text fw={700} size="sm" c={themeColors.textPrimary}>
                      Fastzlive.com
                    </Text>
                    <a
                      href="https://chat.whatsapp.com/IMG3IepRZXyGLxYeG9QXKH?s=cl&p=a&mlu=4&ilr=4"
                      
                      rel="noopener noreferrer"
                      aria-label="Join WhatsApp Group"
                      style={{
                        color: "#25D366",
                        fontSize: "36px",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textDecoration: "none",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <FaWhatsapp />
                    </a>
                    <a
                      href="https://x.com/LiveUpdate_"
                      
                      rel="noopener noreferrer"
                      aria-label="Follow on X"
                      style={{
                        color: "#fefdfd",
                        fontSize: "28px",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textDecoration: "none",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <RiTwitterXLine />
                    </a>
                    <a
                      href="https://www.youtube.com/@Fastzlive"
                      
                      rel="noopener noreferrer"
                      aria-label="Subscribe on YouTube"
                      style={{
                        color: "#FF0000",
                        fontSize: "32px",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textDecoration: "none",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <FaYoutube />
                    </a>
                  </Group>
                </Group>
                <Group align="flex-end" gap={4}>
                  <Text fw={900} style={{ fontSize: 32, lineHeight: 1 }} c={themeColors.textPrimary}>
                    Ramesh kumar
                  </Text>

                </Group>
              </Paper>

              {/* Top News */}
              <Paper
                p="md"
                radius="md"
                withBorder
                bg={themeColors.cardBg}
                style={{ borderColor: themeColors.cardBorder }}
              >
                <Group gap={6} mb="md">
                  <IconFlame size={18} color={ACCENT} />
                  <Text fw={800} size="sm" c={themeColors.textPrimary}>
                    {t("topNews")}
                  </Text>
                </Group>
                <Stack gap="sm">
                  {topNews.map((item, i) => (
                    <Box
                      key={item.id || i}
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedNews(item)}
                    >
                      <Group wrap="nowrap" gap="sm" align="flex-start">
                        <Text
                          fw={800}
                          size="lg"
                          c={ACCENT}
                          style={{ lineHeight: 1, minWidth: 20 }}
                        >
                          {i + 1}
                        </Text>
                        <Text
                          size="sm"
                          fw={500}
                          lineClamp={2}
                          style={{ lineHeight: 1.4 }}
                          c={themeColors.textPrimary}
                        >
                          {getTitle(item)}
                        </Text>
                      </Group>
                      {i < topNews.length - 1 && <Divider mt="sm" color={themeColors.cardBorder} />}
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Stack>
          </Grid.Col>
        </Grid>

        {/* ═══════ CATEGORY ICONS ═══════ */}
        <ScrollArea mt={28} mb={8} type="never">
          <Group gap="sm" wrap="nowrap" pb={4}>
            {CATEGORIES.map((cat) => (
              <UnstyledButton
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  padding: "10px 14px",
                  borderRadius: 12,
                  background: activeCategory === cat.key ? ACCENT : themeColors.cardBg,
                  border: `1px solid ${activeCategory === cat.key ? ACCENT : themeColors.cardBorder
                    }`,
                  minWidth: 84,
                  transition: "all 0.15s",
                }}
              >
                <Text size="lg">{cat.icon}</Text>
                <Text
                  size="xs"
                  fw={600}
                  c={activeCategory === cat.key ? "white" : themeColors.textPrimary}
                  style={{ whiteSpace: "nowrap" }}
                >
                  {cat.label}
                </Text>
              </UnstyledButton>
            ))}
          </Group>
        </ScrollArea>

        {/* ═══════ SECTION CARDS ═══════ */}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md" mt={24}>
          {[
            { title: t("india"), items: indiaNews },
            { title: t("world"), items: worldNews },
            { title: t("business"), items: businessNews },
            { title: t("sports"), items: sportsNews },
          ].map((section) => (
            <Paper
              key={section.title}
              p="md"
              radius="md"
              withBorder
              bg={themeColors.cardBg}
              style={{ borderColor: themeColors.cardBorder }}
            >
              <Group justify="space-between" mb="sm">
                <Text fw={800} size="sm" c={themeColors.textPrimary}>
                  {section.title}
                </Text>
                <Anchor size="xs" c={ACCENT} fw={500}>
                  {t("viewAll")}
                </Anchor>
              </Group>
              {section.items[0] ? (
                <Box style={{ cursor: "pointer" }} onClick={() => setSelectedNews(section.items[0])}>
                  <Image
                    src={getImage(section.items[0])}
                    h={140}
                    radius={8}
                    fit="cover"
                    mb="sm"
                  />
                  <Text size="sm" fw={600} lineClamp={2} mb={6} c={themeColors.textPrimary}>
                    {getTitle(section.items[0])}
                  </Text>
                  <Group gap={8}>
                    <Text size="xs" c={themeColors.textSecondary}>
                      {getDate(section.items[0])}
                    </Text>
                    <Text size="xs" c={themeColors.textSecondary}>
                      · {getTimeAgo(section.items[0])}
                    </Text>
                  </Group>
                </Box>
              ) : (
                <Text size="sm" c={themeColors.textSecondary}>
                  No articles yet
                </Text>
              )}
            </Paper>
          ))}
        </SimpleGrid>

        {/* ═══════ ALL NEWS GRID ═══════ */}
        <Box mt={40}>
          <Title
            order={3}
            ta="center"
            mb="xl"
            style={{
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              color: themeColors.textPrimary,
            }}
          >
            {t("allNews")}
          </Title>
          <SimpleGrid cols={{ base: 1, xs: 2, md: 3, lg: 4 }} spacing="lg">
            {filteredNews.map((item, idx) => (
              <Card
                key={item.id || idx}
                padding={0}
                radius="md"
                withBorder
                bg={themeColors.cardBg}
                style={{
                  borderColor: themeColors.cardBorder,
                  cursor: "pointer",
                  overflow: "hidden",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onClick={() => setSelectedNews(item)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = isDarkMode
                    ? "0 10px 25px rgba(0,0,0,0.5)"
                    : "0 10px 25px rgba(0,0,0,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <Card.Section>
                  <Image src={getImage(item)} h={160} fit="cover" />
                </Card.Section>
                <Box p="md">
                  <Group gap={6} mb={8}>
                    <Badge size="xs" variant="light" color="red">
                      {getBadge(item)}
                    </Badge>
                    {item._source && (
                      <Badge size="xs" variant="outline" color="gray">
                        {item._source}
                      </Badge>
                    )}
                  </Group>
                  <Text fw={600} size="sm" lineClamp={2} style={{ lineHeight: 1.4 }} c={themeColors.textPrimary}>
                    {getTitle(item)}
                  </Text>
                  <Text size="xs" c={themeColors.textSecondary} mt={6}>
                    {getDate(item)} · {getTimeAgo(item)}
                  </Text>
                </Box>
              </Card>
            ))}
          </SimpleGrid>
          {filteredNews.length === 0 && (
            <Center py={60}>
              <Text c={themeColors.textSecondary}>{t("noNews")}</Text>
            </Center>
          )}
        </Box>
      </Container>
    </Box>
  );
}