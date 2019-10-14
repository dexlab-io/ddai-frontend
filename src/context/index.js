import React from "react";

export const ContextDefaults = {
    selectedRecipe: "",
    DDAI: {},
    setRecipe: (value) => {},
}

export const Context = React.createContext(ContextDefaults)