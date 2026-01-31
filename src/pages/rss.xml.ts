import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  const site = "https://karaoke.gastroli.moscow";
  const lastBuildDate = new Date().toUTCString();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Живое караоке — Гастроли по Москве</title>
    <link>${site}</link>
    <description>Интерактивное музыкальное шоу в Москве. Караоке с живой музыкой для свадеб, корпоративов и частных праздников. Ансамбль из профессиональных музыкантов.</description>
    <language>ru-RU</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${site}/rss.xml" rel="self" type="application/rss+xml" />
    <managingEditor>povsemmestam@t.me (Федя)</managingEditor>
    <webMaster>povsemmestam@t.me (Федя)</webMaster>
    <category>Музыкальные мероприятия</category>
    <category>Караоке</category>
    <category>Развлечения Москва</category>
    <category>Свадебные услуги</category>
    <category>Корпоративные мероприятия</category>
    <image>
      <url>${site}/favicon.ico</url>
      <title>Живое караоке</title>
      <link>${site}</link>
    </image>
    <item>
      <title>Живое караоке — музыкальное шоу с живым ансамблем в Москве</title>
      <link>${site}</link>
      <guid isPermaLink="true">${site}</guid>
      <pubDate>${lastBuildDate}</pubDate>
      <description><![CDATA[
        Живое караоке — интерактивный музыкальный формат в Москве, где участники поют под аккомпанемент живого ансамбля (бас, фортепиано, ударные). 
        
        Услуги:
        • Караоке с живой музыкой для свадеб
        • Корпоративные мероприятия с живым караоке
        • Дни рождения и юбилеи
        • Регулярные вечера в московских барах
        
        Репертуар: около 400 песен
        Продолжительность: 2 часа
        Состав: басист, пианист, барабанщик, ведущий
        
        Контакты: +7 (916) 499-25-33, Telegram @povsemmestam
      ]]></description>
      <category>Караоке</category>
      <category>Москва</category>
      <category>Музыкальные мероприятия</category>
    </item>
    <item>
      <title>Каталог песен Живого караоке</title>
      <link>https://songbook.gastroli.moscow</link>
      <guid isPermaLink="true">https://songbook.gastroli.moscow</guid>
      <pubDate>${lastBuildDate}</pubDate>
      <description><![CDATA[
        Полный каталог песен для живого караоке. Около 400 композиций разных жанров и эпох, доступных для исполнения с живым ансамблем в Москве.
      ]]></description>
      <category>Репертуар</category>
      <category>Каталог</category>
    </item>
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
};
