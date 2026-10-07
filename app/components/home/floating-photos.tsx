import Image from "next/image";

export type Photo = {
  /** A file under `public/photos/`. */
  src: string;
  left: string;
  top: string;
  width: string;
  height: string;
  /** CSS `object-position`, to keep the subject in a small crop. */
  focus?: string;
};

/**
 * FloatingPhotos — the six club photos scattered around the hero headline.
 *
 * The photos are real: Langara Hacks event shots from the club's own hackathon
 * sites (github.com/langaracpsc/lhacks2025, lhacks2024) and a campus photo
 * from the previous club site (langaracpsc-next). They were resized to 640px
 * WebP for `public/photos/`; nothing here is stock or generated.
 *
 * STATIC by design. They sit where the Figma frame puts them and do not move.
 * An earlier version drifted them with DVD-logo physics and bounced them off
 * the cursor and each other; it intermittently froze the renderer (the page
 * would load, then wedge, with Chrome reporting the renderer unresponsive),
 * and it was removed. That implementation is not preserved anywhere — if
 * motion is ever reconsidered, build it fresh as an isolated experiment with
 * this static layout as the fallback.
 *
 * This is a plain server component with no client JS, so the photos render
 * with the page and cannot fail closed. They are decoration — the container is
 * `aria-hidden` and each image has an empty alt — and they are hidden below
 * `lg`, where there is no room around the headline for them.
 *
 * `unoptimized`: the files are already sized for their slots, and vinext's
 * image optimisation is only partially supported, so they are served as-is.
 */
export function FloatingPhotos({ photos }: { photos: Photo[] }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
    >
      {photos.map((photo) => (
        <div
          key={photo.src}
          className="bg-secondary absolute"
          style={{
            left: photo.left,
            top: photo.top,
            width: photo.width,
            height: photo.height,
          }}
        >
          <Image
            src={photo.src}
            alt=""
            fill
            unoptimized
            className="object-cover"
            style={{ objectPosition: photo.focus ?? "center" }}
          />
        </div>
      ))}
    </div>
  );
}
