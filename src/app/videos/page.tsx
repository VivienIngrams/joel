import Image from "next/image"
import { readToken } from '~/sanity/lib/sanity.api'
import { getVideos } from "~/sanity/lib/sanity.queries"
import { getClient } from "~/sanity/lib/sanity.client"

const StaticVideos = async () => {
  const client = getClient({ token: readToken })
  const videos = await getVideos(client)

  const extractVideoId = (url: string): string => {
    const match = url.match(/[?&]v=([^&]+)/)
    return match ? match[1] : ''
  }
console.log(videos)
  return (
    <div className="min-h-screen py-24 w-full xl:w-[85vw] font-cinzel mx-auto flex flex-col items-center justify-center gap-y-8">
      <h1 className="relative text-2xl xl:text-4xl w-full text-left pl-8 xl:pl-16" style={{ zIndex: 50 }}>
        Videos
      </h1>
      <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-y-8">
        {videos.map((video, index) => {
          const videoId = extractVideoId(video.youtubeUrl)
          return (
            <a
              href={`https://youtu.be/${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              className="flex flex-col items-center"
            >
              <div className="relative w-[300px] h-[200px] xl:w-[550px] xl:h-[350px] overflow-hidden shadow-lg shadow-gray-800">
                <Image
                  src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover xl:px-0"
                  width={300}
                  height={200}
                />
              </div>
              <p className="mt-2 text-gray-500 text-center text-lg lg:text-xl">{video.title}</p>
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default StaticVideos
