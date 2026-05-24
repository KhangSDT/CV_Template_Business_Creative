import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const A4_WIDTH = 210;
const A4_HEIGHT = 297;

export async function exportToPDF(
  element: HTMLElement,
  filename = "cv.pdf",
): Promise<void> {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: "#fdfcfa",
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const imgWidth = A4_WIDTH;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  pdf.save(filename);
}
