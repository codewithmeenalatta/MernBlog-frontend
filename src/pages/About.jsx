import React from "react";
const About  = () => {

    const values = [
    {
      id: 1,
      title: 'Innovation',
      description: 'We embrace new ideas and technologies to enhance the writing and reading experience.',
      icon: '🚀',
      bgColor: 'bg-blue-600',
    },
    {
      id: 2,
      title: 'Community',
      description: 'Building meaningful connections between writers and readers around the world.',
      icon: '🤝',
      bgColor: 'bg-purple-500',
    },
    {
      id: 3,
      title: 'Authenticity',
      description: 'Celebrating genuine voices and original perspectives in every story shared.',
      icon: '🎯',
      bgColor: 'bg-green-500',
    },
  ];
    return (
        <>
<section className="w-full bg-gradient-to-r from-[#eef2fa] to-[#fdf4fb] py-28 px-4 flex flex-col items-center justify-center text-center">
      
      {/* Heading */}
      <h1 className="text-6xl font-bold text-[#6842ff] mb-6 tracking-tight">
        About Blogify
      </h1>
      
      {/* Subtext */}
      <p className="text-[#4a5568] text-xl max-w-4xl leading-relaxed">
        Where stories come alive and ideas find their voice. Join our community of passionate <br className="hidden md:block" /> writers and readers.
      </p>

    </section>

    {/* //  story section */}

    <section className="bg-[#f8faff] min-h-screen flex items-center justify-center p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Side: Text and Statistics */}
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-[#1e293b]">
            Our Story
          </h2>
          
          <div className="space-y-6 text-[#475569] leading-relaxed text-lg">
            <p>
              Blogify was born from a simple belief: everyone has a story worth telling. In
              a world flooded with information, we wanted to create a space where
              authentic voices could shine through.
            </p>
            <p>
              Since our launch, we've grown into a vibrant community of writers, thinkers,
              and dreamers who share their experiences, insights, and creativity with the
              world.
            </p>
          </div>

          {/* Statistics Grid */}
          <div className="flex flex-wrap gap-8 pt-4">
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-[#2563eb]">10K+</span>
              <span className="text-sm text-[#64748b] mt-1 font-medium">Stories Published</span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-[#9333ea]">5K+</span>
              <span className="text-sm text-[#64748b] mt-1 font-medium">Active Writers</span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-[#16a34a]">50K+</span>
              <span className="text-sm text-[#64748b] mt-1 font-medium">Monthly Readers</span>
            </div>
          </div>
        </div>

        {/* Right Side: Stylized Card Graphic */}
        <div className="relative w-full max-w-lg mx-auto lg:ml-auto">
          {/* Outer Gradient Container */}
          <div className="rounded-[2.5rem] bg-gradient-to-br from-[#4ca5ff] via-[#8b6fff] to-[#c24efb] p-8 md:p-10 shadow-2xl shadow-purple-500/10">
            
            {/* Inner White Card */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
              
              {/* Card Header */}
              <div className="flex items-center gap-4 mb-8">
                {/* Gradient Icon Circle */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4ca5ff] to-[#a35ffd] flex items-center justify-center text-xl shadow-inner">
                  <span role="img" aria-label="write">✍️</span>
                </div>
                <div>
                  <h3 className="text-[#1e293b] font-semibold text-lg leading-tight">
                    Write Your Story
                  </h3>
                  <p className="text-[#64748b] text-sm mt-0.5">
                    Share your unique perspective
                  </p>
                </div>
              </div>

              {/* Card Body Placeholder / Progress Area */}
              <div className="bg-[#f8fafc] rounded-xl p-6 space-y-4">
                {/* Main Progress Line (Gradient) */}
                <div className="w-full bg-[#e2e8f0] h-2.5 rounded-full overflow-hidden">
                  <div className="w-[92%] h-full bg-gradient-to-r from-[#3b82f6] to-[#a855f7] rounded-full"></div>
                </div>
                
                {/* Standard Placeholder Line */}
                <div className="w-full bg-[#e2e8f0] h-2.5 rounded-full"></div>
                
                {/* Short Placeholder Line */}
                <div className="w-3/4 bg-[#e2e8f0] h-2.5 rounded-full"></div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>

    {/* value section  */}


<section className="py-20 px-6 max-w-6xl mx-auto font-sans bg-white">
      {/* Header Section */}
      <div className="text-center mb-20">
        <h2 className="text-4xl font-bold text-slate-800 mb-4 tracking-tight">
          What We Believe
        </h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Our core values guide everything we do and shape the community we're building together.
        </p>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
        {values.map((value) => (
          <div key={value.id} className="flex flex-col items-center text-center">
            {/* Circular Icon Container */}
            <div
              className={`w-20 h-20 rounded-full ${value.bgColor} flex items-center justify-center text-3xl mb-6 shadow-sm`}
            >
              {value.icon}
            </div>
            
            {/* Card Content */}
            <h3 className="text-xl font-semibold text-slate-800 mb-4">
              {value.title}
            </h3>
            <p className="text-slate-500 leading-relaxed px-4">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </section>

    {/* Team section */}

    <div className="bg-[#fafafc] py-20 font-sans">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Meet Our Team</h2>
          <p className="text-slate-500 text-lg">
            The passionate people behind Blogify
          </p>
        </div>
        
        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Member 1: Pravesh */}
          <div className="flex flex-col items-center text-center">
            <div className="w-36 h-36 bg-blue-500 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <span className="text-white text-5xl font-bold">P</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Pravesh Yadav</h3>
            <p className="text-blue-500 font-medium mb-4">Founder & CEO</p>
            <p className="text-slate-500 px-4 leading-relaxed max-w-[280px]">
              Passionate about creating platforms that amplify human creativity and connection.
            </p>
          </div>

          {/* Member 2: Sarah */}
          <div className="flex flex-col items-center text-center">
            <div className="w-36 h-36 bg-[#a855f7] rounded-full flex items-center justify-center mb-6 shadow-sm">
              <span className="text-white text-5xl font-bold">S</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Sarah Johnson</h3>
            <p className="text-[#a855f7] font-medium mb-4">Head of Content</p>
            <p className="text-slate-500 px-4 leading-relaxed max-w-[280px]">
              Dedicated to fostering a supportive environment where writers can flourish.
            </p>
          </div>

          {/* Member 3: Mike */}
          <div className="flex flex-col items-center text-center">
            <div className="w-36 h-36 bg-[#10b981] rounded-full flex items-center justify-center mb-6 shadow-sm">
              <span className="text-white text-5xl font-bold">M</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Mike Chen</h3>
            <p className="text-[#10b981] font-medium mb-4">Lead Developer</p>
            <p className="text-slate-500 px-4 leading-relaxed max-w-[280px]">
              Building the technical foundation that powers creativity and innovation.
            </p>
          </div>

        </div>
      </div>
    </div>
    
    </>

    

    )
};
export default About;