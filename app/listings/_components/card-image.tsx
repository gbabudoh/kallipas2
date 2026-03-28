'use client'

type Props = {
  src: string
  fallback: string
  alt: string
}

export default function CardImage({ src, fallback, alt }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={(e) => {
        const img = e.currentTarget
        if (img.src !== fallback) img.src = fallback
      }}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  )
}
