export type Photo = {
  src: string;
  left: string;
  top: string;
  width: string;
  height: string;
  /** `object-position`, to keep the subject in a small crop. */
  focus?: string;
};

/**
 * Photos are from lhacks2024/2025 and the old club site. Static on purpose: a
 * physics version froze the renderer. Hidden below `lg` and lazy, so phones
 * never download them.
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
          <img
            src={photo.src}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover"
            style={{ objectPosition: photo.focus ?? "center" }}
          />
        </div>
      ))}
    </div>
  );
}
