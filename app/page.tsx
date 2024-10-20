"use client"; // Enable client-side behavior

import { CopyIcon } from "lucide-react";
import Image from "next/image";
import { Toaster, toast } from "sonner";

export default function Home() {
  const handleCopyClick = async () => {
    try {
      const url = "https://notion-chatgpt.vercel.app/notion-openapi.json";
      await navigator.clipboard.writeText(url);
      toast.success("Notion Import URL copied to clipboard! Paste in ChatGPT 🎉");
    } catch (err) {
      toast.error("Failed to copy URL 😢. "+ err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between sm:p-16">
      {/* Toaster for notifications */}
      <Toaster position="top-center" />

      <main className="flex flex-col items-center gap-12">
        <Image
          className="dark:invert"
          src="/Notion.webp"
          alt="Notion logo"
          width={180}
          height={50}
          priority
        />

        <ol className="list-decimal list-inside space-y-4 text-center sm:text-left text-sm sm:text-base font-mono">
          <li>Click the <b>Copy Action URL</b> button below to get the Notion Action URL.</li>
          <li>
            Go to ChatGPT, create a new custom GPT & under the Configure tab, click <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded-md">Create new action</code>.
          </li>
          <li>
            Click <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded-md">Import URL</code> and paste the copied URL. 
          </li>
          <p className="text-xs font-thin bg-green-100 rounded-sm">This will automatically insert the OpenAPI Json schema (~725 lines) to call the official Notion.so API. You should see these <b>Available actions</b> appear: getPage, updatePage, createPage, getDatabase, queryDatabase, search, listUsers, getPageOrBlockChildrenContent, appendBlockChildren



</p>
          <li>
            Click the <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded-md">Authorization</code> button and select{" "}
            <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded-md">Bearer</code> as the Auth-Type. Then, paste your Notion API key.
          </li>
        </ol>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
            onClick={handleCopyClick}
          >
            <CopyIcon size={20}/>
            Copy Action URL
          </button>

          <a
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            href="https://www.notion.so/profile/integrations"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Notion API Key
          </a>
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <video
            controls
            width="600"
            style={{ border: "1px solid #ccc", borderRadius: "8px" }}
          >
            <source
              src="https://github.com/user-attachments/assets/3713f886-cd77-49c5-b223-89a4942a4068"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </main>

      <footer className="flex flex-wrap items-center justify-center gap-6 py-4">
        {[
          {
            href: "https://help.openai.com/en/articles/8554397-creating-a-gpt",
            label: "OpenAI Custom GPTs",
            icon: "file.svg",
          },
          {
            href: "https://developers.notion.com/docs/getting-started",
            label: "Notion API",
            icon: "window.svg",
          },
          {
            href: "https://github.com/cameronking4/notion-openapi-chatgpt-action",
            label: "Star on Github →",
            icon: "github.svg",
          },
        ].map(({ href, label, icon }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:underline"
          >
            <Image
              src={`https://nextjs.org/icons/${icon}`}
              alt={`${label} icon`}
              width={16}
              height={16}
              aria-hidden
            />
            {label}
          </a>
        ))}
      </footer>
    </div>
  );
}
