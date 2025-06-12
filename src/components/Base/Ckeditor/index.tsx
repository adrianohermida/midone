import React, { useEffect, useRef } from "react";

interface CkeditorProps {
  value?: string;
  onChange?: (data: string) => void;
  config?: any;
  disabled?: boolean;
}

// Classic Editor Component
export const ClassicEditor: React.FC<CkeditorProps> = ({
  value = "",
  onChange,
  config = {},
  disabled = false,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstance = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    const initEditor = async () => {
      if (!editorRef.current) return;

      try {
        // Dynamically import CKEditor
        const { default: ClassicEditorBuild } = await import(
          "@ckeditor/ckeditor5-build-classic"
        );

        if (!isMounted) return;

        const editor = await ClassicEditorBuild.create(editorRef.current, {
          ...config,
        });

        if (!isMounted) {
          editor.destroy();
          return;
        }

        editorInstance.current = editor;

        // Set initial value
        if (value) {
          editor.setData(value);
        }

        // Listen for changes
        editor.model.document.on("change:data", () => {
          if (onChange) {
            onChange(editor.getData());
          }
        });

        // Handle disabled state
        if (disabled) {
          editor.enableReadOnlyMode("disabled");
        }
      } catch (error) {
        console.error("Error initializing CKEditor:", error);
      }
    };

    initEditor();

    return () => {
      isMounted = false;
      if (editorInstance.current) {
        editorInstance.current.destroy().catch((error: any) => {
          console.error("Error destroying CKEditor:", error);
        });
      }
    };
  }, []);

  // Update editor content when value prop changes
  useEffect(() => {
    if (editorInstance.current && value !== undefined) {
      const currentData = editorInstance.current.getData();
      if (currentData !== value) {
        editorInstance.current.setData(value);
      }
    }
  }, [value]);

  // Handle disabled state changes
  useEffect(() => {
    if (editorInstance.current) {
      if (disabled) {
        editorInstance.current.enableReadOnlyMode("disabled");
      } else {
        editorInstance.current.disableReadOnlyMode("disabled");
      }
    }
  }, [disabled]);

  return <div ref={editorRef} className="prose max-w-none" />;
};

// Balloon Editor Component
export const BalloonEditor: React.FC<CkeditorProps> = ({
  value = "",
  onChange,
  config = {},
  disabled = false,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstance = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    const initEditor = async () => {
      if (!editorRef.current) return;

      try {
        const { default: BalloonEditorBuild } = await import(
          "@ckeditor/ckeditor5-build-balloon"
        );

        if (!isMounted) return;

        const editor = await BalloonEditorBuild.create(editorRef.current, {
          ...config,
        });

        if (!isMounted) {
          editor.destroy();
          return;
        }

        editorInstance.current = editor;

        if (value) {
          editor.setData(value);
        }

        editor.model.document.on("change:data", () => {
          if (onChange) {
            onChange(editor.getData());
          }
        });

        if (disabled) {
          editor.enableReadOnlyMode("disabled");
        }
      } catch (error) {
        console.error("Error initializing Balloon CKEditor:", error);
      }
    };

    initEditor();

    return () => {
      isMounted = false;
      if (editorInstance.current) {
        editorInstance.current.destroy().catch((error: any) => {
          console.error("Error destroying Balloon CKEditor:", error);
        });
      }
    };
  }, []);

  useEffect(() => {
    if (editorInstance.current && value !== undefined) {
      const currentData = editorInstance.current.getData();
      if (currentData !== value) {
        editorInstance.current.setData(value);
      }
    }
  }, [value]);

  useEffect(() => {
    if (editorInstance.current) {
      if (disabled) {
        editorInstance.current.enableReadOnlyMode("disabled");
      } else {
        editorInstance.current.disableReadOnlyMode("disabled");
      }
    }
  }, [disabled]);

  return <div ref={editorRef} className="prose max-w-none" />;
};

// Default export as ClassicEditor for backward compatibility
export default ClassicEditor;
