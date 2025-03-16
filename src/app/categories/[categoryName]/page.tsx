// src/app/categories/[categoryName]/page.tsx
"use client"
// src/app/categories/[categoryName]/page.tsx

import React from 'react';

interface CategoryPageProps {
  params: Promise<{ categoryName: string }>;
}

const CategoryPage = ({ params }: CategoryPageProps) => {
  const [categoryName, setCategoryName] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Unwrap the params promise and set the category name
    params.then((resolvedParams) => {
      setCategoryName(resolvedParams.categoryName);
    });
  }, [params]);

  // Render loading state while the category name is being fetched
  if (categoryName === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full py-10 px-5">
      <h2 className="text-2xl font-bold mb-5 text-center">Category: {categoryName}</h2>
      {/* You can add more content related to the category here */}
    </div>
  );
};

export default CategoryPage;
