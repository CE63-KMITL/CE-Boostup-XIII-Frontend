// export const load = async () => {
//     const fetchoverall = async () => {
//       const res = await fetch('https://example.com/api/overall'); // เปลี่ยน URL ให้ถูกต้อง
//       const data = await res.json();
//       return data.overall;
//     };
  
//     const fetchhouse = async () => {
//       const res = await fetch('https://example.com/api/house'); // เปลี่ยน URL ให้ถูกต้อง
//       const data = await res.json();
//       return data.house;
//     };
  
//     const fetchmyhouse = async () => {
//       const res = await fetch('https://example.com/api/myhouse'); // เปลี่ยน URL ให้ถูกต้อง
//       const data = await res.json();
//       return data.myhouse;
//     };
  
//     // ดึงข้อมูลพร้อมกันทั้งหมด (รอพร้อมกัน)
//     const [overall, house, myhouse] = await Promise.all([
//       fetchoverall(),
//       fetchhouse(),
//       fetchmyhouse()
//     ]);
  
//     return {
//       overall,
//       house,
//       myhouse
//     };
//   };