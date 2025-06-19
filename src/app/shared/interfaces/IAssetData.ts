export interface IAsset {
  categoryId: string;
  locationId: string;
  brandId: string;
  description: string;
  serialNumber: string;
  assetAttributes: [
    {
      featureId: string;
      value: string;
    }
  ];
}

interface IAsset_ALT {
  categoryId: string;
  locationId: string;
  brandId: string;
  description: string;
  serialNumber: string;
  assetAttributes: [
    {
      featureId: string;
      featureValueId: string;
    }
  ];
}
