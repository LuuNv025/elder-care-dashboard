import React from "react";
import { Button, Input } from "../Form";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { toast } from "react-hot-toast";

function ChangePassword() {
  return (
    <div className="flex-colo gap-4">
      {/* old password */}
      <Input label="Mật khẩu cũ" color={true} type="password" />
      {/* new password */}
      <Input label="Mật khẩu mới" color={true} type="password" />
      {/* confirm password */}
      <Input label="Xác nhận Mật khẩu mới" color={true} type="password" />
      {/* submit */}
      <Button
        label={"Lưu"}
        Icon={HiOutlineCheckCircle}
        onClick={() => {
          toast.error("This feature is not available yet");
        }}
      />
    </div>
  );
}

export default ChangePassword;
