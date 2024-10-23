import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { ChatAnthropic } from '@langchain/anthropic';
import { ChatMistralAI } from '@langchain/mistralai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

@Injectable()
export class AppService {
  async pingAI(service: 'openai' | 'anthropic' | 'mistral') {
    if (service === 'openai') {
      return this.openai();
    }
    if (service === 'anthropic') {
      return this.anthropic();
    }
    if (service === 'mistral') {
      return this.mistral();
    }

    return { service: 'unknown', res: 'unknown' };
  }

  private async openai() {
    const model = new ChatOpenAI({
      model: 'gpt-4o',
      apiKey: process.env.OPENAI_API_KEY_1,
    });
    const messages = [
      new SystemMessage('Translate the following from English into Italian'),
      new HumanMessage('hi!'),
    ];

    const res = await model.invoke(messages);

    return { service: 'openai', res };
  }

  private async anthropic() {
    const model = new ChatAnthropic({
      model: 'claude-3-5-sonnet-20240620',
      temperature: 0,
      apiKey: process.env.ANTHROPIC_API_KEY_1,
    });

    const messages = [
      new SystemMessage('Translate the following from English into Italian'),
      new HumanMessage('hi!'),
    ];

    const res = await model.invoke(messages);

    return { service: 'anthropic', res };
  }

  private async mistral() {
    const model = new ChatMistralAI({
      model: 'mistral-large-latest',
      temperature: 0,
      apiKey: process.env.MISTRAL_API_KEY_1,
    });

    const messages = [
      new SystemMessage('Translate the following from English into Italian'),
      new HumanMessage('hi!'),
    ];

    const res = await model.invoke(messages);

    return { service: 'mistral', res };
  }
}
