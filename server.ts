import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import * as dotenv from "dotenv";
import { generateClientFallback } from "./src/clientFallback";

// Load environment variables
dotenv.config();

// Define robust environment path variables compatible with both ESM (dev) and CJS (prod)
const getPathScope = () => {
  const isCJS = typeof __dirname !== "undefined" && typeof __filename !== "undefined";
  if (isCJS) {
    return { __filename, __dirname };
  }
  // ESM Fallback
  try {
    const filename = fileURLToPath(import.meta.url);
    const dirname = path.dirname(filename);
    return { __filename: filename, __dirname: dirname };
  } catch {
    return { __filename: "", __dirname: process.cwd() };
  }
};

const { __filename: currentFilename, __dirname: currentDirname } = getPathScope();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Read request body as JSON
  app.use(express.json());

  // Log requests in dev
  app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
  });

  // Initialize Gemini client lazily/safely
  let ai: GoogleGenAI | null = null;
  const geminiKey = process.env.GEMINI_API_KEY;

  if (geminiKey && geminiKey !== "MY_GEMINI_API_KEY") {
    try {
      ai = new GoogleGenAI({
        apiKey: geminiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
      console.log("Gemini Client successfully initialized on the server.");
    } catch (e) {
      console.error("Error initializing Gemini client:", e);
    }
  } else {
    console.log("No GEMINI_API_KEY detected. Using robust Korean Offline Fallback Database.");
  }

  // 1. Core Career/Major API Endpoint
  app.post("/api/career/explore", async (req, res) => {
    const { interests = [], subjects = [], detailedText = "" } = req.body;

    console.log("Exploring career roadmap for:", { interests, subjects, detailedText });

    // Fallback Korean Pre-defined Interactive Database
    const generateFallback = () => {
      console.log("Utilizing offline fallback roadmap generator");
      return generateClientFallback(interests, subjects, detailedText);
    };

    // 2. Main Logic: Check if Gemini AI can be triggered
    if (ai) {
      try {
        console.log("Contacting Gemini API server-side using gemini-3.5-flash for career exploration...");

        const prompt = `
당신은 대한민국 고등학교에서 다년간 수만 명의 고등학생들의 진로 상담을 성공적으로 지도해 온 인자하고 재치 있는 진로 상담 전문가 거북이 '터틀보이'입니다.
학업과 진로 선택에 갈팡질팡 헤매며 엄청난 학업 스트레스를 겪고 있는 고등학생의 상황에 감정이입하여, 학생의 고민을 해소하고 최적의 진로 전략을 제시해주세요.

[학생 정보]
- 관심 분야: ${interests.join(", ")}
- 특히 친근하거나 잘하는/선호하는 교과목: ${subjects.join(", ")}
- 학생이 작성한 추가 상세 이야기: ${detailedText ? detailedText : "적지 않음"}

[작성 가이드라인]
1. 학생의 관심분야와 장점 과목을 정밀 분석하여, 연관된 "대한민국 실제 대학교 학과"를 **최소 4개 이상** 추천해주세요.
2. 설명과 추천 이유, 산업 분야, 전망, 직업 꿀팁 등 모든 텍스트 요소를 **이해하기 쉽고 상세하면서 깊이 있게 설명**해 주세요. 청소년이 깊이 있게 진로의 이유와 가치를 이해할 수 있도록 불필요한 미사여구는 배제하되 구체적이고 전문성 높은 진로 정보(100자 안팎)를 전하는 것이 가장 중요합니다.
3. 추천된 각 학과와 직접 연결된 "진출 가능한 신산업 분야"를 **각 학과당 최소 4개 이상** 구체적으로 도출해 주세요.
4. 해당 산업분야를 바탕으로 최종 도약할 수 있는 "구체적인 추천 직무 및 직업"을 **각 산업마다 최소 4개 이상** 매칭하고, 필요한 역량 및 터틀보이의 핵심 액션 '터틀 팁'을 매우 구체적이고 유익하게 작성해 주십시오.
5. 학생이 보기에 흥미롭고 재미있도록 활기차고 귀여운 하이텐션 말투(예: ~해보자구!, ~란다!, ~했어!)를 사용해 주십시오.
`;

        const responseJsonSchema = {
          type: Type.OBJECT,
          properties: {
            recommendedMajors: {
              type: Type.ARRAY,
              description: "추천 대학교 학과 리스트 (반드시 4개 이상 제공할 것)",
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "학과 이름 (예: 컴퓨터공학부)" },
                  category: { type: Type.STRING, description: "학과 계열 (예: 공학계열)" },
                  description: { type: Type.STRING, description: "학과의 구체적이고 매력적인 소개 (100자 내외, 이모지 포함)" },
                  whyRecommended: { type: Type.STRING, description: "학생의 학습 프로파일을 살려 마음을 움직이는 구체적인 추천 이유 (100자 내외)" },
                  subjectsRelated: { 
                    type: Type.ARRAY, 
                    items: { type: Type.STRING },
                    description: "고교 이수 권장 과목 리스트 (최대 3개)" 
                  },
                  industries: {
                    type: Type.ARRAY,
                    description: "연계 신산업 분야 리스트 (각 학과당 반드시 4개 이상 제공할 것)",
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING, description: "연계 신산업 명칭 (최대 25자)" },
                        description: { type: Type.STRING, description: "산업의 핵심 축을 설명하는 상세하고 이해하기 쉬운 설명 (100자 내외)" },
                        prospect: { type: Type.STRING, description: "미래 성장성 및 시장 전망 지표 (100자 내외)" },
                        careers: {
                          type: Type.ARRAY,
                          description: "대표 미래 직업 리스트 (각 산업군당 반드시 4개 이상 제공할 것)",
                          items: {
                            type: Type.OBJECT,
                            properties: {
                              name: { type: Type.STRING, description: "대표 미래 직업명 (최대 25자)" },
                              description: { type: Type.STRING, description: "직업의 실제 역할 및 일상적 활약상에 대한 상세한 설명 (100자 내외)" },
                              neededSkills: { 
                                type: Type.ARRAY, 
                                items: { type: Type.STRING },
                                description: "필요 핵심 기술/역량 (최대 3개)" 
                              },
                              turtleTip: { type: Type.STRING, description: "생기부 연계 동아리 및 세특용 활용도 높은 실전 액션 가이드 (100자 내외)" }
                            },
                            required: ["name", "description", "neededSkills", "turtleTip"]
                          }
                        }
                      },
                      required: ["name", "description", "prospect", "careers"]
                    }
                  }
                },
                required: ["name", "category", "description", "whyRecommended", "subjectsRelated", "industries"]
              }
            },
            cheeringMessage: { type: Type.STRING, description: "학생을 꼬옥 안아주는 가슴 따뜻하고 파이팅 넘치는 강렬한 한 줄 응원 (최대 45자)" },
            turtleBoyAdvises: { type: Type.STRING, description: "심플하고 파워풀한 선택과목/비교과 단 한 줄 핵심 조언 (최대 45자)" }
          },
          required: ["recommendedMajors", "cheeringMessage", "turtleBoyAdvises"]
        };

        const result = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: responseJsonSchema,
            temperature: 0.7
          }
        });

        const rawText = result.text?.trim() || "{}";
        const parsedResponse = JSON.parse(rawText);

        // Inject the response parameters
        const fullResponse = {
          studentProfile: {
            interests: interests.join(", "),
            subjects: subjects.join(", "),
            detailedText: detailedText
          },
          ...parsedResponse
        };

        res.json(fullResponse);
      } catch (err) {
        console.error("Failed to query Gemini API or parse JSON. Resorting to robust offline fallback.", err);
        res.json(generateFallback());
      }
    } else {
      // Offline implementation
      res.json(generateFallback());
    }
  });

  // 3. Vite Server and Production assets pipeline setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware integrated safely.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production static build file server connected.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Turtle Boy app express server safely running on http://localhost:${PORT}`);
  });
}

startServer();
