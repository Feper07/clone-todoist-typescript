import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style-sheets/ButtonLabels.css";
import { BsFlagFill, BsFlag, BsCheck } from "react-icons/bs";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import { FiTag } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";


////
interface ButtonLabelsProps {
  onOptionChange: (options: Set<string>) => void;
  selectedOptions: Set<string>
  inputTags: Set<string>;
}

const ButtonLabels: React.FC<ButtonLabelsProps> = ({ onOptionChange, selectedOptions, inputTags}: ButtonLabelsProps) => {
  const [showContainerLabel, setShowContainerLabel] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState<Set<string>>(selectedOptions);
  const [newLabel, setNewLabel] = useState("");
  const [iconColor, setIconColor] = useState("");
  const [options, setOptions] = useState<string[]>(["Trabajo", "Gym"]); // Initial options
  const [allTags, setAllTags] = useState<string[]>(["Trabajo", "Gym"]); // Inicialmente contiene las etiquetas existentes


  //////
  useEffect(()=>{
    setSelectedLabels(selectedOptions);
  }, [selectedOptions]);

  useEffect(() => {
    // Normalizar todas las etiquetas seleccionadas a minúsculas antes de comparar
    const lowercaseSelectedOptions = new Set(Array.from(selectedOptions).map(option => option.toLowerCase()));
    setSelectedLabels(lowercaseSelectedOptions);
  }, []); // Solo se ejecuta una vez al montar el componente


  const containerRef = useRef<HTMLDivElement | null>(null);

  const toggleOptionsLabels = () => {
    setShowContainerLabel(!showContainerLabel);
  };

  const handleLabelClick = (option: string) => {
    const updatedLabels = new Set(selectedLabels);

    // Normalizar la etiqueta a minúsculas antes de comparar
    const normalizedOption = option.toLowerCase();

    if (updatedLabels.has(normalizedOption)) {
        updatedLabels.delete(normalizedOption);
    } else {
        updatedLabels.add(normalizedOption);
    }

    setSelectedLabels(updatedLabels);
    onOptionChange(updatedLabels);
};

  useEffect(() => {
      // Normalizar todas las opciones a minúsculas
      const lowercaseOptions = options.map(option => option.toLowerCase());
      setOptions(lowercaseOptions);
  }, [options]);

  useEffect(() => {
      // Normalizar todas las etiquetas seleccionadas a minúsculas antes de comparar
      const lowercaseSelectedOptions = new Set(Array.from(selectedOptions).map(option => option.toLowerCase()));
      setSelectedLabels(lowercaseSelectedOptions);
  }, [selectedOptions]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputText = event.target.value;
      const capitalizedText = inputText.charAt(0).toUpperCase() + inputText.slice(1);

      setNewLabel(capitalizedText);
      setIconColor(capitalizedText.trim() ? "#db4c3f" : "#eda59e");
    };

    const handleAddLabelClick = () => {
      if (newLabel.trim() && !options.includes(newLabel.trim())) {
        
        setOptions([...options, newLabel.trim()]);
        setAllTags(prevTags => [...prevTags, newLabel.trim()]);
        const updatedLabels = new Set(selectedLabels);
        updatedLabels.add(newLabel.trim());
        setSelectedLabels(updatedLabels);
        onOptionChange(updatedLabels);
      } else {
        console.log(`La etiqueta "${newLabel.trim()}" ya existe`);
      }

      setNewLabel("");
      setShowContainerLabel(false);
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setShowContainerLabel(false);
        }
      };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="label-options" ref={containerRef}>
      <button className="label-container-button-main" onClick={toggleOptionsLabels}>
          Etiquetas 
      </button>
      {showContainerLabel && (
        <div className="label-container">
          <button>
            <input
              className="input-label"
              type="text"
              placeholder="Nueva Etiqueta"
              value={newLabel}
              onChange={handleInputChange}
            />  
            <button
              className="add-label"
              onClick={handleAddLabelClick}
              disabled={!newLabel.trim()}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;<AiFillPlusCircle
                className="labelAiFillPlusCircle"
                style={{ color: iconColor }}
              />
            </button>
          </button>
          {Array.from(inputTags).map((option, index) => (
            <button
              key={index}
              onClick={() => handleLabelClick(option)}
              className="last-container-opcontainertion"
            >
              <div>
                &nbsp;&nbsp;&nbsp;<FiTag className="fitag" />
                &nbsp;&nbsp;&nbsp;{option.toUpperCase()}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
              <div>
                {selectedLabels.has(option) && <BsCheck className="nike" />}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ButtonLabels;

























