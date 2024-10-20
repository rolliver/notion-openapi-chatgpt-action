import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between sm:p-16">
      {/* Main Content */}
      <main className="flex flex-col items-center gap-12">
        {/* Notion Logo */}
        <Image
          className="dark:invert"
          src="/Notion.webp"
          alt="Notion logo"
          width={180}
          height={50}
          priority
        />

        {/* Instructions List */}
        <ol className="list-decimal list-inside space-y-4 text-center sm:text-left text-sm sm:text-base font-mono">
          <li>
            Click <b>Copy Action</b> to get the Notion Action URL.
          </li>
          <li>
            Click{" "}
            <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded-md">
              Import URL
            </code>{" "}
            and paste the URL to insert a YAML spec (~500 lines).
          </li>
          <li>
            Click the{" "}
            <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded-md">
              Authorization
            </code>{" "}
            button and select{" "}
            <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded-md">
              Bearer
            </code>{" "}
            as the Auth-Type. Then, paste your Notion API key.
          </li>
        </ol>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://nextjs.org/icons/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
              className="dark:invert"
            />
            Copy Action URL
          </a>
          <a
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            href="https://www.notion.so/profile/integrations"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Notion API Key
          </a>
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <video
            controls
            width="600"
            style={{ border: '1px solid #ccc', borderRadius: '8px' }}
          >
            <source
              src="https://github.com/user-attachments/assets/3713f886-cd77-49c5-b223-89a4942a4068"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </main>

      {/* Footer */}
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
