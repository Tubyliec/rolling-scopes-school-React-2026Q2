export type PageButtonProps = Readonly<{
  page: number;
  isActive: boolean;
  onClick: (page: number) => void;
}>;
