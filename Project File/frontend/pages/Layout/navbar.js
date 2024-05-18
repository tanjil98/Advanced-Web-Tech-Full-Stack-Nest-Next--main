import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import { useAuth } from "../utilis/authcontext";

export default function NavBar() {

  const [jsonData, setJsonData] = useState('')
  const router = useRouter();
  const { user, logout, checkUser } = useAuth();
  const [email,setEmail] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {

    checkSession();
    

  }, [email]);

  useEffect(() => {
    
    if (Array.isArray(jsonData)) {
      setFilteredData(
        jsonData.filter(item =>
          item.fullname.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, jsonData]);

  function checkSession()
  {
    if (sessionStorage.getItem('email')!=null) {
      setEmail(e=>sessionStorage.getItem('email'))
      console.log(sessionStorage.getItem('email'))
      console.log(email);
      fetchData();
      console.log("user:  "+email)
      // console.log("user:  "+user.cookie)
    }
    else {
      router.push('/loginform')
    }
  }

  async function fetchData() {

    try {
      const response = await axios.get("http://localhost:3000/admin/getadmin/" + email,{withCredentials:true}

      );
      const jsonData = response.data;
      console.log(jsonData);
      setJsonData(jsonData);
    } catch (error) {
      // console.error(error);
    }
  }

  const handleLogout = () => {

    logout();
    router.push('/loginform');
  };

  const handleSearch = (event) => {
    // console.log(event);
    setSearchQuery(e=>event.target.value);
    console.log(searchQuery);
  };

  return (
<>
{jsonData &&
    <div className="navbar bg-slate-400">
      <div className="flex-1">
      {searchQuery}
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto"  value={searchQuery}
                onChange={(e)=>handleSearch(e)}/>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={process.env.NEXT_PUBLIC_API_ENDPOINT + '/admin/getimage/' + jsonData.filenames} />
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                {user && user.email}
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li> <button onClick={handleLogout}>Logout</button></li>
          </ul>
        </div>
      </div>
    </div>
   
}
{filteredData.map((item) => (
      <div key={item.id}>
        {/* Render each search result item */}
        <p>{item.fullname}</p>
        {/* ... other details */}
      </div>
    ))}
</>
  );
}