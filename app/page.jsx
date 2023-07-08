"use client";

import TextEditor from "./components/Editor/Editor";

export default function Home() {
  return (
    <div className="pt-10 px-5 sm:px-20">
      <h1 className="pb-5 text-3xl font-light text-sky-400">
        Scribe Editor Concept
      </h1>
      <TextEditor />
    </div>
  );
}
