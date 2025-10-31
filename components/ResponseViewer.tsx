
import React from 'react';
import { LoadingSpinner } from './icons';

interface ResponseViewerProps {
    response: string;
    isLoading: boolean;
    error: string | null;
}

export const ResponseViewer: React.FC<ResponseViewerProps> = ({ response, isLoading, error }) => {
    return (
        <div className="h-full flex flex-col">
            <h2 className="text-xl font-semibold text-slate-200 mb-4 pb-2 border-b border-slate-700">Respuesta de la IA</h2>
            <div className="flex-grow bg-slate-800/50 rounded-lg p-4 overflow-y-auto relative prose prose-invert prose-p:text-slate-300 prose-headings:text-slate-100 max-w-none">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-950/50 rounded-lg">
                        <div className="text-center">
                            <LoadingSpinner />
                            <p className="mt-2 text-slate-400">Procesando...</p>
                        </div>
                    </div>
                )}
                {error && (
                    <div className="text-red-400 bg-red-900/50 p-4 rounded-md">
                        <p className="font-bold">Error</p>
                        <p>{error}</p>
                    </div>
                )}
                {!isLoading && !error && !response && (
                    <div className="text-slate-500 text-center py-10">
                        <p>La respuesta de la IA aparecerá aquí.</p>
                        <p className="text-sm">Completa el prompt y haz clic en "Generar Respuesta".</p>
                    </div>
                )}
                {response && (
                     <pre className="whitespace-pre-wrap break-words font-sans text-slate-300">{response}</pre>
                )}
            </div>
        </div>
    );
};
