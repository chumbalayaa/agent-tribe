import OpenAI from 'openai';

export class Agent {
  private openai: OpenAI;
  private engine: string;
  private prompt: string;
  private temperature: number;

  constructor(apiKey: string, engine: string, prompt: string, tempature: number) {
    this.openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
    this.engine = engine
    this.prompt = prompt
    this.temperature = tempature
  }

  /**
   * Generates a response from the OpenAI API
  */
  async generateResponse(): Promise<string> {
    try {
      const response = await this.openai.completions.create({
        model: this.engine,
        prompt: this.prompt,
        max_tokens: 150,
        n: 1,
        stop: null,
        temperature: this.temperature,
      });

      if (response.choices && response.choices.length > 0) {
        return response.choices[0].text.trim();
      } else {
        throw new Error('No response from OpenAI');
      }
    } catch (error) {
      console.error(error);
      return 'An error occurred while generating a response';
    }
  }

  /**
   * Critiques a response from the OpenAI API
   */
  async critiqueResponse(response: string, initialPrompt: string): Promise<string> {
    try {
      const critique = await this.openai.completions.create({
        model: this.engine,
        prompt: `Critique the following response: ${response} given this initial prompt from the user ${initialPrompt}`,
        max_tokens: 150,
        n: 1,
        stop: null,
        temperature: this.temperature,
      });

      if (critique.choices && critique.choices.length > 0) {
        return critique.choices[0].text.trim();
      } else {
        throw new Error('No response from OpenAI');
      }
    } catch (error) {
      console.error(error);
      return 'An error occurred while critiquing the response';
    }
  }

  /**
   * Takes an array of repsonses, and a list of critiques, inputs all of these into
   * a new LLM and produces a final response
   */
  async combineResponses(initialPrompt: string, responses: string[], critiques: string[]): Promise<string> {
    try {
      const combinedResponse = await this.openai.completions.create({
        model: this.engine,
        prompt: `Given this inital prompt: ${initialPrompt}, and these reponses to that prompt: ${responses.join(' ')} and these critiques on those reponses: ${critiques.join(' ')}, produce a final response to the initla prompt.`,
        max_tokens: 150,
        n: 1,
        stop: null,
        temperature: this.temperature,
      });

      if (combinedResponse.choices && combinedResponse.choices.length > 0) {
        return combinedResponse.choices[0].text.trim();
      } else {
        throw new Error('No response from OpenAI');
      }
    } catch (error) {
      console.error(error);
      return 'An error occurred while combining the responses';
    }
  }
}