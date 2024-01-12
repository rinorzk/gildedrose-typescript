import { Item, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {
  it("should create new Item with given name: foo", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  it("should match initial snapshot", function () {
    var items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
      // this conjured item does not work properly yet
      new Item("Conjured Mana Cake", 3, 6),
      new Item("Conjured Mana Cake", 4, 10),
    ];
    var gildedRose = new GildedRose(items);

    var days = 2;
    var values: string[] = [];
    for (var i = 0; i < days; i++) {
      values.push("-------- day " + i + " --------");
      values.push("name, sellIn, quality");
      items.forEach(function (element) {
        values.push(
          element.name + " " + element.sellIn + " " + element.quality
        );
      });
      gildedRose.updateQuality();
    }

    const snapshot = [
      "-------- day 0 --------",
      "name, sellIn, quality",
      "+5 Dexterity Vest 10 20",
      "Aged Brie 2 0",
      "Elixir of the Mongoose 5 7",
      "Sulfuras, Hand of Ragnaros 0 80",
      "Sulfuras, Hand of Ragnaros -1 80",
      "Backstage passes to a TAFKAL80ETC concert 15 20",
      "Backstage passes to a TAFKAL80ETC concert 10 49",
      "Backstage passes to a TAFKAL80ETC concert 5 49",
      "Conjured Mana Cake 3 6",
      "Conjured Mana Cake 4 10",
      "-------- day 1 --------",
      "name, sellIn, quality",
      "+5 Dexterity Vest 9 19",
      "Aged Brie 1 1",
      "Elixir of the Mongoose 4 6",
      "Sulfuras, Hand of Ragnaros 0 80",
      "Sulfuras, Hand of Ragnaros -1 80",
      "Backstage passes to a TAFKAL80ETC concert 14 21",
      "Backstage passes to a TAFKAL80ETC concert 9 50",
      "Backstage passes to a TAFKAL80ETC concert 4 50",
      "Conjured Mana Cake 2 4",
      "Conjured Mana Cake 3 8",
    ];

    expect(snapshot).toEqual(values);
  });
});
