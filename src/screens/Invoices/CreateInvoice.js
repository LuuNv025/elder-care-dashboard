import React, { useState } from "react";
import Layout from "../../Layout";
import {
  Button,
  FromToDate,
  Input,
  Select,
  Textarea,
} from "../../components/Form";
import { BiChevronDown, BiPlus } from "react-icons/bi";
import PatientMedicineServiceModal from "../../components/Modals/PatientMedicineServiceModal";
import AddItemModal from "../../components/Modals/AddItemInvoiceModal";
import { invoicesData, sortsDatas } from "../../components/Datas";
import { toast } from "react-hot-toast";
import { BsSend } from "react-icons/bs";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { InvoiceProductsTable } from "../../components/Tables";
import SenderReceverComp from "../../components/SenderReceverComp";

function CreateInvoice() {
  const [dateRange, setDateRange] = useState([
    new Date(),
    new Date(new Date().setDate(new Date().getDate() + 7)),
  ]);
  const [startDate, endDate] = dateRange;
  const [isOpen, setIsOpen] = useState(false);
  const [itemOpen, setItemOpen] = useState(false);
  const [currency, setCurrency] = useState(sortsDatas.currency[0]);

  // date picker
  const onChangeDates = (update) => {
    setDateRange(update);
  };

  return (
    <Layout>
      {isOpen && (
        <PatientMedicineServiceModal
          closeModal={() => setIsOpen(!isOpen)}
          isOpen={isOpen}
          patient={true}
        />
      )}
      {itemOpen && (
        <AddItemModal
          closeModal={() => setItemOpen(!itemOpen)}
          isOpen={itemOpen}
        />
      )}
      <div className="flex items-center gap-4">
        <Link
          to="/invoices"
          className="bg-white border border-subMain border-dashed rounded-lg py-3 px-4 text-md"
        >
          <IoArrowBackOutline />
        </Link>
        <h1 className="text-xl font-semibold">Tạo Hóa Đơn</h1>
      </div>
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="100"
        data-aos-offset="200"
        className="bg-white my-8 rounded-xl border-[1px] border-border p-5"
      >
        {/* tiêu đề */}
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2 items-center">
          <div className="lg:col-span-3">
            <img
              src="/images/logo1.png"
              alt="logo"
              className="w-32 object-contain"
            />
          </div>

          <div className="flex flex-col gap-4">
            <FromToDate
              startDate={startDate}
              endDate={endDate}
              label="Ngày tháng"
              onChange={onChangeDates}
            />
          </div>
        </div>
        {/* người gửi và người nhận */}
        <SenderReceverComp
          item={invoicesData?.[1].to}
          functions={{
            openModal: () => {
              setIsOpen(!isOpen);
            },
          }}
          button={true}
        />
        {/* sản phẩm */}
        <div className="grid grid-cols-6 gap-6 mt-8">
          <div className="col-span-6 lg:col-span-4 p-6 border border-border rounded-xl overflow-hidden">
            <InvoiceProductsTable
              data={invoicesData[1].items}
              functions={{
                deleteItem: (id) => {
                  toast.error("Tính năng này chưa khả dụng");
                },
              }}
              button={true}
            />

            {/* thêm sản phẩm */}
            <button
              onClick={() => setItemOpen(!itemOpen)}
              className="text-subMain flex-rows gap-2 rounded-lg border border-subMain border-dashed py-4 w-full text-sm mt-4"
            >
              <BiPlus /> Thêm sản phẩm
            </button>
          </div>
          <div className="lg:col-span-2 col-span-6 flex flex-col gap-6">
            <Select
              selectedPerson={currency}
              setSelectedPerson={setCurrency}
              datas={sortsDatas?.currency}
            >
              <div className="h-14 w-full text-xs text-main rounded-md border border-border px-4 flex items-center justify-between">
                <p>{currency?.name}</p>
                <BiChevronDown className="text-xl" />
              </div>
            </Select>
            <div className="grid sm:grid-cols-2 gap-6">
              <Input
                label="Giảm giá"
                color={true}
                type="number"
                placeholder={"3000"}
              />
              <Input
                label="Thuế (%)"
                color={true}
                type="number"
                placeholder={"3"}
              />
            </div>
            <div className="flex-btn gap-4">
              <p className="text-sm font-extralight">Tổng phụ:</p>
              <h6 className="text-sm font-medium">$459</h6>
            </div>
            <div className="flex-btn gap-4">
              <p className="text-sm font-extralight">Giảm giá:</p>
              <h6 className="text-sm font-medium">$49</h6>
            </div>
            <div className="flex-btn gap-4">
              <p className="text-sm font-extralight">Thuế:</p>
              <h6 className="text-sm font-medium">$4.90</h6>
            </div>
            <div className="flex-btn gap-4">
              <p className="text-sm font-extralight">Tổng cộng:</p>
              <h6 className="text-sm font-medium text-green-600">$6000</h6>
            </div>
            {/* ghi chú */}
            <Textarea
              label="Ghi chú"
              placeholder="Cảm ơn quý khách đã tin dùng. Hẹn gặp lại trong lần mua sắm tiếp theo!"
              color={true}
              rows={3}
            />
            {/* nút lưu */}
            <Button
              label="Lưu và Gửi"
              onClick={() => {
                toast.error("Tính năng này chưa khả dụng");
              }}
              Icon={BsSend}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateInvoice;
