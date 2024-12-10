import Image from "next/image"
const videoList = [
  {
    title: "INCERTITUDE(S)",
    id: "cYWReS_za7Y",
    url: "https://youtu.be/cYWReS_za7Y",
  },
  {
    title: "IMMORTALEM",
    id: "JT6pAMuWLCs",
    url: "https://youtu.be/JT6pAMuWLCs",
  },
  {
    title: "IVRESSE DE MES REVES",
    id: "lCEXIr0WWEc",
    url: "https://youtu.be/lCEXIr0WWEc",
  },
  {
    title: "CHAMAN VIKING",
    id: "RULS7nkOx20",
    url: "https://youtu.be/RULS7nkOx20",
  },
  {
    title: "PLENITUDE",
    id: "vr-43dDHWSA",
    url: "https://youtu.be/vr-43dDHWSA",
  },
 
  
  {
    title: "HYPNOKINETIC",
    id: "1NGeiLDDWzo",
    url: "https://youtu.be/1NGeiLDDWzo",
  },
];


  
  const StaticVideos: React.FC = () => {
    return (
      <div className="min-h-screen py-24 w-full md:w-[85vw] mx-auto flex flex-col items-center justify-center gap-y-8">
      <h1 className="text-3xl md:text-5xl  w-full text-left uppercase font-light  pl-4 md:pl-16 md:mb-8">
      Videos
        </h1>
        <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-y-8 ">
          {videoList.map((video, index) => (
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              className="flex flex-col items-center"
            >
              <div className="relative w-[300px] h-[200px] xl:w-[550px] xl:h-[350px] overflow-hidden shadow-lg shadow-gray-800 ">
                <Image
                  src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover md:px-0"
                  width={300}
                  height={200}
                />
              </div>
              <p className="mt-2 text-white text-center text-sm lg:text-xl ">{video.title}</p>
            </a>
          ))}
        </div>
      </div>
    )
  }
  
  export default StaticVideos
  