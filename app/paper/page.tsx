"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Title,
  Text,
  Grid,
  Image,
  Group,
  Stack,
  Divider,
  Badge,
  Skeleton,
  Box,
  Center,
  AspectRatio,
} from "@mantine/core";
import { createClient } from "@base44/sdk";

// ========== YOUR SOURCES ==========
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

function normalizeArticle(item: any, sourceLabel: string) {
  return {
    id: item.id || Math.random().toString(),
    title:
      item.title ||
      item.headline ||
      item.name ||
      item.Title ||
      "Untitled News",
    content:
      item.content ||
      item.body ||
      item.description ||
      item.summary ||
      item.Content ||
      "",
    image:
      item.image ||
      item.imageUrl ||
      item.photo ||
      item.thumbnail ||
      item.Image ||
      null,
    author: item.author || item.writer || item.by || "Staff Reporter",
    date:
      item.date ||
      item.publishedAt ||
      item.created_date ||
      item.updated_date ||
      new Date().toISOString(),
    source: sourceLabel,
  };
}

export default function NewspaperPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAllNews() {
      setLoading(true);
      setError(null);

      try {
        const promises = BASE44_SOURCES.map(async (source) => {
          try {
            const client = createClient({ appId: source.appId });
            const data = await client.entities[source.entity].list(
              "-created_date",
              8
            );
            return (data || []).map((item: any) =>
              normalizeArticle(item, source.label)
            );
          } catch (err) {
            console.warn(`Failed to fetch ${source.label}:`, err);
            return [];
          }
        });

        const results = await Promise.all(promises);
        const allArticles = results.flat();

        allArticles.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setArticles(allArticles);
      } catch (err: any) {
        setError(err.message || "Failed to load news");
      } finally {
        setLoading(false);
      }
    }

    fetchAllNews();
  }, []);

  const mainHeadline = articles[0];
  const sideArticles = articles.slice(1, 5);
  const bottomArticles = articles.slice(5, 11);

  return (
    <Box
      bg="#e8e0d5"
      mih="100vh"
      py={{ base: "md", md: "xl" }}
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 50%, rgba(0,0,0,0.02) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0,0,0,0.015) 0%, transparent 40%)",
      }}
    >
      <Container size="xl" px={{ base: "xs", sm: "md" }}>
        <Paper
          shadow="xl"
          radius={4}
          p={{ base: "md", sm: "lg", md: "xl" }}
          style={{
            backgroundColor: "#f9f6f0",
            border: "1px solid #c9bda8",
            boxShadow:
              "0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)",
            fontFamily: "Georgia, 'Times New Roman', Times, serif",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle paper texture overlay */}
          <Box
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          <Box style={{ position: "relative", zIndex: 1 }}>
            {/* ===== MASTHEAD ===== */}
            <Stack gap={6} mb="md">
              <Group
                justify="space-between"
                c="#5c5346"
                fz={{ base: 10, sm: 11 }}
                style={{ letterSpacing: "0.5px" }}
              >
                <Text fw={900}>Rahul kumar</Text>
                
                <Text fw={500}>
                  {new Date()
                    .toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                    .toUpperCase()}
                </Text>
              </Group>

              <Title
                order={1}
                ta="center"
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "clamp(2.8rem, 9vw, 5.2rem)",
                  fontWeight: 900,
                  letterSpacing: "-1.5px",
                  lineHeight: 0.95,
                  color: "#1a1a1a",
                  textShadow: "0 1px 0 rgba(255,255,255,0.6)",
                }}
              >
                Fastzlive.com
              </Title>

              <Group
                justify="space-between"
                c="#5c5346"
                fz="sm"
                mt={2}
              >
                
                
                
              </Group>
            </Stack>

            <Divider size={2} color="#1a1a1a" mb="lg" />

            {/* ===== BREAKING NEWS BANNER ===== */}
            <Box
              mb="lg"
              style={{
                background: "linear-gradient(90deg, #b91c1c 0%, #dc2626 50%, #b91c1c 100%)",
                padding: "10px 16px",
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(185,28,28,0.3)",
              }}
            >
              <Title
                order={2}
                ta="center"
                c="white"
                style={{
                  fontSize: "clamp(1.5rem, 4.5vw, 2.4rem)",
                  fontWeight: 900,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                }}
              >
                BREAKING NEWS
              </Title>
            </Box>

            {loading ? (
              <Stack gap="lg">
                <Skeleton height={48} radius="sm" />
                <Skeleton height={320} radius="sm" />
                <Grid>
                  <Grid.Col span={{ base: 12, md: 4 }}>
                    <Skeleton height={180} radius="sm" />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 4 }}>
                    <Skeleton height={180} radius="sm" />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 4 }}>
                    <Skeleton height={180} radius="sm" />
                  </Grid.Col>
                </Grid>
              </Stack>
            ) : error ? (
              <Center py={60}>
                <Text c="red" size="lg" fw={500}>
                  {error}
                </Text>
              </Center>
            ) : articles.length === 0 ? (
              <Center py={60}>
                <Text size="lg" c="dimmed">
                  No news found from sources.
                </Text>
              </Center>
            ) : (
              <>
                {/* ===== MAIN STORY ===== */}
                {mainHeadline && (
                  <Box mb="xl">
                    <Title
                      order={3}
                      ta="center"
                      mb="md"
                      style={{
                        fontSize: "clamp(1.4rem, 3.5vw, 1.9rem)",
                        fontWeight: 800,
                        lineHeight: 1.25,
                        color: "#111",
                      }}
                    >
                      {mainHeadline.title}
                    </Title>

                    <Grid >
                      {/* Left: Main content */}
                      <Grid.Col span={{ base: 12, md: 8 }}>
                        {mainHeadline.image ? (
                          <AspectRatio ratio={16 / 9} mb="md">
                            <Image
                              src={mainHeadline.image}
                              alt={mainHeadline.title}
                              radius={3}
                              style={{
                                border: "1px solid #d4c9b8",
                                objectFit: "cover",
                              }}
                            />
                          </AspectRatio>
                        ) : (
                          <Box
                            h={220}
                            mb="md"
                            style={{
                              background: "#e5dfd3",
                              border: "1px solid #d4c9b8",
                              borderRadius: 3,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Text c="dimmed" size="sm">
                              No Image
                            </Text>
                          </Box>
                        )}

                        <Group gap="xs" mb={6}>
                          <Text size="sm" c="#5c5346" fw={500}>
                            By {mainHeadline.author}
                          </Text>
                          <Text size="sm" c="#5c5346">
                            •
                          </Text>
                          <Badge
                            size="sm"
                            variant="outline"
                            color="dark"
                            radius="sm"
                            style={{ borderColor: "#a89f8e" }}
                          >
                            {mainHeadline.source}
                          </Badge>
                        </Group>

                        <Text
                          style={{
                            lineHeight: 1.7,
                            fontSize: "1.05rem",
                            color: "#222",
                          }}
                        >
                          {mainHeadline.content?.slice(0, 480)}
                          {mainHeadline.content?.length > 480 ? "…" : ""}
                        </Text>
                      </Grid.Col>

                      {/* Right: Side stories */}
                      <Grid.Col span={{ base: 12, md: 4 }}>
                        <Stack gap="lg">
                          {sideArticles.map((art, idx) => (
                            <Box key={art.id}>
                              {idx > 0 && (
                                <Divider
                                  mb="md"
                                  color="#d4c9b8"
                                  style={{ borderTopWidth: 1 }}
                                />
                              )}
                              <Badge
                                size="xs"
                                variant="filled"
                                color="dark"
                                mb={6}
                                radius="sm"
                                style={{ background: "#3f3a32" }}
                              >
                                {art.source}
                              </Badge>
                              <Text
                                fw={700}
                                size="sm"
                                mb={4}
                                style={{ lineHeight: 1.35, color: "#111" }}
                              >
                                {art.title}
                              </Text>
                              <Text
                                size="xs"
                                c="#5c5346"
                                lineClamp={3}
                                style={{ lineHeight: 1.5 }}
                              >
                                {art.content}
                              </Text>
                            </Box>
                          ))}
                        </Stack>
                      </Grid.Col>
                    </Grid>
                  </Box>
                )}

                <Divider size={1.5} color="#1a1a1a" my="xl" />

                {/* ===== BOTTOM STORIES (3 columns) ===== */}
                <Grid >
                  {bottomArticles.map((art) => (
                    <Grid.Col
                      key={art.id}
                      span={{ base: 12, sm: 6, md: 4 }}
                    >
                      <Stack gap={8}>
                        {art.image ? (
                          <AspectRatio ratio={16 / 10}>
                            <Image
                              src={art.image}
                              alt={art.title}
                              radius={3}
                              style={{
                                border: "1px solid #d4c9b8",
                                objectFit: "cover",
                              }}
                            />
                          </AspectRatio>
                        ) : (
                          <Box
                            h={130}
                            style={{
                              background: "#e5dfd3",
                              border: "1px solid #d4c9b8",
                              borderRadius: 3,
                            }}
                          />
                        )}

                        <Badge
                          size="xs"
                          variant="light"
                          color="gray"
                          radius="sm"
                          w="fit-content"
                        >
                          {art.source}
                        </Badge>

                        <Text
                          fw={700}
                          size="md"
                          lineClamp={2}
                          style={{ lineHeight: 1.3, color: "#111" }}
                        >
                          {art.title}
                        </Text>

                        <Text
                          size="sm"
                          c="#5c5346"
                          lineClamp={4}
                          style={{ lineHeight: 1.55 }}
                        >
                          {art.content}
                        </Text>

                        <Text size="xs" c="#7a7164" fw={500}>
                          By {art.author}
                        </Text>
                      </Stack>
                    </Grid.Col>
                  ))}
                </Grid>

                {/* ===== FOOTER ===== */}
                <Divider size={1.5} color="#1a1a1a" my="xl" />

                <Group
                  justify="center"
                
                  c="#5c5346"
                  fz="xs"
                  fw={600}
                  style={{ letterSpacing: "1.5px" }}
                >
                    
                </Group>
              </>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}