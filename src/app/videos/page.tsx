import Image from "next/image"

const videoList = [
  {
    title: "là où poussent les ailes d’anges",
    id: "ql8bKZfIcVk",
    url: "https://youtu.be/ql8bKZfIcVk",
  },
  {
    title: "plénitude",
    id: "7FupdWkZ3s8",
    url: "https://youtu.be/7FupdWkZ3s8",
  },
  {
    title: "ivresse de mes rêves",
    id: "lCEXIr0WWEc",
    url: "https://youtu.be/lCEXIr0WWEc",
  },
  {
    title: "immortalem",
    id: "oCNbfM6ANBE",
    url: "https://youtu.be/oCNbfM6ANBE",
  },
  {
    title: "hypnokinetic",
    id: "1NGeiLDDWzo",
    url: "https://youtu.be/1NGeiLDDWzo",
  },
]

  
  const StaticVideos: React.FC = () => {
    return (
      <div className="min-h-screen py-24 w-full md:w-[85vw] mx-auto flex flex-col items-center justify-center gap-y-8">
        <h2 className="self-center text-2xl md:text-4xl  upper  text-white">
          Videos
        </h2>
        <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-y-8 ">
          {videoList.map((video, index) => (
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              className="flex flex-col items-center"
            >
              <div className="relative w-[300px] h-[200px] xl:w-[550px] xl:h-[350px] overflow-hidden shadow-lg shadow-gray-500  border-2  md:border-[3px]">
                <Image
                  src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover md:px-0"
                  width={300}
                  height={200}
                />
              </div>
              <p className="mt-2 text-white text-center text-sm lg:text-lg capitalize">{video.title}</p>
            </a>
          ))}
        </div>
      </div>
    )
  }
  
  export default StaticVideos
  