import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default function Button({ children, loading, ...props }: Props) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`relative flex items-center justify-center ${
        props.className
      }`}
    >
      {loading && (
        <span className="absolute left-3 animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
      )}
      <span className={`${loading ? "opacity-50" : ""}`}>{children}</span>
    </button>
  );
}
