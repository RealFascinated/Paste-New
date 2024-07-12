import { redirect } from "next/navigation";
import { getConfig } from "../../../common/config";
import { getPaste } from "../../../common/paste";
import { formatBytes } from "../../../common/utils";
import { HighlightCode } from "../../../components/code-highlighter";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const config = await getConfig();
  const paste = await getPaste(params.id);
  // Unknown paste
  if (paste == null) {
    redirect("/");
  }

  return {
    title: `${config.siteTitle} - ${paste.id}`,
    description: `
    Lines: ${paste.lineCount}
    Size: ${formatBytes(paste.sizeBytes)}

    Click to view the Paste.
    `,
  };
}

export default async function Paste({ params }: { params: { id: string } }) {
  const config = await getConfig(); // Get the config for the site
  const paste = await getPaste(params.id); // Get the paste from the API
  // Unknown paste
  if (paste == null) {
    return redirect("/");
  }

  return (
    <main className="bg-zinc-900 text-white h-screen flex flex-col text-sm">
      <div className="flex justify-between py-2 px-4 select-none">
        <div className="flex gap-4 justify-center items-center">
          <a href="/" className="text-gray-300 font-bold hover:text-blue-300 transition-all">
            {config.siteTitle}
          </a>
          <p className="text-gray-300 text-sm">{formatBytes(paste.sizeBytes)}</p>
        </div>
        <div className="flex gap-4">
          <div className="flex gap-4">
            <a className="text-gray-400 cursor-help">Save</a>
            <a href="/" className="text-white hover:text-blue-300 transition-all cursor-default">
              New
            </a>
            <a href={`/raw/${paste.id}`} className="text-white hover:text-blue-300 transition-all cursor-default">
              Raw Text
            </a>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex gap-2 w-full h-full">
          <HighlightCode text={paste.content} />
        </div>
      </div>
    </main>
  );
}
