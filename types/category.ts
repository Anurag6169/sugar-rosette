export interface Category {
  slug: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface CategoryCardProps {
  category: Category;
  className?: string;
  occasion?: string;
}

export interface CategoryTilesProps {
  className?: string;
  occasion?: string;
}
