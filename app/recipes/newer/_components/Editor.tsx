import { $getRoot, $getSelection, EditorState } from "lexical";
import { useEffect } from "react";
import styles from "./Editor.module.css";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

const theme = {
  // The editor's theme is a set of CSS variables that are
  // applied to the editor's root element. You can use
  // any CSS-in-JS library to generate the theme.
  backgroundColor: "#fff",
  color: "#000",
  fontFamily: "sans-serif",
  fontSize: "1rem",
  padding: "1rem",
  borderRadius: "0.25rem",
  boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.25)",
  "&:focus": {
    outline: "none",
    boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.5)",
  },
};

function MyOnChangePlugin(props: { onChange: (editorState: EditorState) => void }): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const { onChange } = props;

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onchange(editorState);
    });
  }, [onChange, editor]);
  return null;
}

// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  return null;
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error): void {
  console.error(error);
}

export function Editor() {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <PlainTextPlugin
        contentEditable={<ContentEditable className={styles.contentEditable} />}
        placeholder={<div></div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <MyCustomAutoFocusPlugin />
      <HistoryPlugin />
    </LexicalComposer>
  );
}
