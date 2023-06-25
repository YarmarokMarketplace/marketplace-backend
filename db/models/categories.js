const { Schema, model } = require("mongoose");

const handleMongooseError = require("../../utils/handleMongooseError");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
          enum: ["Авто", "Бізнес та послуги", "Віддам безкоштовно", "Дитячий світ", "Дім і сад", "Допомога",
              "Електроніка", "Запчастини для транспорту", "Мода і стиль", "Нерухомість", "Обмін",
          "Ремонтні послуги", "Робота", "Тварини", "Товари для перемоги", "Хобі, відпочинок та спорт"],
    },
  },
  { versionKey: false, timestamps: true }
);

categorySchema.post("save", handleMongooseError);

const Category = model("category", categorySchema);

module.exports = {
    Category,
};