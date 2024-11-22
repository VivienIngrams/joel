import Image from "next/image"

const videoList = [
    {
      title: "LÀ OÙ POUSSENT LES AILES D’ANGES",
      id: "ql8bKZfIcVk",
      url: "https://youtu.be/ql8bKZfIcVk",
    },
    {
      title: "PLÉNITUDE",
      id: "7FupdWkZ3s8",
      url: "https://youtu.be/7FupdWkZ3s8",
    },
    {
      title: "IVRESSE DE MES RÊVES",
      id: "lCEXIr0WWEc",
      url: "https://youtu.be/lCEXIr0WWEc",
    },
    {
      title: "IMMORTALEM",
      id: "oCNbfM6ANBE",
      url: "https://youtu.be/oCNbfM6ANBE",
    },
    {
      title: "HYPNOKINETIC",
      id: "1NGeiLDDWzo",
      url: "https://youtu.be/1NGeiLDDWzo",
    },
  ]
  
  const StaticVideos: React.FC = () => {
    return (
      <div className="min-h-screen py-24 w-full mx-auto flex flex-col items-center justify-center gap-y-8">
        <h2 className="self-center text-2xl md:text-4xl font-barlow font-thin uppercase text-white">
          Videos
        </h2>
        <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-y-8">
          {videoList.map((video, index) => (
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              className="flex flex-col items-center"
            >
              <div className="relative w-[360px] h-[215px] xl:w-[550px] xl:h-[350px] overflow-hidden border-[#060b18]  md:border-[3px]">
                <Image
                  src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  width={500}
                  height={300}
                />
              </div>
              <p className="mt-2 text-white text-center text-sm">{video.title}</p>
            </a>
          ))}
        </div>
      </div>
    )
  }
  
  export default StaticVideos
  