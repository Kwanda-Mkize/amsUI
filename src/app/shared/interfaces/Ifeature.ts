export interface IFeature {
  featureId: number;
  featureKey: string;
}

export interface IFeature_ALT {
  id: number;
  name: string;
  values: [
    {
      id: number;
      value: string;
    }
  ];
}
