export const CATEGORY_TYPES = {
    0: "Despesa",
    1: "Receita",
    2: "Ambos"
} as const;

// Gera a lista para o Select automaticamente
export const categoryTypeOptions = Object.entries(CATEGORY_TYPES).map(([id, label]) => ({
    value: Number(id),
    label
}));