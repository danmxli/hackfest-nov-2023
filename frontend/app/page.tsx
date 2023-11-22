import UserPortal from "@/components/UserPortal"
import { FaGithub } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";

export default function Landing() {
  return (
    <div className="min-h-screen grid grid-cols-8">
      <div className='bg-teal-900 h-screen col-span-3 flex items-center justify-center'>
        <UserPortal />
      </div>

      <div className='h-screen col-span-5 flex items-center justify-center'>
        <div className='p-8 bg-teal-50/60 rounded-3xl shadow-lg m-4 mr-0'>
          <h1 className='text-5xl mb-1'>Introducing <span className='text-teal-600'>see</span><span className='text-teal-800'>Pickle</span>.</h1>
          <code>your personal achievement visualization tool.</code>
          <div className="mt-2 border border-blue-300 p-2 rounded-xl">
            <h1 className="text-sm mb-1 flex items-center gap-1 text-blue-600">
              <CiCircleInfo />seePickle is in beta testing.
            </h1>
            <a href="https://github.com/danmxli/seePickle" className="inline-flex items-center gap-1 bg-blue-100 hover:bg-blue-200 p-1 pl-4 pr-4 rounded-xl">
              <FaGithub />Repository
            </a>
          </div>
        </div>
        <div className="">
          <div className='p-6 m-4 border border-2 border-teal-800 rounded-3xl'>
            <h1 className="text-teal-800 text-xl">Every successful narrative starts with a plan.</h1>
            <p className="text-sm">seePickle lets you blueprint your journey. Simply tell it what you want to accomplish, and let the magic begin!</p>
          </div>
          <div className='p-6 m-4 border border-2 border-teal-800 rounded-3xl'>
            <h1 className="text-teal-800 text-xl">Elevate the Conceptualization and Execution of Your Plans.</h1>
            <p className="text-sm">Harnessing the power of AI, seePickle can craft a base plan tailored to your specific motives.</p>
          </div>
          <div className='p-6 m-4 border border-2 border-teal-800 rounded-3xl'>
            <h1 className="text-teal-800 text-xl">Create beautiful and informative roadmaps.</h1>
            <p className="text-sm">Make ideas come to life with powerful, user-friendly roadmaps with our node-based planning design.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
