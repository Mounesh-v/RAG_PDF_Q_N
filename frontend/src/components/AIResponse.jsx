import { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

const components = {
  table: ({ node: _node, children, ...props }) => (
    <div className="ai-table-wrap">
      <table {...props}>{children}</table>
    </div>
  ),
  pre: ({ node: _node, children }) => {
    const child = Array.isArray(children) ? children[0] : children;
    const className = child?.props?.className || "";
    const match = /language-(\w+)/.exec(className);
    const language = match ? match[1] : "";

    return (
      <div className="ai-code">
        {language && (
          <div className="ai-code__bar">
            <span className="ai-code__lang">{language}</span>
          </div>
        )}
        <pre>{children}</pre>
      </div>
    );
  },
};

function AIResponse({ content }) {
  return (
    <div className="ai-response">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={components}
      >
        {content ?? ""}
      </ReactMarkdown>
    </div>
  );
}

export default memo(AIResponse);
