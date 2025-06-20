const obj = [
  { name: "Mayur", age: "25", place: "rajkot" },
  { name: "PDC", age: "29", place: "amdvd" },
  { name: "uv", age: "27", place: "rajkot" },
];
const places = [...new Set(obj.map((obj) => obj.place))];
places;
const ans = places.map((place, i, arr) => {
  return {
    [place]: obj
      .filter((name) => name.place == place)
      .map(({ place, ...rest }) => {
        return rest;
      }),
  };
});

console.log(ans);

const objQue2 = "Mayur Pdc Uv";
const objQue22 = "20 25";

const names = objQue2.split(" ");
names;
const age = objQue22.split(" ");
age;

const result = names.map((name, i) => {
  return {
    name: name,
    age: age[i] || "n/a",
  };
});

result;

