export interface ItemType {
  name: string;
  key: string;
}

export interface ItemProps {
  item: ItemType;
  current: ItemType;

  onClick(item: ItemType): void;
}
