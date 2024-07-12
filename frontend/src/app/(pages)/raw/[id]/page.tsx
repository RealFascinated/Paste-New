import { redirect } from "next/navigation";
import { getConfig } from "../../../../common/config";
import { getPaste } from "../../../../common/paste";
import { formatBytes } from "../../../../common/utils";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const config = await getConfig();
  const paste = await getPaste(params.id);
  // Unknown paste
  if (paste == null) {
    redirect("/");
  }

  return {
    title: `${config.siteTitle} - ${paste.id} (Raw)`,
    description: `
    Lines: ${paste.lineCount}
    Size: ${formatBytes(paste.sizeBytes)}

    Click to view the Paste.
    `,
  };
}

export default async function Paste({ params }: { params: { id: string } }) {
  const paste = await getPaste(params.id); // Get the paste from the API
  // Unknown paste
  if (paste == null) {
    return redirect("/");
  }

  return <main>{paste.content}</main>;
}
