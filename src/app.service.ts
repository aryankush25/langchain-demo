import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { ChatAnthropic } from '@langchain/anthropic';
import { ChatMistralAI } from '@langchain/mistralai';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

@Injectable()
export class AppService {
  async pingAI(
    service: 'openai' | 'anthropic' | 'mistral' | 'google',
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
}
