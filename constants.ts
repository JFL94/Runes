import { Rune } from './types';

export const RUNES: Rune[] = [
  { id: 1, name: "Fehu", symbol: "ᚠ", meaning: "財富、豐饒、新的開始", element: "火" },
  { id: 2, name: "Uruz", symbol: "ᚢ", meaning: "力量、生命力、健康", element: "土" },
  { id: 3, name: "Thurisaz", symbol: "ᚦ", meaning: "保護、衝突、淨化", element: "火" },
  { id: 4, name: "Ansuz", symbol: "ᚨ", meaning: "智慧、溝通、神力", element: "風" },
  { id: 5, name: "Raidho", symbol: "ᚱ", meaning: "旅程、節奏、旅行", element: "風" },
  { id: 6, name: "Kenaz", symbol: "ᚲ", meaning: "火炬、知識、創造力", element: "火" },
  { id: 7, name: "Gebo", symbol: "ᚷ", meaning: "禮物、夥伴關係、慷慨", element: "風" },
  { id: 8, name: "Wunjo", symbol: "ᚹ", meaning: "喜悅、和諧、繁榮", element: "土" },
  { id: 9, name: "Hagalaz", symbol: "ᚺ", meaning: "破壞、劇變、重組", element: "冰" },
  { id: 10, name: "Nauthiz", symbol: "ᚾ", meaning: "需求、抵抗、延遲", element: "火" },
  { id: 11, name: "Isa", symbol: "ᛁ", meaning: "冰、靜止、阻礙", element: "冰" },
  { id: 12, name: "Jera", symbol: "ᛃ", meaning: "收穫、週期、獎賞", element: "土" },
  { id: 13, name: "Eihwaz", symbol: "ᛇ", meaning: "紫杉、啟蒙、忍耐", element: "全" },
  { id: 14, name: "Perthro", symbol: "ᛈ", meaning: "神祕、機運、秘密", element: "水" },
  { id: 15, name: "Algiz", symbol: "ᛉ", meaning: "保護、高我、神性", element: "風" },
  { id: 16, name: "Sowilo", symbol: "ᛊ", meaning: "太陽、成功、完整", element: "火" },
  { id: 17, name: "Tiwaz", symbol: "ᛏ", meaning: "勝利、正義、犧牲", element: "風" },
  { id: 18, name: "Berkana", symbol: "ᛒ", meaning: "誕生、成長、生育", element: "土" },
  { id: 19, name: "Ehwaz", symbol: "ᛖ", meaning: "移動、進步、信任", element: "土" },
  { id: 20, name: "Mannaz", symbol: "ᛗ", meaning: "自我、人性、社會秩序", element: "風" },
  { id: 21, name: "Laguz", symbol: "ᛚ", meaning: "流動、水、直覺", element: "水" },
  { id: 22, name: "Ingwaz", symbol: "ᛜ", meaning: "豐饒、內在成長、和平", element: "土" },
  { id: 23, name: "Othala", symbol: "ᛟ", meaning: "傳承、祖產、家園", element: "土" },
  { id: 24, name: "Dagaz", symbol: "ᛞ", meaning: "黎明、覺醒、突破", element: "火" },
];

export const INITIAL_COMMENTS = [
  { 
    id: '1', 
    user: 'Astrid_99', 
    text: '就在我收到工作錄取通知前抽到了 Fehu！共時性真的太神奇了。', 
    likes: 12, 
    runeId: 1, 
    timestamp: Date.now() - 3600000,
    replies: []
  },
  { 
    id: '2', 
    user: 'BjornToWild', 
    text: '為 Isa 生成的圖像既冰冷又美麗，真的捕捉到了那種靜止的氛圍。', 
    likes: 8, 
    runeId: 11, 
    timestamp: Date.now() - 7200000,
    replies: [
        {
            id: '2-1',
            user: 'RuneMasterX',
            text: 'Isa 總是提醒我們停下來思考，很棒的解讀。',
            likes: 3,
            timestamp: Date.now() - 7100000
        }
    ]
  },
  { 
    id: '3', 
    user: 'LunaMystic', 
    text: '剛剛做了一個三符文占卜。AI 的解讀出乎意料地深刻且溫柔，撫慰了我的心。', 
    likes: 25, 
    runeId: null, 
    timestamp: Date.now() - 10800000,
    replies: []
  },
];