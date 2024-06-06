// import axios from "axios";
// import MockAdapter from "axios-mock-adapter";

// const mock = new MockAdapter(axios, { delayResponse: 500 });

// const mockBuildings = [
//   { id: 1, name: "Tháp A" },
//   { id: 2, name: "Tháp B" },
// ];

// const mockFloorsA = [
//   { id: 1, name: "Floor 1" },
//   { id: 2, name: "Floor 2" },
//   { id: 3, name: "Floor 3" },
// ];

// const mockFloorsB = [
//   { id: 1, name: "Floor 1" },
//   { id: 2, name: "Floor 2" },
//   { id: 3, name: "Floor 3" },
// ];

// const mockSectionsA1 = [
//   { id: 1, name: "Section A1" },
//   { id: 2, name: "Section A2" },
//   { id: 3, name: "Section A3" },
// ];

// const mockSectionsA2 = [
//   { id: 1, name: "Section B1" },
//   { id: 2, name: "Section B2" },
//   { id: 3, name: "Section B3" },
// ];

// const mockSectionsA3 = [
//   { id: 1, name: "Section C1" },
//   { id: 2, name: "Section C2" },
//   { id: 3, name: "Section C3" },
// ];

// const mockSectionsB1 = [
//   { id: 1, name: "Section D1" },
//   { id: 2, name: "Section D2" },
//   { id: 3, name: "Section D3" },
// ];

// const mockSectionsB2 = [
//   { id: 1, name: "Section E1" },
//   { id: 2, name: "Section E2" },
//   { id: 3, name: "Section E3" },
// ];

// const mockSectionsB3 = [
//   { id: 1, name: "Section F1" },
//   { id: 2, name: "Section F2" },
//   { id: 3, name: "Section F3" },
// ];

// // Function to generate unique niches for each section
// const generateMockNiches = () => {
//   return Array.from({ length: 100 }, (_, i) => ({
//     id: i + 1,
//     status:
//       Math.random() < 0.2
//         ? "booked"
//         : Math.random() < 0.1
//         ? "unavailable"
//         : "available",
//   }));
// };

// mock.onGet("/api/buildings").reply(200, mockBuildings);
// mock.onGet("/api/buildings/Tháp A/floors").reply(200, mockFloorsA);
// mock.onGet("/api/buildings/Tháp B/floors").reply(200, mockFloorsB);

// mock
//   .onGet("/api/buildings/Tháp A/floors/1/sections")
//   .reply(200, mockSectionsA1);
// mock
//   .onGet("/api/buildings/Tháp A/floors/2/sections")
//   .reply(200, mockSectionsA2);
// mock
//   .onGet("/api/buildings/Tháp A/floors/3/sections")
//   .reply(200, mockSectionsA3);

// mock
//   .onGet("/api/buildings/Tháp B/floors/1/sections")
//   .reply(200, mockSectionsB1);
// mock
//   .onGet("/api/buildings/Tháp B/floors/2/sections")
//   .reply(200, mockSectionsB2);
// mock
//   .onGet("/api/buildings/Tháp B/floors/3/sections")
//   .reply(200, mockSectionsB3);

// mock
//   .onGet(/\/api\/buildings\/Tháp A\/floors\/\d+\/sections\/\d+\/niches/)
//   .reply(200, generateMockNiches);
// mock
//   .onGet(/\/api\/buildings\/Tháp B\/floors\/\d+\/sections\/\d+\/niches/)
//   .reply(200, generateMockNiches);

// export default mock;
