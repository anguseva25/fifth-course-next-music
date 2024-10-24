import { formatTime } from "./datetime"

describe("Функция форматирование времени", () => {
  it("Правильный формат из числа в строку", () => {
    const result = formatTime(0);
    expect(result).toBe("0:00");
  });

  it("Правильный формат из числа в строку", () => {
    const result = formatTime(30);
    expect(result).toBe("0:30");
  });

  it("Правильный формат из числа в строку", () => {
    const result = formatTime(60);
    expect(result).toBe("1:00");
  });

  it("Правильный формат из числа в строку", () => {
    const result = formatTime(140);
    expect(result).toBe("2:20");
  });
});
