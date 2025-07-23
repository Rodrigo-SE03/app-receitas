import React, { useState } from "react";
import { InputField, TextAreaInput, MultiSelect, SubmitButton, FileInput } from "../components/Form";
import Ingredientes from "../components/Ingredientes/Ingredientes";

function NovaReceita() {
  const [formData, setFormData] = useState({
    nome: "",
    data: "",
    descricao: "",
    categorias: [] as string[],
    ingredientes: [] as string[],
    preparo: [] as string[],
    foto: null as File | null,
  });

  const handleChange = (e: { target: { name: string; value: any; type?: string; checked?: boolean } }) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
  };

  return (
    <div className="max-w-3xl mx-auto items-center justify-center flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-4">Nova Receita</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full">

        <InputField
          label="Nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          maxLength={80}
          required
        />

        <TextAreaInput
          label="Descrição"
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
        />

        <MultiSelect
          label="Categorias"
          name="categorias"
          values={formData.categorias}
          onChange={handleChange}
          options={[
            { value: "sobremesa", label: "Sobremesa" },
            { value: "entrada", label: "Entrada" },
            { value: "prato_principal", label: "Prato Principal" },
            { value: "bebida", label: "Bebida" },
            { value: "salada", label: "Salada" },
          ]}
          infoTitle="Categorias"
          infoText="Você pode selecionar várias categorias para sua receita."
        />

        <Ingredientes
          ingredientes={formData.ingredientes}
          setIngredientes={(ingredientes) => setFormData({ ...formData, ingredientes })}
        />

        <FileInput
          label="Selecionar Foto"
          name="foto"
          onChange={handleChange}
          accept=".png,.jpg,.jpeg"
          infoTitle="Foto"
          infoText="Adicione uma foto para sua receita. São aceitos arquivos PNG, JPG e JPEG com tamanho máximo de 5MB."
          maxSizeMB={5}
        /> 

        <SubmitButton text="Enviar" customClass="w-full" />

      </form>
    </div>
  );
}

export default NovaReceita;