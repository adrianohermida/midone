import React from "react";
import { Link } from "react-router-dom";
import Button from "@/base-components/Button";
import { FormGroup, FormLabel, FormControl } from "@/base-components/Form";
import Loading from "@/base-components/Loading";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <img
                src="/src/assets/images/logo.svg"
                alt="Midone"
                className="w-8 h-8 mr-3"
              />
              <h1 className="text-xl font-bold text-primary">Midone React</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="primary" size="sm">
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">
            Welcome to Midone React
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            A complete ReactJS Admin Dashboard Starter Kit built with
            TailwindCSS, Redux Toolkit, and modern development tools.
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="primary" size="lg">
              Get Started
            </Button>
            <Button variant="secondary" size="lg">
              Documentation
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-slate-900">
              Fast Development
            </h3>
            <p className="text-slate-600 text-sm">
              Built with Vite for lightning-fast development experience and hot
              reloading.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-success"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-slate-900">
              Modern Stack
            </h3>
            <p className="text-slate-600 text-sm">
              React 18, TypeScript, TailwindCSS, and Redux Toolkit for modern
              development.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-warning"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-slate-900">
              Base Components
            </h3>
            <p className="text-slate-600 text-sm">
              Pre-built components and utilities ready for your dashboard needs.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-info"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-slate-900">
              Customizable
            </h3>
            <p className="text-slate-600 text-sm">
              Easy to customize themes, colors, and components for your brand.
            </p>
          </div>
        </div>

        {/* Component Demo Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 border mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Component Showcase
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Button Components */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-slate-900">
                Button Components
              </h3>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button variant="primary" size="sm">
                    Primary
                  </Button>
                  <Button variant="secondary" size="sm">
                    Secondary
                  </Button>
                  <Button variant="success" size="sm">
                    Success
                  </Button>
                  <Button variant="warning" size="sm">
                    Warning
                  </Button>
                  <Button variant="danger" size="sm">
                    Danger
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="primary" size="md">
                    Medium
                  </Button>
                  <Button variant="primary" size="lg">
                    Large
                  </Button>
                  <Button variant="primary" rounded>
                    Rounded
                  </Button>
                  <Button variant="primary" elevated>
                    Elevated
                  </Button>
                </div>
              </div>
            </div>

            {/* Form Components */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-slate-900">
                Form Components
              </h3>
              <div className="space-y-4">
                <FormGroup>
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <FormControl
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    variant="success"
                  />
                </FormGroup>
              </div>
            </div>

            {/* Loading Components */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-slate-900">
                Loading Components
              </h3>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <Loading variant="spinner" size="md" />
                  <p className="text-sm text-slate-600 mt-2">Spinner</p>
                </div>
                <div className="text-center">
                  <Loading variant="dots" size="md" />
                  <p className="text-sm text-slate-600 mt-2">Dots</p>
                </div>
                <div className="text-center">
                  <Loading variant="pulse" size="md" />
                  <p className="text-sm text-slate-600 mt-2">Pulse</p>
                </div>
              </div>
            </div>

            {/* Theme Colors */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-slate-900">
                Theme Colors
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-primary rounded"></div>
                  <span className="text-sm text-slate-600">Primary</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-success rounded"></div>
                  <span className="text-sm text-slate-600">Success</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-warning rounded"></div>
                  <span className="text-sm text-slate-600">Warning</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-danger rounded"></div>
                  <span className="text-sm text-slate-600">Danger</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-info rounded"></div>
                  <span className="text-sm text-slate-600">Info</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-dark rounded"></div>
                  <span className="text-sm text-slate-600">Dark</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Installation Status */}
        <div className="bg-success/5 border border-success/20 rounded-lg p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-success mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-xl font-bold text-success">
              Installation Complete!
            </h2>
          </div>
          <p className="text-success/80">
            Your Midone React dashboard is now properly installed and configured
            according to the documentation. All base components, layouts,
            utilities, and styling are ready for development.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
