import clsx from "clsx";

type ProgessSize = 6 | 12;

const SIZE_CLASSES: { [K in ProgessSize]: string } = {
  6: "h-6 w-6",
  12: "h-12 w-12",
};

export interface ProgressProps {
  size: ProgessSize;
}

export function Progress(props: ProgressProps) {
  return (
    <div
      class={clsx(
        "bg-blue-600 animate-ping rounded-full",
        SIZE_CLASSES[props.size]
      )}
    />
  );
}
