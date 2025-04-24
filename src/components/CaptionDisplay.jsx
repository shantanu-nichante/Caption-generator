import { useState, useEffect } from 'react';

export default function CaptionDisplay({ caption, isLoading, platform }) {
  const [copied, setCopied] = useState(false);
  const [charCount, setCharCount] = useState(0);
  
  // Calculate character count
  useEffect(() => {
    if (caption) {
      setCharCount(caption.length);
    } else {
      setCharCount(0);
    }
  }, [caption]);

  const handleCopy = () => {
    if (caption) {
      navigator.clipboard.writeText(caption)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    }
  };

  // Get character limit based on platform
  const getCharLimit = () => {
    switch (platform) {
      case 'Twitter':
        return 280;
      default:
        return null;
    }
  };

  const charLimit = getCharLimit();
  const isOverLimit = charLimit && charCount > charLimit;

  if (isLoading) {
    return (
      <div className="card animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (!caption) {
    return (
      <div className="card bg-gray-50 dark:bg-gray-900 border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          Your generated caption will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="card animate-slideUp relative">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-gray-900 dark:text-gray-100">Generated Caption</h3>
        {charLimit && (
          <span className={`text-sm ${isOverLimit ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
            {charCount}/{charLimit}
          </span>
        )}
      </div>
      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md mb-3 whitespace-pre-wrap">
        {caption}
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleCopy}
          className="btn btn-secondary flex items-center space-x-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
          </svg>
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      {isOverLimit && (
        <div className="absolute top-0 right-0 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-tl-none rounded-br-none rounded">
          Exceeds limit
        </div>
      )}
    </div>
  );
}