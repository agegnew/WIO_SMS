import CategoryDetail from "./CategoryDetail"

// This runs at build time for static generation
export async function generateStaticParams() {
  return [
    { categoryName: 'restaurant' },
    { categoryName: 'shopping' },
    { categoryName: 'entertainment' },
    { categoryName: 'grocery' },
    { categoryName: 'utility' },
    { categoryName: 'general' }
  ]
}

// Server component that renders the client component
export default function CategoryPage() {
  return <CategoryDetail />
}