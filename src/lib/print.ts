import { prepareCVPrintMedia } from "@/lib/print-prepare";

export async function printCV(): Promise<void> {
  await prepareCVPrintMedia();
  window.print();
}
