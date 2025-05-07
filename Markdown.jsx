'use client';

import ReactMarkdown from "react-markdown";

const Markdown = ({ content }) => {
  if (!content) return null;

  return (
    <div className="prose prose-sm max-w-none">
      <ReactMarkdown
        components={{
          // Customize components
          strong: ({ node, ...props }) => <strong className="text-white-900" {...props} />,
          em: ({ node, ...props }) => <em className="text-white-700" {...props} />,
          p: ({ node, ...props }) => <p className="text-white-700 mb-2" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc pl-4 space-y-1" {...props} />,
          li: ({ node, ...props }) => <li className="text-white-600" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;