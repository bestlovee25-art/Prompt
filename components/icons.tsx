
import React from 'react';

export const SparklesIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v2.586l1.707-1.707a1 1 0 011.414 1.414L12.414 8H15a1 1 0 110 2h-2.586l1.707 1.707a1 1 0 01-1.414 1.414L11 9.414V12a1 1 0 11-2 0V9.414l-1.707 1.707a1 1 0 01-1.414-1.414L7.586 8H5a1 1 0 110-2h2.586L5.879 4.293a1 1 0 011.414-1.414L9 4.586V4a1 1 0 011-1zM3 10a1 1 0 011-1h1.036a.75.75 0 010 1.5H4a1 1 0 01-1-1zm13.964 0a1 1 0 011-1h1.036a.75.75 0 010 1.5H18a1 1 0 01-1.036-.75zM10 16a1 1 0 01-1 1v1.036a.75.75 0 01-1.5 0V17a1 1 0 011-1zm0-13a1 1 0 01-1 1V3.036a.75.75 0 01-1.5 0V3a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
);

export const LoadingSpinner: React.FC = () => (
    <svg className="animate-spin h-8 w-8 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);
