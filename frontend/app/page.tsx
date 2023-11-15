import UserPortal from "@/components/UserPortal"

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
