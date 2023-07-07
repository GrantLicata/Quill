"use client";

// Import React dependencies.
import React, { useCallback, useMemo, useState } from "react";
// Import the Slate editor factory.
import { createEditor, Editor, Transforms, Element } from "slate";
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";
//Import styles
import style from "./page.module.css";

// Define our own custom set of helpers.
const CustomEditor = {
  isBoldMarkActive(editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.bold === true : false;
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "code",
    });

    return !!match;
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "bold");
    } else {
      Editor.addMark(editor, "bold", true);
    }
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "code" },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },
};

export default function TextEditor() {
  const [editor] = useState(() => withReact(createEditor()));

  // Set the initial value presented within the editor.
  const initialValue = useMemo(
    () =>
      JSON.parse(localStorage.getItem("content")) || [
        {
          type: "paragraph",
          children: [{ text: "A line of text in a paragraph." }],
        },
      ],
    []
  );

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  // Database call for all data
  // ......... todo
  // Build with axios

  // Submit new note to the database
  // ......... todo
  // Build with axios

  return (
    // Add a toolbar with buttons that call the same methods.
    <div className={style.container}>
      <h1 className={style.title}>Scribe Editor Concept</h1>
      <p></p>
      <Slate
        editor={editor}
        initialValue={initialValue}
        onChange={(value) => {
          const isAstChange = editor.operations.some(
            (op) => "set_selection" !== op.type
          );
          if (isAstChange) {
            // Save the value to Local Storage.
            const content = JSON.stringify(value);
            localStorage.setItem("content", content);
          }
        }}
      >
        <div>
          <button
            className={style.toolButton}
            onMouseDown={(event) => {
              event.preventDefault();
              CustomEditor.toggleBoldMark(editor);
            }}
          >
            Bold
          </button>
          <button
            className={style.toolButton}
            onMouseDown={(event) => {
              event.preventDefault();
              CustomEditor.toggleCodeBlock(editor);
            }}
          >
            Code Block
          </button>
        </div>

        <Editable
          editor={editor}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          className={style.editorWindow}
          onKeyDown={(event) => {
            if (!event.ctrlKey) {
              return;
            }

            switch (event.key) {
              case "`": {
                event.preventDefault();
                CustomEditor.toggleCodeBlock(editor);
                break;
              }

              case "b": {
                event.preventDefault();
                CustomEditor.toggleBoldMark(editor);
                break;
              }
            }
          }}
        />
      </Slate>
    </div>
  );
}

// The default element type for the editor (paragraph)
const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

// Turns blocks within the editor into code elements.
const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

// Define a React component to render leaves with bold text.
const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
    >
      {props.children}
    </span>
  );
};
