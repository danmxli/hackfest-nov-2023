import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen grid grid-cols-8">
      <div className='bg-teal-950 h-screen col-span-3'>
        
      </div>

      <div className='h-screen col-span-5 flex items-center justify-center'>
        <div className='p-8 bg-teal-50/60 rounded-3xl shadow-lg m-4'>
          <h1 className='text-5xl mb-1'>Introducing <span className='text-teal-600'>see</span><span className='text-teal-800'>Pickle</span>.</h1>
          <code>your personal achievement visualization tool.</code>
        </div>
        <div>
          <div className='p-8 m-4 border border-2 border-teal-800 rounded-3xl'>
            Every successful narrative starts with a plan.
          </div>
          <div className='p-8 m-4 border border-2 border-teal-800 rounded-3xl'>
            Optimize the conceptualization and execution of your plans with seePickle.
          </div>
          <div className='p-8 m-4 border border-2 border-teal-800 rounded-3xl'>
            Create beautiful and informative roadmaps.
          </div>
        </div>
      </div>
    </div>
  )
}
