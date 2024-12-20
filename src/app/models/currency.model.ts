export type CurrencyRequest = {
    currency: string;
    name: string;
};

export type CurrencyResponse = {
    currency: string;
    name: string;
    date: Date;
    value: number;
};
