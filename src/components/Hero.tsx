import Image from 'next/image'

interface HeroProps {
  name: string
  title: string
  description: string
  photo: string
}

export default function Hero({ name, title, description, photo }: HeroProps) {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="z-10 text-center">
        <Image
          src={photo}
          alt={name}
          width={200}
          height={200}
          className="rounded-full mx-auto mb-8 border-4 border-white shadow-lg"
        />
        <h1 className="text-5xl font-bold mb-4">{name}</h1>
        <h2 className="text-3xl mb-4">{title}</h2>
        <p className="text-xl max-w-2xl mx-auto">{description}</p>
      </div>
    </section>
  )
}

