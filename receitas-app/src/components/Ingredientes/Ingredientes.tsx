import { InputField } from "../Form";
import { FaPlus, FaTimes } from "react-icons/fa";


interface IngredietesProps {
  ingredientes: string[];
  setIngredientes: (ingredientes: string[]) => void;
}

const Ingredientes: React.FC<IngredietesProps> = ({ ingredientes, setIngredientes }) => {
  const handleAddIngredient = () => {
    setIngredientes([...ingredientes, ""]);
  };

  const handleChangeIngredient = (index: number, value: string) => {
    const newIngredientes = [...ingredientes];
    newIngredientes[index] = value;
    setIngredientes(newIngredientes);
  };

  const handleRemoveIngredient = (index: number) => {
    const newIngredientes = ingredientes.filter((_, i) => i !== index);
    setIngredientes(newIngredientes);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-semibold">Ingredientes</h2>
      <div className="flex flex-col gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded max-h-60 overflow-y-auto">
        {ingredientes.map((ingrediente, index) => (
          <div key={index} className="flex items-center gap-2">
            <InputField
              value={ingrediente}
              onChange={(e) => handleChangeIngredient(index, e.target.value)}
              name={`ingrediente-${index}`}
              required
            />
            <button
              type="button"
              onClick={() => handleRemoveIngredient(index)}
              className="text-red-500 hover:text-red-700 bg-transparent p-0 focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddIngredient}
          className="items-center self-center text-yellow-600 hover:text-yellow-950 border-yellow-500 hover:border-yellow-700 mt-1 bg-transparent justify-center focus:outline-none"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
}

export default Ingredientes;