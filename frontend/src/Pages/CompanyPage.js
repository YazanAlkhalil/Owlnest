import React, { useEffect } from 'react'
import Navbar2 from '../Components/Navbar2'
import Company2 from '../Components/Company2'
import logo from '../images/logo.png'
import UseFetch from '../Components/AuthComponents/UseFetch'
import Loader from '../Components/Loader'


export default function CompanyPage() {
  const { fetchData, resData, loading, error } = UseFetch();
  useEffect(() => {
    const getCompany = async () => {
      const res = await fetchData({
        method: "get",
        url: "http://127.0.0.1:8000/api/get_companies/",
        data: {},
        params: {},
        headers: {}
      })
    }
    getCompany();
  }, [])
  return (
    <>
    <Navbar2 name={resData?.username} image={resData?.userImg}/>
      <div className="mx-auto bg-Gray min-h-screen dark:text-white p-4 md:p-8">
        <h1 className=' text-2xl md:text-4xl mb-6 md:mb-8'>Companies:</h1>
        {resData ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-10'>
            {resData?.companies?.map((company) => (
              <Company2 key={company.id} image={company.logo} id={company.id} name={company.name} />
            ))}
          </div>
        ) : (
          <div className='container w-full h-[calc(100vh-200px)] flex justify-center items-center'>
            <Loader />
          </div>
        )}
      </div>
    </>
  )
}