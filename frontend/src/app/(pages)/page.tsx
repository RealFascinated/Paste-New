import { redirect } from "next/navigation";
import { getConfig } from "../../common/config";
import { uploadPaste } from "../../common/paste";

export const dynamic = "force-dynamic";

export default async function Home() {
  const config = await getConfig(); // Get the config for the site
  async function createPaste(formData: FormData) {
    "use server";
    const response = await uploadPaste(formData.get("content") as string); // Upload the paste
    if (response == null) {
      return;
    }

    // Redirect to the new paste
    redirect(`/${response.key}`);
  }

  return (
    <main className="bg-zinc-900 text-white h-screen flex flex-col text-sm">
      <form action={createPaste}>
        <div className="flex justify-between py-2 px-4 select-none">
          <div className="flex gap-4 justify-center items-center">
            <a href="/" className="text-gray-300 font-bold hover:text-blue-300 transition-all">
              {config.siteTitle}
            </a>
          </div>
          <div className="flex gap-4">
            <button className="text-white hover:text-blue-300 transition-all cursor-default">Save</button>
            <a href="/" className="text-white hover:text-blue-300 transition-all cursor-default">
              New
            </a>
            <a className="text-gray-400 cursor-help">Raw Text</a>
          </div>
        </div>
        <div className="flex-1 flex flex-col px-4">
          <div className="flex gap-2 w-full h-full">
            <p className="hidden md:block select-none pointer-events-none text-white">&gt;</p>
            <textarea
              className="w-full h-full flex-1 bg-transparent outline-none resize-none text-white"
              name="content"
              placeholder={config.textboxPlaceholder}
            />
          </div>
        </div>
      </form>
    </main>
  );
}
