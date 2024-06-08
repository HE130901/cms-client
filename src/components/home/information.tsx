"use client";

import { CarouselTransition } from "@/components/ui/carousel";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";

const FAQS = [
  {
    title: "1. Vị trí phong thủy độc tôn",
    desc: "Được bao quanh bởi 50 ngôi chùa, thiền viện, giáo sứ lớn, có lịch sử trăm năm tạo nên một vị thể phong thủy độc tôn không nghĩa trang nào có được.",
  },
  {
    title: "2. Cơ sở vật vất hiện đại",
    desc: "Đầy đủ các dịch vụ tiện ích của hoa viên nghĩa trang cao cấp: Đền trình, Nhà tang lễ, Tịnh xá, Khu lưu trữ tro cốt...",
  },
  {
    title: "3. Dich vụ chăm sóc khách hàng 24/7",
    desc: "",
  },
  {
    title: "4. Sứ mệnh của Bình An Viên?",
    desc: 'Bình An Viên mang sứ mệnh lưu giữ và kế thừa, tiếp nối ký ức và tôn vinh giá trị của người đã khuất cho thế hệ tiếp theo. Đó chính là nghĩa cử cao đẹp, phù hợp với truyền thống văn hóa "Uống nước nhớ nguồn" của người Việt Nam."',
  },
];

export default function Information() {
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <section className="container mx-auto flex flex-col items-center px-4 py-10 h-screen pt-20">
      <Typography
        variant="h6"
        className="text-center mb-2 font-bold"
        color="orange"
        placeholder=""
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      >
        GIỚI THIỆU TỔNG QUAN
      </Typography>
      <Typography
        variant="h3"
        className="text-center font-bold"
        color="blue-gray"
        placeholder=""
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      >
        AN BÌNH VIÊN
      </Typography>

      <Typography
        variant="lead"
        className="mt-2 lg:max-w-4xl mb-8 w-full text-center !text-gray-800 font-medium"
        placeholder=""
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      >
        Con người ai cũng phải trải qua sinh-lão-bệnh-tử. Khi nhân duyên không
        còn đủ đầy, chúng ta trở về với đất mẹ. Nhưng cái chết không là dấu chấm
        hết của một đời người, cuộc sống của chúng ta vẫn còn tiếp diễn trong
        lòng những người thương yêu và những thế hệ sau nữa. <br /> An Bình Viên
        được xây nên không như là điểm đến cuối cùng của một đời người mà là
        điểm khởi đầu của một cuộc sống tốt đẹp hơn và đề ghi nhớ một cuộc đời
        đã được sống vẹn tròn.
      </Typography>
      <div className="mt-8 w-full grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <div className="mx-auto lg:px-20 flex flex-col">
          {FAQS.map(({ title, desc }, key) => (
            <Accordion
              key={key}
              open={open === key + 1}
              onClick={() => handleOpen(key + 1)}
              className="mb-4"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              <AccordionHeader
                className="text-left text-gray-900"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                {title}
              </AccordionHeader>
              <AccordionBody>
                <Typography
                  color="blue-gray"
                  className="font-normal text-gray-500"
                  placeholder=""
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  {desc}
                </Typography>
              </AccordionBody>
            </Accordion>
          ))}
        </div>
        <div className="mx-auto lg:px-20 h-96 flex items-center"></div>
      </div>
    </section>
  );
}
