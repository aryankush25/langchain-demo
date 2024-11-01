import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { ChatAnthropic } from '@langchain/anthropic';
import { ChatMistralAI } from '@langchain/mistralai';
import { ChatGroq } from '@langchain/groq';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ChatFireworks } from '@langchain/community/chat_models/fireworks';
import {
  AIMessage,
  HumanMessage,
  SystemMessage,
  BaseMessage,
} from '@langchain/core/messages';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';

type AIService =
  | 'openai'
  | 'anthropic'
  | 'mistral'
  | 'google'
  | 'gorq'
  | 'fireworks';

interface ModelConfig {
  modelName: string;
  apiKeyEnv: string;
  modelClass: new (config: any) => BaseChatModel;
  additionalConfig?: Record<string, any>;
}

@Injectable()
export class AppService {
  private readonly modelConfigs: Record<AIService, ModelConfig> = {
    openai: {
      modelName: 'gpt-4',
      apiKeyEnv: 'OPENAI_API_KEY_1',
      modelClass: ChatOpenAI,
    },
    anthropic: {
      modelName: 'claude-3-sonnet-20240229',
      apiKeyEnv: 'ANTHROPIC_API_KEY_1',
      modelClass: ChatAnthropic,
    },
    mistral: {
      modelName: 'mistral-large-latest',
      apiKeyEnv: 'MISTRAL_API_KEY_1',
      modelClass: ChatMistralAI,
    },
    google: {
      modelName: 'gemini-1.5-pro',
      apiKeyEnv: 'GOOGLE_API_KEY_1',
      modelClass: ChatGoogleGenerativeAI,
    },
    gorq: {
      modelName: 'mixtral-8x7b-32768',
      apiKeyEnv: 'GROQ_API_KEY_1',
      modelClass: ChatGroq,
    },
    fireworks: {
      modelName: 'accounts/fireworks/models/llama-v3-70b',
      apiKeyEnv: 'FIREWORKS_API_KEY_1',
      modelClass: ChatFireworks,
      additionalConfig: { temperature: 0 },
    },
  };

  private readonly baseMessages: BaseMessage[] = [
    new SystemMessage('Process the following query'),
    new HumanMessage(
      'Hi! My name is Aryan. Please answer me accordingly and include my name as much as possible.',
    ),
    new AIMessage(
      'Hi Aryan! I am an assistant designed to help you. How can I assist you today?',
    ),
  ];

  async pingAI(service: AIService, userQuery: string) {
    const config = this.modelConfigs[service];
    if (!config) {
      return { service: 'unknown', res: 'unknown' };
    }

    const model = new config.modelClass({
      model: config.modelName,
      apiKey: process.env[config.apiKeyEnv],
      ...config.additionalConfig,
    });

    const messages = [...this.baseMessages, new HumanMessage(userQuery)];
    const res = await model.invoke(messages);

    return { service, res };
  }
}
