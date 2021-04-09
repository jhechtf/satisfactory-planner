export interface ItemsInterface {
  id: string;
  name: string;
  description: string;
  type: 'RF_SOLID' | 'RF_LIQUID' | 'RF_GAS';
}

export interface RecipesInterface {
  ClassName: string;
  mDisplayName: string;
  mIngredients: string;
  mProduct: string;
  mManufactoringDuration: string;
  mManualManufacturingMultiplier: string;
  mProducedIn: string;
  inputs: { ItemClass: string; Amount: number }[];
  outputs: { ItemClass: string; Amount: number }[];
}