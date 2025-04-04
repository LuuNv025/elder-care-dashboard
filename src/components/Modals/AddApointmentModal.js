import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import {
  Button,
  Checkbox,
  DatePickerComp,
  Input,
  Select,
  Textarea,
  TimePickerComp,
} from "../Form";
import { BiChevronDown, BiPlus } from "react-icons/bi";
import { memberData, servicesData, sortsDatas } from "../Datas";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { toast } from "react-hot-toast";
import PatientMedicineServiceModal from "./PatientMedicineServiceModal";

// edit member data
const doctorsData = memberData.map((item) => {
  return {
    id: item.id,
    name: item.title,
  };
});

function AddAppointmentModal({ closeModal, isOpen, datas }) {
  const [services, setServices] = useState(servicesData[0]);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [status, setStatus] = useState(sortsDatas.status[0]);
  const [doctors, setDoctors] = useState(doctorsData[0]);
  const [shares, setShares] = useState({
    email: false,
    sms: false,
    whatsapp: false,
  });
  const [open, setOpen] = useState(false);

  // on change share
  const onChangeShare = (e) => {
    setShares({ ...shares, [e.target.name]: e.target.checked });
  };

  // set data
  useEffect(() => {
    if (datas?.title) {
      setServices(datas?.service);
      setStartTime(datas?.start);
      setEndTime(datas?.end);
      setShares(datas?.shareData);
    }
  }, [datas]);

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={datas?.title ? "Chỉnh sửa cuộc hẹn" : "Thêm cuộc hẹn"}
      width={"max-w-3xl"}
    >
      {open && (
        <PatientMedicineServiceModal
          closeModal={() => setOpen(!isOpen)}
          isOpen={open}
          patient={true}
        />
      )}
      <div className="flex-colo gap-6">
        <div className="grid sm:grid-cols-12 gap-4 w-full items-center">
          <div className="sm:col-span-10">
            <Input
              label="Tên bệnh nhân"
              color={true}
              placeholder={
                datas?.title
                  ? datas.title
                  : "Chọn Bệnh nhân và tên bệnh nhân sẽ xuất hiện ở đây"
              }
            />
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="text-subMain flex-rows border border-dashed border-subMain text-sm py-3.5 sm:mt-6 sm:col-span-2 rounded"
          >
            <BiPlus /> Thêm
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Mục đích chăm sóc</p>
            <Select
              selectedPerson={services}
              setSelectedPerson={setServices}
              datas={servicesData}
            >
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {services.name} <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
          {/* date */}
          <DatePickerComp
            label="Ngày chăm sóc"
            startDate={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <TimePickerComp
            label="Thời gian bắt đầu"
            startDate={startTime}
            onChange={(date) => setStartTime(date)}
          />
          <TimePickerComp
            label="Thời gian kết thúc"
            startDate={endTime}
            onChange={(date) => setEndTime(date)}
          />
        </div>

        {/* status && doctor */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Điều dưỡng</p>
            <Select
              selectedPerson={doctors}
              setSelectedPerson={setDoctors}
              datas={doctorsData}
            >
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {doctors.name} <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Status</p>
            <Select
              selectedPerson={status}
              setSelectedPerson={setStatus}
              datas={sortsDatas.status}
            >
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {status.name} <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
        </div>

        {/* des */}
        <Textarea
          label="Miêu tả"
          placeholder={
            datas?.message ? datas.message : "Cô ấy sẽ đến để kiểm tra....."
          }
          color={true}
          rows={5}
        />

        {/* share */}
        <div className="flex-col flex gap-8 w-full">
          <p className="text-black text-sm">Chia sẻ với bệnh nhân qua</p>
          <div className="flex flex-wrap sm:flex-nowrap gap-4">
            <Checkbox
              name="email"
              checked={shares.email}
              onChange={onChangeShare}
              label="Email"
            />
            <Checkbox
              name="sms"
              checked={shares.sms}
              onChange={onChangeShare}
              label="SMS"
            />
            <Checkbox
              checked={shares.whatsapp}
              name="whatsapp"
              onChange={onChangeShare}
              label="WhatsApp"
            />
          </div>
        </div>
        {/* buttones */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <button
            onClick={closeModal}
            className="bg-red-600 bg-opacity-5 text-red-600 text-sm p-4 rounded-lg font-light"
          >
            {datas?.title ? "Discard" : "Cancel"}
          </button>
          <Button
            label="Save"
            Icon={HiOutlineCheckCircle}
            onClick={() => {
              toast.error("Tính năng này hiện chưa có sẵn");
            }}
          />
        </div>
      </div>
    </Modal>
  );
}

export default AddAppointmentModal;
