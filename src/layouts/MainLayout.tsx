import React from "react";
import {
  selectTheme,
  getTheme,
  setTheme,
  themes,
  Themes as ThemeType,
} from "@/stores/themeSlice";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const Component = getTheme(theme).component;

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const switchTheme = (theme: ThemeType["name"]) => {
    dispatch(setTheme(theme));
  };

  useEffect(() => {
    if (queryParams.get("theme")) {
      const selectedTheme = themes.find(
        (theme) => theme.name === queryParams.get("theme"),
      );

      if (selectedTheme) {
        switchTheme(selectedTheme.name);
      }
    }
  }, []);

  // Create a wrapper component that renders the theme with children
  const ThemeWrapper = () => <Component>{children}</Component>;

  return (
    <>
      <ThemeSwitcher />
      <ThemeWrapper />
    </>
  );
}

export default MainLayout;
