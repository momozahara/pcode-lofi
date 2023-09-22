export interface ItemType {
  name: string;
  key: string;
}

export interface ItemProps {
  item: ItemType;
  current: ItemType;
  // eslint-disable-next-line no-unused-vars
  onClick(item: ItemType): void;
}
