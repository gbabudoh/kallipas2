import { readFileSync, writeFileSync } from 'fs'

const file = 'e:/APPLICATIONS/applications/applications/kallipas2/lib/i18n/index.ts'
let content = readFileSync(file, 'utf8')

// Each lang: [heroTitle, heroSubtitle]
const translations = {
  EN: [
    'Own Property, Anywhere.',
    'The first global real estate platform with zero translation barriers, verified private sellers, and instant video walkthroughs.',
  ],
  FR: [
    'Possédez un Bien, Partout dans le Monde.',
    'La première plateforme immobilière mondiale sans barrières linguistiques, avec des vendeurs privés vérifiés et des visites vidéo instantanées.',
  ],
  ES: [
    'Posee Propiedades, en Cualquier Lugar.',
    'La primera plataforma inmobiliaria global sin barreras idiomáticas, con vendedores privados verificados y recorridos de video instantáneos.',
  ],
  AR: [
    'امتلك عقاراً، في أي مكان.',
    'أول منصة عقارية عالمية بدون حواجز لغوية، مع بائعين خاصين موثقين وجولات فيديو فورية.',
  ],
  DE: [
    'Immobilien besitzen, überall.',
    'Die erste globale Immobilienplattform ohne Sprachbarrieren, mit verifizierten Privatverkäufern und sofortigen Video-Rundgängen.',
  ],
  PT: [
    'Possua Imóveis, em Qualquer Lugar.',
    'A primeira plataforma imobiliária global sem barreiras linguísticas, com vendedores privados verificados e visitas de vídeo instantâneas.',
  ],
  ZH: [
    '拥有房产，随处可得。',
    '首个无语言障碍的全球房地产平台，拥有经过验证的私人卖家和即时视频参观。',
  ],
  IT: [
    'Possiedi Casa, Ovunque.',
    'La prima piattaforma immobiliare globale senza barriere linguistiche, con venditori privati verificati e visite video istantanee.',
  ],
  RU: [
    'Владейте недвижимостью, где угодно.',
    'Первая глобальная платформа недвижимости без языковых барьеров, с верифицированными частными продавцами и мгновенными видеотурами.',
  ],
  TR: [
    'Her Yerde Mülk Sahibi Olun.',
    'Sıfır dil engelli, doğrulanmış özel satıcılara ve anında video tur imkânına sahip ilk küresel gayrimenkul platformu.',
  ],
  HI: [
    'संपत्ति के मालिक बनें, कहीं भी।',
    'शून्य भाषा बाधाओं, सत्यापित निजी विक्रेताओं और तत्काल वीडियो वॉकथ्रू के साथ पहला वैश्विक रियल एस्टेट प्लेटफ़ॉर्म।',
  ],
  JA: [
    '世界中で、不動産を持とう。',
    '言語の壁ゼロ、認定プライベートセラー、即時ビデオウォークスルーを備えた初のグローバル不動産プラットフォーム。',
  ],
  KO: [
    '어디서든, 부동산을 소유하세요.',
    '언어 장벽 없이, 검증된 개인 판매자와 즉각적인 영상 투어를 제공하는 최초의 글로벌 부동산 플랫폼.',
  ],
  NL: [
    'Bezit Overal Vastgoed.',
    'Het eerste wereldwijde vastgoedplatform zonder taalbarrières, met geverifieerde privéverkopers en directe videorondleidingen.',
  ],
}

// For each language, insert heroTitle + heroSubtitle after 'heroBadge: ...'
// The pattern differs: multi-line dicts have newlines, compact dicts are single-line
// Strategy: find `heroBadge: 'xxx'` for each lang and insert after it

for (const [lang, [title, subtitle]] of Object.entries(translations)) {
  // Find the heroBadge value for this language by looking at context
  // We'll use a regex that matches heroBadge: 'anything' and inserts after
  // But we need to be careful not to double-insert. Check first.
  if (content.includes(`heroTitle: '${title}'`)) {
    console.log(`${lang}: already has heroTitle, skipping`)
    continue
  }

  // Find heroBadge: '...' followed by either comma+newline (multi-line) or comma+space (single-line)
  // Build the heroBadge value from the dict itself - but we don't know it
  // Instead, find the home: { block for this language and insert after heroBadge: '...',
  // The safest anchor: after heroBadge: '...', insert heroTitle + heroSubtitle

  // For multi-line (EN, FR, ES, AR, DE, PT, ZH, IT): pattern is "heroBadge: '...',\n"
  // For single-line (RU, TR, HI, JA, KO, NL): pattern is "heroBadge: '...', "

  // We'll find "heroBadge: '" then find the closing "'" then insert after the comma
  const heroBadgePrefix = `heroBadge: '`
  // Find all occurrences
  let searchFrom = 0
  let found = false
  while (true) {
    const idx = content.indexOf(heroBadgePrefix, searchFrom)
    if (idx === -1) break
    const closeQuote = content.indexOf("'", idx + heroBadgePrefix.length)
    if (closeQuote === -1) break
    const afterQuote = content[closeQuote + 1] // should be ','
    if (afterQuote !== ',') { searchFrom = closeQuote + 1; continue }

    // Check if heroTitle already follows (skip if already inserted)
    const nextChunk = content.slice(closeQuote + 1, closeQuote + 20)
    if (nextChunk.includes('heroTitle')) { searchFrom = closeQuote + 2; continue }

    // We need to determine which language this belongs to.
    // Look back from idx to find which `const XX: Dict` precedes this home: block
    const precedingText = content.slice(0, idx)
    const lastConstMatch = [...precedingText.matchAll(/const (\w+): Dict/g)].pop()
    if (!lastConstMatch) { searchFrom = closeQuote + 2; continue }
    const dictLang = lastConstMatch[1].toUpperCase()

    if (dictLang !== lang) { searchFrom = closeQuote + 2; continue }

    // Determine if multi-line or single-line by checking next char after comma
    const charAfterComma = content[closeQuote + 2]
    const isMultiLine = charAfterComma === '\n' || charAfterComma === '\r'

    const insert = isMultiLine
      ? `,\n    heroTitle: '${title}',\n    heroSubtitle: '${subtitle}'`
      : `, heroTitle: '${title}', heroSubtitle: '${subtitle}'`

    // Remove the leading comma from insert (it will replace the existing comma)
    // Actually: content[closeQuote+1] is ',', so insert after closeQuote+1
    content = content.slice(0, closeQuote + 2) + insert.slice(1) + content.slice(closeQuote + 2)

    console.log(`${lang}: inserted after heroBadge (${isMultiLine ? 'multiline' : 'single-line'})`)
    found = true
    break
  }
  if (!found) console.log(`${lang}: heroBadge NOT FOUND`)
}

writeFileSync(file, content, 'utf8')
console.log('Done')
