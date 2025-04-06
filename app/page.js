
import Timeline from "@/components/Timeline";


export default function Home() {
  return (
    <div className="min-h-screen">
      <div >
        <div className="min-h-screen bg-white p-8 flex flex-col items-center justify-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-8">What's Next?</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl text-center">
            The journey continues! We're excited about the future and the innovations we'll bring to education technology.
          </p>
          <button className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
            Explore Our Future Plans
          </button>
        </div>
      </div>
      <Timeline />
      <div >
        <div className="min-h-screen bg-white p-8 flex flex-col items-center justify-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-8">What's Next?</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl text-center">
            The journey continues! We're excited about the future and the innovations we'll bring to education technology.
          </p>
          <button className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
            Explore Our Future Plans
          </button>
        </div>
      </div>
    </div>
  );
}