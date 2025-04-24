import { useState, useEffect } from 'react';
import { FaInstagram, FaTwitter, FaLinkedin, FaFacebook, FaYoutube } from 'react-icons/fa';

const platforms = [
  { id: 'instagram', name: 'Instagram', icon: <FaInstagram className="text-pink-500" /> },
  { id: 'twitter', name: 'Twitter', icon: <FaTwitter className="text-blue-400" /> },
  { id: 'linkedin', name: 'LinkedIn', icon: <FaLinkedin className="text-blue-700" /> },
  { id: 'facebook', name: 'Facebook', icon: <FaFacebook className="text-blue-600" /> },
  { id: 'youtube', name: 'YouTube', icon: <FaYoutube className="text-red-600" /> },
];

export default function PlatformSelector({ onSelectPlatform }) {
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    if (selectedPlatform) {
      onSelectPlatform(selectedPlatform);
    }
  }, [selectedPlatform, onSelectPlatform]);

  const handleSelect = (platform) => {
    setSelectedPlatform(platform.name);
    setIsOpen(false);
  };

  const getSelectedIcon = () => {
    const platform = platforms.find(p => p.name === selectedPlatform);
    return platform ? platform.icon : null;
  };

  return (
    <div className="relative w-full">
      <div 
        className="flex items-center justify-between w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 
          rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 cursor-pointer hover:border-primary-400 
          dark:hover:border-primary-500 transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-2">
          {selectedPlatform ? (
            <>
              <span className="flex items-center text-lg">{getSelectedIcon()}</span>
              <span>{selectedPlatform}</span>
            </>
          ) : (
            <span className="text-gray-500 dark:text-gray-400">Select a platform</span>
          )}
        </div>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg animate-fadeIn">
          <ul className="py-1">
            {platforms.map((platform) => (
              <li
                key={platform.id}
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => handleSelect(platform)}
              >
                <span className="mr-2 text-lg">{platform.icon}</span>
                <span>{platform.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}