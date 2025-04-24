import { useState, useCallback } from 'react';
import PlatformSelector from './components/PlatformSelector';
import CaptionDisplay from './components/CaptionDisplay';
import ThemeToggle from './components/ThemeToggle';
import { generateCaption } from './utils/geminiApi';

function App() {
  const [platform, setPlatform] = useState('');
  const [context, setContext] = useState('');
  const [caption, setCaption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSelectPlatform = useCallback((selected) => {
    setPlatform(selected);
  }, []);

  const handleGenerateCaption = async () => {
    if (!platform) {
      setError('Please select a platform first');
      return;
    }

    try {
      setError('');
      setIsLoading(true);
      setCaption('');
      
      // Wait minimum of 1 second to show loading state (as per requirement)
      const captionPromise = generateCaption(platform, context);
      const timerPromise = new Promise(resolve => setTimeout(resolve, 1000));
      
      // Wait for both promises to resolve
      const [captionResult] = await Promise.all([captionPromise, timerPromise]);
      setCaption(captionResult);
    } catch (err) {
      setError(err.message || 'Failed to generate caption');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">Caption Generator</h1>
          <ThemeToggle />
        </div>
      </header>
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <div className="card mb-6">
            <h2 className="text-xl font-semibold mb-4">Generate Platform-Specific Captions</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Select a platform and enter an optional context to generate the perfect caption for your content.
            </p>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="platform" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Platform
                </label>
                <PlatformSelector onSelectPlatform={handleSelectPlatform} />
              </div>
              
              <div>
                <label htmlFor="context" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Context (optional)
                </label>
                <input
                  type="text"
                  id="context"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="E.g., product launch, vacation photo, professional achievement"
                  className="input"
                />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Adding context will make your caption more specific and relevant
                </p>
              </div>
              
              {error && (
                <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <div className="pt-2">
                <button
                  onClick={handleGenerateCaption}
                  disabled={isLoading}
                  className="btn btn-primary w-full"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </span>
                  ) : (
                    'Generate Caption'
                  )}
                </button>
              </div>
            </div>
          </div>
          
          <CaptionDisplay caption={caption} isLoading={isLoading} platform={platform} />
        </div>
      </main>
      
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Created with Gemini API • {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}

export default App;