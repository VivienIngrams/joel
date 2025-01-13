import Image from "next/image"
const videoList = [
  {
    "title": "Incertitude(s)",
    "id": "cYWReS_za7Y",
    "url": "https://youtu.be/cYWReS_za7Y"
  },
  {
    "title": "ImmortaleM",
    "id": "JT6pAMuWLCs",
    "url": "https://youtu.be/JT6pAMuWLCs"
  },
  {
    "title": "Ivresse de mes reves",
    "id": "lCEXIr0WWEc",
    "url": "https://youtu.be/lCEXIr0WWEc"
  },
  {
    "title": "Chaman viking",
    "id": "RULS7nkOx20",
    "url": "https://youtu.be/RULS7nkOx20"
  },
  {
    "title": "Plenitude",
    "id": "vr-43dDHWSA",
    "url": "https://youtu.be/vr-43dDHWSA"
  }, 
  {
    title: "Hypnokinetic",
    id: "1NGeiLDDWzo",
    url: "https://youtu.be/1NGeiLDDWzo",
  },
];


  
  const StaticVideos: React.FC = () => {
    return (
      <div  className="min-h-screen py-24 w-full xl:w-[85vw] font-cinzel mx-auto flex flex-col items-center justify-center gap-y-8">
      <h1 className="relative text-2xl xl:text-4xl  w-full text-left   pl-8 xl:pl-16" style={{ zIndex: 50 }}>
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
                  className="w-full h-full object-cover xl:px-0"
                  width={300}
                  height={200}
                />
                
              </div>
              <p className="mt-2 text-gray-500 text-center text-lg lg:text-xl ">{video.title}</p>
            </a>
          ))}
        </div>
      </div>
    )
  }
  
  export default StaticVideos
  