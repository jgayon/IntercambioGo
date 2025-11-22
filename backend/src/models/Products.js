// models/Products.js
export const Product = {
  tableName: "products",
  columns: [
    "id",
    "title",
    "description",
    "image",
    "price",
    "owner_id",
    "created_at"
  ]
};
