export const TRANSACTION_TYPES = {
    0: "Despesa",
    1: "Receita"
} as const;

// Gera a lista para o Select automaticamente
export const transactionTypeOptions = Object.entries(TRANSACTION_TYPES).map(([id, label]) => ({
    value: Number(id),
    label
}));