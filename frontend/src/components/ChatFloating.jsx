import React, { useState } from "react";
import { ask } from "../services/chatService";

export default function ChatFloating(){
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [ans, setAns] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!q.trim()) return;
    setLoading(true);
    try {
      const res = await ask(q);
      setAns(res.answer || JSON.stringify(res));
    } catch (e) {
      setAns("Sorry, something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed right-5 bottom-5 z-40">
        <button onClick={() => setOpen(!open)} className="bg-fggreen w-14 h-14 rounded-full shadow-lg text-white text-xl flex items-center justify-center">
          💬
        </button>
      </div>

      {open && (
        <div className="fixed right-5 bottom-24 z-50 w-80 md:w-96 bg-white rounded-lg shadow-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold">PlantCareBot</h4>
            <button onClick={()=>setOpen(false)} className="text-gray-500">✕</button>
          </div>
          <textarea value={q} onChange={(e)=>setQ(e.target.value)} rows={3} className="w-full border rounded p-2 text-sm" placeholder="Ask about watering, light, pests..."></textarea>
          <div className="mt-2 flex gap-2">
            <button onClick={handleAsk} disabled={loading} className="flex-1 bg-fggreen text-white py-2 rounded">Ask</button>
            <button onClick={()=>{ setQ(""); setAns(""); }} className="px-3 py-2 border rounded">Clear</button>
          </div>
          <div className="mt-3 text-sm text-gray-700 bg-gray-50 p-2 rounded h-32 overflow-auto">
            {loading ? "Thinking..." : (ans || "No answer yet — ask a question")}
          </div>
        </div>
      )}
    </>
  );
}