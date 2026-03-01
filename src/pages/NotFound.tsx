import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-2xl w-full">
        {/* Main content card with glass effect */}
        <div className="glass rounded-2xl p-8 md:p-12 shadow-xl">
          <div className="text-center space-y-8">
            {/* Error code with gradient */}
            <div className="space-y-2">
              <h1 className="font-display text-8xl md:text-9xl font-bold text-gradient">
                404
              </h1>
              <div className="w-24 h-1 bg-accent/30 mx-auto rounded-full" />
            </div>

            {/* Message */}
            <div className="space-y-3">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                Page Not Found
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto">
                The page you're looking for doesn't exist or has been moved.
                Let's get you back on track.
              </p>
            </div>

            {/* Illustration/Symbol */}
            <div className="flex justify-center items-center gap-4 py-4">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <button
                onClick={() => navigate(-1)}
                className="group relative px-6 py-3 text-foreground bg-secondary hover:bg-secondary/80 rounded-lg transition-all duration-200 font-medium text-sm w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <svg
                  className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Go Back
              </button>

              <button
                onClick={() => navigate("/")}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 font-medium text-sm w-full sm:w-auto shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Back to Home
              </button>
            </div>

            {/* Helpful links */}
            <div className="pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">
                You might find these helpful:
              </p>
              <div className="flex flex-wrap gap-4 justify-center text-sm">
                <a
                  href="/help"
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  Help Center
                </a>
                <span className="text-border">•</span>
                <a
                  href="/contact"
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  Contact Support
                </a>
                <span className="text-border">•</span>
                <a
                  href="/search"
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  Search
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-accent/30 rounded-tl-lg" />
        <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-accent/30 rounded-br-lg" />
      </div>
    </div>
  );
};

export default NotFoundPage;
