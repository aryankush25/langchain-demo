interface TokenUsage {
  input_tokens: number;
  output_tokens: number;
  total_tokens: number;
}

interface TokenDetails {
  cache_read?: number;
  reasoning?: number;
}

interface UsageMetadata extends TokenUsage {
  input_token_details?: TokenDetails;
  output_token_details?: TokenDetails;
}

interface SafetyRating {
  category: string;
  probability: string;
}

interface ResponseMetadata {
  id?: string;
  model?: string;
  stop_reason?: string;
  stop_sequence?: string | null;
  usage?: {
    input_tokens: number;
    output_tokens: number;
  };
  type?: string;
  role?: string;
  tokenUsage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  finish_reason?: string;
  system_fingerprint?: string;
  finishReason?: string;
  index?: number;
  safetyRatings?: SafetyRating[];
}

interface AdditionalKwargs {
  id?: string;
  type?: string;
  role?: string;
  model?: string;
  stop_reason?: string;
  stop_sequence?: string | null;
  usage?: {
    input_tokens: number;
    output_tokens: number;
  };
  finishReason?: string;
  index?: number;
  safetyRatings?: SafetyRating[];
}

export class AIMessage {
  lc: number;
  type: string;
  id: string[];
  kwargs: {
    content: string;
    additional_kwargs: AdditionalKwargs;
    usage_metadata: UsageMetadata;
    response_metadata: ResponseMetadata;
    id: string;
    tool_calls: any[];
    invalid_tool_calls: any[];
  };

  constructor(data: any) {
    this.lc = data.lc;
    this.type = data.type;
    this.id = data.id;
    this.kwargs = {
      content: data.kwargs.content,
      additional_kwargs: data.kwargs.additional_kwargs || {},
      usage_metadata: data.kwargs.usage_metadata || {},
      response_metadata: data.kwargs.response_metadata || {},
      id: data.kwargs.id,
      tool_calls: data.kwargs.tool_calls || [],
      invalid_tool_calls: data.kwargs.invalid_tool_calls || [],
    };
  }
}
