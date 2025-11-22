// models/Messages.js
export const Message = {
  tableName: "messages",
  columns: [
    "id",
    "trade_id",
    "sender_id",
    "message",
    "created_at"
  ]
};
