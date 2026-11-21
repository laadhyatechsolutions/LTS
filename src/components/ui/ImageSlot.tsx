import { findImage } from "@/lib/images";
import { SlotImage } from "@/components/ui/Placeholder";

/**
 * Server-side photo slot. Looks for public/<file>.(webp|jpg|jpeg|png|avif|svg)
 * and shows it, or a dashed placeholder until the file exists. See docs/06-images.md.
 */
export function ImageSlot(props: Omit<Parameters<typeof SlotImage>[0], "src"> & { file: string }) {
  return <SlotImage {...props} src={findImage(props.file)} />;
}
