

export default function Navbar() {
    return (
        
        <div className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-8 bg-black bg-opacity-50 z-50">
            <a href="/" className="text-slate-300 text-2xl hover:underline">Corplux</a>
            <div className="flex space-x-4">
                <button className="text-slate-300">Contact</button>
                <button className="text-slate-100">🛒</button>
            </div>
        </div>
    );
}