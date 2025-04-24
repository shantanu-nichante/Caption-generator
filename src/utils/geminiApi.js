import { GoogleGenerativeAI } from '@google/generative-ai';

// This key should be in an environment variable in a production app
const API_KEY = 'AIzaSyCiiJa2no13Lr2FWmiM2u1APxuvPrm5CTQ';
const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateCaption(platform, context = '') {
  try {
    // Initialize the model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    

    // Enhanced Prompt
    let prompt = `🎯 You're a top-tier social media strategist!

Generate 3 unique, creative, and platform-specific social media captions for:

📱 Platform: ${platform}  
💡 Topic: ${context || 'general content'}  

✍️ Requirements:
- Keep each caption short, punchy, and engaging 💥
- Include relevant emojis and 5-7 hashtags 🎉
- Adapt tone and style to fit the ${platform} audience
- Each caption should be creative and different from the others
- Separate each caption with a blank line (double line break)

📌 Return ONLY the 3 captions as plain text, no labels, numbers, or extra formatting.`;

    // Generate the content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    // Split by double line breaks
    const captions = text
      .split(/\n\s*\n/) // match 1 or more blank lines
      .map(c => c.trim())
      .filter(Boolean)
      .slice(0, 3);

    return captions;
  } catch (error) {
    console.error('Error generating caption:', error);
    throw new Error('Failed to generate caption. Please try again.');
  }
}
