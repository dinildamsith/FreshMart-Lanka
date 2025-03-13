import PageBreadcrumb from "../components/common/PageBreadCrumb";
import UserMetaCard from "../components/UserProfile/UserMetaCard";
import PageMeta from "../components/common/PageMeta";
import {useEffect, useState} from "react";
import {getUser} from "../services/auth/authServices.ts";
import {decodeToken} from "../services/decodeToken.ts";

export default function UserProfiles() {


    const [userDetails, setUserDetails] = useState()
    const token = decodeToken()

    const fetchProfileDetails = async () => {
        const res = await getUser(token.email)
        setUserDetails(res.data)
        console.log(res.data)
    }

    useEffect(() => {
        fetchProfileDetails()
    }, []);


  return (
    <>
      <PageMeta
        title="user-profile"
        description="user-profile-details"
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <UserMetaCard userDeatils={userDetails}/>
          {/*<UserInfoCard />*/}
          {/*<UserAddressCard />*/}
        </div>
      </div>
    </>
  );
}
