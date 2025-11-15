console.log('🚀 Fuel Haus Loading...', {
  location: window.location.href,
  baseURI: document.baseURI,
  mode: import.meta.env.MODE,
  rootElement: document.getElementById("root")
});

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Component, ReactNode } from "react";
import App from "./App.tsx";
import "./index.css";

// Error Boundary
class ErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean}> {
  state = { hasError: false };
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  componentDidCatch(error: Error, errorInfo: any) {
    console.error("React Error:", error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div style={{padding: '20px', textAlign: 'center'}}>
          <h1>Something went wrong</h1>
          <p>Check the browser console for details</p>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
