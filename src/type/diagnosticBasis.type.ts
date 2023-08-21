export interface Market {
    text: string;
    x: string;
    y: number[];
}

export class BullBearMarket {
    bullMarket: Market[] = [];
    bearMarket: Market[] = [];
}
