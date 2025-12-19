import LandingLayout from "../../components/layouts/LandingLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";


export default function ContactPage() {
    return (
        <LandingLayout>
            <section className="relative w-full min-h-screen">
                {/* FULLSCREEN MAP */}
                <iframe
                    title="Map Fullscreen"
                    src="https://maps.google.com/maps?q=Eiffel%20Tower%20Paris&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    className="absolute inset-0 w-full h-full filter brightness-75"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                ></iframe>


                {/* CONTENT OVERLAY */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row gap-12">
                    {/* FORM LEFT */}
                    <div className="flex-1 bg-white bg-opacity-90 rounded-3xl p-10 shadow-2xl backdrop-blur-md">
                        <h2 className="text-3xl font-extrabold text-violet-600 mb-6">Send us a Message</h2>
                        <p className="text-gray-600 mb-8">
                            Fill out the form and we’ll get back to you promptly.
                        </p>
                        <div className="grid gap-4">
                            <Input label="Name" placeholder="Your name" />
                            <Input label="Email" placeholder="your@email.com" />
                            <Input label="Subject" placeholder="Subject" />
                            <textarea
                                className="border rounded-2xl px-4 py-4 focus:ring-2 focus:ring-violet-500 resize-none text-gray-700 w-full h-40"
                                placeholder="Your message"
                            />
                            <Button className="bg-violet-500 text-white py-3 px-8 rounded-2xl text-lg hover:bg-violet-600 transition w-full">
                                Send Message
                            </Button>
                        </div>
                    </div>


                    {/* CONTACT INFO RIGHT */}
                    <div className="flex-1 text-white flex flex-col justify-center gap-8">
                        <h3 className="text-2xl font-semibold mb-4 text-violet-400">Contact Information</h3>
                        <div>
                            <h4 className="font-semibold mb-2 text-violet-300">Address</h4>
                            <p>123 Main Street, Paris, France</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-violet-300">Email</h4>
                            <p>contact@electoniks.com</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-violet-300">Phone</h4>
                            <p>+33 1 23 45 67 89</p>
                        </div>
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
}