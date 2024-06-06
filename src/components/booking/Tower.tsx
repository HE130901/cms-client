"use client";
import React from "react";
import styled from "styled-components";

const PagodaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const FloorSelector = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 20px;
`;

const FloorButton = styled.button<{ selected: boolean }>`
  padding: 10px;
  border: none;
  background-color: ${({ selected }) => (selected ? "#000" : "#ccc")};
  color: #fff;
  cursor: pointer;
  border-radius: 5px;
`;

const FloorPlanContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const FloorPlan = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 50px);
  gap: 10px;
`;

const Room = styled.div<{ selectable: boolean; selected: boolean }>`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ selected }) => (selected ? "#000" : "#fff")};
  border: 2px solid ${({ selectable }) => (selectable ? "#000" : "#ccc")};
  cursor: ${({ selectable }) => (selectable ? "pointer" : "not-allowed")};
  color: ${({ selected }) => (selected ? "#fff" : "#000")};
`;

const Pagoda = () => {
  const [selectedFloor, setSelectedFloor] = React.useState(1);
  const [selectedRoom, setSelectedRoom] = React.useState<string | null>(null);

  const rooms = [
    { id: "K1", selectable: true },
    { id: "K2", selectable: false },
    { id: "K3", selectable: true },
    { id: "K4", selectable: true },
    { id: "K5", selectable: false },
    { id: "K6", selectable: true },
    { id: "K7", selectable: true },
    { id: "K8", selectable: true },
    { id: "K9", selectable: false },
  ];

  const handleRoomClick = (room: string) => {
    if (rooms.find((r) => r.id === room)?.selectable) {
      setSelectedRoom(room);
    }
  };

  return (
    <PagodaContainer>
      <h1>THÁP A</h1>
      <FloorSelector>
        {[1, 2, 3, 4, 5].map((floor) => (
          <FloorButton
            key={floor}
            selected={floor === selectedFloor}
            onClick={() => setSelectedFloor(floor)}
          >
            Tầng {floor}
          </FloorButton>
        ))}
      </FloorSelector>
      <FloorPlanContainer>
        <FloorPlan>
          {rooms.map((room) => (
            <Room
              key={room.id}
              selectable={room.selectable}
              selected={room.id === selectedRoom}
              onClick={() => handleRoomClick(room.id)}
            >
              {room.id}
            </Room>
          ))}
        </FloorPlan>
      </FloorPlanContainer>
    </PagodaContainer>
  );
};

export default Pagoda;
