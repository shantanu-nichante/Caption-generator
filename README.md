# Platform-Based Caption Generator

A modern React application that generates platform-specific captions using Google's Gemini API.

## Features

- Select from multiple social media platforms (Instagram, Twitter, LinkedIn, Facebook, YouTube)
- Generate captions tailored to each platform's best practices
- Add custom context to make captions more specific and relevant
- Copy generated captions to clipboard with a single click
- Character counter for platforms with character limits
- Dark/light mode toggle
- Responsive design for all device sizes

## Live Demo

[View the live demo on Netlify](https://your-netlify-link-here.netlify.app/)

## Technologies Used

- React with Vite
- Tailwind CSS for styling
- Google Generative AI API (Gemini)
- React Icons

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/your-username/platform-caption-generator.git
   cd platform-caption-generator
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your Gemini API key:
   - Get your API key from [Google AI Studio](https://makersuite.google.com/)
   - Open `src/utils/geminiApi.js` and replace `YOUR_GEMINI_API_KEY` with your actual API key
   - For production, you should store this in an environment variable

4. Start the development server:
   ```
   npm run dev
   ```

5. Build for production:
   ```
   npm run build
   ```

## How Gemini API is Used

The application uses the `@google/generative-ai` package to interact with the Gemini API. Here's how it works:

1. When a user selects a platform and clicks "Generate Caption", we create a specific prompt for the API
2. The prompt includes the selected platform and any user-provided context
3. Platform-specific instructions are added to the prompt (e.g., character limits for Twitter)
4. The API returns a generated caption that follows the platform's best practices
5. The generated content is displayed to the user with options to copy to clipboard

## Project Structure

- `src/components/` - React components for the UI
- `src/utils/` - Utility functions including the Gemini API integration
- `src/context/` - React context for theme management

## Future Improvements

- Add more platform options
- Allow saving favorite captions
- Add hashtag suggestions
- Implement more customization options for caption generation
- Add authentication to save user preferences

## License

MIT