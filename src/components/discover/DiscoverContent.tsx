import { Link } from "react-router-dom";

export default function DiscoverContent() {

    // Update the page title
    document.title = `SignCast Media | Discover`;

    return (
        <div className="flex flex-col min-h-[100dvh]">

            {/* Header */}
            <header className="relative py-20 md:py-32 lg:py-10 mb-10 sm:rounded-lg overflow-hidden bg-white rounded-lg shadow-lg mt-12">
                <div className="container mx-auto px-4 mb-14 md:px-6 lg:px-8 text-center relative z-10">
                    <img src="/assets/companyLogo.png" width={155} className='mx-auto my-8' />
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-8 h-[70px]">
                        SignCast Media Platforms
                    </h1>
                    <p className="lg:text-lg text-gray-800 max-w-3xl mx-auto">
                        Dive into our innovative <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-purple-500 to-blue-500">web workspace</span>, your ultimate canvas for crafting stunning digital signage. When you're ready to share your brilliance with the world, our powerful <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-red-500">SDA desktop application</span> becomes your gateway to global impact.
                    </p>
                </div>
                {/* <video className="top-0 left-0 w-[800px] h-full object-cover z-0 mx-auto shadow-lg">
                    <source src="#" type="video/mp4" />
                    Your browser does not support the video tag.
                </video> */}
            </header>

            {/* About SignCast Platforms */}
            <section className="py-16 md:py-24 lg:py-16 bg-white shadow-lg rounded-lg">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-5 mb-4">
                                About <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-purple-500 to-blue-500"> SignCast Platforms</span>
                            </h2>
                            <b>Innovating the Way You Create and Display Signages</b>
                            <p className="text-gray-800 dark:text-gray-800 leading-relaxed mb-8 mt-8">
                                ✨ <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-blue-500">Our Web Platform</span>
                                <p>
                                    At SignCast, we harness the power of cutting-edge technologies to bring your ideas to life. Our web platform (Signage Workspace) is designed to empower you to craft breathtaking digital signages with ease, offering a seamless and intuitive user experience at every step.
                                </p>
                            </p>
                            <p className="text-gray-800 dark:text-gray-800 leading-relaxed mb-8">
                                ✨ <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500">Our Desktop Application</span>
                                <p>
                                    Our desktop application SDA (stands for "Signcast Desktop Application"), takes your creations to the next level. Built for speed, lightweight performance, and robust security, it ensures a stunning experience for both creators and audiences. With a streamlined setup and user-friendly interface, getting your signages up and running is effortless—perfect for quick and impactful displays.
                                </p>
                            </p>
                        </div>
                        <div className="flex items-center justify-center">
                            <img
                                src="/assets/brand.jpg"
                                alt="SignCast Media"
                                className="rounded-lg shadow-lg w-[500px] object-fill"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Create, Sync, Display */}
            <section className="py-16 md:py-24 lg:py-32">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-red-500 text-center mb-12 h-[80px]">
                        Create 🎨 Sync 🔗 Display 💫
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                            <div className="flex items-center mb-3">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Eo_circle_indigo_white_number-1.svg/2048px-Eo_circle_indigo_white_number-1.svg.png" alt="Customer 1" width={48} height={48} className="rounded-full mr-4" />
                                <div>
                                    <h4 className="text-gray-900 dark:text-white font-bold">Step One</h4>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">Be Creative</p>
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                Start your journey on our web platform, where creativity knows no bounds. Design stunning digital signages with intuitive tools and a seamless interface that makes bringing your vision to life effortless.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                            <div className="flex items-center mb-3">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5QXuriklGk1ELpusCcv7vCny1KuSdlWOmpw&s" alt="Customer 3" width={48} height={48} className="rounded-full mr-4" />
                                <div>
                                    <h4 className="text-gray-900 dark:text-white font-bold">Step two</h4>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">Sync your work</p>
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                Effortlessly connect your creations to your devices. Our platform ensures smooth synchronization, keeping everything up-to-date and ready to shine with just a few clicks.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                            <div className="flex items-center mb-3">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROv8Gn5DoWJHUpYBUNqfGInsL1tsQkhIrH5Q&s" alt="Customer 2" width={48} height={48} className="rounded-full mr-4" />
                                <div>
                                    <h4 className="text-gray-900 dark:text-white font-bold">Finally</h4>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">Release your magic</p>
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                Let the world see your brilliance! Use our fast, lightweight, and secure SDA application to showcase your signages on any display, ensuring your message captivates audiences everywhere.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visit Platform, Download Application */}
            <section className="bg-white py-10 rounded-lg shadow-lg">
                <div className="container px-4 md:px-6">
                    <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-red-500 text-center mb-12 h-[80px]">
                        Now, Let's Start
                    </h2>
                    <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                        {/* Signage Platform Section */}
                        <div className="rounded-lg p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
                            <h2 className="text-2xl tracking-tighter mb-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-blue-500">Signage Platform</h2>
                            <h3 className="text-xl font-semibold mb-4">Bring Your Vision to Life 🎨</h3>
                            <p className="text-gray-600">
                                Explore our web platform and unlock your creative potential! Dive into an intuitive design experience
                                where you can start crafting stunning digital signages tailored to your needs. Ready to make your ideas
                                shine?
                            </p>
                            <div className="mt-11 mb-5">
                                <Link to="https://signage-workspace.vercel.app" target="_blank" className="bg-white p-6 rounded-lg font-bold shadow-sm hover:shadow-lg text-[16px] text-blue-900">
                                    Visit Signage Workspace
                                </Link>
                            </div>
                        </div>

                        {/* SDA Application Section */}
                        <div className="rounded-lg p-6 bg-gradient-to-br from-green-50 to-emerald-100">
                            <h2 className="text-2xl font-bold tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-purple-700 to-blue-700">SDA Application</h2>
                            <h3 className="text-xl font-semibold mb-4">Your Gateway to Display 🌟</h3>
                            <p className="text-gray-600 mb-6">
                                Download our powerful desktop application and take your signages to the world! Inside, you'll find a
                                comprehensive catalog that guides you step-by-step on how to use the application and showcases all its key
                                features.
                            </p>
                            <div className="max-w-fit">
                                <a href="#" target="_blank">
                                    <img src="/assets/windows-button.png" alt="download button" width={200} className="shadow-sm hover:shadow-lg" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <p className="text-center text-transparent bg-clip-text bg-gradient-to-r from-red-800 to-green-800 mt-8">
                        Seamless, simple, and packed with possibilities—your journey starts here.
                    </p>
                </div>
            </section>
            <div  className='mx-auto my-8 text-gray-600 text-sm'>
            <img src="/assets/companyLogo.png" width={155} className='mx-auto my-1' />
            <center>&copy; {new Date().getFullYear()} SignCast Media. All right reserved</center>
            </div>
        </div>
    )
}