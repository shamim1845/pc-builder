type NewPCComponent = {
  component: string;
  productID: string;
};

type SideBar = {
  id: number;
  name: string;
  required: boolean;
  coreComponents: boolean;
  selected: boolean;
};

type RootState = {
  api: any;
  newPC: {
    data: NewPCComponent[];
  };
  sideBar: { data: SideBar[] };
};

type Product = {
  category: string;
  features: [string];
  image: string;
  name: string;
  price: number;
  _id: string;
};

type PDFData = {
  id: number;
  componentName: string;
  productName: string;
  price: string;
};
