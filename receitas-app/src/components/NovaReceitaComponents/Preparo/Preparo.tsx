import { TextAreaInput } from "../../Form";
import { FaPlus, FaTimes } from "react-icons/fa";

interface PreparoProps {
  etapas: string[];
  setEtapas: (etapas: string[]) => void;
}

const Preparo: React.FC<PreparoProps> = ({ etapas, setEtapas }) => {
  const handleAddEtapa = () => {
    setEtapas([...etapas, ""]);
  };

  const handleChangeEtapa = (index: number, value: string) => {
    const newEtapas = [...etapas];
    newEtapas[index] = value;
    setEtapas(newEtapas);
  };

  const handleRemoveEtapa = (index: number) => {
    const newEtapas = etapas.filter((_, i) => i !== index);
    setEtapas(newEtapas);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-semibold">Modo de Preparo</h2>
      <div className="flex flex-col gap-2 p-2 bg-green-50 border border-green-200 rounded max-h-60 overflow-y-auto">
        {etapas.map((etapa, index) => (
          <div key={index} className="flex items-start gap-2">
            <span className="mt-2 font-semibold self-center">{index + 1}.</span>
            <TextAreaInput
              value={etapa}
              onChange={(e) => handleChangeEtapa(index, e.target.value)}
              name={`etapa-${index}`}
              required
            />
            <button
              type="button"
              onClick={() => handleRemoveEtapa(index)}
              className="text-red-500 hover:text-red-700 bg-transparent p-0 focus:outline-none mt-1 self-center"
            >
              <FaTimes />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddEtapa}
          className="items-center self-center text-green-600 hover:text-green-950 border-green-500 hover:border-green-700 mt-1 bg-transparent justify-center focus:outline-none"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default Preparo;