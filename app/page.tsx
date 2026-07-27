export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-blue-900 mb-2">🧪 LabMate</h1>
      <p className="text-gray-600 mb-10">Your smart lab assistant for biotechnology students</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
        <a href="/calculators" className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition border border-gray-100">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">🧮 Calculators</h2>
          <p className="text-gray-500 text-sm">Molarity, dilution & PCR mastermix calculators</p>
        </a>

        <a href="/buffers" className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition border border-gray-100">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">🧫 Buffer Recipes</h2>
          <p className="text-gray-500 text-sm">Save and view your buffer preparation recipes</p>
        </a>

        <a href="/notes" className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition border border-gray-100">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">📝 Protocol Notes</h2>
          <p className="text-gray-500 text-sm">Keep track of your lab protocols</p>
        </a>

        <a href="/assistant" className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition border border-gray-100">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">🤖 AI Lab Assistant</h2>
          <p className="text-gray-500 text-sm">Ask questions about protocols & troubleshooting</p>
        </a>
      </div>
    </div>
  );
}