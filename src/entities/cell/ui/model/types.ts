export type CellType = 'cash' | 'x2' | 'zero' | 'bomb';

export type Cell = {
  id: number;
  type: CellType;
  value?: number;
  opened: boolean;
};
