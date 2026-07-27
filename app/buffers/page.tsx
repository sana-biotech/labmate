"use client";
import { useState, useEffect } from "react";

interface BufferRecipe {
  id: number;
  name: string;
  ingredients: string;
  ph: string;
}

export default function Buffers() {
  const [recipes, setRecipes] = useState<BufferRecipe[]>([]);
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [ph, setPh] = useState("");

  // Load saved recipes when page opens
  useEffect(() => {
    const saved = localStorage.getItem("bufferRecipes");
    if (saved) {
      setRecipes(JSON.parse(saved));
    }
  }, []);

  // Save recipes whenever they change
  useEffect(() => {
    localStorage.setItem("bufferRecipes", JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = () => {
    if (!name || !ingredients) return;
    const newRecipe: BufferRecipe = {
      id: Date.now(),
      name,
      ingredients,
      ph,
    };
    setRecipes([newRecipe, ...recipes]);
    setName("");
    setIngredients("");
    setPh("");
  };

  const deleteRecipe = (id: number) => {
    setRecipes(recipes.filter((r) => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <a href="/" className="text-blue-600 mb-6 inline-block">&larr; Back to Home</a>
      <h1 className="text-3xl font-bold text-blue-900 mb-8">🧫 Buffer Recipes</h1>

      {/* Add new recipe form */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-8 max-w-xl">
        <h2 className="text-xl font-semibold mb-4">Save a New Recipe</h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Buffer name (e.g. 1M Tris Buffer)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg p-2 w-full"
          />
          <textarea
            placeholder="Ingredients & preparation steps"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="border rounded-lg p-2 w-full h-24"
          />
          <input
            type="text"
            placeholder="pH (optional)"
            value={ph}
            onChange={(e) => setPh(e.target.value)}
            className="border rounded-lg p-2 w-full"
          />
          <button
            onClick={addRecipe}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Save Recipe
          </button>
        </div>
      </div>

      {/* Saved recipes list */}
      <div className="max-w-xl space-y-4">
        <h2 className="text-xl font-semibold">Saved Recipes</h2>
        {recipes.length === 0 && (
          <p className="text-gray-500">No recipes saved yet.</p>
        )}
        {recipes.map((r) => (
          <div key={r.id} className="bg-white shadow-md rounded-xl p-4 relative">
            <h3 className="font-semibold text-blue-800">{r.name}</h3>
            {r.ph && <p className="text-sm text-gray-500">pH: {r.ph}</p>}
            <p className="text-gray-700 whitespace-pre-line mt-2">{r.ingredients}</p>
            <button
              onClick={() => deleteRecipe(r.id)}
              className="absolute top-3 right-3 text-red-500 text-sm hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}