import React from "react";
import AuthLayout from "../layouts/AuthLayout";
import { FormGroup, FormLabel, FormControl } from "../base-components/Form";
import Button from "../base-components/Button";

const Login: React.FC = () => {
  return (
    <AuthLayout>
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Welcome back to Midone Dashboard
          </p>
        </div>
        <form className="space-y-6">
          <FormGroup>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <FormControl
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Enter your email"
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="password">Password</FormLabel>
            <FormControl
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Enter your password"
            />
          </FormGroup>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-primary hover:text-primary/80"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <Button type="submit" variant="primary" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
