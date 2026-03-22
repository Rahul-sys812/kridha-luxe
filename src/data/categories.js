import autumn1 from '@/images/Autumn Earrings for Women Maple Leaf Earrings/1.png';
import floralStuds1 from '@/images/Floral Studs Earrings/1.png';

export const categoryData = [
  { name: 'All', image: autumn1.src },
  { name: 'Earrings', image: floralStuds1.src },
];

export const categoryNames = categoryData.map(c => c.name);

// A filtered list for menus that shouldn't show "All" as an option.
export const menuCategories = categoryData.filter(c => c.name !== 'All');
export const menuCategoryNames = menuCategories.map(c => c.name);
