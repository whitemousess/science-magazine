import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import routes from "~/config/routes";
import { AuthContext } from "~/shared/AuthProvider";
import Avatar from "~/components/Avatar";

function Profile() {
  const { currentUser, token } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
      <div className="flex justify-center w-full py-10">
        <div className="px-10 flex flex-col items-center justify-center">
          <Avatar
            src={currentUser.imageUrl}
            alt="avatar"
            className="w-[100px] h-[100px] rounded-full"
          />
          <Link
            to={routes.editProfile}
            className="bg-primary mt-4 text-white hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            Thay đổi thông tin
          </Link>
        </div>
        <div className="w-2/3">
          <div className="border border-blue-200 rounded-[5px] overflow-hidden mb-2">
            <div className="bg-blue-200 px-4 py-2">Họ và tên</div>
            <div className="px-4 py-2">{currentUser.fullName}</div>
          </div>

          <div className="border border-blue-200 rounded-[5px] overflow-hidden mb-2">
            <div className="bg-blue-200 px-4 py-2">Email</div>
            <div className="px-4 py-2">{currentUser.email}</div>
          </div>

          <div className="border border-blue-200 rounded-[5px] overflow-hidden mb-2">
            <div className="bg-blue-200 px-4 py-2">Giới tính</div>
            <div className="px-4 py-2">
              {currentUser.gender === 0 ? "Nam" : "Nữ"}
            </div>
          </div>
        </div>
      </div>
  );
}

export default Profile;
