// models/Trades.js
export const Trade = {
  tableName: "trades",
  columns: [
    "id",
    "user_product_id",
    "target_product_id",
    "requester_id",
    "receiver_id",
    "status",
    "created_at"
  ]
};
