import { HfInference } from "@huggingface/inference"
import OpenAI from "openai"

// Initialize clients for different AI providers - safely
let hf: HfInference | null = null
let openai: OpenAI | null = null

// Only initialize on the server side
if (typeof window === "undefined") {
  hf = process.env.HUGGINGFACE_API_KEY ? new HfInference(process.env.HUGGINGFACE_API_KEY) : null
  openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null
}

// Available models by provider
export const AI_MODELS = {
  OPENAI: {
    GPT_4O: "gpt-4o",
    GPT_4: "gpt-4-turbo",
    GPT_3_5: "gpt-3.5-turbo",
    DALLE_3: "dall-e-3",
    WHISPER: "whisper-1",
    EMBEDDINGS: "text-embedding-3-small",
  },
  HUGGINGFACE: {
    CHAT: {
      META_LLAMA: "meta-llama/Llama-2-7b-chat-hf",
      MISTRAL: "mistralai/Mistral-7B-Instruct-v0.2",
      FALCON: "tiiuae/falcon-7b-instruct",
      GEMMA: "google/gemma-7b-it",
    },
    TEXT_TO_IMAGE: {
      STABLE_DIFFUSION: "stabilityai/stable-diffusion-xl-base-1.0",
      SDXL_TURBO: "stabilityai/sdxl-turbo",
    },
    EMBEDDINGS: {
      ALL_MINI_LM: "sentence-transformers/all-MiniLM-L6-v2",
    },
    SPEECH_TO_TEXT: {
      WHISPER: "openai/whisper-large-v3",
    },
  },
  XAI: {
    CLAUDE_HAIKU: "claude-haiku",
    CLAUDE_SONNET: "claude-sonnet",
  },
}

// Types
export interface ChatMessage {
  role: "user" | "assistant" | "system"
  content: string
}

export interface ChatCompletionOptions {
  provider: "openai" | "huggingface" | "xai"
  model: string
  messages: ChatMessage[]
  temperature?: number
  maxTokens?: number
}

export interface ImageGenerationOptions {
  provider: "openai" | "huggingface"
  model: string
  prompt: string
  negativePrompt?: string
  width?: number
  height?: number
}

// Mock responses for when API keys are missing or in browser
const MOCK_RESPONSES = {
  chat: {
    role: "assistant" as const,
    content:
      "I'm a demo AI assistant. To enable real AI responses, please add your API keys to the environment variables.",
  },
  image:
    "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024' fill='%23ccc'%3E%3Crect width='1024' height='1024' /%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui' font-size='24' fill='%23666'%3EAdd API keys to generate real images%3C/text%3E%3C/svg%3E",
  embeddings: Array(384)
    .fill(0)
    .map(() => Math.random() - 0.5), // Random mock embeddings
}

// Helper function to check if we're in a browser environment
const isBrowser = () => typeof window !== "undefined"

// Chat completion with multiple providers
export async function generateChatCompletion(options: ChatCompletionOptions) {
  try {
    const { provider, model, messages, temperature = 0.7, maxTokens = 1024 } = options

    // If in browser, use API routes instead of direct client calls
    if (isBrowser()) {
      try {
        const response = await fetch("/api/ai/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(options),
        })

        if (response.ok) {
          return await response.json()
        }

        console.warn("API route failed, using mock response")
        return { message: MOCK_RESPONSES.chat }
      } catch (error) {
        console.error("Error calling API route:", error)
        return { message: MOCK_RESPONSES.chat }
      }
    }

    // Server-side code below
    // OpenAI
    if (provider === "openai") {
      if (!openai) {
        console.warn("OpenAI API key not provided, using mock response")
        return { message: MOCK_RESPONSES.chat }
      }

      const response = await openai.chat.completions.create({
        model: model,
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        temperature: temperature,
        max_tokens: maxTokens,
      })

      return {
        message: {
          role: "assistant" as const,
          content: response.choices[0]?.message?.content || "",
        },
      }
    }

    // Hugging Face
    if (provider === "huggingface") {
      if (!hf) {
        console.warn("Hugging Face API key not provided, using mock response")
        return { message: MOCK_RESPONSES.chat }
      }

      // Format messages for the model
      const formattedPrompt = messages
        .map(
          (msg) =>
            `${msg.role === "user" ? "User" : msg.role === "assistant" ? "Assistant" : "System"}: ${msg.content}`,
        )
        .join("\n\n")

      const response = await hf.textGeneration({
        model: model,
        inputs: formattedPrompt,
        parameters: {
          temperature: temperature,
          max_new_tokens: maxTokens,
          return_full_text: false,
        },
      })

      return {
        message: {
          role: "assistant" as const,
          content: response.generated_text.trim(),
        },
      }
    }

    // XAI (Anthropic Claude)
    if (provider === "xai") {
      if (!process.env.XAI_API_KEY) {
        console.warn("XAI API key not provided, using mock response")
        return { message: MOCK_RESPONSES.chat }
      }

      // Format messages for Claude
      const systemMessage = messages.find((msg) => msg.role === "system")?.content || ""
      const userMessages = messages.filter((msg) => msg.role === "user" || msg.role === "assistant")

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.XAI_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: model,
          system: systemMessage,
          messages: userMessages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          temperature: temperature,
          max_tokens: maxTokens,
        }),
      })

      if (!response.ok) {
        throw new Error(`XAI API error: ${response.statusText}`)
      }

      const data = await response.json()

      return {
        message: {
          role: "assistant" as const,
          content: data.content[0]?.text || "",
        },
      }
    }

    throw new Error(`Unsupported provider: ${provider}`)
  } catch (error) {
    console.error("Error generating chat completion:", error)
    return {
      message: {
        role: "assistant" as const,
        content: "I encountered an error. Please try again later or check your API configuration.",
      },
    }
  }
}

// Image generation with multiple providers
export async function generateImage(options: ImageGenerationOptions) {
  try {
    const { provider, model, prompt, negativePrompt, width = 1024, height = 1024 } = options

    // If in browser, use API routes instead of direct client calls
    if (isBrowser()) {
      try {
        const response = await fetch("/api/ai/image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(options),
        })

        if (response.ok) {
          return await response.json()
        }

        console.warn("API route failed, using mock response")
        return { image: MOCK_RESPONSES.image }
      } catch (error) {
        console.error("Error calling API route:", error)
        return { image: MOCK_RESPONSES.image }
      }
    }

    // Server-side code below
    // OpenAI
    if (provider === "openai") {
      if (!openai) {
        console.warn("OpenAI API key not provided, using mock response")
        return { image: MOCK_RESPONSES.image }
      }

      const response = await openai.images.generate({
        model: model,
        prompt: prompt,
        n: 1,
        size: `${width}x${height}`,
      })

      return {
        image: response.data[0]?.url || MOCK_RESPONSES.image,
      }
    }

    // Hugging Face
    if (provider === "huggingface") {
      if (!hf) {
        console.warn("Hugging Face API key not provided, using mock response")
        return { image: MOCK_RESPONSES.image }
      }

      const response = await hf.textToImage({
        model: model,
        inputs: prompt,
        parameters: {
          negative_prompt: negativePrompt,
          width: width,
          height: height,
        },
      })

      return {
        image: response,
      }
    }

    throw new Error(`Unsupported provider: ${provider}`)
  } catch (error) {
    console.error("Error generating image:", error)
    return {
      image: MOCK_RESPONSES.image,
    }
  }
}

// Generate embeddings
export async function generateEmbeddings(text: string, provider = "openai", model = AI_MODELS.OPENAI.EMBEDDINGS) {
  try {
    // If in browser, use API routes instead of direct client calls
    if (isBrowser()) {
      try {
        const response = await fetch("/api/ai/embeddings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text, provider, model }),
        })

        if (response.ok) {
          return await response.json()
        }

        console.warn("API route failed, using mock response")
        return MOCK_RESPONSES.embeddings
      } catch (error) {
        console.error("Error calling API route:", error)
        return MOCK_RESPONSES.embeddings
      }
    }

    // Server-side code below
    if (provider === "openai") {
      if (!openai) {
        console.warn("OpenAI API key not provided, using mock embeddings")
        return MOCK_RESPONSES.embeddings
      }

      const response = await openai.embeddings.create({
        model: model,
        input: text,
      })

      return response.data[0]?.embedding || MOCK_RESPONSES.embeddings
    }

    if (provider === "huggingface") {
      if (!hf) {
        console.warn("Hugging Face API key not provided, using mock embeddings")
        return MOCK_RESPONSES.embeddings
      }

      const response = await hf.featureExtraction({
        model: AI_MODELS.HUGGINGFACE.EMBEDDINGS.ALL_MINI_LM,
        inputs: text,
      })

      return response
    }

    throw new Error(`Unsupported provider: ${provider}`)
  } catch (error) {
    console.error("Error generating embeddings:", error)
    return MOCK_RESPONSES.embeddings
  }
}

// Speech to text
export async function transcribeSpeech(audioBlob: Blob, provider = "openai", model = AI_MODELS.OPENAI.WHISPER) {
  try {
    // If in browser, use API routes instead of direct client calls
    if (isBrowser()) {
      try {
        const formData = new FormData()
        formData.append("file", audioBlob)
        formData.append("provider", provider)
        formData.append("model", model)

        const response = await fetch("/api/ai/transcribe", {
          method: "POST",
          body: formData,
        })

        if (response.ok) {
          return await response.json()
        }

        console.warn("API route failed, using mock response")
        return { text: "This is a mock transcription. Please use the API route for real transcription." }
      } catch (error) {
        console.error("Error calling API route:", error)
        return { text: "Error transcribing speech. Please try again." }
      }
    }

    // Server-side code below
    if (provider === "openai") {
      if (!openai) {
        console.warn("OpenAI API key not provided, using mock transcription")
        return { text: "This is a mock transcription. Add your OpenAI API key to enable real transcription." }
      }

      const formData = new FormData()
      formData.append("file", audioBlob, "audio.webm")
      formData.append("model", model)

      const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`)
      }

      const data = await response.json()
      return { text: data.text }
    }

    if (provider === "huggingface") {
      if (!hf) {
        console.warn("Hugging Face API key not provided, using mock transcription")
        return { text: "This is a mock transcription. Add your Hugging Face API key to enable real transcription." }
      }

      const response = await hf.automaticSpeechRecognition({
        model: AI_MODELS.HUGGINGFACE.SPEECH_TO_TEXT.WHISPER,
        data: audioBlob,
      })

      return response
    }

    throw new Error(`Unsupported provider: ${provider}`)
  } catch (error) {
    console.error("Error transcribing speech:", error)
    return { text: "Error transcribing speech. Please try again." }
  }
}

