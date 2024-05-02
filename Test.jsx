import React, { useState } from "react";

export default function Test() {
  const [address, setAddress] = useState("");
  const [isAddrModalOpen, setIsAddrModalOpen] = useState(false);

  const handleAddrModal = () => setIsAddrModalOpen((prev) => !prev);

  return (
    <div>
      <Input
        type="text"
        id="address"
        name="address"
        autoComplete="off"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        onClick={handleAddrModal}
        readOnly
        placeholder="주소를 입력해주세요"
      />

      {isAddrModalOpen && <Address handleAddrModal={handleAddrModal} handleAddr={handleAddr} />}
    </div>
  );
}

export function Address({ handleAddrModal, handleAddr }) {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    handleAddr(fullAddress);
    handleAddrModal();
  };

  return (
    <Layout>
      <DaumPostcode onComplete={handleComplete} />
    </Layout>
  );
}
