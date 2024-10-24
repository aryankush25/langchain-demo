import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { ChatAnthropic } from '@langchain/anthropic';
import { ChatMistralAI } from '@langchain/mistralai';
import { ChatGroq } from '@langchain/groq';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ChatFireworks } from '@langchain/community/chat_models/fireworks';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

@Injectable()
export class AppService {
  async pingAI(
    service:
      | 'openai'
      | 'anthropic'
      | 'mistral'
      | 'google'
      | 'gorq'
      | 'fireworks',
    userQuery: string,
  ) {
    if (service === 'openai') {
      return this.openai(userQuery);
    }
    if (service === 'anthropic') {
      return this.anthropic(userQuery);
    }
    if (service === 'mistral') {
      return this.mistral(userQuery);
    }
    if (service === 'google') {
      return this.googleGenerativeAI(userQuery);
    }
    if (service === 'gorq') {
      return this.gorq(userQuery);
    }
    if (service === 'fireworks') {
      return this.fireworks(userQuery);
    }

    return { service: 'unknown', res: 'unknown' };
  }

  private async openai(userQuery: string) {
    const model = new ChatOpenAI({
      model: 'gpt-4o',
      apiKey: process.env.OPENAI_API_KEY_1,
    });
    const messages = [
      new SystemMessage('Process the following query'),
      new HumanMessage(userQuery),
    ];

    const res = await model.invoke(messages);

    return { service: 'openai', res };
  }

  private async anthropic(userQuery: string) {
    const model = new ChatAnthropic({
      model: 'claude-3-5-sonnet-20240620',
      apiKey: process.env.ANTHROPIC_API_KEY_1,
    });

    const messages = [
      new SystemMessage('Process the following query'),
      new HumanMessage(userQuery),
    ];

    const res = await model.invoke(messages);

    return { service: 'anthropic', res };
  }

  private async mistral(userQuery: string) {
    const model = new ChatMistralAI({
      model: 'mistral-large-latest',
      apiKey: process.env.MISTRAL_API_KEY_1,
    });

    const messages = [
      new SystemMessage('Process the following query'),
      new HumanMessage(userQuery),
    ];

    const res = await model.invoke(messages);

    return { service: 'mistral', res };
  }

  async googleGenerativeAI(userQuery: string) {
    const model = new ChatGoogleGenerativeAI({
      model: 'gemini-1.5-pro',
      apiKey: process.env.GOOGLE_API_KEY_1,
    });

    const messages = [
      new SystemMessage('Process the following query'),
      new HumanMessage(userQuery),
    ];

    const res = await model.invoke(messages);

    return { service: 'google', res };
  }

  async gorq(userQuery: string) {
    const model = new ChatGroq({
      model: 'mixtral-8x7b-32768',
      apiKey: process.env.GROQ_API_KEY_1,
    });

    const messages = [
      new SystemMessage('Process the following query'),
      new HumanMessage(userQuery),
    ];

    const res = await model.invoke(messages);

    return { service: 'gorq', res };
  }

  async fireworks(userQuery: string) {
    const model = new ChatFireworks({
      model: 'accounts/fireworks/models/llama-v3p1-70b-instruct',
      temperature: 0,
      apiKey: process.env.FIREWORKS_API_KEY_1,
    });

    const messages = [
      new SystemMessage('Process the following query'),
      new HumanMessage(userQuery),
    ];

    const res = await model.invoke(messages);

    return { service: 'fireworks', res };
  }
}
